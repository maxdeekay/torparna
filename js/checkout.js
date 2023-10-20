"use strict";

window.onload = () => {
    let cart = JSON.parse(localStorage.getItem("cart")??"[]");

    // Redirectar användaren till startsidan om kundvagnen är tom
    if (cart.length > 0) {
        loadCheckoutItems(cart);
    } else {
        window.location.replace("index.html");
    }
};

// Laddar in, formatterar och skriver ut till DOM
function loadCheckoutItems(cart) {
    const checkoutElement = document.getElementById("checkout-items");
    let sum = 0;

    // För att slå ihop eventuella dubbletter så loopar vi igenom 'cart' och bygger ett objekt innehållande artikelnamn och antal
    const checkoutCart = cart.reduce((obj, itemID) => {
        if (obj[itemID]) {
            obj[itemID] += 1;
        } else {
            obj[itemID] = 1; 
        }

        return obj;
    }, {});

    // Loopar igenom objektet 'checkoutCart' och skapar ett element för varje artikelnamn
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

    // Hanterar summa
    const sumElement = document.createElement("p");
    sumElement.setAttribute("id","sum-amount");
    sumElement.innerHTML = `Summa: ${sum} kr`;
    checkoutElement.appendChild(sumElement);
};