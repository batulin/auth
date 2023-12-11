import { useState } from "react";
import { useDispatch } from "react-redux";
import {addNewType} from "../../store/typesSlice";

const AddTypeForm = ({onCancel, onSubmit}) => {
    const dispatch = useDispatch()

    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [price, setPrice] = useState(0);
    const [createAt, setCreateAt] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const onNameChanged = e => setName(e.target.value)
    const onSlugChanged = e => setSlug(e.target.value)
    const onPriceChanged = e => setPrice(e.target.value)
    const onCreateAtChanged = e => setCreateAt(e.target.value)

    const canSave = [name, slug, price, createAt].every(Boolean) && addRequestStatus === 'idle';
    const onSavePlaceClicked = () => {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewType({ name, slug, price: Number(price), createAt }))

                setName('');
                setSlug('');
                setPrice(0);
                setCreateAt('');
                onSubmit();
            } catch (err) {
                console.error('Failed to save the type', err)
            } finally {
                setAddRequestStatus('idle')
            }
    }

    return (
        <section>
            <div className="form-header">
                <h3>Добавить тип</h3>
            </div>

            <form>
                <div className="form-block">
                    <label htmlFor="typeName">Имя типа:</label>
                    <input
                        type="text"
                        id="typeName"
                        name="typeName"
                        value={name}
                        onChange={onNameChanged}
                    />
                </div>
                <div className="form-block">
                    <label htmlFor="typeSlug">Слаг типа:</label>
                    <input
                        type="text"
                        id="typeSlug"
                        name="typeSlug"
                        value={slug}
                        onChange={onSlugChanged}
                    />
                </div>
                <div className="form-block">
                    <label htmlFor="typePrice">Цена типа:</label>
                    <input
                        type="number"
                        id="typePrice"
                        name="typePrice"
                        value={price}
                        onChange={onPriceChanged}
                    />
                </div>
                <div className="form-block">
                    <label htmlFor="typeCreateAt">Время создания типа:</label>
                    <input
                        type="date"
                        id="typeCreateAt"
                        name="typeCreateAt"
                        value={createAt}
                        onChange={onCreateAtChanged}
                    />
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
        </section>
    )
}
export default AddTypeForm