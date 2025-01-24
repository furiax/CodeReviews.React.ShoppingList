import { useEffect, useState } from 'react';
import './App.css';
import Item from "./Item.jsx"

function App() {
    const [items, setItems] = useState([]);

    useEffect(()=>{
        fetch('https://localhost:7011/api/ShoppingList')
        .then(res => res.json())
        .then(data => setItems(data))
    })

    return (
        <>
        <div>
            <h1>Shopping List</h1>
            {items ? ( items.map((item, index) =>(
                <Item key={index}
                id={item.id}
                name={item.itemName}
                quantity={item.quantity}
                isPicked={item.isPicked}
                />))
                ) : <p>Loading items...</p>}
        </div>
        </>
    );
}

export default App;