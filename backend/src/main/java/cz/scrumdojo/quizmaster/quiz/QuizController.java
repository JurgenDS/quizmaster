package cz.scrumdojo.quizmaster.quiz;

import cz.scrumdojo.quizmaster.question.QuizQuestion;
import cz.scrumdojo.quizmaster.question.QuizQuestionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import cz.scrumdojo.quizmaster.model.ErrorResponse;
import cz.scrumdojo.quizmaster.model.QuizCreateRequest;

import java.util.Random;
import java.util.UUID;
import java.util.HashMap;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class QuizController {

    private final QuizQuestionRepository quizQuestionRepository;

    private static QuizResponse quiz1 = new QuizResponse();
    private static QuizResponse quiz2 = new QuizResponse();
    private static QuizResponse quiz3 = new QuizResponse();
    private static QuizResponse quiz4 = new QuizResponse();
    private static HashMap<String,QuizResponse> quizs = new HashMap<>();

    @Autowired
    public QuizController(QuizQuestionRepository quizQuestionRepository) {
        this.quizQuestionRepository = quizQuestionRepository;

        QuizQuestion question = new QuizQuestion();
        question.setId(1);
        question.setQuestion("What is the standard colour of sky?");
        question.setAnswers(new String[]{"Red", "Blue", "Green", "Black"});
        question.setExplanations(
            new String[]{
                "Red is not the standard colour of sky",
                "Blue is the standard colour of sky",
                "Green is not the standard colour of sky",
                "Black is not the standard colour of sky"
            }
        );
        question.setQuestionExplanation(
            "Sky is blue because of Rayleigh scattering"
        );
        question.setCorrectAnswers(new int[]{1});

        QuizQuestion question2 = new QuizQuestion();
        question2.setId(2);
        question2.setQuestion("What is capital of France?");
        question2.setAnswers(new String[]{"Marseille", "Lyon", "Paris", "Toulouse"});
        question2.setExplanations(new String[]{});
        question2.setQuestionExplanation("");
        question2.setCorrectAnswers(new int[]{2});

        QuizQuestion question3 = new QuizQuestion();
        question3.setId(3);
        question3.setQuestion("Which animal has long nose?");
        question3.setAnswers(new String[]{"Elephant", "Anteater", "Swordfish", "Bulldog"});
        question3.setExplanations(new String[]{});
        question3.setQuestionExplanation("");
        question3.setCorrectAnswers(new int[]{0,1,2});

        var quizQuestion = quizQuestionRepository.save(question);
        var quizQuestion2 = quizQuestionRepository.save(question2);
        var quizQuestion3 = quizQuestionRepository.save(question3);

        quiz1.setId("a");
        quiz1.setQuestions(new QuizQuestion[]{quizQuestion, quizQuestion2});
        quiz1.setAfterEach(false);
        quiz1.setPassScore(85);

        quiz3.setId("c");
        quiz3.setQuestions(new QuizQuestion[]{quizQuestion, quizQuestion2});
        quiz3.setAfterEach(true);
        quiz3.setPassScore(40);

        quiz4.setId("k");
        quiz4.setQuestions(new QuizQuestion[]{quizQuestion3, quizQuestion2});
        quiz4.setAfterEach(false);
        quiz4.setPassScore(40);

        quizs.put(quiz1.getId(), quiz1);
        quizs.put(quiz2.getId(), quiz2);
        quizs.put(quiz3.getId(), quiz3);
        quizs.put(quiz4.getId(), quiz4);

        var planet = quizQuestionRepository.save(
            QuizQuestion.builder()
                .question("Which planet is known as the Red Planet?")
                .answers(new String[]{ "Mars", "Venus" })
                .explanations(new String[]{ "", "" })
                .correctAnswers(new int[]{ 0 })
                .build()
        );

        var australia = quizQuestionRepository.save(
            QuizQuestion.builder()
                .question("What's the capital city of Australia?")
                .answers(new String[]{ "Sydney", "Canberra" })
                .explanations(new String[]{ "", "" })
                .correctAnswers(new int[]{ 1 })
                .build()
        );

        var fruit = quizQuestionRepository.save(
            QuizQuestion.builder()
                .question("Which fruit is known for having seeds on the outside?")
                .answers(new String[]{ "Strawberry", "Blueberry" })
                .explanations(new String[]{ "", "" })
                .correctAnswers(new int[]{ 0 })
                .build()
        );

        var quizD = QuizResponse.builder()
            .id("d")
            .questions(new QuizQuestion[]{ planet, australia, fruit })
            .afterEach(false)
            .passScore(85)
            .build();

        var quizE = QuizResponse.builder()
            .id("e")
            .questions(new QuizQuestion[]{ planet, australia, fruit })
            .afterEach(true)
            .passScore(85)
            .build();

        quizs.put(quizD.getId(), quizD);
        quizs.put(quizE.getId(), quizE);
    }

    @Transactional
    @GetMapping("/quiz/{id}")
    public ResponseEntity<QuizResponse> getQuiz(@PathVariable String id) {
        log.info("GET /quiz param:{}", id);
        if (quizs.get(id) == null) {
            log.info("QUIZ {} was not found, HTTP 404", id);
            return ResponseEntity.notFound().build();
        }
        log.info("QUIZ {} with {} was found, HTTP 200", id, quizs.get(id));
        return ResponseEntity.ok(quizs.get(id));
    }

    @Transactional
    @PostMapping("/quiz")
    public ResponseEntity<Object> postQuiz(@RequestBody QuizResponse quiz) {

        log.info("POST /quiz param:{}", quiz.toString());

        try {
            if (quiz.getId() == null) {
                quiz.setId(""+ new Random().nextInt(100000000, 999999999));
                log.info("Quiz created with new id: {}", quiz.getId());
            }
            if (quizs.get(quiz.getId()) != null) {
                throw new RuntimeException("Quiz with this ID " + quiz.getId() + " already exists");
            };
            quizs.put(quiz.getId(),quiz);
            return ResponseEntity.ok(quiz.getId());
        } catch (RuntimeException e) {
            return ResponseEntity.
                        badRequest().
                            body(new ErrorResponse("Quiz with id " + quiz.getId() + " already exists", 1, UUID.randomUUID().toString()));
        }

    }

    @Transactional
    @PostMapping("/v2/quiz")
    public ResponseEntity<Object> postQuizV2(@RequestBody QuizCreateRequest quiz) {

        log.info("V2 POST /quiz param:{}", quiz.toString());

        try {
            if (quiz.getId() == null) {
                quiz.setId(""+ new Random().nextInt(100000000, 999999999));
                log.info("Quiz created with new id: {}", quiz.getId());
            }
            if (quizs.get(quiz.getId()) != null) {
                //throw new RuntimeException("Quiz with this ID " + quiz.getId() + " already exists");
                log.warn("Quiz with this ID " + quiz.getId() + " already exists, will be replaced");
            };

            QuizResponse quizResponse = new QuizResponse();
            quizResponse.setId(quiz.getId());
            quizResponse.setTitle(quiz.getTitle());
            quizResponse.setAfterEach(quiz.isAfterEach());
            quizResponse.setPassScore(quiz.getPassScore());

            if (quiz.getUrls() != null && quiz.getUrls().length > 0) {
                quizResponse.setQuestions(new QuizQuestion[quiz.getUrls().length]);
            } else {
                quizResponse.setQuestions(new QuizQuestion[0]);
            }

            if (quiz.getUrls() != null && quiz.getUrls().length > 0) {

                for (int i = 0; i < quiz.getUrls().length; i++) {
                    String url = quiz.getUrls()[i];
                    int questionId = parseLastElement(url).isEmpty() ? -1 : Integer.parseInt(parseLastElement(url));
                    if (questionId < 0) {
                        log.error("Invalid URL: " + url);
                        continue;
                    }
                    var question = quizQuestionRepository.findById(questionId);
                    if (question.isPresent()) {
                        quizResponse.getQuestions()[i] = question.get();
                    } else {
                        log.error("Invalid question ID:" + questionId + " gotten from url: " + url);
                    }
                }

            } else {
                log.warn("No question IDs provided");
            }

            quizs.put(quiz.getId(), quizResponse);
            return ResponseEntity.ok(quiz.getId());
        } catch (RuntimeException e) {
            log.error("Error while creating quiz: {}", getStackTrace(e));
            return ResponseEntity.
                        badRequest().
                            body(new ErrorResponse("Quiz with id " + quiz.getId() + " had a problem. Reason: " + e.getMessage(), 1, UUID.randomUUID().toString()));
        }

    }

    private String getStackTrace(Exception e) {
        StringBuilder sb = new StringBuilder();
        for (StackTraceElement element : e.getStackTrace()) {
            sb.append(element.toString()).append(",");
        }
        return sb.toString();
    }

    private String parseLastElement(String url) {
    // Rozdělí URL podle lomítek a vezme poslední neprázdný prvek
    String[] parts = url.split("/");
    for (int i = parts.length - 1; i >= 0; i--) {
        if (!parts[i].isEmpty()) {
            return parts[i];
        }
    }
    return "";
}

}
