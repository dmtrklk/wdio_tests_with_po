const { app } = require('../pages/Application');

describe('Inventory items sorting tests', () => {
    before(async () => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');
    });

    it('Name (A to Z) inventory items sorting test', async () => {
        await app.inventory.selectSortingOption('az');

        const names = await app.inventory.getProductNames();
        const sortedNames = [...names].sort();

        expect(names).toEqual(sortedNames);
    });

    it('Name (Z to A) inventory items sorting test', async () => {
        await app.inventory.selectSortingOption('za');

        const names = await app.inventory.getProductNames();
        const sortedNames = [...names].sort((a, b) => b.localeCompare(a));

        expect(names).toEqual(sortedNames);
    });

    it('Price (low to high) inventory items sorting test', async () => {
        await app.inventory.selectSortingOption('lohi');

        const prices = await app.inventory.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);

        expect(prices).toEqual(sortedPrices);
    });

    it('Price (high to low) inventory items sorting test', async () => {
        await app.inventory.selectSortingOption('hilo');

        const prices = await app.inventory.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => b - a);

        expect(prices).toEqual(sortedPrices);
    });
});
