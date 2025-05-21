package cz.scrumdojo.quizmaster.quiz;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import static org.junit.jupiter.api.Assertions.*;

import java.util.UUID;

@SpringBootTest
public class QuizControllerTest {

    @Autowired
    private QuizController quizController;


    @Test
    public void getQuiz() {
        ResponseEntity<QuizResponse> resp = quizController.getQuiz("d");
        var result = resp.getBody();

        assertNotNull(result);
        assertEquals(HttpStatus.OK, resp.getStatusCode());
        assertEquals("d", result.getId());
    }

    @Test
    public void putQuiz() {

        QuizResponse quiz = QuizResponse.builder()
            .id("10")
            .afterEach(false)
            .build();

        ResponseEntity<Object> resp = quizController.postQuiz(quiz);
        var result = resp.getBody();

        assertNotNull(result);
        assertEquals(HttpStatus.OK, resp.getStatusCode());
        System.out.println("Result: " + result);

        // assertEquals("10", result, "Problem checking saved Id! value=" + result);

    }

    @Test
    public void putQuizGetQuizNoProblem() {

        String testId = UUID.randomUUID().toString();

        QuizResponse quiz = QuizResponse.builder()
            .id(testId)
            .afterEach(false)
            .build();

        ResponseEntity<Object> resp = quizController.postQuiz(quiz);
        assertEquals(HttpStatus.OK, resp.getStatusCode());
        var result = resp.getBody();
        assertNotNull(result, "Result is null");

        ResponseEntity<QuizResponse> resp2 = quizController.getQuiz(testId);
        var result2 = resp2.getBody();
        assertNotNull(result2);
        assertEquals(HttpStatus.OK, resp2.getStatusCode());
        assertEquals(testId, result2.getId());

    }

}
