import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRestaurants, saveRestaurants } from "../utils/localStorage";

export default function UpdateRestaurant() {
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const selectedRestaurant = JSON.parse(
      localStorage.getItem("selectedRestaurant")
    );
    if (selectedRestaurant) {
      setForm(selectedRestaurant);
      setLoading(false);
    }
  }, []);

  const handleUpdate = () => {
    if (!form.restaurantName.trim() || !form.address.trim() || !form.type) {
      alert("Please fill all required fields");
      return;
    }

    if (confirm("Are you sure you want to update this restaurant?")) {
      const restaurants = getRestaurants();
      const updatedRestaurants = restaurants.map((r) =>
        r.restaurantID === form.restaurantID ? form : r
      );

      saveRestaurants(updatedRestaurants);
      localStorage.removeItem("selectedRestaurant");
      alert("Restaurant Updated Successfully ✓");
      navigate("/admin/dashboard");
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!form) {
    return (
      <div className="update-container">
        <p>No restaurant selected for update</p>
        <button onClick={() => navigate("/admin/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="update-container">
      <div className="update-card">
        <h2>Update Restaurant</h2>

        <div className="form-group">
          <label>Restaurant ID (Auto-generated)</label>
          <input type="text" value={form.restaurantID} disabled />
        </div>

        <div className="form-group">
          <label>Restaurant Name *</label>
          <input
            type="text"
            placeholder="Enter restaurant name"
            value={form.restaurantName}
            onChange={(e) =>
              setForm({ ...form, restaurantName: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Address *</label>
          <input
            type="text"
            placeholder="Enter address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Type *</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="">Select Type</option>
            <option>Rajasthani</option>
            <option>Gujarati</option>
            <option>Mughlai</option>
            <option>Jain</option>
            <option>Thai</option>
            <option>North Indian</option>
            <option>South Indian</option>
          </select>
        </div>

        <div className="form-group">
          <label>Parking *</label>
          <select
            value={form.parkingLot}
            onChange={(e) =>
              setForm({
                ...form,
                parkingLot: e.target.value === "true",
              })
            }
          >
            <option value="">Select Parking</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="image-preview"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}
        </div>

        <div className="update-actions">
          <button className="btn-submit" onClick={handleUpdate}>
            ✓ Update Restaurant
          </button>
          <button
            className="btn-cancel"
            onClick={() => navigate("/admin/dashboard")}
          >
            ✕ Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
