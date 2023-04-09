import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

function Map({ spot }) {
  const [map, setMap] = React.useState(null);

  const center = spot && spot.lat && spot.lng
    ? {
        lat: spot.lat,
        lng: spot.lng,
      }
    : {
        lat: 0,
        lng: 0,
      };

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDv8I7ijVn-CRU9PiCJ4QGrF0SvSMRbkEU">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {spot && (
          <Marker
            key={spot.id}
            position={{ lat: spot.lat, lng: spot.lng }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Map);
