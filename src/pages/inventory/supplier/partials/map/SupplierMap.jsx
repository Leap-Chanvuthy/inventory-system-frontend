// import { useState, useEffect } from "react";
// import { useLoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

// const SupplierMap = ({ locations }) => {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyAd4rEAQqf58fCJGABqW99teDP9BcuyN08',
//   });

//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Handle the loading state
//   useEffect(() => {
//     if (locations && locations.length > 0) {
//       setLoading(false);
//     }
//   }, [locations]);

//   if (loadError) return <div>Error loading maps</div>;
//   if (!isLoaded || loading) return <div>Loading Maps...</div>;

//   const mapStyles = {
//     height: "50vh",
//     width: "100%",
//   };

//   const defaultCenter = {
//     lat: locations.length > 0 ? locations[0].latitude : 0,
//     lng: locations.length > 0 ? locations[0].longitude : 0,
//   };

//   return (
//     <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
//       {locations.map((location) => (
//         <Marker
//           key={location.id}
//           position={{ lat: location.latitude, lng: location.longitude }}
//           onClick={() => setSelectedLocation(location)}
//         />
//       ))}
//       {selectedLocation && (
//         <InfoWindow
//           position={{
//             lat: selectedLocation.latitude,
//             lng: selectedLocation.longitude,
//           }}
//           onCloseClick={() => setSelectedLocation(null)}
//         >
//           <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <img
//                   src="https://www.leapchanvuthy.dev/images/Leapchanvuthy.png"
//                   alt="Image"
//                   className="w-24 h-24 object-cover rounded-lg"
//                 />
//               </div>
//               <div className="ml-4 flex-1">
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   {selectedLocation.name}
//                 </h3>
//                 <p className="text-gray-600 mt-1">
//                   Additional details or description about the company can go here.
//                 </p>
//               </div>
//             </div>
//             <div className="mt-4">
//               <button className="bg-blue-500 text-white py-1 px-3 rounded-lg text-sm font-medium">
//                 More Info
//               </button>
//             </div>
//           </div>
//         </InfoWindow>
//       )}
//     </GoogleMap>
//   );
// };

// export default SupplierMap;


import { useState, useEffect } from "react";
import { useLoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

const SupplierMap = ({ locations }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAd4rEAQqf58fCJGABqW99teDP9BcuyN08',
  });

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Handle the loading state
  useEffect(() => {
    if (locations && locations.length > 0) {
      setLoading(false);
    }
  }, [locations]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded || loading) return <div>Loading Maps...</div>;

  const mapStyles = {
    height: "50vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: locations.length > 0 ? locations[0].latitude : 0,
    lng: locations.length > 0 ? locations[0].longitude : 0,
  };

  return (
    <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={{ lat: location.latitude, lng: location.longitude }}
          onClick={() => setSelectedLocation(location)}
        />
      ))}
      {selectedLocation && (
        <InfoWindow
          position={{
            lat: selectedLocation.latitude,
            lng: selectedLocation.longitude,
          }}
          onCloseClick={() => setSelectedLocation(null)}
        >
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs">
            <div className="flex">
              <div className="flex-shrink-0">
                <a
                  href={`https://www.google.com/maps?q=${selectedLocation.latitude},${selectedLocation.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://www.leapchanvuthy.dev/images/Leapchanvuthy.png"
                    alt="Image"
                    className="w-24 h-24 object-cover rounded-lg cursor-pointer"
                  />
                </a>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedLocation.name}
                </h3>
                <p className="text-gray-600 mt-1">
                  Additional details or description about the company can go here.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button className="bg-blue-500 text-white py-1 px-3 rounded-lg text-sm font-medium">
                More Info
              </button>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default SupplierMap;
