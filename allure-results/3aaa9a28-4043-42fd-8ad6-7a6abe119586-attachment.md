# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\login-data-driven.spec.ts >> Login data driven #5: Invalid login (failure) @master @regression @datadriven @web
- Location: tests\web\login-data-driven.spec.ts:37:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#top').getByRole('button', { name: 'My Account' })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - button "$ Currency " [ref=e7] [cursor=pointer]:
        - strong [ref=e8]: $
        - text: Currency
        - generic [ref=e9]: 
      - list [ref=e11]:
        - listitem [ref=e12]:
          - link "" [ref=e13] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=information/contact
          - text: "123456789"
        - listitem [ref=e15]:
          - link " My Account" [ref=e16] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=account/account
            - generic [ref=e17]: 
            - text: My Account
        - listitem [ref=e19]:
          - link " Wish List (0)" [ref=e20] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=account/wishlist
            - generic [ref=e21]: 
            - text: Wish List (0)
        - listitem [ref=e22]:
          - link " Shopping Cart" [ref=e23] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=checkout/cart
            - generic [ref=e24]: 
            - text: Shopping Cart
        - listitem [ref=e25]:
          - link " Checkout" [ref=e26] [cursor=pointer]:
            - /url: https://awesomeqa.com/ui/index.php?route=checkout/checkout
            - generic [ref=e27]: 
            - text: Checkout
  - banner [ref=e28]:
    - generic [ref=e30]:
      - link [ref=e33] [cursor=pointer]:
        - /url: https://awesomeqa.com/ui/index.php?route=common/home
        - img "TheTestingAcademy eCommerce" [ref=e34]
      - generic [ref=e36]:
        - textbox "Search" [ref=e37]
        - button "" [ref=e39] [cursor=pointer]
      - button " 0 item(s) - $0.00" [ref=e43] [cursor=pointer]:
        - generic [ref=e44]: 
        - text: 0 item(s) - $0.00
  - navigation [ref=e46]:
    - generic: 
    - list [ref=e48]:
      - listitem [ref=e49]:
        - link "Desktops" [ref=e50] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=20
      - listitem [ref=e51]:
        - link "Laptops & Notebooks" [ref=e52] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=18
      - listitem [ref=e53]:
        - link "Components" [ref=e54] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=25
      - listitem [ref=e55]:
        - link "Tablets" [ref=e56] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=57
      - listitem [ref=e57]:
        - link "Software" [ref=e58] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=17
      - listitem [ref=e59]:
        - link "Phones & PDAs" [ref=e60] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=24
      - listitem [ref=e61]:
        - link "Cameras" [ref=e62] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=33
      - listitem [ref=e63]:
        - link "MP3 Players" [ref=e64] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=34
  - generic [ref=e67]:
    - generic [ref=e68]:
      - generic [ref=e70]:
        - img "MacBookAir" [ref=e72]
        - link [ref=e74] [cursor=pointer]:
          - /url: index.php?route=product/product&path=57&product_id=49
          - img "iPhone 6" [ref=e75]
        - img "MacBookAir" [ref=e77]
        - link [ref=e79] [cursor=pointer]:
          - /url: index.php?route=product/product&path=57&product_id=49
          - img "iPhone 6" [ref=e80]
      - generic [ref=e81]:
        - generic [ref=e82] [cursor=pointer]
        - generic [ref=e83] [cursor=pointer]
      - generic:
        - generic [ref=e84] [cursor=pointer]: 
        - generic [ref=e85] [cursor=pointer]: 
    - heading "Featured" [level=3] [ref=e86]
    - generic [ref=e87]:
      - generic [ref=e89]:
        - link [ref=e91] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=product/product&product_id=43
          - img "MacBook" [ref=e92]
        - generic [ref=e93]:
          - heading [level=4] [ref=e94]:
            - link "MacBook" [ref=e95] [cursor=pointer]:
              - /url: https://awesomeqa.com/ui/index.php?route=product/product&product_id=43
          - paragraph [ref=e96]: Intel Core 2 Duo processor Powered by an Intel Core 2 Duo processor at speeds up to 2.1..
          - paragraph [ref=e97]:
            - text: $602.00
            - generic [ref=e98]: "Ex Tax: $500.00"
        - generic [ref=e99]:
          - button " Add to Cart" [ref=e100] [cursor=pointer]:
            - generic [ref=e101]: 
            - text: Add to Cart
          - button "" [ref=e102] [cursor=pointer]
          - button "" [ref=e104] [cursor=pointer]
      - generic [ref=e107]:
        - link [ref=e109] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=product/product&product_id=40
          - img "iPhone" [ref=e110]
        - generic [ref=e111]:
          - heading [level=4] [ref=e112]:
            - link "iPhone" [ref=e113] [cursor=pointer]:
              - /url: https://awesomeqa.com/ui/index.php?route=product/product&product_id=40
          - paragraph [ref=e114]: iPhone is a revolutionary new mobile phone that allows you to make a call by simply tapping a nam..
          - paragraph [ref=e115]:
            - text: $123.20
            - generic [ref=e116]: "Ex Tax: $101.00"
        - generic [ref=e117]:
          - button " Add to Cart" [ref=e118] [cursor=pointer]:
            - generic [ref=e119]: 
            - text: Add to Cart
          - button "" [ref=e120] [cursor=pointer]
          - button "" [ref=e122] [cursor=pointer]
      - generic [ref=e125]:
        - link [ref=e127] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=product/product&product_id=42
          - img "Apple Cinema 30\"" [ref=e128]
        - generic [ref=e129]:
          - heading [level=4] [ref=e130]:
            - link "Apple Cinema 30\"" [ref=e131] [cursor=pointer]:
              - /url: https://awesomeqa.com/ui/index.php?route=product/product&product_id=42
          - paragraph [ref=e132]: The 30-inch Apple Cinema HD Display delivers an amazing 2560 x 1600 pixel resolution. Designed sp..
          - paragraph [ref=e133]:
            - text: $110.00 $122.00
            - generic [ref=e134]: "Ex Tax: $90.00"
        - generic [ref=e135]:
          - button " Add to Cart" [ref=e136] [cursor=pointer]:
            - generic [ref=e137]: 
            - text: Add to Cart
          - button "" [ref=e138] [cursor=pointer]
          - button "" [ref=e140] [cursor=pointer]
      - generic [ref=e143]:
        - link [ref=e145] [cursor=pointer]:
          - /url: https://awesomeqa.com/ui/index.php?route=product/product&product_id=30
          - img "Canon EOS 5D" [ref=e146]
        - generic [ref=e147]:
          - heading [level=4] [ref=e148]:
            - link "Canon EOS 5D" [ref=e149] [cursor=pointer]:
              - /url: https://awesomeqa.com/ui/index.php?route=product/product&product_id=30
          - paragraph [ref=e150]: Canon's press material for the EOS 5D states that it 'defines (a) new D-SLR category', while we'r..
          - paragraph [ref=e151]:
            - text: $98.00 $122.00
            - generic [ref=e152]: "Ex Tax: $80.00"
        - generic [ref=e153]:
          - button " Add to Cart" [ref=e154] [cursor=pointer]:
            - generic [ref=e155]: 
            - text: Add to Cart
          - button "" [ref=e156] [cursor=pointer]
          - button "" [ref=e158] [cursor=pointer]
    - generic [ref=e160]:
      - generic [ref=e162]:
        - img "NFL" [ref=e164]
        - img "RedBull" [ref=e166]
        - img "Sony" [ref=e168]
        - img "Starbucks" [ref=e170]
        - img "Nintendo" [ref=e172]
        - img "Harley Davidson" [ref=e174]
        - img "Dell" [ref=e176]
        - img "Disney" [ref=e178]
        - img "Coca Cola" [ref=e180]
        - img "Burger King" [ref=e182]
        - img "Canon" [ref=e184]
        - img "NFL" [ref=e186]
        - img "RedBull" [ref=e188]
        - img "Sony" [ref=e190]
        - img "Starbucks" [ref=e192]
        - img "Nintendo" [ref=e194]
        - img "Harley Davidson" [ref=e196]
        - img "Dell" [ref=e198]
        - img "Disney" [ref=e200]
        - img "Coca Cola" [ref=e202]
        - img "Burger King" [ref=e204]
      - generic [ref=e205]:
        - generic [ref=e206] [cursor=pointer]
        - generic [ref=e207] [cursor=pointer]
        - generic [ref=e208] [cursor=pointer]
        - generic [ref=e209] [cursor=pointer]
        - generic [ref=e210] [cursor=pointer]
        - generic [ref=e211] [cursor=pointer]
        - generic [ref=e212] [cursor=pointer]
        - generic [ref=e213] [cursor=pointer]
        - generic [ref=e214] [cursor=pointer]
        - generic [ref=e215] [cursor=pointer]
        - generic [ref=e216] [cursor=pointer]
      - generic:
        - generic [ref=e217] [cursor=pointer]: 
        - generic [ref=e218] [cursor=pointer]: 
  - contentinfo [ref=e219]:
    - generic [ref=e220]:
      - generic [ref=e221]:
        - generic [ref=e222]:
          - heading "Information" [level=5] [ref=e223]
          - list [ref=e224]:
            - listitem [ref=e225]:
              - link "About Us" [ref=e226] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=information/information&information_id=4
            - listitem [ref=e227]:
              - link "Delivery Information" [ref=e228] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=information/information&information_id=6
            - listitem [ref=e229]:
              - link "Privacy Policy" [ref=e230] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=information/information&information_id=3
            - listitem [ref=e231]:
              - link "Terms & Conditions" [ref=e232] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=information/information&information_id=5
        - generic [ref=e233]:
          - heading "Customer Service" [level=5] [ref=e234]
          - list [ref=e235]:
            - listitem [ref=e236]:
              - link "Contact Us" [ref=e237] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=information/contact
            - listitem [ref=e238]:
              - link "Returns" [ref=e239] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=account/return/add
            - listitem [ref=e240]:
              - link "Site Map" [ref=e241] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=information/sitemap
        - generic [ref=e242]:
          - heading "Extras" [level=5] [ref=e243]
          - list [ref=e244]:
            - listitem [ref=e245]:
              - link "Brands" [ref=e246] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=product/manufacturer
            - listitem [ref=e247]:
              - link "Gift Certificates" [ref=e248] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=account/voucher
            - listitem [ref=e249]:
              - link "Affiliate" [ref=e250] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=affiliate/login
            - listitem [ref=e251]:
              - link "Specials" [ref=e252] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=product/special
        - generic [ref=e253]:
          - heading "My Account" [level=5] [ref=e254]
          - list [ref=e255]:
            - listitem [ref=e256]:
              - link "My Account" [ref=e257] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=account/account
            - listitem [ref=e258]:
              - link "Order History" [ref=e259] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=account/order
            - listitem [ref=e260]:
              - link "Wish List" [ref=e261] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=account/wishlist
            - listitem [ref=e262]:
              - link "Newsletter" [ref=e263] [cursor=pointer]:
                - /url: https://awesomeqa.com/ui/index.php?route=account/newsletter
      - separator [ref=e264]
      - paragraph [ref=e265]:
        - text: Powered By
        - link "OpenCart" [ref=e266] [cursor=pointer]:
          - /url: http://www.opencart.com
        - text: TheTestingAcademy eCommerce © 2026
```

# Test source

```ts
  1   | import { Page, Locator, expect } from '@playwright/test';
  2   | import { RegisterPage } from './RegisterPage';
  3   | import { LoginPage } from './LoginPage';
  4   | import { LogoutPage } from './LogoutPage';
  5   | import { SearchResultsPage } from './SearchResultsPage';
  6   | import { CartPage } from './CartPage';
  7   | 
  8   | export class HomePage {
  9   |     private readonly page: Page;
  10  | 
  11  |     // Locators
  12  |     private readonly imgLogo: Locator;
  13  |     private readonly btnMyAccount: Locator;
  14  |     private readonly lnkRegister: Locator;
  15  |     private readonly lnkLogin: Locator;
  16  |     private readonly lnkLogout: Locator;
  17  |     private readonly lnkShoppingCart: Locator;
  18  |     private readonly txtSearch: Locator;
  19  | 
  20  |     constructor(page: Page) {
  21  |         this.page = page;
  22  | 
  23  |         // Initialize locators (header links are scoped to the top navigation bar)
  24  |         const topBar = page.locator('#top');
  25  |         this.imgLogo = page.getByRole('img', { name: 'Your Store' });
  26  |         this.btnMyAccount = topBar.getByRole('button', { name: 'My Account' });
  27  |         this.lnkRegister = topBar.getByRole('link', { name: 'Register' });
  28  |         this.lnkLogin = topBar.getByRole('link', { name: 'Login', exact: true });
  29  |         this.lnkLogout = topBar.getByRole('link', { name: 'Logout' });
  30  |         this.lnkShoppingCart = topBar.getByRole('link', { name: 'Shopping Cart' });
  31  |         this.txtSearch = page.getByRole('textbox', { name: 'Search' });
  32  |     }
  33  | 
  34  |     /**
  35  |      * Verifies the home page is displayed
  36  |      * @returns Promise<boolean> - true if the store logo and the URL of the home route are present
  37  |      */
  38  |     async isHomePageExists(): Promise<boolean> {
  39  |         try {
  40  |             await expect(this.imgLogo).toBeVisible();
  41  |             await expect(this.page).toHaveURL(/route=common\/home|\/opencart\/?$/);
  42  |             return true;
  43  |         } catch (error) {
  44  |             console.log(`Error checking home page: ${error}`);
  45  |             return false;
  46  |         }
  47  |     }
  48  | 
  49  |     /**
  50  |      * Opens the My Account drop-down in the header
  51  |      */
  52  |     async clickMyAccount(): Promise<void> {
> 53  |         await this.btnMyAccount.click();
      |                                 ^ Error: locator.click: Test timeout of 30000ms exceeded.
  54  |     }
  55  | 
  56  |     /**
  57  |      * Clicks the Register option of the My Account drop-down
  58  |      * @returns Promise<RegisterPage> - Instance of the registration page
  59  |      */
  60  |     async clickRegister(): Promise<RegisterPage> {
  61  |         await this.lnkRegister.click();
  62  |         return new RegisterPage(this.page);
  63  |     }
  64  | 
  65  |     /**
  66  |      * Clicks the Login option of the My Account drop-down
  67  |      * @returns Promise<LoginPage> - Instance of the login page
  68  |      */
  69  |     async clickLogin(): Promise<LoginPage> {
  70  |         await this.lnkLogin.click();
  71  |         return new LoginPage(this.page);
  72  |     }
  73  | 
  74  |     /**
  75  |      * Clicks the Logout option of the My Account drop-down
  76  |      * @returns Promise<LogoutPage> - Instance of the logout confirmation page
  77  |      */
  78  |     async clickLogout(): Promise<LogoutPage> {
  79  |         await this.lnkLogout.click();
  80  |         return new LogoutPage(this.page);
  81  |     }
  82  | 
  83  |     /**
  84  |      * Checks whether the Logout option is available in the opened My Account drop-down
  85  |      * @returns Promise<boolean> - true for an authenticated customer
  86  |      */
  87  |     async isLogoutOptionAvailable(): Promise<boolean> {
  88  |         return await this.lnkLogout.isVisible();
  89  |     }
  90  | 
  91  |     /**
  92  |      * Checks whether the Login option is available in the opened My Account drop-down
  93  |      * @returns Promise<boolean> - true for a guest customer
  94  |      */
  95  |     async isLoginOptionAvailable(): Promise<boolean> {
  96  |         return await this.lnkLogin.isVisible();
  97  |     }
  98  | 
  99  |     /**
  100 |      * Searches for a product using the main search field
  101 |      * @param productName - Product name to search for
  102 |      * @returns Promise<SearchResultsPage> - Instance of the search results page
  103 |      */
  104 |     async searchProduct(productName: string): Promise<SearchResultsPage> {
  105 |         try {
  106 |             await this.txtSearch.fill(productName);
  107 |             await this.txtSearch.press('Enter');
  108 |             return new SearchResultsPage(this.page);
  109 |         } catch (error) {
  110 |             console.log(`Error searching for product: ${error}`);
  111 |             throw error;
  112 |         }
  113 |     }
  114 | 
  115 |     /**
  116 |      * Opens the shopping cart from the header
  117 |      * @returns Promise<CartPage> - Instance of the shopping cart page
  118 |      */
  119 |     async clickShoppingCart(): Promise<CartPage> {
  120 |         await this.lnkShoppingCart.click();
  121 |         return new CartPage(this.page);
  122 |     }
  123 | }
  124 | 
```