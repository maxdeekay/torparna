"use strict";

const itemElements = document.getElementsByClassName("item");
const inspectBox = document.getElementById("inspect-wrapper");
const inspectImage = document.getElementById("inspect-image");
const priceElement = document.getElementById("price");
const descriptionElement = document.getElementById("description");
const headerElement = document.querySelector("header");

const scAmountElement = document.getElementById("shopping-cart-amount");
const exitElement = document.getElementById("exit-inspect");
const ATCElement = document.getElementById("add-to-cart");

window.onload = () => {
    updateShoppingCart();
    
    // Loopar igenom objektet data i data.js och kallar addItem() för varje som i sin tur skapar elementet
    data.forEach(addItem);

    // Fångar klick i inspect-fönstret. Är dom innanför själva inspectrutan så händer ingenting, är dom utanför så döljs den
    inspectBox.addEventListener("click", function(e) {
        if (e.target !== inspectBox){
            return;
        } else {
            inspectBox.style.display = "none";
        }
    });

    // Exit Inspect-knappen som finns för mindre skärmar
    exitElement.addEventListener("click", function() {
        inspectBox.style.display = "none";
    });
};

// Skapar och ritar ut ett artikel-element
function addItem(item) {
    const element = document.createElement("div");
    element.setAttribute("data-id", item.id);
    element.classList.add("item");
    element.onclick = () => inspectItem(item);
    const imageElement = document.createElement("img");
    imageElement.src = item.imageSMALL;
    element.appendChild(imageElement).alt = "Bild på " + item.id;
    document.getElementById("articles").appendChild(element);
}

// Hanterar inspektorn (när man klickat på en artikel)
function inspectItem(item) {
    inspectImage.src = item.image;
    priceElement.innerHTML = item.price + " kr";
    descriptionElement.innerHTML = item.text;
    inspectBox.style.display = "block";

    const clearEventListeners = (id) => {
        const oldElement = document.getElementById(id);
        const newElement = oldElement.cloneNode(true);
        oldElement.parentNode.replaceChild(newElement, oldElement);
        return newElement;
    }

    clearEventListeners("add-to-cart").onclick = () => addToCart(item);
}

// Hanterar kundvagnen uppe till höger
function updateShoppingCart() {
    const toSCElement = document.getElementById("to-checkout");
    const emptySCElement = document.getElementById("empty-cart");

    let cart = JSON.parse(localStorage.getItem("cart")??"[]");

    // 'Töm kundvagn' click event
    emptySCElement.onclick = () => {
        scAmountElement.style.display = "none";
        scAmountElement.innerHTML = "";
        localStorage.removeItem("cart");

        toSCElement.removeAttribute("href");
        toSCElement.setAttribute("onclick", "alert('Kundvagnen är tom!')");
    };

    if (cart.length === 0) {
        toSCElement.setAttribute("onclick", "alert('Kundvagnen är tom!')");   
        return
    } else {
        scAmountElement.style.display = "block";
        scAmountElement.innerHTML = cart.length;

        toSCElement.href = "checkout.html";
        toSCElement.removeAttribute("onclick");
    }
}

// Lägger till en artikel i kundvagnen
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")??"[]");
    cart.push(item.id);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateShoppingCart();
}