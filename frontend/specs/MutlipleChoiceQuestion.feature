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

  Scenario Outline: Individual feedback color per answer is displayed after answering
    When I take question "Europe"
    And I answer "<answer>"
    Then I see individual color feedback per answer:
      | answer  | color           |
      | Italy   | <italy_color>   |
      | France  | <france_color>  |
      | Morocco | <morocco_color> |
      | Spain   | <spain_color>   |
      | Canada  | <canada_color>  |
    Examples:
      | answer                        | italy_color | france_color  | morocco_color | spain_color | canada_color |
      | Italy, France, Spain          | GREEN       | GREEN         | NONE          | GREEN       | NONE         |
      | Italy, France                 | GREEN       | GREEN         | NONE          | RED         | NONE         |
      | Italy, France, Morocco        | GREEN       | GREEN         | RED           | RED         | NONE         |
      | Italy, Morocco                | GREEN       | RED           | RED           | RED         | NONE         |
      | France, Spain                 | RED         | GREEN         | NONE          | GREEN       | NONE         |
      | Morocco                       | RED         | RED           | RED           | RED         | NONE         |
      | Italy, France, Morocco, Spain | GREEN       | GREEN         | RED           | GREEN       | NONE         |
      | Italy, Spain                  | GREEN       | RED           | NONE          | GREEN       | NONE         |
      | France                        | RED         | GREEN         | NONE          | RED         | NONE         |

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

