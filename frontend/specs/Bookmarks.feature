@only
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
