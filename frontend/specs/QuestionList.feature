Feature: Question list

# And a question list "A" is empty
# And a question list "B" have questions Sky and France

  Scenario: Show blank page nonexisting guid
    Given I open question list "X"
    Then I see a blank page

  Scenario: Show empty question list existing guid
    Given I saved the question list "X"
    Then I see question list title "X"
      And I see an empty question list

  Scenario: Show non empty question
    Given I saved the question list "X"
     When I create new question to list "Xquestion"
    Then I see question list title "X"
    And I see question in list "Xquestion"

