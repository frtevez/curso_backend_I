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

const productList = document.getElementById("productList");
socket.on("addedProduct", product => {

    productList.innerHTML += `
    <li class="product" id="${product.id}"> <img src="" alt="">
    <h2> ${product.title} </h2>
    <p> ${product.price} </p> 
    <button class="deleteProduct">Delete</button></li>
    `;


});

productList.addEventListener("click", e => {
    e.preventDefault();
    if (e.target.classList.contains("deleteProduct")){
        const productId = e.target.parentElement.id;
        socket.emit("deleteProduct", productId);
    };
});

socket.on("deletedProduct", productId => {
    console.log('asd');
    
    const product = document.getElementById(productId);

    product.remove();
    
});