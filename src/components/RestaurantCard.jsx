import { useNavigate } from "react-router-dom";
import { getRestaurants, saveRestaurants } from "../utils/localStorage";

export default function RestaurantCard({ data, admin, setData }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this restaurant?")) {
      const restaurants = getRestaurants();
      const updated = restaurants.filter((r) => r.restaurantID !== data.restaurantID);
      saveRestaurants(updated);
      setData(updated);
      alert("Restaurant Deleted");
    }
  };

  const handleUpdate = () => {
    if (confirm("Do you want to update this restaurant?")) {
      localStorage.setItem("selectedRestaurant", JSON.stringify(data));
      navigate("/admin/restaurants/update");
    }
  };

  return (
    <div className="restaurant-card">
      <img src={data.image} alt={data.restaurantName} className="card-image" />
      <div className="card-content">
        <h3>{data.restaurantName}</h3>
        <p><strong>Address:</strong> {data.address}</p>
        <p><strong>Type:</strong> {data.type}</p>
        <p><strong>Parking:</strong> {data.parkingLot ? "Available ✓" : "Not Available ✗"}</p>
        
        {admin && (
          <div className="card-actions">
            <button className="btn-update" onClick={handleUpdate}>
              Update
            </button>
            <button className="btn-delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

