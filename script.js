let products = [];

window.onload = function() {
    loadProducts();
};

function loadProducts() {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            displayProducts(products);
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

function displayProducts(productsToDisplay) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    productsToDisplay.forEach(product => {
        productList.innerHTML += `
            <div class="product">
                <img src="${product.imageUrl}" alt="${product.title}" onclick="openModal('${product.imageUrl}', '${product.title}')">
                <h3>${product.title}</h3>
                <p>${product.brand}</p>
                <p>${product.description}</p>
                <p>${product.price} €</p>
            </div>
        `;
    });
}

function openModal(imageUrl, title) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-image');
    const captionText = document.getElementById('modal-caption');
    modal.style.display = "block";
    modalImg.src = imageUrl;
    captionText.innerHTML = title;
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = "none";
}

function sortByPrice() {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    displayProducts(sortedProducts);
}

function filterByCategory(category) {
    if (category === 'Todos') {
        displayProducts(products);
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }
}