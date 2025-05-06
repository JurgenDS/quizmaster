Feature: Create quiz GUI

@skip
  Scenario: Create new quiz with 2 questions
    Given I create new quiz
    When I enter quiz "můj kviz"
    * I fill the question 0 and "https://studious-adventure-gxxj9vxjqgvh976w-8080.app.github.dev/question/106"
    * I add question 1
    * I fill the question 1 and "https://studious-adventure-gxxj9vxjqgvh976w-8080.app.github.dev/question/107"
    * I save the quiz
    Then I see a link to take the quiz
