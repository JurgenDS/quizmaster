Feature: Take a quiz

  Background:
    Given questions
      | Bookmark | Question                            | Answers                              |
      | Sky      | What is the standard colour of sky? | Red, Blue (*), Green, Black          |
      | France   | What is capital of France?          | Marseille, Lyon, Paris (*), Toulouse |

  # Given a quiz containing questions "Sky" and "France"

  Scenario: Quiz question A is displayed
    Given I start quiz "a"
    Then I see question "Sky"


  Scenario: Quiz question A is skipable
    Given I start quiz "a"
    Then I should see the skip button

  Scenario: Quiz question is not answered afterEach
    Given I start quiz "a"
    When I answer "Green"
    Then I should not see the answer
    Then I see question "France"
    Then I should not see the skip button

  Scenario: Quiz question is answered and the next button is clicked
    Given I start quiz "a"
    When I answer "Green"
    Then I see question "France"

  Scenario: Quiz question is not answered and the skip button is clicked
    Given I start quiz "a"
    When I click the skip button
    Then I see question "France"

  Scenario: User proceed to last question
    Given I start quiz "a"
    When I answer "Green"
    Then I see question "France"
    Then I should not see the skip button
    Then I should not see the evaluate button
    When I answer "Lyon"
    Then I should see the evaluate button
    Then I should not see the next button

  Scenario: User navigate to evaluation page
    Given I start quiz "a"
    When I answer "Green"
    Then I see question "France"
    Then I should not see the skip button
    Then I should not see the evaluate button
    When I answer "Lyon"
    Then I click the evaluate button

  Scenario: User reloads page on answered question
    Given I start quiz "a"
    When I answer "Green"
    * I check answer "Lyon,Paris"
    * I uncheck answer "Lyon"
    * I reload the page
    Then no answer is selected

  Scenario: Progress bar is shown on first quiz page
    Given I start quiz "a"
    Then I should see the progress bar showing page 1 of 2

  Scenario: Progress bar is full on last quiz page
    Given I start quiz "a"
    When I answer "Green"
    Then I should see the progress bar showing page 2 of 2

  Scenario: Back button is not visible on the quiz page
    Given I start quiz "a"
    Then I should not see the back button

  Scenario: Back button is visible
    Given I start quiz "a"
    When I answer "Green"
    Then I should see the back button

  Scenario: Back button is clicked
    Given I start quiz "a"
    When I answer "Green"
    Then I see question "France"
    And I click the back button
    Then I see question "Sky"

  Scenario: Display countdown timer
    Given I start quiz "a"
    Then I should see the countdown timer "2:00"

  Scenario: Display modal after 2 minutes
    Given I start quiz "a"
    Then I should see the countdown timer after delay is less then "2:00"
    And I should see the text "Game over time"


  Scenario: Last question is not answered and there are any skipped questions
    Given I start quiz "a"
    When I click the skip button
    Then I see question "France"
    Then I should not see the evaluate button
    Then I should see the skip button

  Scenario: Last question is answered and there are any skipped questions
    Given I start quiz "a"
    When I click the skip button
    Then I see question "France"
    When I answer "Paris"
    Then I should not see the evaluate button
    Then I should see the next button

  Scenario: Last question is answered and show skipped question
    Given I start quiz "a"
    When I click the skip button
    Then I see question "France"
    When I answer "Paris"
    Then I should not see the evaluate button
    Then I should see the next button
    When I click the next button
    Then I see question "Sky"

  Scenario: Last question is skipped and there are any skipped questions
    Given I start quiz "a"
    When I click the skip button
    Then I see question "France"
    Then I should see the skip button
    When I click the skip button
    Then I see question "Sky"

  Scenario: Do not show skipped question which was submited
    Given I start quiz "a"
    When I click the skip button
    Then I see question "France"
    When I answer "Paris"
    Then I should not see the evaluate button
    Then I should see the next button
    When I click the next button
    Then I see question "Sky"
    When I answer "Blue"
    Then I should see the evaluate button

