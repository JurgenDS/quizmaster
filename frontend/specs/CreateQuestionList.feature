@skip
Feature: Create question list

  Scenario: Create question list without title
    Given I start creating question list
    When I try saving the question list
    Then I see an error message

  Scenario: Create question list
    Given I start creating question list
    When I enter question list title
    * I try saving the question list
    Then I see a link to question list
    When I open question list
    Then I see the empty question list
