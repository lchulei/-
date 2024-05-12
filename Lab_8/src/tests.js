import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import data from './data.json' assert { type: "json" };
import BasePage from './pageObjects/Base.page.js';
import LoginPage from './pageObjects/Login.page.js';
import InventoryPage from './pageObjects/Inventory.page.js';
import CartPage from './pageObjects/Cart.page.js';

describe('SauceDemo tests', () => {
    let driver;
    before(async () => {
      driver = new Builder().forBrowser('chrome', '114')
      .build();

    }, 30000);

    beforeEach(async () => {
        await driver.manage().deleteAllCookies();
        await new BasePage(driver).openURL(`https://www.saucedemo.com/`);
    }, 10000);
  
    after(async () => {
      await driver.quit();
    }, 40000);
  
    it('[TC-1] User should be able to login with correct credentials', async () => {
        await LoginPage.setUserName(data.user);
        await LoginPage.setPassword(data.password);
        await LoginPage.loginButton.click();

        await InventoryPage.waitPageToLoad(5000);

        expect(await InventoryPage.title.getText()).to.eq('Products');
    });

    it('[TC-2] User should see error messages when input incorrect data', async () => {
        await LoginPage.setUserName(data.wrong_user);
        await LoginPage.setPassword(data.wrong_password);
        await LoginPage.loginButton.click();
        expect(await LoginPage.error.getText()).to.contain(data.error_message);
        await LoginPage.errorButton.click();
        expect(await LoginPage.isErrorDisplayed()).to.be.false;

        await LoginPage.setUserName(data.wrong_user);
        await LoginPage.setPassword(data.password);
        await LoginPage.loginButton.click();
        expect(await LoginPage.error.getText()).to.contain(data.error_message);
        await LoginPage.errorButton.click();
        expect(await LoginPage.isErrorDisplayed()).to.be.false;

        await LoginPage.setUserName(data.user);
        await LoginPage.setPassword(data.wrong_password);
        await LoginPage.loginButton.click();
        expect(await LoginPage.error.getText()).to.contain(data.error_message);
        await LoginPage.errorButton.click();
        expect(await LoginPage.isErrorDisplayed()).to.be.false;
    });

    it('[TC-3] User should be able to add item to cart', async () => {
        await LoginPage.login(data.user, data.password);
        await InventoryPage.clearCart();

        await InventoryPage.addToCart(data.item_name);
        await InventoryPage.openCart();
        const items = await CartPage.items;
        expect(await items[0].getText()).to.eq(data.item_name);
    });

    it('[TC-4] User should be able to delete item to cart', async () => {
        await LoginPage.login(data.user, data.password);
        await InventoryPage.clearCart();

        await InventoryPage.addToCart(data.item_name);
        await InventoryPage.openCart();
        const items = await CartPage.items;
        expect(await items[0].getText()).to.eq(data.item_name);
        
        await CartPage.removeSauceLabsBackpack.click();
        expect(await CartPage.isItemInCart(data.item_name)).to.be.false;
    });
  });