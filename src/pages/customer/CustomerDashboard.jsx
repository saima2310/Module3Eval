import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import RestaurantCard from "../../components/RestaurantCard";
import { getRestaurants } from "../../utils/localStorage";

const CustomerDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [parking, setParking] = useState("");

  useEffect(() => {
    setRestaurants(getRestaurants());
  }, []);

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
      {filtered.map((r) => (
        <RestaurantCard key={r.restaurantID} data={r} />
      ))}
    </div>
  );
};

export default CustomerDashboard;
