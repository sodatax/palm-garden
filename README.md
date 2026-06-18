# Palm Garden

## Team PALM:
- Hosea Nacanaynay | GitHub: sodatax
- John Baltazar | GitHub: BushyMustache 
- Pavlo Tkach | GitHub: BROSKIs

## What is Palm Garden?

Palm Garden is an ecommerce platform focused on gardening tools.

## SSR Routes
- `GET /products` — renders the products page with all products loaded server-side via EJS
- `GET /products/:id` — renders a single product page server-side via EJS

## API Endpoints
- `GET /api/products` — returns all products as JSON
- `GET /api/products?price=20` — returns products with price at or above the given value
- `GET /api/products?category=hand tools` — returns products matching the given category
- `GET /api/products?price=20&category=hand tools` — combines both filters
- `GET /api/products/:id` — returns a single product by ID (1–20)

## Filtering
- Filters are applied via query parameters on the `/api/products` endpoint
- `price` filters to products at or above the specified minimum price
- `category` accepts one or more values (e.g. `hand tools, watering equipment`) and is case-insensitive
- Both filters can be combined in a single request

## Authentication Flow
- **Register** — `POST /register` creates a new user account with a hashed password
- **Login** — `POST /login` validates credentials and stores the user in `req.session.user`
- **Logout** — `POST /logout` destroys the session and redirects to home

## Public vs Protected Routes

### Public
- `GET /` — home page
- `GET /login` — login page
- `GET /register` — register page

### Protected (login required)
- `GET /products` — products page (redirects to `/login` if not logged in)
- `GET /products/:id` — single product page
- `GET /api/cart` — get current cart
- `POST /api/cart/items` — add item to cart
- `DELETE /api/cart/items/:productId` — remove item from cart
- `POST /api/cart/clear` — clear all cart items

## Cart API
- `GET /api/cart` — returns the current session cart
- `POST /api/cart/items` — adds a product to the cart; expects `{ productId, product_name, price, quantity }` in the request body
- `DELETE /api/cart/items/:productId` — removes a product from the cart by ID
- `POST /api/cart/clear` — empties the cart

## Session-Based Cart
The cart is stored entirely in server-side session state under `req.session.cart` — no database table is used. This means:
- The cart persists across page navigation while the session is active
- The cart is user-specific and not shared between sessions
- The cart is lost when the session ends (logout or expiry)
- All cart interactions use `fetch()` and update the UI without a page refresh

## Setup
- Run `npm install` to install dependencies
- API is accessible at `http://localhost:8001/api/products`
- Run the database seed script to populate products: `node src/scripts/seed.js`
- Start the server with ` node src/server.js`
- Visit `http://localhost:8001`

## Published Documentation
The Postman collection documentation has been published publicly.

The link to the published documentation is included below:

https://documenter.getpostman.com/view/54271294/2sBXwvH7rv

## Exported Postman Collection
The Postman collection has been exported in JSON format, named `Palm Garden Endpoints.postman_collection.json`, and committed to this repository.