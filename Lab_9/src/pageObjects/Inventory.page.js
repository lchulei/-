import BasePage from './Base.page.js';
import { By, until } from 'selenium-webdriver';

class InventoryPage extends BasePage {

    get addToCartSauceLabsBackpack() {
        return driver.findElement(By.id('add-to-cart-sauce-labs-backpack'));
    }

    get removeSauceLabsBackpack() {
        return driver.findElement(By.id('remove-sauce-labs-backpack'));
    }
    
    get addToCartSauceLabsBikeLight() {
        return driver.findElement(By.id('add-to-cart-sauce-labs-bike-light'));
    }

    get removeSauceLabsBikeLight() {
        return driver.findElement(By.id('remove-sauce-labs-bike-light'));
    }
    
    get addToCartSauceLabsBoltTShirt() {
        return driver.findElement(By.id('add-to-cart-sauce-labs-bolt-t-shirt'));
    }

    get removeSauceLabsBoltTShirt() {
        return driver.findElement(By.id('remove-sauce-labs-bolt-t-shirt'));
    }

    get addToCartSauceLabsFleeceJacket() {
        return driver.findElement(By.id('add-to-cart-sauce-labs-fleece-jacket'));
    }

    get removeSauceLabsFleeceJacket() {
        return driver.findElement(By.id('remove-sauce-labs-fleece-jacket'));
    }

    get addToCartSauceLabsOnesie() {
        return driver.findElement(By.id('add-to-cart-sauce-labs-onesie'));
    }

    get removeSauceLabsOnesie() {
        return driver.findElement(By.id('remove-sauce-labs-onesie'));
    }

    get addToCartTestAllTheThingsTShirtRed() {
        return driver.findElement(By.id('add-to-cart-test.allthethings()-t-shirt-(red)'));
    }

    get removeTestAllTheThingsTShirtRed() {
        return driver.findElement(By.id('remove-test.allthethings()-t-shirt-(red)'));
    }

    get cartLink() {
        return driver.findElement(By.xpath('//*[@data-test="shopping-cart-link"]'));
    }

    get title() {
        return driver.findElement(By.xpath('//*[@data-test="title"]'));
    }

    async waitPageToLoad(timeout) {
        await driver.wait(until.elementLocated(By.xpath('//*[@data-test="title"]')), timeout);
    }

    async isCartEmpty() {
        return (await driver.findElements(By.xpath('//*[@data-test="shopping-cart-badge"]'))).length == 0;
    }

    async addToCart(itemName) {
        switch(itemName) {
            case "Sauce Labs Backpack":
                await this.addToCartSauceLabsBackpack.click();
                break;
            case "Sauce Labs Bike Light":
                await this.addToCartSauceLabsBikeLight.click();
                break;
            case "Sauce Labs Bolt T-Shirt":
                await this.addToCartSauceLabsBoltTShirt.click();
                break;
            case "Sauce Labs Fleece Jacket":
                await this.addToCartSauceLabsFleeceJacket.click();
                break;
            case "Sauce Labs Onesie":
                await this.addToCartSauceLabsOnesie.click();
                break;
            case "Test.allTheThings() T-Shirt (Red)":
                await this.addToCartTestAllTheThingsTShirtRed.click();
                break;
        }
    }

    async removeFromCart(itemName) {
        switch(itemName) {
            case "Sauce Labs Backpack":
                await this.removeSauceLabsBackpack.click();
                break;
            case "Sauce Labs Bike Light":
                await this.removeSauceLabsBikeLight.click();
                break;
            case "Sauce Labs Bolt T-Shirt":
                await this.removeSauceLabsBoltTShirt.click();
                break;
            case "Sauce Labs Fleece Jacket":
                await this.removeSauceLabsFleeceJacket.click();
                break;
            case "Sauce Labs Onesie":
                await this.removeSauceLabsOnesie.click();
                break;
            case "Test.allTheThings() T-Shirt (Red)":
                await this.removeTestAllTheThingsTShirtRed.click();
                break;
        }
    }

    async openCart() {
        await this.cartLink.click();
    }

    async clearCart() {
        if (!(await this.isCartEmpty())) {
            await this.openCart();
            let removeButtons = await driver.findElements(By.xpath('//button[text()="Remove"]'));
            while (removeButtons.length != 0) {
                await removeButtons[0].click();
                removeButtons = await driver.findElements(By.xpath('//button[text()="Remove"]'));
            }
            await driver.findElement(By.id('continue-shopping')).click();
        }
    }

}

export default new InventoryPage();