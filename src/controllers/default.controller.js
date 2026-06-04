import { getAll, getById } from "../services/default.service.js";

export const getProductById = async (req, res) => {
    const { id } = req.params;

    if (Number(id) <= 0 || Number(id) > 20) {
        res.status(404).json({ message: "Product not found" });  
    }

    const product = await getById(id);

    return res.status(200).json({ product });
}

export const getProductsWithFilters = async (req, res) => {
    let results = await getAll();
    const { price, category } = req.query;

    if (price) {
        results = results.filter(pro => pro.price >= Number(price));
    }

    if (category) {
        const categories = req.query.category?.split(',');
        results = results.filter(pro => categories.includes(String(pro.category).toLowerCase()));
    }

    if (results.length === 0) {
        return res.status(404).json({
            count: 0,
            data: []
        });
    }

    return res.status(200).json({
        count: results.length,
        data: results
    });
}


export const getProductsByCategory = async (req, res) => {
    let results = await getAll();
    const { category } = req.query;

    if (category) {
        const categories = req.query.category?.split(',');
        results = results.filter(pro => categories.include(pro.category));
    }

    if (results.length === 0) {
        return res.status(404).json({
            count: 0,
            data: []
        });
    }

    return res.status(200).json({
        count: results.length,
        data: results
    });
}