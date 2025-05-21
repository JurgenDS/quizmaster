package cz.scrumdojo.quizmaster.questionList;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity
public class QuestionList {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String guid;

    @Column(name = "title", columnDefinition = "text[]")
    private String title;
}
