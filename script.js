// ================= MESSAGE =================
function showMessage(msg, type) {
    let div = document.createElement("div");
    div.className = "message " + type;
    div.innerHTML = (type === "success" ? "✔️ " : "❌ ") + msg;

    document.body.appendChild(div);
    setTimeout(() => div.remove(), 2000);
}

// ================= AUTH =================
function register() {
    let u = document.getElementById("regUser").value.trim();
    let p = document.getElementById("regPass").value.trim();
    let c = document.getElementById("regConfirm").value.trim();

    if (!u || !p || !c) return showMessage("Fill all fields", "error");
    if (p !== c) return showMessage("Passwords do not match", "error");

    localStorage.setItem("user", u);
    localStorage.setItem("pass", p);

    showMessage("Registered Successfully", "success");
    setTimeout(() => location = "index.html", 1500);
}

function login() {
    let u = document.getElementById("loginUser").value.trim();
    let p = document.getElementById("loginPass").value.trim();

    if (u === localStorage.getItem("user") && p === localStorage.getItem("pass")) {
        showMessage("Login Successful", "success");
        setTimeout(() => location = "products.html", 1500);
    } else {
        showMessage("Invalid credentials", "error");
    }
}

function checkLogin() {
    if (!localStorage.getItem("user")) location = "index.html";
}

// ================= PRODUCTS =================
let products = [
    {id:1,name:"Hair Dryer",price:1200,category:"electronics",img:"dryer.jpg"},
    {id:2,name:"Hair Straightener",price:1800,category:"electronics",img:"straightner.jpg"},
    {id:3,name:"Hair Curler",price:2000,category:"electronics",img:"haircurlur.jpg"},

    {id:4,name:"Matte Lipstick",price:400,category:"makeup",img:"matte.jpg"},
    {id:5,name:"Liquid Lipstick",price:450,category:"makeup",img:"liquid.jpg"},
    {id:6,name:"Lip Gloss",price:350,category:"makeup",img:"gloss.jpg"},
    {id:7,name:"Kajal",price:200,category:"makeup",img:"kajal.jpg"},
    {id:8,name:"Foundation",price:600,category:"makeup",img:"foundation.jpg"},
    {id:9,name:"Primer",price:500,category:"makeup",img:"op.jpg"},
    {id:11,name:"Sunscreen",price:350,category:"makeup",img:"sun.jpg"},

    {id:12,name:"Lehenga",price:2500,category:"dress",img:"lehanga.jpg"},
    {id:13,name:"Saree",price:700,category:"dress",img:"saeww.jpg"},
    {id:14,name:"Kurti",price:800,category:"dress",img:"kurti.jpg"},
    {id:15,name:"Black Jeans",price:1200,category:"dress",img:"black jeans.jpg"},
    {id:16,name:"Blue Jeans",price:1000,category:"dress",img:"bluejeans.jpg"},
    {id:17,name:"Beige Jeans",price:1000,category:"dress",img:"beigejeans.jpg"},

    {id:18,name:"Flats",price:300,category:"footwear",img:"flats.jpg"},
    {id:19,name:"Heels",price:1000,category:"footwear",img:"heel.jpg"},
    {id:20,name:"Shoes",price:700,category:"footwear",img:"shoe.jpg"}
];
// ================= DISPLAY =================
function displayProducts(list) {
    let div = document.getElementById("products");
    div.innerHTML = "";
    list.forEach(p => {
        div.innerHTML += `
        <div class="product">
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="addCart(${p.id})">Add to Cart</button>
            <button onclick="addWishlist(${p.id})">❤️</button>
        </div>`;
    });
}

// ================= CATEGORY FILTER =================
function filterCategory(cat) {
    let filteredProducts = cat === "all" ? products : products.filter(p => p.category === cat);
    if (filteredProducts.length === 0) {
        document.getElementById("products").innerHTML = "<h3>No items found</h3>";
    } else {
        displayProducts(filteredProducts);
    }
}

// ================= SEARCH FUNCTION =================
function searchProducts() {
    let query = document.getElementById("searchBar").value.toLowerCase();
    let filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
    );
        displayProducts(filteredProducts);
    
}

// ================= DISPLAY =================
function loadProducts() {
    checkLogin();
    displayProducts(products);
}

function displayProducts(list) {
    let div = document.getElementById("products");
    div.innerHTML = "";

    list.forEach(p => {
        div.innerHTML += `
        <div class="product">
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="addCart(${p.id})">Add to Cart</button>
            <button onclick="addWishlist(${p.id})">❤️</button>
        </div>`;
    });
}
function filterCategory(cat) {
    let filteredProducts = [];

    if (cat === "all") {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(p => p.category === cat);
    }

    if (filteredProducts.length === 0) {
        document.getElementById("products").innerHTML = "<h3>No items found</h3>";
    } else {
        displayProducts(filteredProducts);
    }
}

// ================= CART =================
function addCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(x => x.id === id);

    if (item) item.qty++;
    else cart.push({id, qty:1});

    localStorage.setItem("cart", JSON.stringify(cart));
    showMessage("Added to cart", "success");
}

// ================= CART =================
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let div = document.getElementById("cart-items"); // only cart items
    let total = 0;

    div.innerHTML = "";

    if (!cart.length) {
        div.innerHTML = "<h3>Cart is empty</h3>";
        document.getElementById("total").innerText = "Total: ₹0"; // reset total
        return;
    }

    cart.forEach(item => {
        let p = products.find(x => x.id === item.id);
        if (!p) return;

        total += p.price * item.qty;

        div.innerHTML += `
        <div class="product">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>₹${p.price} x ${item.qty}</p>
            <button onclick="changeQty(${item.id},1)">+</button>
            <button onclick="changeQty(${item.id},-1)">-</button>
        </div>`;
    });

    document.getElementById("total").innerText = "Total: ₹" + total;
}

function changeQty(id, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(x => x.id === id);
    if (!item) return;

    item.qty += change;
    if (item.qty <= 0) cart = cart.filter(x => x.id !== id);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart(); // only updates cart-items div, not checkout
}




// ================= WISHLIST =================
let wishQty = {};

function addWishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (wishlist.includes(id)) {
        showMessage("Already in wishlist", "error");
        return;
    }

    wishlist.push(id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    showMessage("Added to wishlist", "success");
}

function loadWishlist() {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let div = document.getElementById("wishlist");

    div.innerHTML = "";

    if (!wishlist.length) {
        div.innerHTML = "<h3>No items in wishlist</h3>";
        return;
    }

    wishlist.forEach(id => {
        let p = products.find(x => x.id === id);
        if (!p) return;

        if (!wishQty[id]) wishQty[id] = 1;

        div.innerHTML += `
        <div class="product">
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>

            <button onclick="changeWishQty(${id},-1)">-</button>
            <span id="qty-${id}">${wishQty[id]}</span>
            <button onclick="changeWishQty(${id},1)">+</button>

            <br><br>

            <button onclick="moveToCart(${id})">Add to Cart 🛒</button>
            <button onclick="removeWishlist(${id})">Remove ❌</button>
        </div>`;
    });
}

function changeWishQty(id, change) {
    if (!wishQty[id]) wishQty[id] = 1;
    wishQty[id] += change;
    if (wishQty[id] < 1) wishQty[id] = 1;

    document.getElementById("qty-" + id).innerText = wishQty[id];
}

function moveToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let qty = wishQty[id] || 1;

    let item = cart.find(x => x.id === id);
    if (item) item.qty += qty;
    else cart.push({id, qty});

    wishlist = wishlist.filter(x => x !== id);

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    showMessage("Moved to cart", "success");
    loadWishlist();
}

function removeWishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter(x => x !== id);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    showMessage("Removed from wishlist", "error");
    loadWishlist();
}
function goToProducts() {
    window.location.href = "products.html";
}
// ================= ORDERS =================
// ================= PLACE ORDER =================
function placeOrder() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let address = document.getElementById("address").value.trim();
    let payment = document.querySelector('input[name="payment"]:checked');
    let user = localStorage.getItem("user");

    if (!cart.length) return showMessage("Cart empty", "error");
    if (!address) return showMessage("Enter address", "error");
    if (!payment) return showMessage("Select payment", "error");

    // If UPI → show fake success animation first
    if (payment.value === "UPI") {
        showUPISuccess(() => saveOrder(cart, address, payment.value, user));
    } else {
        saveOrder(cart, address, payment.value, user);
    }
}


// ================= SAVE ORDER =================
function saveOrder(cart, address, paymentMethod, user) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({
        user: user,
        items: cart,
        address: address,
        payment: paymentMethod,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    showMessage("Order placed", "success");

    setTimeout(() => {
        window.location.href = "orders.html";
    }, 1500);
}


// ================= UPI SCANNER TOGGLE =================
function toggleUPI(show) {
    let upiBox = document.getElementById("upiBox");

    if (show) {
        upiBox.style.display = "block";
    } else {
        upiBox.style.display = "none";
    }
}


// ================= UPI SUCCESS ANIMATION =================
function showUPISuccess(callback) {
    let popup = document.getElementById("paymentSuccess");

    popup.style.display = "flex";

    setTimeout(() => {
        popup.style.display = "none";
        callback(); // continue order saving
    }, 2000);
}
// ================= LOAD USER ORDERS =================
function loadOrders() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let div = document.getElementById("orders");
    let user = localStorage.getItem("user");

    div.innerHTML = "";

    let userOrders = orders.filter(o => o.user === user); // only this user's orders

    if (!userOrders.length) {
        div.innerHTML = "<h3>No orders placed yet</h3>";
        return;
    }

    userOrders.forEach(o => {
        let orderHTML = `<div class="order">
            <p><b>User:</b> ${o.user}</p>
            <p><b>Order Date & Time:</b> ${o.date}</p>
            <p><b>Delivery Address:</b><br>${o.address.replace(/\n/g, "<br>")}</p>
            <p><b>Payment Method:</b> ${o.payment}</p>
            <p><b>Ordered Items:</b></p>`;

        o.items.forEach(i => {
            let p = products.find(x => x.id === i.id);
            if (!p) return;
            orderHTML += `
            <div class="order-item">
                <img src="${p.img}" alt="${p.name}" class="order-img">
                <span>${p.name} x ${i.qty} - ₹${p.price}</span>
            </div>`;
        });

        orderHTML += "<hr></div>";
        div.innerHTML += orderHTML;
    });
}

// ==================== Admin Login/Dashboard ====================
const adminCredentials = {user:"admin",pass:"admin123"};

function adminLogin(){
    let u=document.getElementById("adminUser").value.trim();
    let p=document.getElementById("adminPass").value.trim();
    console.log("Admin login:",u,p); // Debug

    if(u===adminCredentials.user && p===adminCredentials.pass){
        localStorage.setItem("admin","true");
        alert("Admin login success");
        window.location="admin-dashboard.html";
    } else {
        alert("Invalid admin credentials");
    }
}

function adminLogout(){ localStorage.removeItem("admin"); alert("Admin logged out"); window.location="admin_login.html"; }

function loadAdminProducts(){
    if(!localStorage.getItem("admin")){ alert("Login as admin"); window.location="admin_login.html"; return; }
    let adminDiv=document.getElementById("adminProducts"); adminDiv.innerHTML="";
    products.forEach((p,index)=>{
        adminDiv.innerHTML+=`<div class="product">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="editProduct(${index})">Edit</button>
            <button onclick="deleteProduct(${index})">Delete</button>
        </div>`;
    });
}

function addProduct(){
    let name=document.getElementById("prodName").value.trim();
    let price=parseFloat(document.getElementById("prodPrice").value);
    let img=document.getElementById("prodImg").value.trim();
    if(!name || !price || !img){ alert("Fill all fields"); return; }
    products.push({id:products.length+1,name,price,img});
    localStorage.setItem("productsData",JSON.stringify(products));
    alert("Product added"); loadAdminProducts();
}

function editProduct(index){
    let p=products[index];
    let name=prompt("Enter new name:",p.name);
    let price=prompt("Enter new price:",p.price);
    let img=prompt("Enter new image URL:",p.img);
    if(name && price && img){
        products[index]={id:p.id,name,price:parseFloat(price),img};
        localStorage.setItem("productsData",JSON.stringify(products));
        loadAdminProducts();
    }
}

function deleteProduct(index){
    if(confirm("Are you sure to delete this product?")){
        products.splice(index,1);
        localStorage.setItem("productsData",JSON.stringify(products));
        loadAdminProducts();
    }
}
function loadAdminOrders() {
    if (localStorage.getItem("admin") !== "true") {
        alert("Login as admin");
        window.location = "admin_login.html";
        return;
    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let div = document.getElementById("adminOrders");

    div.innerHTML = "";

    if (orders.length === 0) {
        div.innerHTML = "<h3>No orders available</h3>";
        return;
    }

    orders.forEach(o => {
        div.innerHTML += `
        <h3>User: ${o.user}</h3>
        <p>Date: ${o.date}</p>
        <p><b>Address:</b> ${o.address}</p>
        <p><b>Payment:</b> ${o.payment}</p>
        `;

        o.items.forEach(i => {
            let p = products.find(x => x.id === i.id);
            if (!p) return;

            div.innerHTML += `
            <div class="product">
                <img src="${p.img}">
                <p>${p.name} x ${i.qty}</p>
            </div>`;
        });

        div.innerHTML += "<hr>";
    });
}

function logout() {
    let confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {
        localStorage.removeItem("user");
        localStorage.removeItem("pass"); // optional but better

        alert("Logged out successfully");

        window.location.href = "index.html";
    }
}