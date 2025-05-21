package cz.scrumdojo.quizmaster.questionList;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import cz.scrumdojo.quizmaster.questionList.QuestionListController;
import cz.scrumdojo.quizmaster.questionList.QuestionListRepository;
import cz.scrumdojo.quizmaster.questionList.QuestionListCreateResponse;

import static org.junit.jupiter.api.Assertions.*;

import java.util.UUID;

@SpringBootTest
public class QuestionListControllerTest {

    @Autowired
    private QuestionListController questionListController;

    @Autowired
    private QuestionListRepository questionListRepository;

    final String title = "TEST_TITLE";

    @Test
    public void getQuestionList() {
        var createdQuestionList = questionListRepository.save(new QuestionList(null, title));
        var result = questionListController.getQuestionList(createdQuestionList.getGuid()).getBody();

        assertNotNull(result);
        assertNotNull(result.getGuid());
        assertEquals(title, result.getTitle());
    }

    @Test
    public void saveQuestionList() {
        QuestionListCreateResponse response = questionListController.saveQuestionList(new QuestionList(null, title));
        assertNotNull(response);

        var createdQuestionList = questionListRepository.findById(response.getGuid());
        assertNotNull(createdQuestionList);
        QuestionList ql = createdQuestionList.get();
        assertNotNull(ql);
        assertNotNull(ql.getGuid());
        assertEquals(title, ql.getTitle());
    }
}
