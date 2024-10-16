const { parse } = require('path');
const { BaseSwagLabPage } = require('./BaseSwagLab.page');

class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() {
        return $('.title');
    }

    get inventoryItems() {
        return $$('.inventory_item');
    }

    get addItemToCartButton() {
        return $$('[id^="add-to-cart"]');
    }

    get sortingDropdown() {
        return $('.product_sort_container');
    }

    async addItemToCartById(id) {
        await this.addItemToCartButton[id].click();
    }

    async selectSortingOption(optionValue) {
        await this.sortingDropdown.selectByAttribute('value', optionValue);
    }

    async getProductPrices() {
        const priceElements = await $$('.inventory_item_price');

        const prices = await priceElements.map(async (el) => {
            const priceText = await el.getText();
            return parseFloat(priceText.replace('$', ''));
        });

        return prices;
    }

    async getProductNames() {
        const nameElements = await $$('.inventory_item_name');

        const names = await nameElements.map((el) => el.getText());

        return names;
    }
}

module.exports = { InventoryPage };
