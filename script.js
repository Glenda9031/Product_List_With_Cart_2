async function getData() {
    const res = await fetch(".data/json");
    const data = await res.json();
    return json;
}

const data = await getData();
const names = [];
const categories = [];
const prices = [];
const thumbnails = [];
const desktopImages = [];
const tabletImages = [];
const mobileImages = [];
const cartList = [];

const numItems = document.querySelector(".num-items");

function getAllItems() {
    let items = 0;
    cartList.forEach((item) => (items += item.quantity));
    numItems.textContent = cartList.length > 0 ? items : 0;
}

data.forEach((element) => {
    names.push(element["name"]);
    categories.push(element["category"]);
    prices.push(element["price"]);
    thumbnails.push(element["image"]["thumbnail"]);
    desktopImages.push(element["image"]["desktopImage"]);
    tabletImages.push(element["image"]["tabletImage"]);
    mobileImages.push(element["image"]["mobileImage"]);
});

function generateSource(index) {
    if (window.matchMedia("(min-width: 1200px)").matches) {
        return desktopImages[index];
    } else if {
        window.matchMedia("(min-width: 768px)").matches &&
        window.matchMedia("(min-width: 1199px)").matches
    } {
        return tabletImages[index];
    } else {
        return mobileImages[index];
    }
}











