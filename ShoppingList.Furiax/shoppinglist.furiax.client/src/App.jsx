import { useEffect, useState } from 'react';
import './App.css';
import Item from "./Item.jsx"

function App() {
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [itemName, setItem] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (showModal) {
            console.log("Modal is showing, focusing on the item name input");
            document.querySelector('input[type="text"]').focus();
        }
    }, [showModal]);
    
    useEffect(()=>{
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
    const addNewItem = async (e) =>{
        e.preventDefault();
        if(!itemName.trim()){
            alert("Item name is required");
            return;
        }
        const newItem = {itemName, quantity};

        try{
            const response = await fetch('https://localhost:7011/api/ShoppingList', {
                method:'POST', 
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(newItem)
            });
            if(!response.ok){
                throw new Error('Failed to add item');
            }
            setShowModal(false);
            setItem('');
            setQuantity('1');
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
            <button onClick={()=>
                setShowModal(true)}>
                    + Add Item
            </button>
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
        {showModal && (
            <div className={`modal fade ${showModal ? 'show': ''}`} tabIndex="-1">
                <div className='modal-dialog'>
                    <div className='modal-header'>
                        <h2 className='modal-title'>Add new item</h2>
                        <button type="button" className='btn-close' onClick={()=> setShowModal(false)}></button>
                    </div>
                    <div className='modal-body'>
                        <form onSubmit={addNewItem}>
                            <div className='mb-3'>
                                <label className="form-label">Item name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={itemName}
                                    onChange={(e) => setItem(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Quantity:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    min="1"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Add</button>
                            <button type="button" className="btn btn-secondary ms-2" onClick={() => setShowModal(false)}>Close</button>
                        
                        </form>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export default App;