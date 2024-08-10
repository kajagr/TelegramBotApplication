import React, {useState} from 'react'
import './Card.css'
import Button from '../Button/Button'



function Card({ticket, onAdd, onRemove}) {

  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount(count + 1)
    onAdd(ticket)
  }
  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1)
      onRemove(ticket)
    } 
  }

  const {title, price, Image, id} = ticket
  return (
    <div className='card'>
      <div className="image__container">
        <img src={Image} alt={title} />
      </div>
      <h4 className="card__title">
        {title}
        <h5>{count + ' x'}</h5>
      </h4>
      
      <div className="btn__conta">
        <Button title={'+'} type={'add'} onClick={handleIncrement}/>
        <Button title={'-'} type={'remove'} onClick={handleDecrement}/>
      </div>
    </div>
  )
}

export default Card
