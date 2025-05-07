Feature: Evaluate quiz score

  Background:
    Given a question "What is the standard colour of sky?"
    * with answers:
      | Red       |   |
      | Blue      | * |
      | Green     |   |
      | Black     |   |
    * saved and bookmarked as "Sky"
    Given a question "What is capital of France?"
    * with answers:
      | Marseille |   |
      | Lyon      |   |
      | Paris     | * |
      | Toulouse  |   |
    * saved and bookmarked as "France"

Scenario: Quiz score all question are correct
  Given I visit the quiz page "a"
  When I click the start button
  * I answer "Blue"
  * I answer "Paris"
  * I click the evaluate button
  Then I see the result 2 correct out of 2, 100%, passed, required passScore 85%

Scenario: Quiz score one question is inccorect
  Given I visit the quiz page "a"
  When I click the start button
  When I answer "Green"
  * I answer "Paris"
  * I click the evaluate button
  Then I see the result 1 correct out of 2, 50%, failed, required passScore 85%

Scenario Outline: Show question on score page
  Given I visit the quiz page "a"
  When I click the start button
  * I answer "Blue"
  * I answer "Marseille"
  * I click the evaluate button
  Then I see the question "<question>"
  Examples:
      | question                            |
      | What is the standard colour of sky? |
      | What is capital of France?          |

Scenario: Show options of question on score page
  Given I visit the quiz page "a"
  When I click the start button
  * I answer "Blue"
  * I answer "Marseille"
  * I click the evaluate button
  Then I see all options for question "Sky"

Scenario: Show question explanation of question on score page
  Given I visit the quiz page "a"
  When I click the start button
  * I answer "Blue"
  * I answer "Marseille"
  * I click the evaluate button
  Then I see question explanation "Sky is blue because of Rayleigh scattering" for question "Sky"

Scenario: Show user select
  Given I visit the quiz page "a"
  When I click the start button
  * I answer "Blue"
  * I answer "Marseille"
  * I click the evaluate button
  Then I see user select "Blue" for question "Sky"

Scenario: Quiz with passScore 85% and score 50% will pass
  Given I visit the quiz page "a"
  When I click the start button
  * I answer "Green"
  * I answer "Paris"
  * I click the evaluate button
  Then I see the result 1 correct out of 2, 50%, failed, required passScore 85%

Scenario: Quiz with passScore 40% and score 50% will pass
  Given I visit the quiz page "c"
  When I click the start button
  * I answer "Green"
  * I click the next button
  * I answer "Paris"
  * I click the evaluate button
  Then I see the result 1 correct out of 2, 50%, passed, required passScore 40%
