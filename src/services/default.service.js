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
