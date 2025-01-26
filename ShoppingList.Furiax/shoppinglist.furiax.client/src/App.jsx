import { useEffect, useState } from 'react';
import './App.css';
import Item from "./Item.jsx"

function App() {
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [currentItemId, setCurrentItemId] = useState(null);

    useEffect(() => {
        if (showModal) {
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
    const handleAddNewItem = async (e) =>{
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
            closeModal();
            fetchData();
        }
        catch(error){
            console.log(error);
        }
    }
    const handleEditItem = async (e) => {
        e.preventDefault();
        if(!itemName.trim()){
            alert("Item name is required");
            return;
        }
        const updatedItem = {id: currentItemId, itemName, quantity};
        try{
            const response = await fetch(`https://localhost:7011/api/ShoppingList/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItem),
            });
            if(!response.ok){
                throw new Error("Failed to update item");
            }
            closeModal();
            fetchData();
        }catch(error){
            console.log(error);
        }
    }
    const handleDelete = async (id) =>{
        if(!window.confirm("Are you sure you want to delete this item ?")){
            return;
        }
        try{
            const response = await fetch(`https://localhost:7011/api/ShoppingList/${id}`, {
                method: 'DELETE',
            });
            if(!response.ok){
                throw new Error(`Failed to delete item with id ${id}`);
            }
            fetchData();
        }catch(error){
            console.log(error);
        }
    }
    const handleDeleteAll = async () => {
        if(!window.confirm("Are you sure you want to delete ALL items ?")){
            return;
        }
        try{
            const response = await fetch('https://localhost:7011/api/ShoppingList/DeleteAll', {
                method: 'DELETE',
            });
            if(!response.ok){
                throw new Error("Failed to delete all items");
            }
            fetchData();
        }catch(error){
            console.log(error);
        }
    }
    const openEditModal = (id, itemName, quantity) =>{
        setCurrentItemId(id);
        setItemName(itemName);
        setQuantity(quantity);
        setIsEditMode(true);
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
        setIsEditMode(false);
        setItemName('');
        setQuantity(1);
        setCurrentItemId(null);
    }
    return (
        <>
        <div className='container'>
            <h1>Shopping List</h1>
            <button onClick={()=>{
                setIsEditMode(false);
                setShowModal(true)}}>
                    + Add Item
            </button>
            <button onClick={handleDeleteAll}>Clear List</button>
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
                        id={item.id}
                        name={item.itemName}
                        quantity={item.quantity}
                        isPicked={item.isPicked}
                        onEdit={openEditModal}
                        onDelete={handleDelete}
                        />
                        ))
                    ) : <p>Loading items...</p>}
                </tbody>
            </table>
        </div>
        {showModal && (
            <div className={`modal fade ${showModal ? 'show': ''}`} tabIndex="-1">
                <div className='modal-dialog'>
                    <div className='modal-header'>
                        <h2 className='modal-title'>{isEditMode ? 'Edit item' : "Add new item"}</h2>
                        <button type="button" className='btn btn-close' onClick={closeModal}>x</button>
                    </div>
                    <div className='modal-body'>
                        <form onSubmit={isEditMode ? handleEditItem : handleAddNewItem}>
                            <div className='mb-3'>
                                <label className="form-label">Item name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
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
                            <button type="submit" className="btn btn-primary">{isEditMode ? "Save Changes" : "Add"}</button>
                            <button type="button" className="btn btn-secondary ms-2" onClick={closeModal}>Close</button>
                        
                        </form>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export default App;