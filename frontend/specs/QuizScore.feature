Feature: Evaluate quiz score

  Scenario Outline: Quiz score is
    When I answer <correct_answers> questions correctly from <total_questions> total questions
    Then I see the score
    | correct_answers   | total_questions   | percentage_result   | text_result        |
    | <correct_answers> | <total_questions> | <percentage_result> | <text_result>      |

  Examples:
    | correct_answers | total_questions | percentage_result | text_result |
    | 5               | 10              | 50                | failed      |
    | 9               | 10              | 90                | passed      |

