import BasePage from './Base.page.js';
import { By } from 'selenium-webdriver';
import InventoryPage from './Inventory.page.js';

class LoginPage extends BasePage {

    get userNameField() {
        return driver.findElement(By.id('user-name'));
    }

    get passwordField() {
        return driver.findElement(By.id('password'));
    }

    get loginButton() {
        return driver.findElement(By.id('login-button'));
    }

    get error() {
        return driver.findElement(By.xpath('//*[@data-test="error"]'));
    }

    get errorButton() {
        return driver.findElement(By.xpath('//*[@data-test="error-button"]'));
    }

    async isErrorDisplayed() {
        const errorMessages = await driver.findElements(By.xpath('//*[@data-test="error"]'));
        return errorMessages.length >= 1;
    }

    async setUserName(userName) {
        await this.userNameField.clear();
        await this.userNameField.sendKeys(userName);
    }

    async setPassword(password) {
        await this.passwordField.clear();
        await this.passwordField.sendKeys(password);
    }

    async login(userName, password) {
        await this.setUserName(userName);
        await this.setPassword(password);
        await this.loginButton.click();
    }

}

export default new LoginPage();