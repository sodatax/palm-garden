import db from "../scripts/db.js";

export const getAll = async () => {
    try {
        const [results] = await db.query(
            "SELECT * FROM products"
        );

        return results;
    } catch (err) {
        console.error("MYSQL ERROR:", err);
        throw err;
    } 
}

export const getById = async (id) => {
    try {
        const [result] = await db.query(
            "SELECT id, product_name, price, description, category FROM products WHERE id = ?", [Number(id)]
        );

        return result[0];
    } catch (err) {
        console.error("MYSQL ERROR:", err);
        throw err;
    }
}

export const getFiltered = async ({ price, category }) => {
    try {
        let query = "SELECT * FROM products WHERE 1=1";
        const params = [];

        if (price) {
            query += " AND price >= ?";
            params.push(Number(price));
        }

        if (category) {
            const categories = category.split(',');
            query += ` AND LOWER(category) IN (${categories.map(() => '?').join(',')})`;
            params.push(...categories.map(c => c.toLowerCase()));
        }

        const [results] = await db.query(query, params);
        return results;
    } catch (err) {
        console.error("MYSQL ERROR:", err);
        throw err;
    }
}
