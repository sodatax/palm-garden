export const getCart = (req, res) => {
    const cart = req.session.cart || { items: [], total: 0 };
    return res.status(200).json({ cart });
};

export const addItem = async (req, res) => {
    const { productId, product_name, price, quantity = 1 } = req.body;

    if (!productId || !product_name || !price) {
        return res.status(400).json({ message: "Missing required product fields." });
    }

    if (!req.session.cart) {
        req.session.cart = { items: [], total: 0 };
    }

    const cart = req.session.cart;
    const existing = cart.items.find(item => item.productId === productId);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.items.push({ productId, product_name, price, quantity });
    }

    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return res.status(200).json({ cart });
};

export const removeItem = (req, res) => {
    const productId = Number(req.params.productId);

    if (!req.session.cart) {
        return res.status(404).json({ message: "Cart is empty." });
    }

    const cart = req.session.cart;
    cart.items = cart.items.filter(item => item.productId !== productId);
    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return res.status(200).json({ cart });
};

export const clearCart = (req, res) => {
    req.session.cart = { items: [], total: 0 };
    return res.status(200).json({ cart: req.session.cart });
};