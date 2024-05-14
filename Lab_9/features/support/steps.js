import { Given, When, Then, Before, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import data from '../../src/data.json' assert { type: "json" };
import BasePage from '../../src/pageObjects/Base.page.js';
import LoginPage from '../../src/pageObjects/Login.page.js';
import InventoryPage from '../../src/pageObjects/Inventory.page.js';
import CartPage from '../../src/pageObjects/Cart.page.js';

BeforeAll(async () => {
    driver = new Builder().forBrowser('chrome', '114')
      .build();
});

AfterAll(async () => {
    await driver.quit();
});

Before(async () => {
    await driver.manage().deleteAllCookies();
    await new BasePage(driver).openURL(`https://www.saucedemo.com/`);
});

Given(/^I on Login page$/, async () => {
    expect(await driver.getCurrentUrl()).to.eq(`https://www.saucedemo.com/`);
});

When(/^I enter "([^"]*)" username and "([^"]*)" password$/, async (correctUsername, correctPassword) => {
    if (correctUsername === "correct") {
        await LoginPage.setUserName(data.user);
    } else {
        await LoginPage.setUserName(data.wrong_user);
    }
    if (correctPassword === "correct") {
        await LoginPage.setPassword(data.password);
    } else {
        await LoginPage.setPassword(data.wrong_password);
    }
});

When(/^I click login button$/, async () => {
    await LoginPage.loginButton.click();
});

Then(/^I should be redirected to Inventory page$/, async () => {
    await InventoryPage.waitPageToLoad(5000);
    expect(await InventoryPage.title.getText()).to.eq('Products');
});

Then(/^I validate and close error$/, async () => {
    expect(await LoginPage.error.getText()).to.contain(data.error_message);
    expect(await LoginPage.isErrorDisplayed()).to.be.false;
    await LoginPage.errorButton.click();
});

Then(/^I clear cart$/, async () => {
    await InventoryPage.clearCart();
});

When(/^I add "([^"]*)" item to cart$/, async (itemName) => {
    await InventoryPage.addToCart(itemName);
});

When(/^I open cart$/, async () => {
    await InventoryPage.openCart();
});

Then(/^I should( not)* see "([^"]*)" item in cart$/, async (condition, itemName) => {
    if (condition) {
        expect(await CartPage.isItemInCart(itemName)).to.be.false;
    } else {
        const items = await CartPage.items;
        expect(await items[0].getText()).to.eq(itemName);
    }
});

When(/^I remove "([^"]*)" item from cart$/, async (itemName) => {
    await CartPage.removeFromCart(itemName);
});
