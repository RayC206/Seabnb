import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment-timezone";
import {
  createBookingRequest,
  getSpotBookingsRequest,
} from "../../store/bookings";

const CreateBookingForm = ({ spot, review }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const dateFormat = "YYYY-MM-DD";
  // const today = moment().format(dateFormat);
  const tomorrow = moment().add(1, "day").format(dateFormat);
  const dayAfterTomorrow = moment().add(2, "day").format(dateFormat);
  const dbDateFormat = "YYYY-MM-DD HH:mm:ss";

  const [errors, setErrors] = useState([]);
  const [startDate, setStartDate] = useState(tomorrow);
  const [endDate, setEndDate] = useState(dayAfterTomorrow);
  const [numOfNights, setNumOfNights] = useState(1);

  const handleCreateBooking = (e) => {
    e.preventDefault();
    console.log("BOOKING");
    console.log(moment(startDate).format(dbDateFormat));
    const data = {
      spotId: spot.id,
      startDate: moment(startDate).format(dbDateFormat),
      endDate: moment(endDate).format(dbDateFormat),
    };
    console.log(data);

    dispatch(createBookingRequest(data))
      .then(() => {
        let path = `/my-bookings`;
        history.push(path);
      })
      .catch(async (res) => {
        res = await res.json();
        console.log("ERROR");
        console.log(res.message);
        setErrors(Object.values(res.errors));
      });
  };

  useEffect(() => {
    setNumOfNights(moment(endDate).diff(moment(startDate), "days"));
    console.log(numOfNights);
  }, [startDate, endDate]);

  return (
    <div>
      <div>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      </div>
      <div className="checkin">CHECK-IN</div>
      <input
        type="date"
        id="booking-start-date"
        name="booking-start-date"
        value={startDate}
        className="checkin"
        min={tomorrow}
        onChange={(e) => setStartDate(e.target.value)}
      ></input>
      <div className="checkin">CHECK-OUT</div>
      <input
        type="date"
        id="booking-end-date"
        name="booking-end-date"
        value={endDate}
        className="checkin"
        min={startDate}
        onChange={(e) => setEndDate(e.target.value)}
      ></input>
      <button onClick={handleCreateBooking}>BOOK ME</button>
      <div>
        ${spot.price} x {numOfNights} = ${spot.price * numOfNights}
      </div>
    </div>
  );
};
export default CreateBookingForm;
