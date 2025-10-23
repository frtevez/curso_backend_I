const socket = io();

const newProductForm = document.getElementById("newProductForm");

newProductForm.addEventListener("submit", e => {
    e.preventDefault();

    const product = {};
    const productData = new FormData(newProductForm);

    productData.forEach((value, key) => {
        if (key === "thumbnail") {
            product["thumbnails"] = [value];
        } else {
            product[key] = value;
        };
    });

    socket.emit('newProduct', product);
    newProductForm.reset();
});

const productList = document.getElementById("productList");
socket.on("addedProduct", product => {
  const cardHTML = `
    <li class="col-md-4 product" id="${product._id}">
      <div class="card h-100 shadow-sm">
        <img src="${product.thumbnails?.[0] || ""}" class="card-img-top" alt="Product Image">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">$${product.price}</p>
          <p class="text-muted small mb-3">${product.category}</p>
          <button class="btn btn-danger mt-auto deleteProduct">Delete</button>
        </div>
      </div>
    </li>
  `;

  productList.insertAdjacentHTML("afterbegin", cardHTML);
});

productList.addEventListener("click", e => {
  if (e.target.classList.contains("deleteProduct")) {
    const card = e.target.closest(".product");
    if (card) {
      const productId = card.id;
      socket.emit("deleteProduct", productId);
    }
  }
});

socket.on("deletedProduct", productId => {
  const product = document.getElementById(productId);
  if (product) product.remove();
});