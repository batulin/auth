import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {selectTypeById, updateType} from "../../store/typesSlice";

const EditTypeForm = ({typeId, onCancel, onSubmit}) => {
    const type = useSelector((state) => selectTypeById(state, Number(typeId)))

    const [name, setName] = useState(type.name);
    const [slug, setSlug] = useState(type.slug);
    const [price, setPrice] = useState(type.price);
    const [createAt, setCreateAt] = useState(type.createAt);
    const [requestStatus, setRequestStatus] = useState('idle')

    const dispatch = useDispatch()

    if (!type) {
        return (
            <section>
                <h2>Type not found!</h2>
            </section>
        )
    }

    const onNameChanged = e => setName(e.target.value)
    const onSlugChanged = e => setSlug(e.target.value)
    const onPriceChanged = e => setPrice(e.target.value)
    const onCreateAtChanged = e => setCreateAt(e.target.value)

    const canSave = [name, slug, price, createAt].every(Boolean) && requestStatus === 'idle';

    const onSaveTypeClicked = () => {
        if (canSave) {
            try {
                setRequestStatus('pending')
                dispatch(updateType({ id: typeId, name, slug, price, createAt })).unwrap()

                setName('');
                setSlug('');
                setPrice(0);
                setCreateAt('');
                onSubmit();
            } catch (err) {
                console.error('Failed to save the type', err)
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    return (
        <section>
            <div className="form-header">
                <h3>Редактировать тип</h3>
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
                    {/*<input*/}
                    {/*    type="date"*/}
                    {/*    id="typeCreateAt"*/}
                    {/*    name="typeCreateAt"*/}
                    {/*    defaultValue={createAt}*/}
                    {/*    onChange={onCreateAtChanged}*/}
                    {/*/>*/}
                    <input
                        type="datetime"
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
                        onClick={onSaveTypeClicked}
                        disabled={!canSave}
                    >Save Place</button>
                </div>
            </form>
        </section>
    )
}

export default EditTypeForm