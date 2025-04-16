package cz.scrumdojo.quizmaster.quiz;
import lombok.*;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class Quiz {

    private String id;
    private int[] questionIds;
    private boolean afterEach;
}
