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
  When I answer "Blue"
  * I click the next button
  * I answer "Paris"
  * I click the evaluate button
  Then I see the result 2 correct out of 2, 100%, passed

Scenario: Quiz score one question is inccorect
  Given I visit the quiz page "a"
  When I answer "Green"
  * I click the next button
  * I answer "Paris"
  * I click the evaluate button
  Then I see the result 1 correct out of 2, 50%, failed

Scenario Outline: Show question on score page
  Given I visit the quiz page "a"
  When I answer "Blue"
  * I click the next button
  * I answer "Marseille"
  * I click the evaluate button
  Then I see the question "<question>"
  Examples:
      | question                            |
      | What is the standard colour of sky? |
      | What is capital of France?          |

Scenario: Show options of question on score page
  Given I visit the quiz page "a"
  When I answer "Blue"
  * I click the next button
  * I answer "Marseille"
  * I click the evaluate button
  Then I see all options for question "Sky"

Scenario: Show explanation of question on score page
  Given I visit the quiz page "a"
  When I answer "Blue"
  * I click the next button
  * I answer "Marseille"
  * I click the evaluate button
  Then I see explanation "Red is not the standard colour of sky" for question "Sky"

Scenario: Show question explanation of question on score page
  Given I visit the quiz page "a"
  When I answer "Blue"
  * I click the next button
  * I answer "Marseille"
  * I click the evaluate button
  Then I see question explanation "Sky is blue because of Rayleigh scattering" for question "Sky"

Scenario: Show user select
  Given I visit the quiz page "a"
  When I answer "Blue"
  * I click the next button
  * I answer "Marseille"
  * I click the evaluate button
  Then I see user select "Blue" for question "Sky"

Scenario: Show corresponding response
 Given I visit the quiz page "a"
  When I answer "Blue"
  * I click the next button
  * I answer "Marseille"
  * I click the evaluate button
  Then I see corresponding response "Correct!" for answer "Blue" for question "Sky"
  * I see corresponding response "Incorrect!" for answer "Marseille" for question "France"
