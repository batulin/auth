import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {selectClientById, updateClient} from "../../store/clientsSlice";

const EditClientForm = ({clientId, onCancel, onSubmit}) => {
    const client = useSelector((state) => selectClientById(state, Number(clientId)))

    const [lastName, setLastName] = useState(client.lastName);
    const [firstName, setFirstName] = useState(client.firstName);
    const [email, setEmail] = useState(client.email);
    const [phone, setPhone] = useState(client.phone);
    const [birthDate, setBirthDate] = useState(client.birthDate);
    const [requestStatus, setRequestStatus] = useState('idle')

    const dispatch = useDispatch()

    if (!client) {
        return (
            <section>
                <h2>Client not found!</h2>
            </section>
        )
    }

    const onLastNameChanged = e => setLastName(e.target.value)
    const onFirstNameChanged = e => setFirstName(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onPhoneChanged = e => setPhone(e.target.value)
    const onBirthDateChanged = e => setBirthDate(e.target.value)

    const canSave = [lastName,firstName,email,phone,birthDate].every(Boolean) && requestStatus === 'idle';

    const onSaveClientClicked = () => {
        if (canSave) {
            try {
                setRequestStatus('pending')
                dispatch(updateClient({ id: client.id, lastName,firstName,email,phone,birthDate })).unwrap()

                setLastName('');
                setFirstName('');
                setEmail('');
                setPhone('');
                setBirthDate('');
                onSubmit();
            } catch (err) {
                console.error('Failed to save', err)
            } finally {
                setRequestStatus('idle')
            }
        }
    }


    return (
        <section>
            <div className="form-header">
                <h3>Редактировать клиента</h3>
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
                        //value={birthDate}
                        defaultValue={birthDate}
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

export default EditClientForm