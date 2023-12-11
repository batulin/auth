import {Link} from "react-router-dom";

const TypesItem = ({ type }) => {
    return (
        <article>
            <h2>{type.name}</h2>
            <p>{type.slug}</p>
            <p>{type.price}</p>
            <p>{type.createAt}</p>
            <Link to={`/type/${type.id}`}>view</Link>
        </article>
    )
}
export default TypesItem