import BasePage from './Base.page.js';
import { By, until } from 'selenium-webdriver';

class CartPage extends BasePage {

    get title() {
        return driver.findElement(By.xpath('//*[@data-test="title"]'));
    }

    get items() {
        return driver.findElements(By.xpath('//*[@data-test="inventory-item-name"]'));
    }

    get removeSauceLabsBackpack() {
        return driver.findElement(By.id('remove-sauce-labs-backpack'));
    }

    get removeSauceLabsBikeLight() {
        return driver.findElement(By.id('remove-sauce-labs-bike-light'));
    }

    get removeSauceLabsBoltTShirt() {
        return driver.findElement(By.id('remove-sauce-labs-bolt-t-shirt'));
    }

    get removeSauceLabsFleeceJacket() {
        return driver.findElement(By.id('remove-sauce-labs-fleece-jacket'));
    }

    get removeSauceLabsOnesie() {
        return driver.findElement(By.id('remove-sauce-labs-onesie'));
    }

    get removeTestAllTheThingsTShirtRed() {
        return driver.findElement(By.id('remove-test.allthethings()-t-shirt-(red)'));
    }
    
    async isItemInCart(itemName) {
        return (await driver.findElements(By.xpath(`//*[@data-test="inventory-item-name" and text()="${itemName}"]`))).length != 0;
    }
}

export default new CartPage();