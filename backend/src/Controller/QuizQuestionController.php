<?php

namespace App\Controller;

use App\Entity\Answer;
use App\Entity\QuizQuestion;
use App\Model\QuizQuestionApiModel;
use App\Repository\QuizQuestionRepository;
use App\Service\IdObfuscatorService;
use App\Service\QuizQuestionMapper;
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
        private readonly ValidatorInterface $validator,
        private readonly QuizQuestionMapper $quizQuestionMapper
    ) {}

    #[Route('/quiz-question/{id<\d+>}', methods: ['GET'])]
    public function getQuestion(int $id): Response
    {
        $question = $this->findQuestionEntity($id);
        if (!$question) {
            return $this->json(['error' => 'Question not found'], Response::HTTP_NOT_FOUND);
        }

        $apiModel = $this->quizQuestionMapper->mapEntityToApiModel($question);
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

            $question = $this->quizQuestionMapper->mapApiModelToEntity($apiModel, new QuizQuestion());

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
            $this->quizQuestionMapper->mapApiModelToEntity($apiModel, $question);

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
}
