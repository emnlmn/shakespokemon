Feature: given a Pokemon name, returns its shakespearean description
  As a Pokemon fan
  I want to read the description of a pokemon written using Shakespearean style

  Scenario: retrieve shakespearean description for an existing pokemon
    Given this Pokemon
      | name      | description                             | shakespearean description                  |
      | charizard | A pokemon that can fly and throw flames | A pokemon yond can fly and throweth flames |
      | blastoise | A big tortoise that sprinkle water      | A big tortoise yond sprinkle water         |
    When client request the description for the Pokemon "charizard"
    Then it should receive
      | name      | description                                                  |
      | charizard | the description "A pokemon yond can fly and throweth flames" |
