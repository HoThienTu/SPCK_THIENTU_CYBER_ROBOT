// Dùng localStorage để lưu giỏ hàng xuyên suốt các trang
let cart = JSON.parse(localStorage.getItem('cart')) || [];

window.addEventListener('load', function() {
    checkLoginStatus();
    renderCart();
});

function checkLoginStatus() {
    const userZone = document.getElementById('user-zone');
    const guestZone = document.getElementById('guest-zone');
    const displayName = document.getElementById('display-user-name');
    const adminLink = document.getElementById('admin-link');
    
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser && userZone && guestZone) {
        guestZone.classList.add('d-none');
        userZone.classList.remove('d-none');
        userZone.classList.add('d-flex');
        displayName.innerText = currentUser.toUpperCase();

        if (currentUser.toLowerCase() === "admin" && adminLink) {
            adminLink.classList.remove('d-none');
        }
    }
}

function logout() {
    if(confirm("Xác nhận đăng xuất?")) {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}

function addToCart(name, price, image) {
    cart.push({ name, price, image });
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    alert("Đã thêm " + name + " vào giỏ!");
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    const cartListElement = document.getElementById('cart-items-list');
    const totalPriceElement = document.getElementById('cart-total-price');
    const badgeElement = document.getElementById('cart-count-badge');

    if (!cartListElement) return;

    if (cart.length === 0) {
        cartListElement.innerHTML = '<p class="text-muted text-center mt-5">Giỏ hàng trống</p>';
        if(totalPriceElement) totalPriceElement.innerText = '0đ';
        if(badgeElement) badgeElement.innerText = '0';
        return;
    }

    let html = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        html += `
            <div class="d-flex align-items-center mb-3 pb-2 border-bottom">
                <img src="${item.image}" style="width: 40px; height: 40px; object-fit: contain;" class="me-2">
                <div class="flex-grow-1 small">
                    <div class="fw-bold">${item.name}</div>
                    <div class="text-primary">${item.price.toLocaleString()}đ</div>
                </div>
                <button class="btn btn-sm text-danger" onclick="removeFromCart(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>`;
    });
    cartListElement.innerHTML = html;
    if(totalPriceElement) totalPriceElement.innerText = total.toLocaleString() + 'đ';
    if(badgeElement) badgeElement.innerText = cart.length;
}