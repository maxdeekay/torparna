"use strict";

const checkoutElement = document.getElementById("checkout-items");
const submitElement = document.querySelector("input[type=submit]");

window.onload = () => {
    loadCheckoutItems();
};

function loadCheckoutItems() {
    let cart = JSON.parse(localStorage.getItem("cart")??"[]");
    let sum = 0;

    const checkoutCart = cart.reduce((obj, itemID) => {
        if (obj[itemID]) {
            obj[itemID] += 1;
        } else {
            obj[itemID] = 1; 
        }

        return obj;
    }, {});

    Object.entries(checkoutCart).forEach(([id, amount]) => {
        let item = data.find(e => e.id === id);

        sum += item.price * amount;
        
        const element = document.createElement("div");
        element.classList.add("checkout-item");
        element.appendChild(document.createElement("img")).src = item.imageSMALL;
        element.appendChild(document.createElement("span")).innerHTML = amount;
        element.appendChild(document.createElement("span")).innerHTML = item.price * amount + " kr";
        checkoutElement.appendChild(element);
    });

    const sumElement = document.createElement("p");
    sumElement.setAttribute("id","sum-amount");
    sumElement.innerHTML = `Summa: ${sum} kr`;
    checkoutElement.appendChild(sumElement);
};