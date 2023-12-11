import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {fetchTypes, getTypesError, getTypesStatus, selectAllTypes} from "../../store/typesSlice";
import TypesItem from "./TypesItem";

const TypesList = () => {
    const dispatch = useDispatch();

    const {types, status, error} = useSelector(state => state.types);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTypes())
        }
        console.log(error)
    }, [status, dispatch])

    let content;
    if (status === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (status === 'succeeded') {
        content = types.map(type => type && <TypesItem key={type.id} type={type} />)
    } else if (status === 'failed') {
         content = <p>{error.message}</p>;
    }

    return (
        <section>
            {content}
        </section>
    )
}
export default TypesList