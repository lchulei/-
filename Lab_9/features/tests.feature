Feature: SauceDemo tests

    Scenario: [TC-1] User should be able to login with correct credentials
        Given I on Login page
        When  I enter "correct" username and "correct" password
        And   I click login button
        Then  I should be redirected to Inventory page

    Scenario: [TC-2] User should see error messages when input incorrect data
        Given I on Login page
        When  I enter "incorrect" username and "incorrect" password
        And   I click login button
        Then  I validate and close error
        When  I enter "incorrect" username and "correct" password
        And   I click login button
        Then  I validate and close error
        When  I enter "correct" username and "incorrect" password
        And   I click login button
        Then  I validate and close error
    
    Scenario: [TC-3] User should be able to add item to cart
        Given I on Login page
        When  I enter "correct" username and "correct" password
        And   I click login button
        Then  I should be redirected to Inventory page
        And   I clear cart
        When  I add "Sauce Labs Backpack" item to cart
        And   I open cart
        Then  I should see "Sauce Labs Backpack" item in cart

    Scenario: [TC-4] User should be able to delete item to cart
        Given I on Login page
        When  I enter "correct" username and "correct" password
        And   I click login button
        Then  I should be redirected to Inventory page
        And   I clear cart
        When  I add "Sauce Labs Backpack" item to cart
        And   I open cart
        Then  I should see "Sauce Labs Backpack" item in cart
        When  I remove "Sauce Labs Backpack" item from cart
        Then  I should not see "Sauce Labs Backpack" item in cart
