import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {fetchClients, getClientsError, getClientsStatus, selectAllClients} from "../../store/clientsSlice";
import ClientsItem from "./ClientsItem";

const ClientsList = () => {
    const dispatch = useDispatch();

    const clients = useSelector(selectAllClients);
    const clientsStatus = useSelector(getClientsStatus);
    const error = useSelector(getClientsError);

    useEffect(() => {
        if (clientsStatus === 'idle') {
            dispatch(fetchClients())
        }
    }, [clientsStatus, dispatch])

    let content;
    if (clientsStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (clientsStatus === 'succeeded') {
        content = clients.map(client => <ClientsItem key={client.id} client={client} />)
    } else if (clientsStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <section>
            {content}
        </section>
    )
}
export default ClientsList