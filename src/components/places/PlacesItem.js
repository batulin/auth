import {Link} from "react-router-dom";

const PlacesItem = ({ place }) => {
    return (
        <article>
            <h2>{place.number}</h2>
            <p>{place.id}</p>
            <Link to={`/place/${place.id}`}>view</Link>
        </article>
    )
}
export default PlacesItem