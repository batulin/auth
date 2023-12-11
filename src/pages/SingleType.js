import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom';
import CustomModal from "../components/modal/CustomModal";
import React, {useState} from "react";
import {deleteType, selectTypeById} from "../store/typesSlice";
import EditTypeForm from "../components/types/EditTypeForm";

const SingleType = () => {
    const { typeId } = useParams()
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const [requestStatus, setRequestStatus] = useState('idle')
    const navigate = useNavigate();

    const handleClickButton = () => {
        setOpenModal(false);
    }

    const type = useSelector((state) => selectTypeById(state, Number(typeId)))

    const onDeleteClicked = () => {
        try {
            setRequestStatus('pending')
            dispatch(deleteType({ id: type.id })).unwrap()
            navigate("/type");
        } catch (err) {
            console.error('Failed to delete', err)
        } finally {
            setRequestStatus('idle')
        }
    }
    if (!type) {
        return (
            <section>
                <h2>Type not found!</h2>
            </section>
        )
    }

    return (
        <>
            <article>
                <h2>{type.name}</h2>
                <p>{type.slug}</p>
                <p>{type.price}</p>
                <p>{type.createAt}</p>
                <button onClick={() => setOpenModal(true)}>edit</button>
                <button onClick={onDeleteClicked}>delete</button>
            </article>
            {openModal &&
                <CustomModal onClose={handleClickButton} size="small">
                    <EditTypeForm typeId={type.id} onCancel={handleClickButton} onSubmit={handleClickButton} />
                </CustomModal>
            }
        </>
    )
}

export default SingleType;