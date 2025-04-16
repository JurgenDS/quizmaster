package cz.scrumdojo.quizmaster.quiz;

import cz.scrumdojo.quizmaster.question.QuizQuestion;
import cz.scrumdojo.quizmaster.question.QuizQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class QuizController {

    private final QuizQuestionRepository quizQuestionRepository;

    private static QuizResponse quiz1 = new QuizResponse();
    private static QuizResponse quiz2 = new QuizResponse();
    private static List<QuizResponse> quizs = new ArrayList<>();

    @Autowired
    public QuizController(QuizQuestionRepository quizQuestionRepository) {
        this.quizQuestionRepository = quizQuestionRepository;

        QuizQuestion question = new QuizQuestion();
        question.setId(1);
        question.setQuestion("What is the standard colour of sky?");
        question.setAnswers(new String[]{"Red", "Blue", "Green", "Black"});
        question.setExplanations(new String[]{});
        question.setQuestionExplanation("");
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
        question3.setQuestion("Is this the B quiz?");
        question3.setAnswers(new String[]{"Yes", "No", "Idk", "Not"});
        question3.setExplanations(new String[]{});
        question3.setQuestionExplanation("");
        question3.setCorrectAnswers(new int[]{0});

        var quizQuestion = quizQuestionRepository.save(question);
        var quizQuestion2 = quizQuestionRepository.save(question2);
        var quizQuestion3 = quizQuestionRepository.save(question3);


        quiz1.setId("a");
        quiz1.setQuestions(new QuizQuestion[]{quizQuestion, quizQuestion2});
        quiz1.setAfterEach(false);

        quiz2.setId("b");
        quiz2.setQuestions(new QuizQuestion[]{quizQuestion3, quizQuestion3});
        quiz2.setAfterEach(true);

        quizs.add(quiz1);
        quizs.add(quiz2);
    }

    @Transactional
    @GetMapping("/quiz/{id}")
    public ResponseEntity<QuizResponse> getQuiz(@PathVariable String id) {
        return response(quizs.stream().filter(it -> Objects.equals(it.getId(), id)).findFirst());
    }

    @Transactional
    @PutMapping("/quiz/{id}")
    public Integer putQuiz(@RequestBody Quiz quiz) {

        quizs.stream().filter(it -> Objects.equals(it.getId(), quiz.getId())).findFirst().ifPresent(it -> {
            it.setAfterEach(quiz.isAfterEach());
        });
        return ResponseEntity.ok().build().getStatusCodeValue();
    }

    @Transactional
    @PostMapping("/quiz/")
    public Integer postQuiz(@RequestBody Quiz quiz) {
        return null;
    }

    private <T> ResponseEntity<T> response(Optional<T> entity) {
        return entity
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}
