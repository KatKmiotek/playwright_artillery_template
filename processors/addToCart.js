async function addToCart(page, context) {
  await page.goto(context.vars.target);
  // Click a:has-text("Samsung galaxy s6")
  await page.locator('a:has-text("Samsung galaxy s6")').click();
  // Click text=Add to cart
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('text=Add to cart').click();
  // Click #cartur
  await page.locator('#cartur').click();
}
module.exports = { addToCart };
