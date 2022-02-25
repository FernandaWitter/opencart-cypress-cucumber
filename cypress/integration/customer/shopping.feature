Feature: Client purchases
    Validates client purchasing flows

Scenario: Client adds item to cart and proceeds to checkout
    Given Client is on home page
    When An item is added to cart
    Then Client can proceed to checkout
    But All items are out of stock

Scenario: Client adds multiple items to cart and proceeds to checkout
    Given Client is on home page
    When 'MacBook, iPhone, iPod Nano' are added to cart
    Then Client can proceed to checkout
    But All items are out of stock

@skip
Scenario Outline: Client removes <item> from loaded cart and proceeds to checkout
    Given Client is on home page
    And Cart is loaded
    When <item> is removed
    Then <item> is not on cart
    But All items are out of stock

    Examples:
        | item |
        | 'MacBook' |
        | 'iPhone' |
        | 'iPod Nano' |