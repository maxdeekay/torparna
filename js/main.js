"use strict";

const itemElements = document.getElementsByClassName("item");
const inspectBox = document.getElementById("inspect-wrapper");
const inspectImage = document.getElementById("inspect-image");
const priceElement = document.getElementById("price");
const descriptionElement = document.getElementById("description");

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
}