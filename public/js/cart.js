loadCart();

async function loadCart() {
    const response = await fetch("/api/cart");
    if (response.ok) {
        const { cart } = await response.json();
        updateCartUI(cart);
    }
}

async function addToCart(productId, product_name, price) {
    const response = await fetch("/api/cart/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, product_name, price, quantity: 1 })
    });

    if (response.ok) {
        const { cart } = await response.json();
        updateCartUI(cart);
    }
}

async function removeFromCart(productId) {
    const response = await fetch(`/api/cart/items/${productId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const { cart } = await response.json();
        updateCartUI(cart);
    }
}

async function clearCart() {
    const response = await fetch("/api/cart/clear", { method: "POST" });
    if (response.ok) {
        const { cart } = await response.json();
        updateCartUI(cart);
    }
}

function updateCartUI(cart) {
    const cartItems = document.querySelector("#cart-items");
    const cartCount = document.querySelector("#cart-count");
    const cartTotal = document.querySelector("#cart-total");

    cartCount.textContent = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = cart.total.toFixed(2);

    cartItems.innerHTML = "";
    for (const item of cart.items) {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.product_name} x${item.quantity} — $${(item.price * item.quantity).toFixed(2)}
            <button onclick="removeFromCart(${item.productId})">Remove</button>
        `;
        cartItems.appendChild(li);
    }
}

// toggle dropdown
document.querySelector("#cart-toggle").onclick = () => {
    document.querySelector("#cart-dropdown").classList.toggle("open");
};

document.querySelector("#cart-clear").onclick = clearCart;