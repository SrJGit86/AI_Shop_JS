const items_section = document.querySelector(".all_items");
const search_btn = document.querySelector(".sub_btn");
const searchBarText = document.querySelector(".search_item");
const added_cart = document.getElementById("addedCart");
const priceValue = document.getElementById("price");
const deliveryChargeValue = document.getElementById("deliverCharge");
const taxValue = document.getElementById("totTax");
const finalAmountValue = document.getElementById("totalAmmount");

const itemDetails = [];
const fetchItemsDetails = () => {
    const itemPromise = [];
    for (let i = 1; i <= 20; i++) {
        const url = `https://fakestoreapi.com/products/${i}`;
        const fetchUrl = fetch(url).then((response) => {
            return response.json();
        });
        itemPromise.push(fetchUrl);
    }
    Promise.all(itemPromise).then((data) => {
        // console.log(data);
        data.map((ele) => {
            // console.log(ele);

            const itemObj = {
                // id: ele.id,
                item_img: ele.image,
                title: ele.title,
                category: ele.category,
                rating: ele.rating.rate,
                count: ele.rating.count,
                price: ele.price
            };
            itemDetails.push(itemObj);
        });
        itemDetails.map((product) => {
            // console.log(product);
            createItemBox(product);
        });
    });
};


const createItemBox = (product) => {
    const box_div = document.createElement("div");
    box_div.className = "productBox"
    const img = document.createElement("img");
    const title = document.createElement("p");
    const category = document.createElement("span");
    const rating = document.createElement("span");
    const person = document.createElement("i");
    const count = document.createElement("h3");
    const sold_div = document.createElement("div");
    sold_div.className = "person_count"
    const price = document.createElement("h2");
    const buttons = document.createElement("div");
    buttons.className = "btns_div"
    const addToCart = document.createElement("button");
    addToCart.className = "addToCart"
    const details = document.createElement("button");
    details.className = "details_btn"

    img.src = product.item_img;
    img.className = "itemImg"
    title.innerText = product.title;
    category.innerText = "Category: " + product.category;
    rating.innerText = "rating: " + product.rating;
    person.className = "fa fa-user";
    count.innerText = product.count;
    price.innerText = "Price: $ " + product.price;
    addToCart.innerHTML = "add to cart"
    details.innerText = "Details"
        // details.href = "./detail.html";
        // details.target = "blank"

    box_div.appendChild(img);
    box_div.appendChild(title);
    box_div.appendChild(category);
    box_div.appendChild(rating);
    sold_div.appendChild(person);
    sold_div.appendChild(count);
    box_div.appendChild(sold_div);
    box_div.appendChild(price);
    buttons.appendChild(addToCart);
    buttons.appendChild(details);
    box_div.appendChild(buttons);


    items_section.appendChild(box_div);

    // let pricePerProd =0;
    // let taxTax = 0;
    // let total = 0;
    addToCart.addEventListener("click", function() {


        added_cart.innerText = parseInt(added_cart.innerText) + 1;

        // let pricePerProd += product.price;
        // priceValue.innerText = pricePerProd.toFixed(2);

        priceValue.innerText = parseFloat(priceValue.innerText) + parseFloat(product.price);


        if (priceValue.innerText > 200) {
            const tax = parseFloat(product.price) * 0.2;
            // console.log(tax);
            taxValue.innerText = parseFloat(taxValue.innerText) + parseFloat(tax);

            // taxValue.innerText = taxTax.toFixed(2);


        } else if (priceValue.innerText > 400) {
            const tax = parseFloat(product.price) * 0.3;
            // console.log(tax);
            taxValue.innerText = parseFloat(taxValue.innerText) + parseFloat(tax);
            // taxValue.innerText = taxTax.toFixed(2);


        } else if (priceValue.innerText > 500) {
            const tax = parseFloat(product.price) * 0.4;
            taxValue.innerText = parseFloat(taxValue.innerText) + parseFloat(tax);
            // taxValue.innerText = taxTax.toFixed(2);
        }

        if (priceValue.innerText < 500 && (added_cart.innerText % 2 === 0 && added_cart.innerText <= 6)) {
            deliveryChargeValue.innerText = parseFloat(deliveryChargeValue.innerText) + parseFloat(10);
        }



        finalAmountValue.innerText = parseFloat(deliveryChargeValue.innerText) + parseFloat(taxValue.innerText) + parseFloat(priceValue.innerText);




    });
}




search_btn.addEventListener("click", function() {

    // console.log(searchBarText.value);
    const filterText = itemDetails.filter((ele) =>
        ele.category.value.includes(searchBarText.value.toLowerCase())
    );
    console.log(filterText);
    filterText.map((item) => {
        createItemBox(item);
    });
    searchBarText.value = "";
});




fetchItemsDetails();