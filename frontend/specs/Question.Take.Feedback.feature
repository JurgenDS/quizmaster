Feature: Take a single question

  Background:
    Given questions
      | bookmark  | question                              | answers                           |
      | Australia | What's the capital city of Australia? | Sydney, Canberra (*), Melbourne   |
      | Planets   | Which of the following are planets?   | Mars (*), Pluto, Venus (*), Titan |

  Scenario Outline: Single choice question feedback
    Question is answered correctly if the correct answer is selected

    When I take question "Australia"
    And I answer "<answer>"
    Then I see feedback "<feedback>"
    Examples:
      | answer   | feedback   |
      | Sydney   | Incorrect! |
      | Canberra | Correct!   |

  Scenario Outline: Multiple choice question feedback
    Question is answered correctly only if
    - all correct answers are selected, and,
    - no incorrect answers are selected

    When I take question "Planets"
    And I answer "<answer>"
    Then I see feedback "<feedback>"
    Examples:
      | answer                    | feedback   |
      | Mars, Venus               | Correct!   |
      | Mars, Venus, Titan        | Incorrect! |
      | Mars, Pluto               | Incorrect! |
      | Mars, Pluto, Venus, Titan | Incorrect! |
      | Pluto, Titan              | Incorrect! |
