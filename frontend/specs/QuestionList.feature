Feature: Question list

# And a question list "A" is empty
# And a question list "B" have questions Sky and France

@skip
  Scenario: Show empty question list
    Given I open question list "a"
    Then I see an empty question list

@skip
  Scenario: Show question list with two questions
    Given I open question list "b"
    Then I see question in list "What is the standard colour of sky?"
    * I see question in list "What is the capital of France?"

  Scenario: Create new question to list
    Given I start creating question list
    When I save the question list "c"
    Then I see question list title "c"
    When I create new question to list "What is 2 + 2?"
    Then I see question in list "What is 2 + 2?"

