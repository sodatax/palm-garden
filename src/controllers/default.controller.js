import { getAll, getById } from "../services/default.service.js";

export const getProducts = async (req, res) => {
    const products = await getAll();
    return res.status(200).json(products);
}

export const getProductById = async (req, res) => {
    const { id } = req.params;

    if (Number(id) <= 0 || Number(id) > 20) {
        res.status(404).json({ message: "Product not found" });  
    }

    const product = await getById(id);

    return res.status(200).json({ product });
}