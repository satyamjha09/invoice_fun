import React, { useState } from 'react';
import './Invoice.css';

const Invoice = () => {
    
  const [items, setItems] = useState([]);

  const [total, setTotal] = useState(0);

  const handleAddItem = () => {
    
    const newItem = {
      id: Date.now(),
      description: '',
      quantity: 1,
      price: 0,
      amount: 0
    };

    setItems([...items, newItem]);
  };

  const handleInputChange = (id, name, value) => {

    const updatedItems = items.map(item => {

      if (item.id === id) {
        const updatedItem = { ...item, [name]: value };
        updatedItem.amount = updatedItem.quantity * updatedItem.price;
        return updatedItem;
      }

      return item;
      
    });

    setItems(updatedItems);
    calculateTotal(updatedItems);

  };

  const calculateTotal = (items) => {
    const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
    setTotal(totalAmount);
  };

  return (
    <div className="invoice-container">
      <h1>Invoice App</h1>
      <button onClick={handleAddItem}>Add Item</button>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>

              <td>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleInputChange(item.id, 'description', e.target.value)}
                />
              </td>

              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleInputChange(item.id, 'quantity', e.target.value)}
                />
              </td>

              <td>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handleInputChange(item.id, 'price', e.target.value)}
                />
              </td>

              <td>{item.amount.toFixed(2)}</td>

            </tr>
          ))}
        </tbody>
      </table>
      <div className="total">
        <h2>Total: ${total.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default Invoice;
