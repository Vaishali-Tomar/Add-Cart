const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
  ];

  const cart = [];

  document.addEventListener('DOMContentLoaded', () => {
    const productsList = document.getElementById('products');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');

    // Populate product list
    Products.forEach(product => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `${product.name} - ${product.price}
        <button onclick="addToCart(${product.id})">Add</button>`;
      productsList.appendChild(listItem);
    });

    // Update cart UI
    const updateCart = () => {
      cartItems.innerHTML = '';
      let total = 0;

      cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `${item.name} - Quantity: ${item.quantity} - $${item.price * item.quantity}
          <button onclick="removeFromCart(${item.id})">Remove</button>`;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
      });

      totalPrice.textContent = `Total Price: ${total}`;
    };

    // Add product to cart
    window.addToCart = (productId) => {
      const product = Products.find(p => p.id === productId);
      const cartItem = cart.find(item => item.id === productId);

      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      updateCart();
    };

    // Remove product from cart
    window.removeFromCart = (productId) => {
      const index = cart.findIndex(item => item.id === productId);
      if (index !== -1) {
        const cartItem = cart[index];
        cartItem.quantity -= 1;

        if (cartItem.quantity === 0) {
          cart.splice(index, 1);
        }

        updateCart();
      }
    };
  });
  