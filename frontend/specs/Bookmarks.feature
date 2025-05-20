@skip
Feature: Bookmark questions during a quiz
  # Bookmarky se drží výhradně v sessionStorage – bez databáze a bez nového API.
  Background:
    Given questions
      | Bookmark  | Question                                              | Answers                                           |
      | Planet    | Which planet is known as the Red Planet?              | Mars (*), Venus, Jupiter, Mercury                 |
      | Australia | What's the capital city of Australia?                 | Sydney, Canberra (*), Melbourne, Brisbane         |
      | Fruit     | Which fruit is known for having seeds on the outside? | Strawberry (*), Blueberry, Apple, Banana          |
      | River     | Which river is the longest in the world?              | Nile (*), Amazon, Yangtze, Mississippi            |
      | Country   | Which country has the maple leaf on its flag?         | Canada (*), USA, UK, Australia                    |
      | Flower    | Which flower is traditionally given on Valentine's?   | Rose (*), Tulip, Daisy, Lily                      |
      | Mountain  | What is the highest mountain on Earth?                | Everest (*), K2, Makalu, Lhotse                   |
      | Ocean     | Which ocean is the deepest?                           | Pacific (*), Atlantic, Indian, Arctic             |
      | Animal    | Which mammal lays eggs?                               | Platypus (*), Kangaroo, Koala, Echidna            |
      | City      | In which city is the Eiffel Tower located?            | Paris (*), Lyon, Marseille, Nice                  |
      | Galaxy    | Which galaxy contains our Solar System?               | Milky Way (*), Andromeda, Triangulum, Whirlpool   |


    # And a quiz "b" with questions
    #   "Planet", "Australia", "Fruit", "River", "Country",
    #   "Flower", "Mountain", "Ocean", "Animal", "City", "Galaxy"

  ########################################################################
  # SCÉNÁŘE PSANÉ “SCENARIO BY EXAMPLE” – KAŽDÝ POPISUJE JEDEN KONKRÉTNÍ
  # PŘÍBĚH S REÁLNÝMI HODNOTAMI, ŽÁDNÉ PLACEHOLDERY ANI SMYČKY.
  ########################################################################

  Scenario: Add first bookmark
    - Uživatel si může uložit otázku kliknutím na hvězdičku
    - Počet záložek se zvýší na 1

    When I start quiz "b"
    Then I see question "Planet"

    When I bookmark question "Planet"
    Then the bookmark indicator is active for question "Planet"
    And the bookmark list contains
      | Planet |
    And the bookmark list shows 1 item

  Scenario: Remove an existing bookmark
    - Opětovné kliknutí hvězdičku zruší
    - Seznam záložek se vyprázdní

    When I start quiz "b"
    Then I see question "Australia"

    When I bookmark question "Australia"
    Then the bookmark list contains
      | Australia |

    When I bookmark question "Australia" again
    Then the bookmark indicator is inactive for question "Australia"
    And the bookmark list is empty

  Scenario: Bookmark survives a page refresh
    - Stav hvězdičky se znovu načte z sessionStorage

    When I start quiz "b"
    Then I see question "Fruit"

    When I bookmark question "Fruit"
    And I refresh the page
    Then the bookmark indicator is active for question "Fruit"
    And the bookmark list contains
      | Fruit |

  Scenario: Bookmarks are cleared in a brand-new session
    - Dokončení kvízu znamená smazání všech záložek

    When I start quiz "b"
    Then I see question "River"

    When I bookmark question "River"
    Then the bookmark list contains
      | River |

    When I finish the quiz
    And I start quiz "b" again
    Then no question is bookmarked
    And the bookmark list is empty
