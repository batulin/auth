import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {fetchPlaces, getPlacesError, getPlacesStatus, selectAllPlaces} from "../../store/placesSlice";
import PlacesItem from "./PlacesItem";
import {toggleSidebar} from "../../store/sidebarSlice";

const PlacesList = () => {
    const dispatch = useDispatch();

    const places = useSelector(selectAllPlaces);
    const placesStatus = useSelector(getPlacesStatus);
    const error = useSelector(getPlacesError);


    useEffect(() => {
        if (placesStatus === 'idle') {
            dispatch(fetchPlaces())
        }
    }, [placesStatus, dispatch])

    let content;
    if (placesStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (placesStatus === 'succeeded') {
        content = places.map(place => <PlacesItem key={place.id} place={place} />)
    } else if (placesStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <section>
            {content}
        </section>
    )
}
export default PlacesList