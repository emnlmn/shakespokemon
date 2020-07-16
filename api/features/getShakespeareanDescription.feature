Feature: given a Pokemon name, returns its shakespearean description
  As a Pokemon fan
  I want to read the description of a pokemon written using Shakespearean style

  Scenario: retrieve shakespearean description for an existing pokemon
    Given this Pokemon
      | name                      | charizard                                  |
      | description               | A pokemon that can fly and throw flames    |
      | shakespearean description | A pokemon yond can fly and throweth flames |
    When client request the description for the Pokemon "charizard"
    Then it should receive
      | name      | description                                |
      | charizard | A pokemon yond can fly and throweth flames |
