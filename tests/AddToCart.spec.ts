/**
 * Test Case: Add Product to Cart
 *
 * Tags: @master @regression
 *
 * Steps:
 * 1. Navigate to application URL
 * 2. Enter an existing product name in the search box
 * 3. Perform search
 * 4. Verify the product appears in the search results
 * 5. Select the product
 * 6. Set quantity
 * 7. Add the product to the cart
 * 8. Verify the success message
 */

import { test, expect } from '@playwright/test';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';

// Shared instances
let config: TestConfig;
let homePage: HomePage;
let searchResultsPage: SearchResultsPage;
let productPage: ProductPage;

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl);

  homePage = new HomePage(page);
  searchResultsPage = new SearchResultsPage(page);
  productPage = new ProductPage(page);
});

test('Add product to cart test @master @regression', async () => {
  const productName = config.productName;

  // Search for the product
  await homePage.searchProduct(productName);

  // Verify search results page is displayed
  expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();

  // Verify the product exists in search results
  expect(await searchResultsPage.isProductExists(productName)).toBeTruthy();

  // Select product and navigate to product page
  productPage = await searchResultsPage.selectProduct(productName);

  // Set quantity
  await productPage.setQuantity(config.productQuantity);

  // Add product to cart
  await productPage.addToCart();

  // Verify success confirmation message
  expect(await productPage.isConfirmationMessageVisible()).toBeTruthy();
});