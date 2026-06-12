import { getAll, getById, getFiltered } from "../services/default.service.js";

export const getProductById = async (req, res) => {
    const { id } = req.params;

    if (Number(id) <= 0 || Number(id) > 20) {
        res.status(404).json({ message: "Product not found" });  
    }

    const product = await getById(id);

    return res.status(200).json({ product });
}

export const getProductsWithFilters = async (req, res) => {
    const { price, category } = req.query;
    const results = await getFiltered({ price, category });

    if (results.length === 0) {
        return res.status(404).json({ count: 0, data: [] });
    }

    return res.status(200).json({ count: results.length, data: results });
}

export const getProductsPage = async (req, res) => {
    let products = await getAll();
    const { price, category } = req.query;

    if (price) {
        products = products.filter(pro => pro.price >= Number(price));
    }

    if (category) {
        const categories = category.split(',').map(c => c.toLowerCase());
        products = products.filter(pro => categories.includes(String(pro.category).toLowerCase()));
    }

    res.render("products", { products });
}

export const getSingleProductPage = async (req, res) => {
    const id = Number(req.params.id);
    const product = await getById(id);
    res.render("singleProductPage", { product });
}