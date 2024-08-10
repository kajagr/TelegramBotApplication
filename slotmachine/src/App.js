import React, {useState, useEffect} from 'react'
import './App.css'
import Card from './Components/Card/Card'
import Cart from './Components/Cart/Cart'

const {getData} = require('./db/db')

const telegram = window.Telegram.WebApp

const tickets = getData()
function App() {

  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    telegram.ready()
  })

  const onAdd = (ticket) => {
    const exist = cartItems.find((x) => x.price === ticket.price)
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.price === ticket.price ? { ...exist, price: exist.price, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...ticket, quantity: 1 }])
    }
  }
  
  const onRemove = (ticket) => {
    const exists = cartItems.find((x) => x.price === ticket.price);
    if (exists.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.price !== ticket.price));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.price === ticket.price ? { ...exists, quantity: exists.quantity - 1 } : x
        )
      )
    }
  }

  const onCheckout = () => {
    telegram.MainButton.text = "Pay"
    telegram.MainButton.show()
  }
  

  return (
    <>
      <h1 className='heading'>
        Buy Tickets!
      </h1>
      <div className='card__container'>
        {tickets.map(ticket => {
          return <Card ticket={ticket} id={ticket.id} onAdd={onAdd} onRemove={onRemove}/>
        })}
      </div> 
      <Cart cartItems={cartItems} onCheckout={onCheckout}>
      </Cart>
    </>
  );
}

export default App
