Feature: Bookmark questions during a quiz

  Background:
    Given questions
      | Bookmark  | Question                                              | Answers                   |
      | Planet    | Which planet is known as the Red Planet?              | Mars (*), Venus           |
      | Australia | What's the capital city of Australia?                 | Sydney, Canberra (*)      |

  Scenario: Mark bookmark and return to bookmark
    - Testuju bookmarky v rámci jednoho kvízu, po zabookmarkovani otayky se vratim klikem na bookmark na otazku, kterou jsem si bookmarokoval

    When I start quiz "d"
    Then I see question "Planet"

    When I bookmark question "Planet"
    Then I see bookmarked question "Planet"
    Then I see bookmark link "Planet"

    When I click the skip button
    Then I see bookmark link "Planet"

    When I click bookmark "Planet"
    Then I see question "Planet"

  Scenario: Remove bookmark
    - Testuju odstranění bookmarku v rámci jednoho kvízu, po odstranění se mi otázka nezobrazí v bookmarku

    When I start quiz "d"
    Then I see question "Planet"

    When I bookmark question "Planet"
    Then I see bookmarked question "Planet"
    Then I see bookmark link "Planet"

    When I delete bookmark "Which planet is known as the Red Planet?"
    Then I don't see bookmark link "Which planet is known as the Red Planet?"

  @only
  Scenario: Unmark bookmark
    - Testuju odznačení bookmarku v rámci jednoho kvízu, po odznačení se mi otázka nezobrazí v bookmarku

    When I start quiz "d"
    Then I see question "Planet"

    When I bookmark question "Planet"
    Then I see bookmarked question "Planet"
    Then I see bookmark link "Planet"

    When I bookmark question "Planet"
    Then I don't see bookmark link "Planet"
