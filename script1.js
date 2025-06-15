const cartIcon= document.querySelector('#lg-bag')
const cart= document.querySelector('.cart');
const cartClose= document.querySelector('#cart-close');
// const AddCartIcon= document.querySelector('.add-cart')
// AddCartIcon.addEventListener('click', () => cart.classList.add("active"))
// cartIcon.addEventListener("click", () => cart.classList.add("active"));
// cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addToCartButtons = document.querySelectorAll('.add-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', event => {
        const productBox = event.target.closest('.product-box');
        addToCart(productBox);
    });
});

const cartContent = document.querySelector('.cart-content');
const addToCart = productBox => {
    const productImgSrc = productBox.querySelector('img').src;
    const productTitle = productBox.querySelector('.product-title').textContent;
    const productPrice = productBox.querySelector('.price').textContent;

    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for (let item of cartItems) {
        if (item.textContent === productTitle) {
            alert("This item is already in the cart.");
            return;
        }
    }

    const cartBox = document.createElement('div');
    cartBox.classList.add('cart-box');
    cartBox.innerHTML = `
        <img src="${productImgSrc}" class="cart-img">
        <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button id="decrease">-</button>
                <span class="number"> 1 </span>
                <button id="increase">+</button>
            </div>
        </div>
        <i class="far fa-times-circle cart-remove"></i>
    `;
    cartContent.appendChild(cartBox);
    
    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();

        updateCartCount(-1);

        updateTotalPrice();
    });

    cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decreaseButton = cartBox.querySelector("#decrease");
        let quantity = numberElement.textContent;

        if (event.target.id === "decrease" && quantity > 1) {
            quantity--;
            if (quantity === 1) {
                decreaseButton.style.color = "#999";
            }
        } else if (event.target.id === "increase") {
            quantity++;
            decreaseButton.style.color = "#333";
        }

        numberElement.textContent = quantity;

        updateTotalPrice();
    });

    updateCartCount(1);

    updateTotalPrice();
};

const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");
        const price = priceElement.textContent.replace("BDT","")
        const quantity = quantityElement.textContent;
        total += price * quantity;
    });
    totalPriceElement.textContent = `BDT ${total}`;
};

let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;
    cartItemCountBadge.textContent = cartItemCount;
};

const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if (cartBoxes.length === 0) {
        alert("Your cart is empty!")
        return;
    }

    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;

    updateCartCount(0);

    updateTotalPrice();

    alert("Thank you for your purchase!");
});