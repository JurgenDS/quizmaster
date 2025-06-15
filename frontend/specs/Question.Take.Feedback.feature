Feature: Take a single question

  Background:
    Given questions
      | bookmark  | question                              | answers                           |
      | Australia | What's the capital city of Australia? | Sydney, Canberra (*), Melbourne   |

  Scenario Outline: Single choice question feedback
    Question is answered correctly if the correct answer is selected

    When I take question "Australia"
    And I answer "<answer>"
    Then I see feedback "<feedback>"
    Examples:
      | answer   | feedback   |
      | Sydney   | Incorrect! |
      | Canberra | Correct!   |
