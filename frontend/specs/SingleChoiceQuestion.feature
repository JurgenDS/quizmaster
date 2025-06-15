Feature: Create a quiz question

  Scenario Outline: Explanation for answered question is displayed after answering it
    Given a question "What is capital of Italy?"
    * with answers:
      | Rome     | * | Rome is the capital of Italy              |
      | Naples   |   | Naples is the capital of Campania region  |
      | Florence |   | Florence is the capital of Tuscany region |
      | Palermo  |   | Palermo is the capital of Sicily region   |
    * with explanation "Rome is the capital city of Italy. It is also the capital of the Lazio region"
    * saved and bookmarked as "Italy"
    When I take question "Italy"
    * I answer "Naples"
    Then I see the question explanation

  Scenario: Question is answered and the next button is not displayed
    Given a question "What is capital of Italy?"
    * with answers:
      | Rome     | * | Rome is the capital of Italy              |
      | Naples   |   | Naples is the capital of Campania region  |
      | Florence |   | Florence is the capital of Tuscany region |
      | Palermo  |   | Palermo is the capital of Sicily region   |
    * with explanation "Rome is the capital city of Italy. It is also the capital of the Lazio region"
    * saved and bookmarked as "Italy"
    When I take question "Italy"
    * I answer "Rome"
    Then I should not see the next button
