Feature: Evaluate quiz score
@skip
  Scenario Outline: Quiz score is
    When I answer <correct_answers> questions correctly from <total_questions> total questions
    Then I see the score
    | correct_answers   | total_questions   | percentage_result   | text_result        |
    | <correct_answers> | <total_questions> | <percentage_result> | <text_result>      |

  Examples:
    | correct_answers | total_questions | percentage_result | text_result |
    | 2               | 2              | 100                | passed      |
#    | 9               | 10              | 90                | passed      |

