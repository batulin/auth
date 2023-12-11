import React, {useState} from 'react';
import PlacesList from "../components/places/PlacesList";
import AddPlaceForm from "../components/places/AddPlaceForm";
import CustomModal from "../components/modal/CustomModal";
import CreateButton from "../components/buttons/CreateButton";

const PlacesPage = () => {
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
                <h2>Список мест</h2>
                <div className="buttons">
                    <CreateButton onClickButton={onClickButton} />
                </div>
            </div>
            <div className="card">
                <PlacesList />
            </div>

            {modalOpen &&
                <CustomModal onClose={handleClickButton} size="small">
                   <AddPlaceForm onCancel={handleClickButton} onSubmit={handleClickButton} />
                </CustomModal>
            }
        </>
    );
};

export default PlacesPage;