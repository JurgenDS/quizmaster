Feature: Quiz Welcome page

  Scenario: Quiz welcome page is available
    Given I visit the quiz page "a"
    Then I see the welcome page
    * I see quiz name
    * I see quiz description
    * I see question count
    * I see pass score
    * I see feedback type
