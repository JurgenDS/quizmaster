Feature: Create quiz GUI
  Scenario: Quiz create is available
    Given I visit the Quiz create page
    Then I should see heading "Create quiz"

@skip
  Scenario: Create new quiz with 2 questions
    Given I create new quiz
    When I enter quiz "my_quiz"
    * I fill the question 0 and "https://studious-adventure-gxxj9vxjqgvh976w-8080.app.github.dev/question/106"
    * I add question 1
    * I fill the question 1 and "https://studious-adventure-gxxj9vxjqgvh976w-8080.app.github.dev/question/107"
    * I save the quiz
    Then I see a link to take the quiz
    When I visit the quiz page "my_quiz"
    Then I see the first question
