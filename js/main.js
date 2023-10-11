"use strict";

const itemElements = document.getElementsByClassName("item");
const inspectBox = document.getElementById("inspect-wrapper");
const inspectImage = document.getElementById("inspect-image");
const priceElement = document.getElementById("price");
const descriptionElement = document.getElementById("description");

const scAmountElement = document.getElementById("shopping-cart-amount");
const ATCElement = document.getElementById("add-to-cart");

window.onload = () => {
    updateShoppingCart();
    
    data.forEach(addItem);

    inspectBox.addEventListener("click", function(e) {
        if (e.target !== inspectBox){
            return;
        } else {
            inspectBox.style.display = "none";
            document.body.classList.remove("disable-scroll");
        }
    });

    ATCElement.addEventListener("click", function() {
        addToCart(itemID);
    });
};

function addItem(item) {
    const element = document.createElement("div");
    element.setAttribute("data-id", item.id);
    element.classList.add("item");
    element.onclick = () => inspectItem(item);
    element.appendChild(document.createElement("img")).src = item.image;
    document.getElementById("articles").appendChild(element);
}

function inspectItem(item) {
    inspectImage.src = item.image;
    priceElement.innerHTML = item.price + " kr";
    descriptionElement.innerHTML = item.text;
    inspectBox.style.display = "block";
    document.body.classList.add("disable-scroll");

    const clearEventListeners = (id) => {
        const oldElement = document.getElementById(id);
        const newElement = oldElement.cloneNode(true);
        oldElement.parentNode.replaceChild(newElement, oldElement);
        return newElement;
    }

    clearEventListeners("add-to-cart").onclick = () => addToCart(item);
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

function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")??"[]");
    cart.push(item.id);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateShoppingCart();
}