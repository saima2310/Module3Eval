import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getRestaurants, saveRestaurants } from "../../utils/localStorage";

const UpdateRestaurant = () => {
  const { state } = useLocation(); // restaurant data
  const navigate = useNavigate();

  const [form, setForm] = useState({
    restaurantID: state.restaurantID,
    restaurantName: state.restaurantName,
    address: state.address,
    type: state.type,
    parkingLot: state.parkingLot,
    image: state.image,
  });

  const handleUpdate = () => {
    if (
      !form.restaurantName ||
      !form.address ||
      !form.type ||
      form.parkingLot === ""
    ) {
      alert("All fields are required");
      return;
    }

    if (!confirm("Are you sure you want to update?")) return;

    const data = getRestaurants();
    const updatedData = data.map((r) =>
      r.restaurantID === form.restaurantID ? form : r
    );

    saveRestaurants(updatedData);
    alert("Restaurant updated successfully");
    navigate("/admin/dashboard");
  };

  return (
    <div>
      <h2>Update Restaurant</h2>

      <input
        value={form.restaurantName}
        onChange={(e) =>
          setForm({ ...form, restaurantName: e.target.value })
        }
        placeholder="Restaurant Name"
      />

      <input
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        placeholder="Address"
      />

      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type:
