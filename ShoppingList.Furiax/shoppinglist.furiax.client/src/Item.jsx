export default function Item({id, name, quantity, isPicked}){
    return(
        <>
            <tr>
                <td>{id}.</td>
                <td>{quantity}x</td>
                <td>{name}</td>
                <td>{isPicked}</td>
            </tr>
        </>
    )
}