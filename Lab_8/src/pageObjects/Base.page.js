import { By } from 'selenium-webdriver';

class BasePage {
    constructor(driver) {
        global.driver = driver;
    }
    
    async openURL(url) {
        await driver.get(url);
    }
    
    async clickById(id) {
        await driver.findElement(By.id(id)).click();
    }

    async closeBrowser() {
        await driver.quit();
    }
}

export default BasePage;