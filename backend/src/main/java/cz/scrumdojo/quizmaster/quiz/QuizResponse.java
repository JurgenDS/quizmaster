package cz.scrumdojo.quizmaster.quiz;

import cz.scrumdojo.quizmaster.question.QuizQuestion;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuizResponse {

    private String id;
    private QuizQuestion[] questions;
    private boolean afterEach;
    private int passScore;
}
