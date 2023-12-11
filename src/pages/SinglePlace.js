import { useSelector, useDispatch } from 'react-redux'
import {deletePlace, selectPlaceById} from '../store/placesSlice'

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CustomModal from "../components/modal/CustomModal";
import React, {useState} from "react";
import EditPlaceForm from "../components/places/EditPlaceForm";

const SinglePlace = () => {
    const { placeId } = useParams()
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const [requestStatus, setRequestStatus] = useState('idle')
    const navigate = useNavigate();

    const handleClickButton = () => {
        setOpenModal(false);
    }

    const place = useSelector((state) => selectPlaceById(state, Number(placeId)))


    const onDeletePlaceClicked = () => {
        try {
            setRequestStatus('pending')
            dispatch(deletePlace({ id: place.id })).unwrap()
            navigate("/");
        } catch (err) {
            console.error('Failed to delete the place', err)
        } finally {
            setRequestStatus('idle')
        }
    }

    if (!place) {
        return (
            <section>
                <h2>Place not found!</h2>
            </section>
        )
    }

    return (
        <>
            <article>
                <h2>{place.number}</h2>
                <p>{place.id}</p>
                <button onClick={() => setOpenModal(true)}>edit</button>
                <button onClick={onDeletePlaceClicked}>delete</button>
            </article>
            {openModal &&
                <CustomModal onClose={handleClickButton} size="small">
                    <EditPlaceForm placeId={place.id} onCancel={handleClickButton} onSubmit={handleClickButton} />
                </CustomModal>
            }
        </>
    )
}

export default SinglePlace;