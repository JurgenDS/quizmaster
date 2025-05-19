Feature: Take a quiz

   Background:
    Given a question "What is the standard colour of sky?" bookmarked as "Sky"
      | Red       |   |
      | Blue      | * |
      | Green     |   |
      | Black     |   |
    Given a question "What is capital of France?" bookmarked as "France"
      | Marseille |   |
      | Lyon      |   |
      | Paris     | * |
      | Toulouse  |   |
    # Given a quiz containing questions "Sky" and "France"

  Scenario: Quiz question is displayed and not answered
    Given I start quiz "a"
    Then I see question "Sky"
    And no answer is selected

Scenario: After page refresh no answer is selected
    Given I start quiz "a"
    When I answer "Green"
    And I refresh page
    Then no answer is selected

Scenario: After next page is displayed, no answer and explanation is displayed
    Given I start quiz "a"
    When I answer "Green"
    Then no answer is selected
    And no explanation answer is displayed
