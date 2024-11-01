import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  const [inventory, setInventory] = useState([
    { name: 'bacon', unitPrice: 10.99, quantity: 10},
    { name: 'eggs', unitPrice: 3.99, quantity: 10},
    { name: 'cheese', unitPrice: 6.99, quantity: 10},
    { name: 'chives', unitPrice: 1.00, quantity: 10},
    { name: 'wine', unitPrice: 11.99, quantity: 10},
    { name: 'brandy', unitPrice: 17.55, quantity: 10},
    { name: 'bananas', unitPrice: 0.69, quantity: 10},
    { name: 'ham', unitPrice: 2.69, quantity: 10},
    { name: 'tomatoes', unitPrice: 3.26, quantity: 10},
    { name: 'tissue', unitPrice: 8.45, quantity: 10},
    ]);

  const [shoppingCart, setShoppingCart] = useState([]);

  const handleAddToCart = (item) => {
    // Check if item is available in inventory before adding
    const inventoryItem = inventory.find(invItem => invItem.name === item.name);
    if (inventoryItem.quantity <= 0) {
      return; // Exit if no inventory available
    }

    // Create a copy of the item to avoid reference issues
    const itemToAdd = {...item};

    setInventory(prevInventory => prevInventory.map(inventoryItem => 
      inventoryItem.name === item.name 
        ? {...inventoryItem, quantity: inventoryItem.quantity - 1} 
        : inventoryItem
    ));

    const existingItem = shoppingCart.find(cartItem => cartItem.name === item.name);
    
    if(existingItem){
      setShoppingCart(prevShoppingCart => prevShoppingCart.map(cartItem => 
        cartItem.name === item.name 
          ? {...cartItem, quantity: cartItem.quantity + 1} 
          : cartItem
      ));
    }else{
      itemToAdd.quantity = 1;
      setShoppingCart(prevCart => [...prevCart, itemToAdd]);
    }
  }

  const handleRemoveFromCart = (item) => {
    const cartItem = shoppingCart.find(cartItem => cartItem.name === item.name);
    
    // Add back to inventory
    setInventory(prevInventory => prevInventory.map(inventoryItem =>
      inventoryItem.name === item.name
        ? {...inventoryItem, quantity: inventoryItem.quantity + 1}
        : inventoryItem
    ));
    
    if(cartItem.quantity === 1){
      setShoppingCart(prevShoppingCart => prevShoppingCart.filter(cartItem => cartItem.name !== item.name));
    }else{
      setShoppingCart(prevShoppingCart => prevShoppingCart.map(cartItem => 
        cartItem.name === item.name 
          ? {...cartItem, quantity: cartItem.quantity - 1} 
          : cartItem
      ));
    }
  }

  return (
    <div className="App">
      <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '250px', padding: '10px'}}>{inventory.map(item => <div key={item.name}>
        <div onClick={() => handleAddToCart(item)} style={{cursor: item.quantity > 0 ? 'pointer' : 'not-allowed'}}>
        <p>{item.name}</p>
        <p>{item.unitPrice}</p>
        <p>{item.quantity}</p>
        </div>
       
      </div>)}</div>
      <div>
        <h3>Shopping Cart</h3>
        {shoppingCart.map(item => <div key={item.name}>
          <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row' ,width: '250px', padding: '10px'}}>
            <div onClick={() => handleRemoveFromCart(item)} style={{cursor: 'pointer'}}>
              X
            </div>
          <p>{item.name}</p>
          <p>{item.unitPrice}</p>
          <p>{item.quantity}</p>
          </div>
          
        </div>)}
      </div>
     

    </div>
  );
}

export default App;
