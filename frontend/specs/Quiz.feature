Feature: Take a quiz

  Background:
    Given a question "What is the standard colour of sky?"
    * with answers:
      | Red   |   |
      | Blue  | * |
      | Green |   |
      | Black |   |
    * saved and bookmarked as "Sky"
    Given a question "What is capital of France?"
    * with answers:
      | Marseille |   |
      | Lyon      |   |
      | Paris     | * |
      | Toulouse  |   |
    * saved and bookmarked as "France"
    Given a question "Is this the B quiz?"
    * with answers:
      | Yes | * |
      | No  |   |
      | Idk |   |
      | Not |   |
    * saved and bookmarked as "BQuestion"
  # Given a quiz containing questions "Sky" and "France"

  Scenario: Quiz page is available
    Given I visit the quiz page "a"
    Then I should see heading "Quiz"

  Scenario: Quiz question A is displayed
    Given I visit the quiz page "a"
    Then I see the first question

  Scenario: Quiz question A is skipable
    Given I visit the quiz page "a"
    Then I should see the skip button

  Scenario: Quiz question B is displayed
    Given I visit the quiz page "b"
    Then I see the b question

  Scenario: Quiz question is not answered afterEach
    Given I visit the quiz page "a"
    When I answer "Green"
    Then I should not see the answer
    Then I should see the next question
    Then I should not see the skip button

  Scenario: Quiz question is answered afterEach
    Given I visit the quiz page "b"
    When I answer "Yes"
    Then I should see the answer
    Then I should see the next button

  Scenario: Quiz question is answered and the next button is clicked
    Given I visit the quiz page "a"
    When I answer "Green"
    Then I should see the next question

  Scenario: Quiz question is not answered and the skip button is clicked
    Given I visit the quiz page "a"
    When I click the skip button
    Then I should see the next question

  Scenario: User proceed to last question
    Given I visit the quiz page "a"
    When I answer "Green"
    Then I should see the next question
    Then I should not see the skip button
    Then I should not see the evaluate button
    When I answer "Lyon"
    Then I should see the evaluate button
    Then I should not see the next button

  Scenario: User navigate to evaluation page
    Given I visit the quiz page "a"
    When I answer "Green"
    Then I should see the next question
    Then I should not see the skip button
    Then I should not see the evaluate button
    When I answer "Lyon"
    Then I click the evaluate button

  Scenario: User reloads page on answered question
    Given I visit the quiz page "a"
    When I answer "Green"
    * I check answer "Lyon,Paris"
    * I uncheck answer "Lyon"
    * I reload the page
    Then no answer is selected

  Scenario: Progress bar is shown on first quiz page
    Given I visit the quiz page "a"
    Then I should see the progress bar showing page 1 of 2

  Scenario: Progress bar is full on last quiz page
    Given I visit the quiz page "a"
    When I answer "Green"
    Then I should see the progress bar showing page 2 of 2

  Scenario Outline: Config saved after reload - check
    Given I visit the quiz overview page "a"
    When I changed the "Show feedback after each question" checkbox "<checkboxState>"
    And I reload page
    Then I should see checkbox "<checkboxState>"
    Examples:
      | checkboxState |
      | true          |
      | false         |
  Scenario: Back button is not visible on the quiz page
    Given I visit the quiz page "a"
    Then I should not see the back button

  Scenario: Back button is visible
    Given I visit the quiz page "a"
    When I answer "Green"
    Then I should see the back button

  Scenario: Back button is clicked
    Given I visit the quiz page "a"
    When I answer "Green"
    And I click the back button
    Then I see the first question

  Scenario: Display countdown timer
    Given I visit the quiz page "a"
    Then I should see the countdown timer "2:00"
  @skip
  Scenario: Display display timer after 30 seconds
    Given I visit the quiz page "a"
    Then I should see the countdown timer after delay "1:30"

  Scenario: Last question is not answered and there are any skipped questions
    Given I visit the quiz page "a"
    When I click the skip button
    Then I should see the next question
    Then I should not see the evaluate button
    Then I should see the skip button

  Scenario: Last question is answered and there are any skipped questions
    Given I visit the quiz page "a"
    When I click the skip button
    Then I should see the next question
    When I answer "Paris"
    Then I should not see the evaluate button
    Then I should see the next button
