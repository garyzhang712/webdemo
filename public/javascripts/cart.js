const myOffcanvas = document.getElementById('cart')
let items = [];
function getCart() {
    fetch('/users/cart', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`, // notice the Bearer before your token
        },
    }).then(resp => resp.json())
        .then(data => {
            items = data
            renderCart(data)
        })
}

function renderCart(items) {

    let str = items.map(item => {
        return `
                <div class="card-item bg-white shadow">
                <div class="row p-3">
                    <div class="col-4">
                        <img class="w-100" src="${item.image}" alt="">
                    </div>
                    <div class="col-4">
                        <div class="card-item-title">
                            <h5>${item.name}</h5>
                            <p><strong>C$${item.price}</strong></p>
                            <div class="input-group mb-3">
                                <button class="btn btn-secondary btn-sm" onclick="updateCart(${item.id}, -1)" type="button">- </button>
                                <input type="text" id="${item.id}-qu" disabled min="1" value="${item.quantity}"
                                    class="form-control form-control-sm">
                                <button class="btn btn-secondary btn-sm" onclick="updateCart(${item.id}, 1)" type="button">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-4 d-flex justify-content-end align-items-start">
                        <button class="btn-close text-reset" aria-label="Close" type="button" onclick="removeItem(${item.id})"></button>
                    </div>
                </div>
            </div>`
    }).join('');
    document.getElementById('items').innerHTML = str || '<div class="text-center">Your cart is empty</div>';
    // total
    let total = 0;
    items.forEach(item => {
        total += item.price * item.quantity;
    });
    document.getElementById('total').innerHTML = `Total: C$${total}`;

}

function updateCart(id, quantity) {
    fetch('/users/addToCart', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`, // notice the Bearer before your token
        },
        body: JSON.stringify({
            product_id: id,
            quantity: quantity,
        }),
    }).then(resp => {
        getCart()
    })
}

function removeItem(id) {
    fetch('/users/removeFromCart', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`, // notice the Bearer before your token
        },
        body: JSON.stringify({
            product_id: id,
        }),
    }).then(resp => {
        getCart()
    })
}

myOffcanvas.addEventListener('show.bs.offcanvas', function() {
    getCart()
})


function addToCart() {
    if (localStorage.token) {
        fetch('/users/addToCart', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`, // notice the Bearer before your token
            },
            body: JSON.stringify({
                product_id: product_id,
                quantity: document.getElementById('count').value,
            }),
        }).then(resp => {
            if (resp.ok) {
                showMessage('Item added to your cart')
            }
        })
    }
}


