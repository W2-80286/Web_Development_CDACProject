import React, { useState, useEffect } from "react";
import axios from "axios";
import "./venueCard.css"; // Import CSS file
import config from "../../config/config";

function VenueCard() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get("http://localhost:4001/venue/");
        setVenues(response.data.data || []);
        console.log(response.data.data)
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };
    fetchVenues();
  }, []);

  return (
    <div className="venue-list">
      {venues.map((venue) => (
        <div key={venue.id} className="venue-card">
          {/* Check if imageUrl is available before rendering the image */}
        
          
          <div className="venue-details">
            <div>
            <img src={config.server+"/"+venue.image} alt={venue.name} className="venue-image" />

                </div>
            <h2>{venue.name}</h2>
            <p>Capacity: {venue.capacity}</p>
            <p>Price: {venue.price}</p>
            <p>Location: {venue.location}</p>
            <p>Details: {venue.details} </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VenueCard;
