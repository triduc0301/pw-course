import { expect, test } from '@playwright/test';
import { ProductCart } from '../page/product-cart';

test("Add to cart", async ({ page }) => {
    let productCart = new ProductCart(page);
    let dataCheck = [
        { name: "Product 1", price: "$10.00", quantity: "2", total: "$20.00" },
        { name: "Product 2", price: "$20.00", quantity: "3", total: "$60.00" },
        { name: "Product 3", price: "$30.00", quantity: "1", total: "$30.00" },
    ];

    await test.step("Go to Product Page", async () => {
        await productCart.gotoProductCart();
    })

    await test.step("Click add product to cart", async () => {
        await productCart.clickAddProduct();
    })

    await test.step("Check data", async () => {
        const dataFromTable = await productCart.getDataTable();

        for (let i = 0; i < dataFromTable.length; i++) {
            expect(dataFromTable[i].name).toBe(dataCheck[i].name);
            expect(dataFromTable[i].price).toBe(dataCheck[i].price);
            expect(dataFromTable[i].quantity).toBe(dataCheck[i].quantity);
            expect(dataFromTable[i].total).toBe(dataCheck[i].total);
        }
    })

    await test.step("Check Total Money", async () => {
        expect(await productCart.checkTotalMoney()).toBeTruthy();
    })

})