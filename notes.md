# Pizza Delivery App

## Purpose/ Goal

    - To display the product
    - To order a product
    - To make a payment
    - To track the order

## Operational Requirement

We are selling three items:

1. Toppings
2. Pizza
3. Beverages

User experience

- End user must be able to see type of pizza available, toppings, and beverages.
- End user should be able to add a product to cart, add toppings, and beverages seperately.
- End user must login to checkout and make order before order is confirmed.
- User login with OathO - save necessary user data.
- Go to checkout and make payment
- User profile must consist user information
- Display current and past orders in user profile.

## Database Requirement

Product Data

1.  Item_Id - BIGSERIAL PRIRMARY KEY
2.  Item_name - VARCHAR(100)
3.  Item_img - VARCHAR

        - https://stackoverflow.com/questions/52096229/which-is-the-best-practice-either-to-save-image-name-or-full-url-in-database

4.  Item_price

User Data

1.  id BIGSERIAL NOT NULL PRIMARY KEY,
2.  first_name VARCHAR(50) NOT NULL,
3.  last_name VARCHAR(50) NOT NULL,
4.  gender VARCHAR(7) NOT NULL,
5.  date_of_birth DATE NOT NULL,
6.  address_one VARCHAR(100) NOT NULL,
7.  address_two VARCHAR(150),
8.  city VARCHAR(50) NOT NULL,
9.  state VARCHAR (50) NOT NULL,
10. pin_code VARCHAR(6) NOT NULL,
11. email VARCHAR(150) NOT NULL UNIQUE,

        - check the correct way of storing valid email

12. password

        - check how to encrypt password before saving it into database

13. created_at timestamptz NOT NULL DEFAULT NOW()
14. PastOrders
    a. order_date
    b. order_id
    c. order_name
    d. order_img
    e. order_price
    f. order_quantity
    g. paid_for_the_order

## Functional Frontend Requirements

Layout Size

    - Desktop 1440px
    - Mobile 375px

Prefers color scheme media

    - https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme

Accessibility

    - use correct heading tags
    - Screen-reader-only text - https://stevefaulkner.github.io/HTML5accessibility/
    - role (<header role=”banner”></header>)
    - https://www.clarissapeterson.com/2012/11/html5-accessibility/
    - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques

credits: Icon by icon king1(https://freeicons.io/profile/3) on freeicons.io(https://freeicons.io/)
