Feature: Answering a quiz question with multiple choice

  Background:
    Given a question "Which of these countries are in Europe?"
    * with answers:
      | Italy   | * | Located on the Apennine Peninsula, which is part of the European continent. |
      | France  | * | One of the founders of the European Union.                                  |
      | Morocco |   | This country is in Africa, not in Europe.                                   |
      | Spain   | * | Located on the Iberian Peninsula, which is part of the European continent.  |
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
    Examples:
      | answer                        | italy_color | france_color  | morocco_color | spain_color |
      | Italy, France, Spain          | GREEN       | GREEN         | NONE          | GREEN       |
      | Italy, France                 | GREEN       | GREEN         | NONE          | ORANGE      |
      | Italy, France, Morocco        | GREEN       | GREEN         | RED           | ORANGE      |
      | Italy, Morocco                | GREEN       | ORANGE        | RED           | ORANGE      |
      | France, Spain                 | ORANGE      | GREEN         | NONE          | GREEN       |
      | Morocco                       | ORANGE      | ORANGE        | RED           | ORANGE      |
      | Italy, France, Morocco, Spain | GREEN       | GREEN         | RED           | GREEN       |
      | Italy, Spain                  | GREEN       | ORANGE        | NONE          | GREEN       |
      | France                        | ORANGE      | GREEN         | NONE          | ORANGE      |
  @skip
  Scenario: Individual explanation per answer is displayed after answering
    When I take question "Europe"
    And I answer "France, Morocco, Spain"
    Then I see the answer explanations for answers
      | answer  | explanation                                                                 |
      | Italy   | Located on the Apennine Peninsula, which is part of the European continent. |
      | France  | One of the founders of the European Union.                                  |
      | Morocco | This country is in Africa, not in Europe.                                   |
      | Spain   | Located on the Iberian Peninsula, which is part of the European continent.  |
