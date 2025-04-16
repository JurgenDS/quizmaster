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
    private static QuizResponse quiz3 = new QuizResponse();
    private static List<QuizResponse> quizs = new ArrayList<>();

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
        question3.setQuestion("Is this the B quiz?");
        question3.setAnswers(new String[]{"Yes", "No", "Idk", "Not"});
        question3.setExplanations(new String[]{});
        question3.setQuestionExplanation("");
        question3.setCorrectAnswers(new int[]{0});

        QuizQuestion question4 = new QuizQuestion();
        question4.setId(4);
        question4.setQuestion("Continuous Integration/Continuous Deployment (CI/CD) je: ");
        question4.setAnswers(new String[]{"Automatizace testování a nasazení kódu.", "Automobilizace testování a nasazení kódu."});
        question4.setExplanations(new String[]{});
        question4.setQuestionExplanation("");
        question4.setCorrectAnswers(new int[]{0});
        QuizQuestion question5 = new QuizQuestion();
        question5.setId(5);
        question5.setQuestion("Test-Driven Development (TDD): ");
        question5.setAnswers(new String[]{
            "Psaní testů před samotným kódem pro zajištění kvality.",
            "Rozdělení aplikace na menší, nezávislé služby."
        });
        question5.setExplanations(new String[]{});
        question5.setQuestionExplanation("");
        question5.setCorrectAnswers(new int[]{0});
        QuizQuestion question6 = new QuizQuestion();
        question6.setId(6);
        question6.setQuestion("Code Review: ");
        question6.setAnswers(new String[]{
            "Pravidelné kontroly kódu pro zajištění kvality a sdílení znalostí. Drunk based development Proč má komplexita zadání vliv na rychlost dodávky? ",
            "Využití kódových služeb pro škálovatelnost a flexibilitu."
        });
        question6.setExplanations(new String[]{});
        question6.setQuestionExplanation("");
        question6.setCorrectAnswers(new int[]{0});
        QuizQuestion question7 = new QuizQuestion();
        question7.setId(7);
        question7.setQuestion("Drunk based development: ");
        question7.setAnswers(new String[]{
            "humoristický nebo satirický termín, který naznačuje, že vývoj probíhá v neformálním nebo chaotickém prostředí",
            "metodologie vývoje softwaru, která se zaměřuje na práci s jednou hlavní větví (trunk) v systému pro správu verzí"
        });
        question7.setExplanations(new String[]{});
        question7.setQuestionExplanation("");
        question7.setCorrectAnswers(new int[]{0});
        QuizQuestion question8 = new QuizQuestion();
        question8.setId(8);
        question8.setQuestion("Proč má komplexita zadání vliv na rychlost dodávky?");
        question8.setAnswers(
            new String[]{
                "Komplexní zadání vyžaduje důkladnější analýzu, aby se plně pochopily všechny požadavky a souvislosti.",
                "Žádné změny a úpravy",
                "S rostoucí komplexitou neroste i riziko chyb, které mohou zpomalit vývoj kvůli potřebě oprav a úprav."
            }
        );
        question8.setExplanations(new String[]{});
        question8.setQuestionExplanation("");

        var quizQuestion = quizQuestionRepository.save(question);
        var quizQuestion2 = quizQuestionRepository.save(question2);
        var quizQuestion3 = quizQuestionRepository.save(question3);
        var quizQuestion4 = quizQuestionRepository.save(question4);
        var quizQuestion5 = quizQuestionRepository.save(question5);
        var quizQuestion6 = quizQuestionRepository.save(question6);
        var quizQuestion7 = quizQuestionRepository.save(question7);
        var quizQuestion8 = quizQuestionRepository.save(question8);


        quiz1.setId("a");
        quiz1.setQuestions(new QuizQuestion[]{quizQuestion, quizQuestion2});
        quiz1.setAfterEach(false);

        quiz2.setId("b");
        quiz2.setQuestions(new QuizQuestion[]{quizQuestion3, quizQuestion3});
        quiz2.setAfterEach(true);

        quiz3.setId("c");
        quiz3.setQuestions(new QuizQuestion[]{quizQuestion4, quizQuestion5, quizQuestion6, quizQuestion7, quizQuestion8});
        quiz3.setAfterEach(true);

        quizs.add(quiz1);
        quizs.add(quiz2);
        quizs.add(quiz3);
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
