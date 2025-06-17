package cz.scrumdojo.quizmaster.quiz;

import cz.scrumdojo.quizmaster.question.QuizQuestion;
import cz.scrumdojo.quizmaster.question.QuizQuestionRepository;
import org.assertj.core.util.Arrays;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class QuizControllerTest {

    @Autowired
    private QuizController quizController;

    @Autowired
    private QuizQuestionRepository quizQuestionRepository;

    @Test
    public void getQuiz() {
        ResponseEntity<QuizResponse> resp = quizController.getQuiz("d");
        var result = resp.getBody();

        assertNotNull(result);
        assertEquals(HttpStatus.OK, resp.getStatusCode());
        assertEquals("d", result.getId());
    }

    @Test
    public void createQuiz() {
        QuizQuestion question = new QuizQuestion();
        question.setQuestion("nějakej string");
        question.setAnswers(Arrays.array("Odp1", "Odp2"));
        question.setCorrectAnswers(new int[]{1});
        QuizQuestion quizQuestion = quizQuestionRepository.save(question);

        int[] questions = new int[1];
        questions[0] = quizQuestion.getId();

        Quiz quizInput = new Quiz();
        quizInput.setTitle("Title");
        quizInput.setDescription("Description");
        quizInput.setAfterEach(true);
        quizInput.setPassScore(85);
        quizInput.setQuestionIds(questions);

        ResponseEntity<String> resp = quizController.createQuiz(quizInput);

        assertNotNull(resp);
        assertEquals(HttpStatus.OK, resp.getStatusCode());
        String body = resp.getBody();
        assertNotNull(body);
    }
}
