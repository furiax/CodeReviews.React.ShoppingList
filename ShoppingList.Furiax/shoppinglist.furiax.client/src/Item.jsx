export default function Item({id, name, quantity, isPicked}){
    return(
        <>
            <tr>
                <td><input type="checkbox" defaultChecked={isPicked}/></td>
                <td>{name}</td>
                <td>{quantity}</td>
                <td>
                    <button>Edit</button>
                    <button>Delete</button>
                </td>
            </tr>
        </>
    )
}