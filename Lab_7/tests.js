import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import data from './data.json' assert { type: "json" };;

describe('SauceDemo tests', () => {
    let driver;
    before(async () => {
      driver = new Builder().forBrowser('chrome', '114')
      .build();

    }, 30000);

    beforeEach(async () => {
        await driver.manage().deleteAllCookies();
        await driver.get(`https://www.saucedemo.com/`);
    }, 10000);
  
    after(async () => {
      await driver.quit();
    }, 40000);

    const login = async (userName, password) => {
        await driver.findElement(By.id('user-name')).sendKeys(userName);
        await driver.findElement(By.id('password')).sendKeys(password);
        await driver.findElement(By.id('login-button')).click();
    }

    const clearCart = async () => {
        if ((await driver.findElements(By.xpath('//*[@data-test="shopping-cart-badge"]'))).length != 0) {
            await driver.findElement(By.xpath('//*[@data-test="shopping-cart-link"]')).click();
            let removeButtons = await driver.findElements(By.xpath('//button[text()="Remove"]'));
            while (removeButtons.length != 0) {
                await removeButtons[0].click();
                removeButtons = await driver.findElements(By.xpath('//button[text()="Remove"]'));
            }
            await driver.findElement(By.id('continue-shopping')).click();
        }
    }
  
    it('[TC-1] User should be able to login with correct credentials', async () => {
        await login(data.user, data.password);
        await driver.wait(until.elementLocated(By.xpath('//*[@data-test="title"]')), 2000);

        const title = await driver.findElement(By.xpath('//*[@data-test="title"]')).getText();
        expect(title).to.eq('Products');
    }, 35000);

    it('[TC-2] User should see error messages when input incorrect data', async () => {
        const validateAndCloseError = async () => {
            const error = await driver.findElement(By.xpath('//*[@data-test="error"]'));
            expect(await error.getText()).to.contain(data.error_message);
            await driver.findElement(By.xpath('//*[@data-test="error-button"]')).click();
            expect(await driver.findElements(By.xpath('//*[@data-test="error"]'))).to.have.length(0);
        }
        await login(data.wrong_user, data.wrong_password);
        await validateAndCloseError();

        await login(data.wrong_user, data.password);
        await validateAndCloseError();

        await login(data.user, data.wrong_password);
        await validateAndCloseError();
    });

    it('[TC-3] User should be able to add item to cart', async () => {
        await login(data.user, data.password);
        await driver.wait(until.elementLocated(By.xpath('//*[@data-test="title"]')), 2000);
        await clearCart();

        await driver.findElement(By.id('add-to-cart-sauce-labs-backpack')).click();
        await driver.findElement(By.xpath('//*[@data-test="shopping-cart-link"]')).click();
        const item = await driver.findElement(By.xpath('//*[@data-test="inventory-item-name"]'));
        expect(await item.getText()).to.eq(data.item_name);
    });

    it('[TC-4] User should be able to delete item to cart', async () => {
        await login(data.user, data.password);
        await driver.wait(until.elementLocated(By.xpath('//*[@data-test="title"]')), 2000);
        await clearCart();

        await driver.findElement(By.id('add-to-cart-sauce-labs-backpack')).click();
        await driver.findElement(By.xpath('//*[@data-test="shopping-cart-link"]')).click();
        const item = await driver.findElement(By.xpath('//*[@data-test="inventory-item-name"]'));
        expect(await item.getText()).to.eq(data.item_name);
        
        await driver.findElement(By.id('remove-sauce-labs-backpack')).click();
        expect(await driver.findElements(By.id('remove-sauce-labs-backpack'))).to.have.length(0);
    });
  });