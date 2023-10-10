"use strict";

const itemElements = document.getElementsByClassName("item");
const inspectBox = document.getElementById("inspect-wrapper");
const inspectImage = document.getElementById("inspect-image");
const priceElement = document.getElementById("price");
const descriptionElement = document.getElementById("description");

const scAmountElement = document.getElementById("shopping-cart-amount");
const ATCElement = document.getElementById("add-to-cart");

window.onload = init;

function init() {
    updateShoppingCart();
}

inspectBox.addEventListener("click", function(e) {
    if (e.target !== this){
        return;
    } else {
        inspectBox.style.display = "none";
        document.body.classList.remove("disable-scroll");
    }
});

Array.from(itemElements).forEach(element => element.addEventListener("click", inspectItem));

function inspectItem(event) {
    let itemID = event.target.parentElement.getAttribute("data-id");
    let item = data.find(d => d.id === itemID);

    if (item === undefined) {
        console.log("Invalid itemID: ", itemID);
        return;
    }

    inspectImage.src = item.image;
    priceElement.innerHTML = item.price;
    descriptionElement.innerHTML = item.text;
    inspectBox.style.display = "block";
    document.body.classList.add("disable-scroll");

    ATCElement.addEventListener("click", function() {
        addToCart(itemID);
    });
}

function updateShoppingCart() {
    let cart = JSON.parse(localStorage.getItem("cart")??"[]");

    if (cart.length === 0) {
        return
    } else {
        scAmountElement.style.display = "block";
        scAmountElement.innerHTML = cart.length;
    }
}

function addToCart(itemID) {
    let cart = JSON.parse(localStorage.getItem("cart")??"[]");
    cart.push(itemID);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateShoppingCart();
}