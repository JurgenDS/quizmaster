Feature: Question List GUI

  Scenario: Display a list of questions page
    Given I visit the questionlist page
    Then I should see a questionlist displayed

  Scenario: Display a list of questions with question links
    Given I visit the questionlist page
    Then I see a link to the question "11"
    Then I see a link to the question "150"
    Then I do not see a link to the question "15"
