import { useEffect, useState } from 'react';
import './App.css';
import Item from "./Item.jsx"

function App() {
    const [items, setItems] = useState([]);

    useEffect(()=>{
        /*fetch('https://localhost:7011/api/ShoppingList')
        .then(res => res.json())
        .then(data => setItems(data))*/
        fetchData();
    },[])

    const fetchData = async() =>{
        try{
            const response = await fetch('https://localhost:7011/api/ShoppingList');
            if(!response.ok){
                throw new Error(`Error: ${response.status}`);
            }
            const result = await response.json();
            setItems(result);
        }
        catch(error){
            console.log(error);
        }
    }
    const addNewItem = async (newItem) =>{
        try{
            const response = await fetch('https://localhost:7011/api/ShoppingList', {method:'POST', headers:{'Content-Type':'application/json'},body: JSON.stringify(newItem)
            });
            if(!response.ok){
                throw new Error('Failed to add item');
            }
            fetchData();
        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <>
        <div className='container'>
            <h1>Shopping List</h1>
            <button onClick={()=>addNewItem({itemName:'test'})}>+ Add Item</button>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items ? ( items.map((item) =>(
                    <Item key={item.id}
                    name={item.itemName}
                    quantity={item.quantity}
                    isPicked={item.isPicked}
                    />))
                    ) : <p>Loading items...</p>}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default App;