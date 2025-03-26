Feature: Evaluate quiz score
Scenario: Quiz score all question are correct
  Given I finish the quiz
  When I answer 2 questions correctly from 2 total questions
  Then I see the result passed
