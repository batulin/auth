import React, {useState} from 'react';
import CustomModal from "../components/modal/CustomModal";
import ClientsList from "../components/clients/ClientsList";
import AddClientForm from "../components/clients/AddClientForm";
import { UilPlus } from '@iconscout/react-unicons'
import CreateButton from "../components/buttons/CreateButton";

const ClientsPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [message, setMessage] = useState('');


    const handleClickButton = (value) => {
        setModalOpen(false);
        setMessage(value);
    }

    const onClickButton = () => setModalOpen(true);

    return (
        <>
            <div className="page-header">
                <h2>Список клиентов</h2>
                <div className="buttons">
                    <CreateButton onClickButton={onClickButton} />
                </div>
            </div>
            <div className="card">
                <ClientsList />
            </div>

            {modalOpen &&
                <CustomModal onClose={handleClickButton} size="small">
                   <AddClientForm onCancel={handleClickButton} onSubmit={handleClickButton} />
                </CustomModal>
            }
        </>
    );
};

export default ClientsPage;