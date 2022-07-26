import './spots.css'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


const SpotsCard = ({ spot }) => {
    // const imageUrls = useSelector((state) => state.images.entries);
    const dispatch = useDispatch();

    // let reviews;

    // if (listing.Reviews) {
    //     reviews = listing.Reviews
    // } else {
    //     reviews = [];
    // }

    // const ratings = [];
    // if (reviews) {
    //     for (let i = 0; i < reviews.length; i++) {
    //         ratings.push(reviews[i].rating)
    //     };
    // }

    // const averageRating = (ratings.reduce((a, b) => a + b, 0) / reviews.length);

    return (

            <Link to={`/spots/${spot.id}`} key={spot.id} target="_blank" rel="noreferrer">
                
            </Link>

    )

};

export default SpotsCard;
