import { useEffect, useState } from "react";
import { getRestaurants, saveRestaurants } from "../utils/localStorage";
import RestaurantCard from "../components/RestaurantCard";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(getRestaurants());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterParking, setFilterParking] = useState("");
  const [form, setForm] = useState({
    restaurantName: "",
    address: "",
    type: "",
    parkingLot: "",
    image: "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766-eca8da47c2f1/2izhqnTaNLdenHYF.jpeg",
  });

  useEffect(() => {
    setData(getRestaurants());
  }, []);

  const handleAdd = () => {
    if (!form.restaurantName.trim() || !form.address.trim() || !form.type) {
      alert("Please fill all required fields");
      return;
    }

    const newData = {
      ...form,
      restaurantID: Date.now(),
      parkingLot: form.parkingLot === "true",
    };

    const updated = [...data, newData];
    saveRestaurants(updated);
    setData(updated);
    alert("Restaurant Added Successfully ✓");
    setForm({
      restaurantName: "",
      address: "",
      type: "",
      parkingLot: "",
      image: "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766-eca8da47c2f1/2izhqnTaNLdenHYF.jpeg",
    });
  };

  const filteredData = data.filter((restaurant) => {
    const matchesSearch =
      restaurant.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = !filterType || restaurant.type === filterType;
    const matchesParking =
      !filterParking ||
      (filterParking === "true" ? restaurant.parkingLot : !restaurant.parkingLot);

    return matchesSearch && matchesType && matchesParking;
  });

  return (
    <>
      <Navbar data={data} setData={setData} />
      
      <div className="admin-dashboard">
        <div className="sidebar">
          <h3>Add Restaurant</h3>
          
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
                setForm({ ...form, parkingLot: e.target.value })
              }
            >
              <option value="">Select Parking</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="form-group">
           
            
          </div>

          <button className="btn-add" onClick={handleAdd}>
             Add Restaurant
          </button>
        </div>

        <div className="content">
          <div className="filter-section">
            <input
              type="text"
              placeholder=" Search by name or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-main"
            />

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select-main"
            >
              <option value="">All Types</option>
              <option>Rajasthani</option>
              <option>Gujarati</option>
              <option>Mughlai</option>
              <option>Jain</option>
              <option>Thai</option>
              <option>North Indian</option>
              <option>South Indian</option>
            </select>

            <select
              value={filterParking}
              onChange={(e) => setFilterParking(e.target.value)}
              className="filter-select-main"
            >
              <option value="">All Parking</option>
              <option value="true">With Parking</option>
              <option value="false">Without Parking</option>
            </select>
          </div>

          <div className="restaurants-grid">
            {filteredData.length > 0 ? (
              filteredData.map((el) => (
                <RestaurantCard
                  key={el.restaurantID}
                  data={el}
                  admin
                  setData={setData}
                />
              ))
            ) : (
              <div className="no-restaurants">
                <p>No restaurants found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

