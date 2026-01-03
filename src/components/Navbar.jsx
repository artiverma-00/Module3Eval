import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ data, setData }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterParking, setFilterParking] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Restaurant Management</h2>
        <p>Role: <strong>{user?.role.toUpperCase()}</strong></p>
      </div>

      <div className="navbar-center">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search by name or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          autoFocus
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="filter-select"
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
          className="filter-select"
        >
          <option value="">All Parking</option>
          <option value="true">With Parking</option>
          <option value="false">Without Parking</option>
        </select>
      </div>

      <button className="btn-logout" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}
