<?php

namespace App\Controller;

use App\Entity\Answer;
use App\Entity\QuizQuestion;
use App\Model\QuizQuestionApiModel;
use App\Repository\QuizQuestionRepository;
use App\Service\IdObfuscatorService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Psr\Log\LoggerInterface;

#[Route('/api')]
class QuizQuestionController extends AbstractController
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly QuizQuestionRepository $quizQuestionRepository,
        private readonly IdObfuscatorService $idObfuscator,
        private readonly SerializerInterface $serializer,
        private readonly LoggerInterface $logger,
        private readonly ValidatorInterface $validator
    ) {}

    #[Route('/quiz-question/{id<\d+>}', methods: ['GET'])]
    public function getQuestion(int $id): Response
    {
        $question = $this->findQuestionEntity($id);
        if (!$question) {
            return $this->json(['error' => 'Question not found'], Response::HTTP_NOT_FOUND);
        }

        $apiModel = $this->mapEntityToApiModel($question);
        return $this->json($apiModel);
    }

    #[Route('/quiz-question/{hash}/edit', methods: ['GET'])]
    public function getQuestionByHash(string $hash): Response
    {
        $id = $this->idObfuscator->decode($hash);
        if ($id === null) {
            return $this->json(['error' => 'Invalid hash'], Response::HTTP_BAD_REQUEST);
        }

        return $this->getQuestion($id);
    }

    #[Route('/quiz-question', methods: ['POST'])]
    public function createQuestion(Request $request): Response
    {
        try {
            $apiModel = $this->serializer->deserialize($request->getContent(), QuizQuestionApiModel::class, 'json');

            // Basic validation example (can be expanded)
            if (empty($apiModel->question) || !is_array($apiModel->answers) || empty($apiModel->answers)) {
                 return $this->json(['error' => 'Invalid data: question and answers are required.'], Response::HTTP_BAD_REQUEST);
            }

            $question = $this->mapApiModelToEntity($apiModel, new QuizQuestion());

            $this->entityManager->persist($question);
            $this->entityManager->flush();

            $hash = $this->idObfuscator->encode($question->getId());

            // Replicating Java's QuestionCreateResponse structure
            return $this->json([
                'id' => $question->getId(),
                'hash' => $hash,
            ], Response::HTTP_CREATED);

        } catch (\Symfony\Component\Serializer\Exception\ExceptionInterface $e) {
            $this->logger->error('Deserialization failed: ' . $e->getMessage());
            return $this->json(['error' => 'Invalid JSON data: ' . $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (\Exception $e) {
            $this->logger->error('Error creating question: ' . $e->getMessage());
            return $this->json(['error' => 'An unexpected error occurred.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/quiz-question/{hash}', methods: ['PATCH'])]
    public function updateQuestion(string $hash, Request $request): Response
    {
        $id = $this->idObfuscator->decode($hash);
        if ($id === null) {
            return $this->json(['error' => 'Invalid hash'], Response::HTTP_BAD_REQUEST);
        }

        $question = $this->findQuestionEntity($id);
        if (!$question) {
            return $this->json(['error' => 'Question not found'], Response::HTTP_NOT_FOUND);
        }

        try {
            $apiModel = $this->serializer->deserialize($request->getContent(), QuizQuestionApiModel::class, 'json');

            // Basic validation example
            if (empty($apiModel->question) || !is_array($apiModel->answers) || empty($apiModel->answers)) {
                 return $this->json(['error' => 'Invalid data: question and answers are required.'], Response::HTTP_BAD_REQUEST);
            }

            // Use the mapper, providing the existing entity to update
            $this->mapApiModelToEntity($apiModel, $question);

            // Note: Validation on the updated entity can be added here using $this->validator

            $this->entityManager->flush();

            return $this->json(['id' => $question->getId()]); // Return the ID as per Java version

        } catch (\Symfony\Component\Serializer\Exception\ExceptionInterface $e) {
            $this->logger->error('Deserialization failed during update: ' . $e->getMessage());
            return $this->json(['error' => 'Invalid JSON data: ' . $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (\Exception $e) {
            $this->logger->error('Error updating question: ' . $e->getMessage());
            return $this->json(['error' => 'An unexpected error occurred during update.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Helper to find question and eagerly load answers
    private function findQuestionEntity(int $id): ?QuizQuestion
    {
        // Use QueryBuilder to fetch the question and join/select its answers in one query
        return $this->quizQuestionRepository->createQueryBuilder('q')
            ->addSelect('a') // Select related answers
            ->leftJoin('q.answers', 'a') // Join answers
            ->where('q.id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
    }

    // Helper to map Entity -> API Model
    private function mapEntityToApiModel(QuizQuestion $question): QuizQuestionApiModel
    {
        $model = new QuizQuestionApiModel();
        $model->id = $question->getId();
        $model->question = $question->getQuestion();
        $model->questionExplanation = $question->getQuestionExplanation();

        $answers = [];
        $explanations = [];
        $correctAnswers = [];

        // Note: Ensure answers are sorted if order matters (e.g., by ID)
        // $orderedAnswers = $question->getAnswers()->toArray();
        // usort($orderedAnswers, fn($a, $b) => $a->getId() <=> $b->getId());

        $answerIndex = 0;
        foreach ($question->getAnswers() as $answer) { // Use getAnswers() collection
            $answers[] = $answer->getText();
            $explanations[] = $answer->getExplanation() ?? ''; // Provide default if null
            if ($answer->isIsCorrect()) {
                // Frontend expects 1-based index
                $correctAnswers[] = $answerIndex + 1;
            }
            $answerIndex++;
        }

        $model->answers = $answers;
        $model->explanations = $explanations;
        $model->correctAnswers = $correctAnswers;

        return $model;
    }

    // Helper to map API Model -> Entity (for create/update)
    private function mapApiModelToEntity(QuizQuestionApiModel $model, QuizQuestion $entity): QuizQuestion
    {
        $entity->setQuestion($model->question);
        $entity->setQuestionExplanation($model->questionExplanation);

        // Manage the Answer collection
        // Strategy: Remove existing answers, then add new ones based on the API model.
        // This is simpler than trying to match/update existing answers by index.
        // Could be optimized if necessary, but usually fine for moderate numbers of answers.
        foreach ($entity->getAnswers() as $existingAnswer) {
            $entity->removeAnswer($existingAnswer);
            // Since orphanRemoval=true, Doctrine will schedule these for deletion
            // If not using orphanRemoval, you'd need $this->entityManager->remove($existingAnswer);
        }

        $correctIndices = array_flip($model->correctAnswers); // Flip for easy 0-based index lookup

        foreach ($model->answers as $index => $text) {
            $answer = new Answer();
            $answer->setText($text);
            $answer->setExplanation($model->explanations[$index] ?? null);
            // Check if the current 0-based index corresponds to a 1-based correct answer index
            $answer->setIsCorrect(isset($correctIndices[$index + 1]));

            // Associate with the question (will be persisted via cascade)
            $entity->addAnswer($answer);
        }

        return $entity;
    }
}
