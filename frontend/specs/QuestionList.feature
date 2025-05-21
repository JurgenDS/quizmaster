Feature: Question list

# And a question list "A" is empty
# And a question list "B" have questions Sky and France
# And a question list "C" is empty

  Scenario: Show empty question list
    Given I open question list "a"
    Then I see an empty question list

  Scenario: Show question list with two questions
    Given I open question list "b"
    Then I see question in list "What is the standard colour of sky?"
    * I see question in list "What is the capital of France?"

  Scenario: Create new question to list
    Given I open question list "c"
    When I create new question to list "What is 2 + 2?" "c"
    Then I see question in list "What is 2 + 2?"
