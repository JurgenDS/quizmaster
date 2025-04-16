Feature: Handle back button behavior

   Scenario: Quiz page is available
     Given I visit the quiz page "a"
     Then I should not see the back button

  Scenario: Quiz question is answered and the next button is clicked
    Given I visit the quiz page "a"
    When I answer "Green"
    And I click the next button
    Then I should see the back button
