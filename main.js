const productContainer = document.querySelector('.products-container');
const loadmoreBtn = document.querySelector('.load-more-btn');
let currentStep = 0;

async function fetchResults(getCurrentStep) {

    try {
        const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${getCurrentStep === 0 ? 0 : currentStep * 10}`, {
            method: 'GET'
        });
        const result = await response.json();
        if (result && result.products) displayProducts(result.products);
    } catch (error) {
        console.log(error);
    }
}



var displayProducts = ((productList) => {
    productList.forEach(productItem => {
        const productItemWrapper = document.createElement("div");
        const productTitle = document.createElement("p");
        const productThumbnail = document.createElement("img");
        const productDescription = document.createElement("p");
        const productPrice = document.createElement("p");

        productTitle.textContent = productItem.title;
        productThumbnail.src = productItem.thumbnail;
        console.log(productItem.thumbnail);
        productDescription.textContent = productItem.description;
        productPrice.textContent = productItem.price;

        productTitle.classList.add('product-title')
        productThumbnail.classList.add('product-img')
        productPrice.classList.add('product-price')
        productDescription.classList.add('product-desc')
        productItemWrapper.classList.add('product-item-wrapper')

        productItemWrapper.appendChild(productThumbnail);
        productItemWrapper.appendChild(productTitle);
        productItemWrapper.appendChild(productDescription);
        productItemWrapper.appendChild(productPrice);

        productContainer.appendChild(productItemWrapper);
    });
    if (productContainer.children.length === 100) {
        loadmoreBtn.setAttribute('disabled', 'true');
        loadmoreBtn.style.backgroundColor = '#dddddd';
    }
})

fetchResults(currentStep);

loadmoreBtn.addEventListener("click", () => {
    fetchResults((currentStep += 1));
});
