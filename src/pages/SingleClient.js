import { useSelector, useDispatch } from 'react-redux'
import {deleteClient, selectClientById} from '../store/clientsSlice'

import {useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CustomModal from "../components/modal/CustomModal";
import React, {useState} from "react";
import EditClientForm from "../components/clients/EditClientForm";

const SingleClient = () => {
    const { clientId } = useParams()
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const [requestStatus, setRequestStatus] = useState('idle')
    const navigate = useNavigate();

    const handleClickButton = () => {
        setOpenModal(false);
    }

    const client = useSelector((state) => selectClientById(state, Number(clientId)))


    const onDeleteClientClicked = () => {
        try {
            setRequestStatus('pending')
            dispatch(deleteClient({ id: client.id })).unwrap()
            navigate("/client");
        } catch (err) {
            console.error('Failed to delete the client', err)
        } finally {
            setRequestStatus('idle')
        }
    }

    if (!client) {
        return (
            <section>
                <h2>Client not found!</h2>
            </section>
        )
    }

    return (
        <>
            <article>
                <h2>{client.lastName} {client.firstName}</h2>
                <p>{client.email} , {client.phone}</p>
                <p>{client.birthDate}</p>
                <button onClick={() => setOpenModal(true)}>edit</button>
                <button onClick={onDeleteClientClicked}>delete</button>
            </article>
            {openModal &&
                <CustomModal onClose={handleClickButton} size="small">
                    <EditClientForm clientId={client.id} onCancel={handleClickButton} onSubmit={handleClickButton} />
                </CustomModal>
            }
        </>
    )
}

export default SingleClient;