loadProducts();

async function loadProducts() {
  const response = await fetch("/api/products");
  if (response.ok) {
    const { data } = await response.json();
    showProducts(data);
  } else {
    showError();
  }
}

function showError() {
  console.error("Failed to load products");
}

function showProducts(productList) {
  for (const product of productList) {
    addProductCard(product);
  }
}

function addProductCard(product) {
  const grid = document.querySelector("#products-grid");
  const { product_name, price, description, category } = product;

  const [div, h2, pCategory, pPrice, pDesc] =
    createElements(["div", "h2", "p", "p", "p"]);

  div.id = slugify(product_name);
  div.className = "product-card";
  h2.textContent = product_name;
  pCategory.className = "category";
  pCategory.textContent = category;
  pPrice.className = "price";
  pPrice.textContent = `$${parseFloat(price).toFixed(2)}`;
  pDesc.className = "description";
  pDesc.textContent = description;

  appendAll(div, [h2, pCategory, pPrice, pDesc]);
  grid.appendChild(div);
}

function slugify(name) {
  return name.toLowerCase().replaceAll(" ", "-");
}

function createElements(tags) {
  return tags.map(tag => document.createElement(tag));
}

function appendAll(parent, children) {
  for (const child of children) {
    parent.appendChild(child);
  }
}