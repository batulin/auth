import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {selectPlaceById, updatePlace} from "../../store/placesSlice";

const EditPlaceForm = ({placeId, onCancel, onSubmit}) => {
    const place = useSelector((state) => selectPlaceById(state, Number(placeId)))


    const [number, setNumber] = useState(place.number)
    const [typeId, setTypeId] = useState(place.typeId);
    const [requestStatus, setRequestStatus] = useState('idle')

    const types = useSelector(state => state.types.types)
    const dispatch = useDispatch()

    if (!place) {
        return (
            <section>
                <h2>Place not found!</h2>
            </section>
        )
    }

    const onNumberChanged = e => setNumber(e.target.value)
    const onTypeChanged = e => setTypeId(e.target.value)

    const canSave = [number].every(Boolean) && requestStatus === 'idle';

    const onSavePlaceClicked = () => {
        console.log(number)
        if (canSave) {
            try {
                setRequestStatus('pending')
                dispatch(updatePlace({ id: placeId, number, typeId: Number(typeId) })).unwrap()

                setNumber('');
                onSubmit();
            } catch (err) {
                console.error('Failed to save the place', err)
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    const typesOptions = types.map(type => (
        <option key={type.id} value={type.id}>
            {type.name}
        </option>
    ))

    return (
        <section>
            <div className="form-header">
                <h3>Редактировать место</h3>
            </div>
            <form>
                <div className="form-block">
                    <label htmlFor="placeNumber">Номер места:</label>
                    <input
                        type="text"
                        id="placeNumber"
                        name="placeNumber"
                        value={number}
                        onChange={onNumberChanged}
                    />
                </div>
                <div className="form-block">
                    <label htmlFor="placeType">Тип:</label>
                    <select id="placeType" value={typeId} onChange={onTypeChanged}>
                        <option value=""></option>
                        {typesOptions}
                    </select>
                </div>
                <div className="form-footer">
                    <button
                        className="cancel"
                        type="button"
                        onClick={onCancel}
                    >Отмена</button>
                    <button
                        className="submit"
                        type="button"
                        onClick={onSavePlaceClicked}
                    >Save Place</button>
                </div>
            </form>
            <form>
            </form>
        </section>
    )
}

export default EditPlaceForm