@skip
Feature: Bookmark questions during a quiz
  # Bookmarky se drží výhradně v sessionStorage – bez databáze a bez nového API.
  Background:
    # Given questions
    #   | Bookmark  | Question                                              | Answers                                           |
    #   | Planet    | Which planet is known as the Red Planet?              | Mars (*), Venus, Jupiter, Mercury                 |
    #   | Australia | What's the capital city of Australia?                 | Sydney, Canberra (*), Melbourne, Brisbane         |
    #   | Fruit     | Which fruit is known for having seeds on the outside? | Strawberry (*), Blueberry, Apple, Banana          |
    #   | River     | Which river is the longest in the world?              | Nile (*), Amazon, Yangtze, Mississippi            |
    #   | Country   | Which country has the maple leaf on its flag?         | Canada (*), USA, UK, Australia                    |
    #   | Flower    | Which flower is traditionally given on Valentine's?   | Rose (*), Tulip, Daisy, Lily                      |
    #   | Mountain  | What is the highest mountain on Earth?                | Everest (*), K2, Makalu, Lhotse                   |
    #   | Ocean     | Which ocean is the deepest?                           | Pacific (*), Atlantic, Indian, Arctic             |
    #   | Animal    | Which mammal lays eggs?                               | Platypus (*), Kangaroo, Koala, Echidna            |
    #   | City      | In which city is the Eiffel Tower located?            | Paris (*), Lyon, Marseille, Nice                  |
    #   | Galaxy    | Which galaxy contains our Solar System?               | Milky Way (*), Andromeda, Triangulum, Whirlpool   |

    # Given bookmarks
    #   | Bookmarks |
    #   | Animal    |

  # And a quiz "D" with questions "Planet", "Australia", "Fruit" with "feedback at the end"
  # And a quiz "E" with questions "Planet", "Australia", "Fruit" with "continuous feedback"

  Scenario: Mark bookmark and return to bookmark
    - Testuju bookmarky v rámci jednoho kvízu, po zabookmarkovani otayky se vratim klikem na bookmark na otazku, kterou jsem si bookmarokoval

    When I start quiz "d"
    Then I see question "Planet"

    When I bookmark question "Planet"
    Then I see bookmarked question "Planet"

    When I skip question
    Then I see question "Australia"
    Then I see bookmarked question "Planet"

    When I click bookmark "Planet"
    Then I see question "Planet"
