import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <div className="cart-list">
        {cartItems.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.imageUrl} alt={item.title} />
              <h3>{item.title}</h3>
              <p>Precio: ${item.price}</p>
              <button onClick={() => removeFromCart(item._id)}>Eliminar</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
