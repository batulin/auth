import React, {useState} from 'react';
import CustomModal from "../components/modal/CustomModal";
import TypesList from "../components/types/TypesList";
import AddTypeForm from "../components/types/AddTypeForm";
import CreateButton from "../components/buttons/CreateButton";

const TypesPage = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleClickButton = () => {
        setModalOpen(false);
    }

    const onClickButton = () => setModalOpen(true);

    return (
        <>
            <div className="page-header">
                <h2>Список типов</h2>
                <div className="buttons">
                    <CreateButton onClickButton={onClickButton} />
                </div>
            </div>
            <div className="card">
                <TypesList />
            </div>

            {modalOpen &&
                <CustomModal onClose={handleClickButton} size="small">
                   <AddTypeForm onCancel={handleClickButton} onSubmit={handleClickButton} />
                </CustomModal>
            }
        </>
    );
};

export default TypesPage;