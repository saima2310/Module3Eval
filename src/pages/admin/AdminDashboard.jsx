import { useEffect, useState } from "react";
import { getRestaurants, saveRestaurants } from "../../utils/localStorage";
import Navbar from "../../components/Navbar";
import RestaurantCard from "../../components/RestaurantCard";
import AddRestaurantForm from "../../components/AddRestaurantForm";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [parking, setParking] = useState("");

  const navigate = useNavigate();

  const load = () => setRestaurants(getRestaurants());

  useEffect(load, []);

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete?")) return;
    const updated = restaurants.filter((r) => r.restaurantID !== id);
    saveRestaurants(updated);
    alert("Deleted successfully");
    load();
  };

  const filtered = restaurants.filter((r) => {
    return (
      (r.restaurantName.toLowerCase().includes(search.toLowerCase()) ||
        r.address.toLowerCase().includes(search.toLowerCase())) &&
      (!type || r.type === type) &&
      (!parking || String(r.parkingLot) === parking)
    );
  });

  return (
    <div>
      <Navbar setSearch={setSearch} setType={setType} setParking={setParking} />
      <AddRestaurantForm refresh={load} />

      {filtered.map((r) => (
        <RestaurantCard
          key={r.restaurantID}
          data={r}
          isAdmin
          onDelete={handleDelete}
          onUpdate={() => navigate("/admin/restaurants/update", { state: r })}
        />
      ))}
    </div>
  );
};

export default AdminDashboard;
