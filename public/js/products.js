const grid = document.querySelector("#products-grid");

loadProducts();

document.querySelector("#filter-category").onchange = fetchFiltered;
document.querySelector("#filter-price").oninput = fetchFiltered;

function loadProducts() {
    showProducts(products);
}

async function fetchFiltered() {
    const category = document.querySelector("#filter-category").value;
    const price = document.querySelector("#filter-price").value;

    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (price) params.append("price", price);

    const response = await fetch(`/api/products?${params}`);

    if (response.ok) {
        const { data } = await response.json();
        grid.innerHTML = "";
        showProducts(data);
    } else {
        grid.innerHTML = "";
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
  const { product_name, price, description, category, id, image } = product;

  const [img, div, a, h2, pCategory, pPrice, pDesc, btnCart] =
    createElements(["img", "div", "a", "h2", "p", "p", "p", "button"]);
  //Card
  div.id = slugify(product_name);
  div.className = "product-card";
  //Picture
  img.className = "product-image";
  //checking if the image is null
  img.src = image !== null ? image : "/images/garden-tool-img/defult.png";
  //Link and Name
  a.href = `/products/${id}`;
  h2.textContent = product_name;
  //category
  pCategory.className = "category";
  pCategory.textContent = category;
  //price
  pPrice.className = "price";
  pPrice.textContent = `$${parseFloat(price).toFixed(2)}`;
  //description
  pDesc.className = "description";
  pDesc.textContent = description;

  btnCart.textContent = "Add to Cart";
  btnCart.onclick = () => addToCart(id, product_name, price);

  a.appendChild(h2);
  appendAll(div, [img, a, pCategory, pPrice, pDesc, btnCart]);
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