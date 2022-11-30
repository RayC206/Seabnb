import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment-timezone";
import {
  createBookingRequest,
  getSpotBookingsRequest,
  editBookingRequest,
} from "../../store/bookings";
import "./CreateBooking.css";

const CreateBookingForm = ({ spot }) => {
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
    const data = {
      spotId: spot.id,
      startDate: moment(startDate).format(dbDateFormat),
      endDate: moment(endDate).format(dbDateFormat),
    };

    dispatch(createBookingRequest(data))
      .then(() => {
        let path = `/my-bookings`;
        history.push(path);
      })
      .catch(async (res) => {
        res = await res.json();
        setErrors(Object.values(res.errors));
      });
  };

  const [subTotal, setSubTotal] = useState(spot.price * numOfNights);
  const [cleaningFee, setCleaningFee] = useState(Math.ceil(spot.price / 15));
  const [serviceFee, setServiceFee] = useState(Math.ceil(subTotal / 20));
  const [total, setTotal] = useState(subTotal - cleaningFee + serviceFee);
  useEffect(() => {
    setNumOfNights(moment(endDate).diff(moment(startDate), "days"));
    console.log(numOfNights);
    setSubTotal(spot.price * numOfNights);
    setCleaningFee(subTotal / 20);
    setServiceFee(subTotal / 20);
    setTotal(subTotal - cleaningFee + serviceFee);
  }, [startDate, endDate, numOfNights, subTotal, serviceFee]);

  return (
    <div>
      <div>
        <ul>
          {errors.map((error, idx) => (
            <li className="errorMessage" key={idx}>{error}</li>
          ))}
        </ul>
      </div>
      <div className="checkInContainer">
        <div className="innerCheckInContainer">
          <div className="checkin">
            <span>Check-in</span>
            <input
              type="date"
              id="booking-start-date"
              name="booking-start-date"
              value={startDate}
              className="checkinInput"
              min={tomorrow}
              onChange={(e) => setStartDate(e.target.value)}
            ></input>
          </div>
          <div className="checkout">
            {" "}
            <span>Check-out</span>
            <input
              type="date"
              id="booking-end-date"
              name="booking-end-date"
              value={endDate}
              className="checkoutInput"
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
            ></input>
          </div>
        </div>
      </div>
      <div className="otherCosts">
        <div className="costsContainer">
          <span>
            <u>${spot.price} x {numOfNights} Nights</u>
          </span>
          <span>${spot.price * numOfNights}</span>
        </div>
        <div>
          <span><u>Cleaning Fee</u></span>
          <span>${cleaningFee}</span>
        </div>
        <div>
          <span><u>Service Fee</u></span>
          <span>${serviceFee}</span>
        </div>
        <div className="costTotal">
          <span><b>Total before taxes</b></span>
          <span>${total}</span>
        </div>
      </div>
      <div className="reserveButton">
        <button onClick={handleCreateBooking}>Reserve</button>
      </div>
    </div>
  );
};
export default CreateBookingForm;
