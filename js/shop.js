const cardContainer = document.querySelector("#cardContainer");

function addProducts() {
    products.forEach(individualCard => {
        cardContainer.innerHTML += `
        <div class="card" id="cardNumber${individualCard.id}">
            <img src="${individualCard.image}" alt= "${individualCard.description}">
            <div class="cardText">
                <h4>${individualCard.name}</h4>
                <p>${individualCard.description}</p>
                <p>&dollar;${individualCard.price}</p>
                <button class="cartButton" id="${individualCard.id}">Add to Cart</button>
            </div>
        </div>
        `;
    });
}

addProducts();