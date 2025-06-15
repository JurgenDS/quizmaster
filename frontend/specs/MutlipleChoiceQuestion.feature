Feature: Answering a quiz question with multiple choice

  Background:
    Given a question "Which of these countries are in Europe?"
    * with answers:
      | Italy   | * | Located on the Apennine Peninsula, which is part of the European continent. |
      | France  | * | One of the founders of the European Union.                                  |
      | Morocco |   | This country is in Africa, not in Europe.                                   |
      | Spain   | * | Located on the Iberian Peninsula, which is part of the European continent.  |
      | Canada  |   | Located in America.                                                         |
    * with explanation "Italy, France, and Spain are in Europe. Morocco is in Africa."
    * saved and bookmarked as "Europe"

  Scenario: Question feedback is displayed after answering
    When I take question "Europe"
    And I answer "Italy"
    Then I see the question explanation

  Scenario: Individual explanation per answer is displayed after answering
    When I take question "Europe"
    And I answer "France, Morocco, Spain"
    Then I see individual explanations per answer:
      | answer  | explanation                                                                 |
      | Italy   | Located on the Apennine Peninsula, which is part of the European continent. |
      | France  | One of the founders of the European Union.                                  |
      | Morocco | This country is in Africa, not in Europe.                                   |
      | Spain   | Located on the Iberian Peninsula, which is part of the European continent.  |
      | Canada  | Located in America.                                                         |

