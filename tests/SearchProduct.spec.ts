/**
 * Test Case: Product Search
 *
 * Tags: @master @regression
 *
 * Steps:
 * 1) Navigate to the application URL
 * 2) Enter the product name in the search field
 * 3) Click the search button
 * 4) Verify that the Search Results page is displayed
 * 5) Verify that the searched product appears in the results
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { TestConfig } from '../test.config';

// Shared test objects
let config: TestConfig;
let homePage: HomePage;
let searchResultsPage: SearchResultsPage;

/**
 * Runs before each test
 * - Loads test configuration
 * - Opens application URL
 * - Initializes page objects
 */
test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl);

  homePage = new HomePage(page);
  searchResultsPage = new SearchResultsPage(page);
});

/**
 * Test: Verify user can search for a product
 */
test('Product search test @master @regression', async () => {
  const productName = config.productName;

  // Search for product
  await homePage.searchProduct(productName);

  // Verify Search Results page is displayed
  expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();

  // Verify searched product appears in results
  const isProductFound = await searchResultsPage.isProductExists(productName);
  expect(isProductFound).toBeTruthy();
});