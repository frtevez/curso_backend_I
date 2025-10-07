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
});

socket.on("addedProduct", product => {
    const productList = document.getElementById("productList");

    productList.innerHTML += `
    <li> <img src="" alt="">
    <h2> ${product.title} </h2>
    <p> ${product.price} </p> </li>`;
});