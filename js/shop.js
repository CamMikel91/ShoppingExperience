const cardContainer = document.querySelector("#cardContainer");

// Function to add the products to the shop page.
// function addProducts() {
//     products.forEach(individualCard => {
//         cardContainer.innerHTML += `
//         <div class="card" id="cardNumber${individualCard.id}">
//             <img src="${individualCard.image}" alt= "${individualCard.description}">
//             <div class="cardText">
//                 <h4>${individualCard.name}</h4>
//                 <p>${individualCard.description}</p>
//                 <p>&dollar;${individualCard.price}</p>
//                 <button class="cartButton" id="${individualCard.id}">Add to Cart</button>
//             </div>
//         </div>
//         `;
//     });
// }

// // Function call to populate shop page.
// addProducts();

// Function to paginate the products on the shop page.
let productsPerPage = 6,
    currentPage = 1,
    pagedResults = [],
    totalProducts = products.length;

function paginate() {
    let end = currentPage * productsPerPage,
        start = end - productsPerPage;
    pagedResults = products.slice(start, end);
    $("#cardContainer").empty();
    
    // Function to add the products to the shop page.
    $(pagedResults).each(function(index, individualCard) {
        $("#cardContainer").append(`
        <div class="card" id="cardNumber${individualCard.id}">
            <img src="${individualCard.image}" alt= "${individualCard.description}">
            <div class="cardText">
                <h4>${individualCard.name}</h4>
                <p>${individualCard.description}</p>
                <p>&dollar;${individualCard.price}</p>
                <button class="cartButton" id="${individualCard.id}">Add to Cart</button>
            </div>
        </div>
        `);
    });

    // Disabling the previous (page) button when on the first page.
    if (currentPage <= 1) {
        $('.previous').attr("disabled", true);
    } else {
        $('.previous').attr("disabled", false);
    }

    // Disabling the next (page) button when on the last page.
    if ((currentPage * productsPerPage) >= totalProducts) {
        $('.next').attr("disabled", true);
    } else {
        $('.next').attr("disabled", false);
    }
}
// Function call to paginate the products on the shop page.
paginate();

// Next (page) button.
$('.next').on('click', function() {
    if (currentPage * productsPerPage <= totalProducts) {
        currentPage++;
        paginate();
        saveToLocalStorage();
        fadeButtons();
    }
});

// Previous (page) button.
$('.previous').on('click', function() {
    if (currentPage > 1) {
        currentPage--;
    }
    paginate();
    saveToLocalStorage();
    fadeButtons();
});

// Function to save cart info to local storage
function saveToLocalStorage() {
    let cartButton = document.getElementsByClassName("cartButton");
    for (let i = 0; i < cartButton.length; i++) {
        cartButton[i].addEventListener("click", () => {
            let selectedProduct = products.find( (product) => product.id == cartButton[i].id),
                cartItemSearch = cart.find( (cartItem) => cartItem.id == selectedProduct.id);
            if (cartItemSearch) {
                cartItemSearch.quantity++;
            } else {
                cart.push(selectedProduct);
            }            
            localStorage.setItem("CART", JSON.stringify(cart) );
            // Cart display refresh on each add to cart click event
            displayCart();
        });
    }
}

// Function call for saveToLocalStorage().
saveToLocalStorage();

// Function to populate sideBarContainer with cart items
function displayCart() {
    clearStorageAndCart();
    sideBarContainer.innerHTML = "";
    cart.forEach(cartItem => {
        sideBarContainer.innerHTML += `
        <div class="tableRow">
            <div class="tableCell">
                ${cartItem.name}
            </div>
            <div class="tableCell">
                &dollar;${cartItem.price}
            </div>
        </div>

        <div class="tableRow">
            <div class="tableCell borderBottom">
                <input id="${cartItem.id}" class="quantityNumberInput" type="number" value="${cartItem.quantity}" min="1" max="5">
            </div>
            <a href="#" id="${cartItem.id}" class="tableCell borderBottom removeLink">Remove</a>
        </div>
        `;
    });
    removeFromCart();
    updateQuantity();
}

// Cart display for when the page first loads
displayCart();

let checkoutButton = document.getElementById("checkoutButton");
checkoutButton.addEventListener("click", () => {
    window.location.href = "cart.html";
});