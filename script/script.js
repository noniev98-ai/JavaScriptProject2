
let cart = [];

function addToCart(productId,productName,productPrice){
  

      const qtyInput = document.getElementById(`qty-${productId}`);
      const qty = parseInt(qtyInput.value);

      if (qty < 1 || isNaN(qty)){
        alert('Please enter a valid quantity!');
        return;
      }

    const existinCart = cart.findIndex(item => item.id === productId);
    // const IsExistinCart = cart.includes(productId);

    // if (!IsExistinCart)
    if  (existinCart > -1)
    {
             
           alert(`Item: ${productName}  already exist!`);
            // Reset quantity input
           qtyInput.value = 1;
           return;
    }
        else
    {
         // Add new item to cart
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: qty})
    }
 


     // Reset quantity input
    qtyInput.value = 1;

    // Update cart display
    updateCartDisplay();
    

}

function updateCartDisplay(){
    const emptyCart = document.getElementById('empty-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

     // Clear current cart items display
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartTotal.style.display = 'none';
        return;
    }

    emptyCart.style.display = 'none';
    cartTotal.style.display = 'block';


     // Display each cart item
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-details">₱${item.price.toFixed(2)} each</div>
            </div>
            <div class="cart-item-actions">
                <div class="qty-controls">
                     <span class="qty-display">${item.quantity}</span>
                </div>
                <div class="item-total">₱${itemTotal.toFixed(2)}</div>
            </div>
        `;
        
        cartItems.appendChild(cartItemDiv);
    });

    // Update total price
    updateTotalPrice();

}

// Calculate and update total price
function updateTotalPrice() {
    const total = cart.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    document.getElementById('total-price').textContent = total.toFixed(2);
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Create order summary
    let orderSummary = 'ORDER SUMMARY:\n\n';
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        orderSummary += `${item.name}\n`;
        orderSummary += `  Quantity: ${item.quantity} × ₱${item.price.toFixed(2)} = ₱${itemTotal.toFixed(2)}\n\n`;
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    orderSummary += `TOTAL AMOUNT: ₱${total.toFixed(2)}\n\n`;
    orderSummary += 'Thank you for your order!\nWe will contact you for delivery details.';

    alert(orderSummary);

    // Clear cart after checkout
    if (confirm('Would you like to place this order?')) {
        cart = [];
        updateCartDisplay();
        alert('Order placed successfully! We will contact you soon.');
    }
}

// Initialize cart display on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
});

function resetall(){
    location.reload();
}