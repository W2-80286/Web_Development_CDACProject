import { useState } from 'react';
import axios from 'axios';
import "./newVenue.css";
import { toast } from 'react-toastify';

export default function NewVenue() {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState(""); // State to hold venue details
  const [imageFile, setImageFile] = useState(null); // Store the selected image file

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (!name || !capacity || !price || !location || !details || !imageFile) {
      toast.error("Name, capacity, price, location, details, and image are required fields");
      return;
    }

    // Create a FormData object to store form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('capacity', capacity);
    formData.append('price', price);
    formData.append('location', location);
    formData.append('details', details); // Append venue details to the form data
    formData.append('image', imageFile);

    try {
      // Send a POST request to the API endpoint
      const response = await axios.post('http://localhost:4001/venue/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data); // Log the response from the API
      toast.success("Venue Added Successfully");
      // Clear form fields after successful submission
      setName("");
      setCapacity("");
      setPrice("");
      setLocation("");
      setDetails("");
      setImageFile(null);
      // Optionally, you can handle success or redirect to another page
    } catch (error) {
      console.error('Error adding venue:', error);
      toast.error("Error Adding Venue");
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <div className="newevent">
      <h1 className="addeventTitle">Add Venue</h1>
      <form className="addeventForm" onSubmit={handleFormSubmit}>
        <div className="addeventItem">
          <label>Name</label>
          <input type="text" placeholder="Wedding" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="addeventItem">
          <label>Capacity</label>
          <input type="text" placeholder="123" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
        </div>
        <div className="addeventItem">
          <label>Price</label>
          <input type="text" placeholder="10.00" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="addeventItem">
          <label>Location</label>
          <input type="text" placeholder="Venue location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="addeventItem">
          <label>Details</label> {/* Add label for details input */}
          <textarea rows="4" placeholder="Venue details" value={details} onChange={(e) => setDetails(e.target.value)}></textarea> {/* Add textarea for venue details */}
        </div>
        <div className="addeventItem">
          <label>Upload Image</label>
          <input type="file" id="file" onChange={(e) => setImageFile(e.target.files[0])} />
        </div>
        <button type="submit" className="addeventButton">Create</button>
      </form>
    </div>
  );
}
