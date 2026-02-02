import React, { useState, useEffect } from 'react';
import { Header } from './components/header';
import { Footer } from './components/Footer';
import { Guitar } from './components/Guitar';
import { db } from './data/db';

export const App = () => {
  function initialCart() {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(guitar) {
    const itemIndex = cart.findIndex((item) => guitar.id == item.id);
    console.log(itemIndex);

    if (itemIndex === -1) {
      // artículo no existe en el carrito
      guitar.quantity = 1;
      setCart([...cart, guitar]);
    } else {
      // artículo ya se ha añadido en el carrito
      const updatedCart = [...cart]; // Creando una copia de la variable de estado
      updatedCart[itemIndex].quantity++;
      setCart(updatedCart);
    }
  }

  function calculateTotal() {
    // let total = 0;
    // for (const guitar of cart) {
    //   total += guitar.price * guitar.quantity;
    // }
    // return total;
    let total = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return total;
  }

  function emptyCart() {
    setCart([]);
  }

  function delItemFromCart(guitar) {
    const updatedCart = cart.filter((item) => item.id !== guitar.id);
    setCart(updatedCart);
  }

  function decreaseQuantity(guitar) {
    if (guitar.quantity > 1) {
      const itemIndex = cart.findIndex((item) => guitar.id == item.id);
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity--;
      setCart(updatedCart);
    } else {
      delItemFromCart(guitar);
    }
  }

  function increaseQuantity(guitar) {
    const itemIndex = cart.findIndex((item) => guitar.id == item.id);
    const updatedCart = [...cart];
    updatedCart[itemIndex].quantity++;
    setCart(updatedCart);
  }

  return (
    <>
      <Header
        cart={cart}
        total={calculateTotal()}
        emptyCart={emptyCart}
        delItemFromCart={delItemFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
      />
      <main className='container-xl mt-5'>
        <h2 className='text-center'>Nuestra Colección</h2>
        <div className='row mt-5'>
          {data.map((guitar) => (
            <Guitar guitar={guitar} key={guitar.id} addToCart={addToCart} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};
