Feature: Question List GUI

  Scenario: Display a list of questions
    Given I visit the questionlist for "a3f5b4e8c12e4a8e9f3b5f84d3a7b8d4f9c1e2a6b7d9f8e2c5a1b9e3d7c6f2a9" page
    Then I should see a questionlist displayed

  Scenario: Display a list of questions with question links for A
    Given I visit the questionlist for "a3f5b4e8c12e4a8e9f3b5f84d3a7b8d4f9c1e2a6b7d9f8e2c5a1b9e3d7c6f2a9" page
    Then I see a link to the question "11"
    Then I see a link to the question "20"
    Then I do not see a link to the question "15"

  Scenario: Display a list of questions with question links for B
    Given I visit the questionlist for "e9c3a7b1d5f2e4c9a8b6f1d3c7e2a4b5f6d9c1e7b3a5d8c2f4a6b1e9d7c3f8a1" page
    Then I see a link to the question "21"
    Then I see a link to the question "18"
    Then I do not see a link to the question "15"
