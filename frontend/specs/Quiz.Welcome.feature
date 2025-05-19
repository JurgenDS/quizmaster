Feature: Quiz Welcome page

  Scenario: Quiz welcome page is available
    Given I visit the quiz page "a"
    Then I see the welcome page
    * I see quiz name "a"
    * I see quiz description
    * I see question count 2
    * I see pass score 85%
    * I see feedback type "Feedback at the end"
