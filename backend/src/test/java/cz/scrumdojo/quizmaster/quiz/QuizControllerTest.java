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
}
