import { Page, Locator } from '@playwright/test';
import { ProductPage } from './ProductPage'; // Import ProductPage to navigate after selecting a product

export class SearchResultsPage {

    // Playwright Page object used to interact with the browser
    private readonly page: Page;

    // Locator for the header on the search results page (e.g., "Search - MacBook")
    private readonly searchPageHeader: Locator;

    // Locator for product links inside the search results grid
    private readonly searchProducts: Locator;

    /**
     * Constructor initializes the page and element locators
     * @param page - Playwright Page instance passed from the test
     */
    constructor(page: Page) {
        this.page = page;

        // Header element located within the main page content
        this.searchPageHeader = page.locator('#content h1');

        // Product title links inside product cards
        this.searchProducts = page.locator('#content .product-thumb h4 a');
    }

    /**
     * Verify the Search Results page is displayed
     * by checking the header text (usually "Search - <product>")
     * 
     * @returns Promise<boolean> true if the search results page exists
     */
    async isSearchResultsPageExists(): Promise<boolean> {
        try {
            // Wait until the header becomes visible
            await this.searchPageHeader.waitFor({ state: 'visible' });

            // Read header text
            const headerText = await this.searchPageHeader.textContent();

            // Check that the header contains the word "Search"
            return headerText?.includes('Search') ?? false;

        } catch {
            // If anything fails, return false
            return false;
        }
    }

    /**
     * Check whether a specific product appears in the search results
     * 
     * @param productName - Name of the product to search for
     * @returns Promise<boolean> true if the product exists in results
     */
    async isProductExists(productName: string): Promise<boolean> {

        // Count how many products appear in the search results
        const count = await this.searchProducts.count();

        // Iterate through each product
        for (let i = 0; i < count; i++) {

            // Get the i-th product locator
            const product = this.searchProducts.nth(i);

            // Read product title text and remove whitespace
            const title = (await product.textContent())?.trim();

            // Compare with expected product name
            if (title === productName) {
                return true;
            }
        }

        // Return false if product was not found
        return false;
    }

    /**
     * Select a product from the search results
     * 
     * @param productName - Name of the product to click
     * @returns Promise<ProductPage> instance of ProductPage after navigation
     */
    async selectProduct(productName: string): Promise<ProductPage> {

        // Count number of products in results
        const count = await this.searchProducts.count();

        // Iterate through product titles
        for (let i = 0; i < count; i++) {

            const product = this.searchProducts.nth(i);

            // Get product title text
            const title = (await product.textContent())?.trim();

            // If the product matches the expected name
            if (title === productName) {

                // Click the product link
                await product.click();

                // Return ProductPage object for further actions
                return new ProductPage(this.page);
            }
        }

        // If the product is not found, throw an error (test should fail)
        throw new Error(`Product not found: ${productName}`);
    }

    /**
     * Get total number of products returned in search results
     * 
     * @returns Promise<number> count of products
     */
    async getProductCount(): Promise<number> {
        return await this.searchProducts.count();
    }
}