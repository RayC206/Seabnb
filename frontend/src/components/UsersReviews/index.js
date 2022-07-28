import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../store/reviews';

const UserReviews = ({spotId}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [isloaded, setIsloaded] = useState(false);
  const reviews = useSelector(state => Object.values(state.reviews));
  const reviewsByYou = reviews.filter(review => review.userId === sessionUser.id);
  console.log(sessionUser.id)

  useEffect(() => {
    dispatch(getReviews(spotId))
        .then(() => setIsloaded(true));
  }, [dispatch, spotId])

  return (
    <>
    <div>
        {isloaded &&
          reviewsByYou.map((review) => {
            return (
              <label>
                 Review:
                <div>
                  {/* <div>{review.userId}</div>  */}
                  <div> {review.review}</div>
                   <div> Rating : {review.stars} / 5</div>
                </div>
               </label>
             );
           })}
        </div>
    </>
 );
}

export default UserReviews;
