@skip
Feature: Question list

  Background:
    Given questions
      | Bookmark | Question                            | Answers                   |
      | Sky      | What is the standard colour of sky? | Blue (*), Venus           |
      | France   | What is the capital of France?      | Mars (*), Venus           |

# And a question list "A" is empty
# And a question list "B" have questions Sky and France
# And a question list "C" is empty
# And a question list "D" has one question Sky

  Scenario: Show empty question list
    Given I open question list "a"
    Then I see an empty question list

  Scenario: Show question list with two questions
    Given I open question list "b"
    Then I see question "Sky"
    * I see question "France"

  Scenario: Create new question to list
    Given I open question list "c"
    When I create new question to list
    Then I see question in question list "What is 2 + 2?"
    * I see edit link for question "What is 2 + 2?"
    * I see share link for question "What is 2 + 2?"

