# Feature: Create a quiz

#   Scenario: Successfully create a quiz with multiple questions
#     Given I am on the "Create Quiz" page
#     When I enter "General Knowledge" as the quiz title
#     And I add the following questions:
#       | Question                       | Option A | Option B | Option C | Correct Option |
#       | What is the capital of France? | Paris    | Berlin   | Rome     | A              |
#       | What is 2 + 2?                 | 3        | 4        | 5        | B              |
#     And I submit the quiz
#     Then I should see a confirmation message "Quiz created successfully"
#     And I should be redirected to the quiz overview page
#     And the quiz titled "General Knowledge" should be listed with 2 questions

#   Scenario: Attempt to create a quiz without a title
#     Given I am on the "Create Quiz" page
#     When I leave the quiz title empty
#     And I attempt to submit the quiz
#     Then I should see an error message "Quiz title is required"

#   Scenario: Attempt to create a quiz without any questions
#     Given I am on the "Create Quiz" page
#     When I enter "Science Quiz" as the quiz title
#     And I do not add any questions
#     And I attempt to submit the quiz
#     Then I should see an error message "At least one question is required"

#   Scenario: Add a question without specifying the correct answer
#     Given I am on the "Create Quiz" page
#     When I enter "Math Quiz" as the quiz title
#     And I add the following question:
#       | Question       | Option A | Option B | Option C | Correct Option |
#       | What is 5 x 5? | 20       | 25       | 30       |                |
#     And I attempt to submit the quiz
#     Then I should see an error message "Each question must have a correct answer selected"

#   Scenario: Add a question with duplicate options
#     Given I am on the "Create Quiz" page
#     When I enter "History Quiz" as the quiz title
#     And I add the following question:
#       | Question                            | Option A          | Option B          | Option C         | Correct Option |
#       | Who was the first president of USA? | George Washington | George Washington | Thomas Jefferson | A              |
#     And I attempt to submit the quiz
#     Then I should see an error message "Answer options must be unique for each question"
