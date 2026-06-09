# Palm Garden

## Team PALM:
- Hosea Nacanaynay | GitHub: sodatax
- Pavlo Tkach | GitHub: BROSKIs
- name | GitHub: 

## What is Palm Garden?

Palm Garden is an ecommerce platform focused on plants and gardening tools.

## SSR Routes
- `GET /products` — renders the products page with all products loaded server-side via EJS

## API Endpoints
- `GET /api/products` — returns all products as JSON
- `GET /api/products?price=20` — returns products with price at or above the given value
- `GET /api/products?category=hand tools` — returns products matching the given category
- `GET /api/products?price=20&category=hand tools` — combines both filters
- `GET /api/products/:id` — returns a single product by ID (1–20)

## Filtering
- Filters are applied via query parameters on the `/api/products` endpoint
- `price` filters to products at or above the specified minimum price
- `category` accepts one or more values (e.g. `handtool, watering`) and is case-insensitive
- Both filters can be combined in a single request

## Setup
- Run `npm install` to install dependencies
- API is accessible at `http://localhost:8001/api/products`