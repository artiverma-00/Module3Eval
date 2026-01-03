import { useState, useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { getRestaurants } from "../utils/localStorage";
import Navbar from "../components/Navbar";

export default function CustomerDashboard() {
  const [data, setData] = useState(getRestaurants());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterParking, setFilterParking] = useState("");

  useEffect(() => {
    setData(getRestaurants());
  }, []);

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
      
      <div className="customer-dashboard">
        <div className="filter-section-customer">
          <input
            type="text"
            placeholder=" Search by name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-customer"
            autoFocus
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select-customer"
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
            className="filter-select-customer"
          >
            <option value="">All Parking</option>
            <option value="true">With Parking</option>
            <option value="false">Without Parking</option>
          </select>
        </div>

        <div className="restaurants-grid-customer">
          {filteredData.length > 0 ? (
            filteredData.map((el) => (
              <RestaurantCard key={el.restaurantID} data={el} admin={false} />
            ))
          ) : (
            <div className="no-restaurants">
              <p>No restaurants found. Try adjusting your filters! 🔍</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

