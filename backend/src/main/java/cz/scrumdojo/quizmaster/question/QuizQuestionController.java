package cz.scrumdojo.quizmaster.question;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.Optional;
import question.QuestionCreateResponse;

@RestController
@RequestMapping("/api")
public class QuizQuestionController {

    private final QuizQuestionRepository quizQuestionRepository;
    public static final String SALT_STRING = "ALKMDNEQ";

    @Autowired
    public QuizQuestionController(
        QuizQuestionRepository quizQuestionRepository) {

        this.quizQuestionRepository = quizQuestionRepository;
    }

    @Transactional
    @GetMapping("/quiz-question/{id}")
    public ResponseEntity<QuizQuestion> getQuestion(@PathVariable Integer id) {
        return response(findQuestion(id));
    }

    @Transactional
    @GetMapping("/quiz-question/{hash}/edit")
    public ResponseEntity<QuizQuestion> getQuestionByHash(@PathVariable String hash) {
        var id = getQuestionIdFromHash(hash);
        return response(findQuestion(id));
    }

    @Transactional
    @GetMapping("/quiz-question/{id}/progress-state")
    public ResponseEntity<ProgressState> getProgressState(@PathVariable Integer id) {
        return response(Optional.of(new ProgressState(findAllQuestionsCount(), getQuestionIndex(id))));
    }

    @Transactional
    @PostMapping("/quiz-question")
    public QuestionCreateResponse saveQuestion(@RequestBody QuizQuestion question) {
        var createdQuestion = quizQuestionRepository.save(question);
        var hash = getHashFromQuestionId(question.getId());
        return new QuestionCreateResponse(createdQuestion.getId(), hash);
    }

    @Transactional
    @PatchMapping("/quiz-question/{hash}")
    public Integer updateQuestion(@RequestBody QuizQuestion question, @PathVariable String hash) {
        var id = getQuestionIdFromHash(hash);
        question.setId(id);
        System.out.println("Updating question: " + question);
        quizQuestionRepository.save(question);
        return id;
    }

    @Transactional
    @GetMapping("/quiz-question/{id}/answers")
    public ResponseEntity<Answers> getAnswers(@PathVariable Integer id) {
        return response(findQuestion(id).map(Answers::from));
    }

    private Optional<QuizQuestion> findQuestion(Integer id) {
        return quizQuestionRepository.findById(id);
    }

    private Long findAllQuestionsCount() {
        return quizQuestionRepository.count();
    }

    private Long getQuestionIndex(Integer id) {
        return quizQuestionRepository.getQuestionIndex(id);
    }

    private <T> ResponseEntity<T> response(Optional<T> entity) {
        return entity
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    private String getHashFromQuestionId(Integer questionId) {
        var idWithSalt = questionId + QuizQuestionController.SALT_STRING;
        return Base64.getUrlEncoder().encodeToString(idWithSalt.getBytes());
    }

    private Integer getQuestionIdFromHash(String hash) {
        var idWithSalt = new String(Base64.getUrlDecoder().decode(hash.getBytes()));
        return Integer.parseInt(idWithSalt.substring(0, idWithSalt.length() - QuizQuestionController.SALT_STRING.length()));
    }
}
