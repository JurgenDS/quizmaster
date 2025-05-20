package cz.scrumdojo.quizmaster.quiz;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import cz.scrumdojo.quizmaster.quiz.Quiz;
import cz.scrumdojo.quizmaster.quiz.QuizResponse;
import cz.scrumdojo.quizmaster.quiz.QuizController;
//import cz.scrumdojo.quizmaster.quiz.QuizRepository;

import static org.junit.jupiter.api.Assertions.*;

import java.beans.Transient;
import java.util.Base64;
import java.util.logging.Logger;

@SpringBootTest
public class QuizControllerTest {

    @Autowired
    private QuizController quizController;

  // @Autowired
  //  private QuizRepository quizRepository;

    private static final Logger logger = Logger.getLogger(QuizControllerTest.class.getName());


    @Test
    public void getQuiz() {


        ResponseEntity<QuizResponse> resp = quizController.getQuiz("d");
        var result = resp.getBody();

        assertNotNull(result);
        assertEquals(HttpStatus.OK, resp.getStatusCode());
        assertEquals("d", result.getId());
        logger.info("Quiz D" + result);
    }

    @Test
    public void putQuiz() {

        Quiz quiz = Quiz.builder()
            .id("d")
            .afterEach(false)
            .build();

        ResponseEntity<Integer> resp = quizController.putQuiz(quiz);
        var result = resp.getBody();

        assertNotNull(result);
        //assertEquals(HttpStatus.OK, resp.getStatusCode());
        //assertEquals("d", result.getId());
        //logger.info("Quiz D" + result);
    }

    /* private static QuizQuestion createSingleChoiceQuestion() {
        return QuizQuestion.builder()
            .question("What is the capital of Italy?")
            .answers(new String[] { "Naples", "Rome", "Florence", "Palermo" })
            .explanations(new String[] { "Nope", "Of course!", "You wish", "Sicilia!" })
            .correctAnswers(new int[] { 1 })
            .build();
    }

    private static QuizQuestion createMultipleChoiceQuestion() {
        return QuizQuestion.builder()
            .question("What is the cities of Italy?")
            .answers(new String[] { "Naples", "Rome", "Astana", "Paris" })
            .explanations(new String[] { "Si!", "Of course!", "Salem, but no.", "Bonjour! But no." })
            .correctAnswers(new int[] { 1, 2 })
            .build();
    }

    @Test
    public void getQuestion() {
        var question = createSingleChoiceQuestion();
        var questionCreateResponse = quizQuestionController.saveQuestion(question);

        var result = quizQuestionController.getQuestion(questionCreateResponse.getId()).getBody();

        assertNotNull(result);
        assertEquals(question.getQuestion(), result.getQuestion());
        assertArrayEquals(question.getAnswers(), result.getAnswers());
    }

    @Test
    public void updateQuestion() {
        var question = createSingleChoiceQuestion();
        var questionCreateResponse = quizQuestionController.saveQuestion(question);
        var updatedQuestion = createMultipleChoiceQuestion();
        quizQuestionController.updateQuestion(updatedQuestion, questionCreateResponse.getHash());

        var result = quizQuestionController.getQuestion(questionCreateResponse.getId()).getBody();

        assertNotNull(result);
        assertEquals(updatedQuestion.getQuestion(), result.getQuestion());
        assertArrayEquals(updatedQuestion.getAnswers(), result.getAnswers());
    }

    @Test
    public void getQuestionByHash() {
        var question = createSingleChoiceQuestion();
        var questionCreateResponse = quizQuestionController.saveQuestion(question);
        var result = quizQuestionController.getQuestionByHash(questionCreateResponse.getHash()).getBody();

        assertNotNull(result);
        assertEquals(question.getQuestion(), result.getQuestion());
        assertArrayEquals(question.getAnswers(), result.getAnswers());
    }

    @Test
    public void getProgressState() {
        var questionCreateResponse = quizQuestionController.saveQuestion(createSingleChoiceQuestion());
        var result = (ProgressState) quizQuestionController.getProgressState(questionCreateResponse.getId()).getBody();

        assertNotNull(result);
        assertEquals(quizQuestionRepository.count(), result.getTotal());
        assertEquals(quizQuestionRepository.getQuestionIndex(questionCreateResponse.getId()), result.getCurrent());
    }

    @Test
    public void saveQuestion() {
        var question = createSingleChoiceQuestion();
        var questionCreateResponse = quizQuestionController.saveQuestion(question);

        assertNotNull(questionCreateResponse);
        assertNotNull(questionCreateResponse.getId());
        assertNotNull(questionCreateResponse.getHash());
    }

    @Test
    public void nonExistingQuestion() {
        ResponseEntity<?> response = quizQuestionController.getQuestion(-1);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void getAnswers() {
        var question = createSingleChoiceQuestion();
        var questionCreateResult = quizQuestionController.saveQuestion(question);
        Answers answers = quizQuestionController.getAnswers(questionCreateResult.getId()).getBody();

        assertNotNull(answers);
        assertArrayEquals(question.getCorrectAnswers(), answers.getCorrectAnswers());
        assertArrayEquals(question.getExplanations(), answers.getExplanations());
        assertSame(question.getQuestionExplanation(), answers.getQuestionExplanation());
    }

    @Test
    public void getAnswersForNonExistingQuestion() {
        ResponseEntity<?> response = quizQuestionController.getAnswers(-1);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

*/

}
