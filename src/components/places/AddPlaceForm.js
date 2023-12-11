import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { addNewPlace } from "../../store/placesSlice";

const AddPlaceForm = ({onCancel, onSubmit}) => {
    const dispatch = useDispatch()

    const [number, setNumber] = useState('');
    const [typeId, setTypeId] = useState(0);
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const types = useSelector(state => state.types.types)
    const onNumberChanged = e => setNumber(e.target.value)
    const onTypeChanged = e => setTypeId(e.target.value)

    const canSave = [number, typeId].every(Boolean) && addRequestStatus === 'idle';
    const onSavePlaceClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPlace({ number, typeId: Number(typeId) })).unwrap()

                setNumber('');
                setTypeId(0);
                onSubmit();
            } catch (err) {
                console.error('Failed to save the place', err)
            } finally {
                setAddRequestStatus('idle')
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
                <h3>Добавить место</h3>
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
                        disabled={!canSave}
                    >Save Place</button>
                </div>
            </form>
        </section>
    )
}
export default AddPlaceForm