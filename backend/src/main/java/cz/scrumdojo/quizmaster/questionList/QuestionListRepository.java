package cz.scrumdojo.quizmaster.questionList;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionListRepository extends JpaRepository<QuestionList, String> {
}
