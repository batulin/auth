import {Link} from "react-router-dom";

const ClientsItem = ({ client }) => {
    return (
        <article>
            <h2>{client.lastName} {client.firstName}</h2>
            <p>{client.email} , {client.phone}</p>
            <p>{client.birthDate}</p>
            <Link to={`/client/${client.id}`}>view</Link>
        </article>
    )
}
export default ClientsItem