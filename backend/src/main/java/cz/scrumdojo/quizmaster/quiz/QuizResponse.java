package cz.scrumdojo.quizmaster.quiz;

import cz.scrumdojo.quizmaster.question.QuizQuestion;
import lombok.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class QuizResponse {

    private String id;
    private String title;
    private QuizQuestion[] questions;
    private boolean afterEach;
    private int passScore;
}
