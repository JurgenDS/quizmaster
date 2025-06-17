package cz.scrumdojo.quizmaster.quiz;

import cz.scrumdojo.quizmaster.question.QuizQuestion;
import cz.scrumdojo.quizmaster.question.QuizQuestionRepository;
import org.assertj.core.util.Arrays;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class QuizControllerTest {

    @Autowired
    private QuizController quizController;

    @Autowired
    private QuizQuestionRepository quizQuestionRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Test
    public void createAndGetQuiz() {
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

        ResponseEntity<Integer> resp = quizController.createQuiz(quizInput);

        assertNotNull(resp);
        assertEquals(HttpStatus.OK, resp.getStatusCode());
        Integer body = resp.getBody();
        assertNotNull(body);

        Optional<Quiz> byId = quizRepository.findById(body);
        assertTrue(byId.isPresent());

        Quiz quiz = byId.get();
        assertEquals(body, quiz.getId());
        assertEquals(quizInput.getTitle(), quiz.getTitle());
        assertEquals(quizInput.getDescription(), quiz.getDescription());
        assertEquals(quizInput.getPassScore(), quiz.getPassScore());
        assertArrayEquals(quizInput.getQuestionIds(), quiz.getQuestionIds());
        assertEquals(quizInput.isAfterEach(), quiz.isAfterEach());

        ResponseEntity<QuizResponse> quizGet = quizController.getQuiz(body);
        assertNotNull(quizGet);
        assertEquals(HttpStatus.OK, quizGet.getStatusCode());
        QuizResponse quizGetBody = quizGet.getBody();
        assertNotNull(quizGetBody);
        assertEquals(body, quizGetBody.getId());
        assertEquals(quizInput.getTitle(), quizGetBody.getTitle());
        assertEquals(quizInput.getDescription(), quizGetBody.getDescription());
        QuizQuestion[] quizGetBodyQuestions = quizGetBody.getQuestions();
        assertNotNull(quizGetBodyQuestions);
        assertEquals(quizInput.getQuestionIds().length, quizGetBodyQuestions.length);
        assertEquals(quizInput.getQuestionIds()[0], quizGetBodyQuestions[0].getId());
    }
}
