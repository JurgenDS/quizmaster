Feature: Take a quiz

  Background:
    Given questions
      | Bookmark  | Question                                              | Answers                   |
      | Planet    | Which planet is known as the Red Planet?              | Mars (*), Venus           |
      | Australia | What's the capital city of Australia?                 | Sydney, Canberra (*)      |
      | Fruit     | Which fruit is known for having seeds on the outside? | Strawberry (*), Blueberry |

  # And a quiz "D" with questions "Planet", "Australia", "Fruit" with "feedback at the end"
  # And a quiz "E" with questions "Planet", "Australia", "Fruit" with "continuous feedback"

  Scenario: Create a quiz
      Given I create a quiz "New quiz" with questions "Planet", "Australia", "Fruit"
      Then I see the quiz "New quiz"

  Scenario: Feedback at the end
    - Quiz with feedback at the end does not show feedback until the quiz is finished
    - Submitting an answer proceeds directly to the next question

    When I start quiz "d"
    Then I see question "Planet"

    When I answer "Mars"
    Then I see question "Australia"


  Scenario: Continuous feedback
    - Quiz with continuous feedback shows feedback after each question
    - User must manually proceed to the next question

    When I start quiz "e"
    Then I see question "Planet"

    When I answer "Mars"
    Then I see feedback "Correct!"

    When I proceed to the next question
    Then I see question "Australia"


  Scenario: Continuous feedback - Retake question
    - User can retake a question and see the feedback again

    When I start quiz "e"
    Then I see question "Planet"

    When I answer "Mars"
    Then I see feedback "Correct!"

    When I answer "Venus"
    Then I see feedback "Incorrect!"
