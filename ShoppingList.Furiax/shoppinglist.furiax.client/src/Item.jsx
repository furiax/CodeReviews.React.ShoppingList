export default function Item({id, name, quantity, isPicked, onEdit, onDelete}){
    return(
        <>
            <tr>
                <td><input type="checkbox" defaultChecked={isPicked}/></td>
                <td>{name}</td>
                <td>{quantity}</td>
                <td>
                    <button onClick={()=>onEdit(id, name, quantity)}>Edit</button>
                    <button onClick={()=>onDelete(id)}>Delete</button>
                </td>
            </tr>
        </>
    )
}