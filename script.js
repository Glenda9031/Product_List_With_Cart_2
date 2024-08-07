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

// Add Main Menu
const contents = document.querySelector(".contents");
    for (let i = 0; i < categories.length; i++) {
        let content = document.createElement("div");
        content.classList.add("content");
        content.innerHTML = `
        <div class="image">
            <img src="${generateSource(i)}" alt="" />
            <button data-thumb="${i}" data-name="${names[i]}" />
            <i class="fa-solid fa-cart-plus"></i>
            <span>Add to Cart</span>
            </button>
        </div>
        <p class="category">${categories[i]}</p>
        <h2 class="name">${names[i]}</h2>
        <p class="price">$<span>${prices[i]}</span></p>
        `;
        contents.appendChild(content);
    }

    window.addEventListener("resize", function () {
        const images = document.querySelectorAll(".image img");
        for (let j = 0; j < images.length; j++) {
            images[j].src = generateSource(j);
        }
    });

    function updateCartUI() {
        if (cartList.length > 0) {
            cart.textContent = "";
        } else {
            cart.innerHTML = `
            <div class="empty-cart">
                <img class="empty-img" src="./assets/images/illustration-empty-cart.svg" alt="" />
                <p>Your added items will appear here</p>
            </div>`;
            if (cartList.length == 0) {
                addBtns.forEach((btn, j) => {
                    btn.innerHTML = `
                        <i class="fa-solid fa-cart-plus"></i>
                        <span>Add to Cart</span>`;
                });
            }
            return;
        }

        cartList.forEach((it, index) => {
            let item = document.createElement("div");
            item.classList.add("item");
            item.innerHTML = `
                <div class="product-info">
                    <h3 class="name">${it.name}</h3>
                    <div class="num-items">
                        <div class="quantity"><span>${it.quantity}</span></div>
                        <div class="price-box">
                            <span class="single-item-price">@$<span>${it.price}</span></span>
                            <span class="total-price">$<span>$<span>${it.quantity * parseFloat(it.price).toFixed(2)}</span></span>
                        </div>
                    </div>
                </div>
                <button class="remove-item" data-name="${it.name}" data-index="${index}">
                <i class="fa-solid fa-times"></i>
                </button>
              </div>`;

              
        })
    }











