import React, { useState } from 'react'

const BetaInvoice = () => {

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const handleAddItem = () => {

    const newItem = {
      id:Date.now(),
      quantity:'',
      name:'',
      price:0,
      amount:0
    };

    setItems([...items , newItem]);

  }

  const handleRemoveItem = (id) => {

    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    calculateTotal(updatedItems);
  }

  const handleInputChange = (id , name, value) => {

    const updatedItems = items.map(item => {

      if(item.id === id) {
        const updatedItem = {...item , [name]: value};
        updatedItem.amount = updatedItem.quantity * updatedItem.price;
        return updatedItem;
      }
      return item;
    });

    setItems(updatedItems);
    calculateTotal(updatedItems);

  };

  const calculateTotal = (items) => {
    const totalAmount = items.reduce((sum , item) => sum + item.amount , 0);
    setTotal(totalAmount);
  }


  return (
    <div className='invoice-container'>

      <h1> Invoice App </h1>
      <button onClick={handleAddItem}>Add Item</button>
     

      {items.map(item => (

        <tr key={item.id}>

          <td>
            <input 
             type="text"
             placeholder='text'
             value={item.name}
             onChange={(e) => handleInputChange(item.id, 'name' , e.target.value)}
            />
          </td>

          <td>
            <input 
             type="number"
             placeholder='quantity'
             value={item.quantity}
             onChange={(e) => handleInputChange(item.id, 'quantity' , e.target.value)}
            />
          </td>


          <td>
            <input 
             type="number"
             placeholder='text'
             value={item.price}
             onChange={(e) => handleInputChange(item.id, 'price' , e.target.value)}
            />
          </td>

          <td> 
            {item.amount.toFixed(2)} 
          </td>

          <td>
                <button onClick={() => handleRemoveItem(item.id)}>+</button>
          </td>

        </tr>
      ))}

      <div className='total'>

        <h2> Total: ${total.toFixed(2)} </h2>

      </div>

      

    </div>
  )
}

export default BetaInvoice