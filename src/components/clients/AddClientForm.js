import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { addNewPlace } from "../../store/placesSlice";
import {selectAllTypes} from "../../store/typesSlice";
import {addNewClient} from "../../store/clientsSlice";

const AddClientForm = ({onCancel, onSubmit}) => {
    const dispatch = useDispatch()

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const onLastNameChanged = e => setLastName(e.target.value)
    const onFirstNameChanged = e => setFirstName(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onPhoneChanged = e => setPhone(e.target.value)
    const onBirthDateChanged = e => setBirthDate(e.target.value)

    const canSave = [lastName,firstName,email,phone,birthDate].every(Boolean) && addRequestStatus === 'idle';
    const onSaveClientClicked = () => {
        if (canSave) {
            try {
                console.log('save')
                setAddRequestStatus('pending')
                dispatch(addNewClient({ lastName,firstName,email,phone,birthDate })).unwrap()

                setLastName('');
                setFirstName('');
                setEmail('');
                setPhone('');
                setBirthDate('');
                onSubmit();
            } catch (err) {
                console.error('Failed to save', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }

    }

    return (
        <section>
            <div className="form-header">
                <h3>Добавить клиента</h3>
            </div>
            <form>
                <div className="form-block">
                    <label htmlFor="lastName">Фамилия:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={onLastNameChanged}
                    />
                </div>
                <div className="form-block">
                    <label htmlFor="firstName">Имя:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={onFirstNameChanged}
                    />
                </div>
                <div className="form-block">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={onEmailChanged}
                    />
                </div>
                <div className="form-block">
                    <label htmlFor="phone">Телефон:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={onPhoneChanged}
                    />
                </div>
                <div className="form-block">
                    <label htmlFor="birthDate">Дата рождения:</label>
                    <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={birthDate}
                        onChange={onBirthDateChanged}
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
                        onClick={onSaveClientClicked}
                        disabled={!canSave}
                    >Save Client</button>
                </div>
            </form>
        </section>
    )
}
export default AddClientForm