"use client";

import { useState } from "react";

export default function CarsList({ cars }) {
  const [carList, setCarList] = useState(cars);
  const [newCar, setNewCar] = useState({
    maker: "",
    model: "",
    fuelType: "Petrol",
    transmission: "Manual",
    engine: { capacity: "" },
    features: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prev) => ({
      ...prev,
      [name]: name === "features" ? value.split(",") : value,
    }));
  };

  const addCar = async () => {
    try {
      const response = await fetch("/api/addCar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar),
      });

      if (response.ok) {
        const { car } = await response.json();
        setCarList([...carList, car]); // Add the new car to the state
        alert("Car added successfully!");
      } else {
        alert("Failed to add car.");
      }
    } catch (error) {
      console.error("Error adding car:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {carList.map((car) => (
          <li
            key={car.id}
            style={{
              padding: "15px",
              borderBottom: "1px solid #ddd",
              marginBottom: "10px",
              color: "white",
            }}
          >
            <h2>
              {car.maker} {car.model}
            </h2>
            <p>
              <strong>Fuel Type:</strong> {car.fuelType}
            </p>
            <p>
              <strong>Transmission:</strong> {car.transmission}
            </p>
            <p>
              <strong>Engine:</strong> {JSON.stringify(car.engine)}
            </p>
            <p>
              <strong>Features:</strong> {car.features?.join(", ") || "None"}
            </p>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: "20px" }}>
        <h2>Add a New Car</h2>
        <input
          type="text"
          name="maker"
          placeholder="Maker"
          value={newCar.maker}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={newCar.model}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="fuelType"
          placeholder="Fuel Type"
          value={newCar.fuelType}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="transmission"
          placeholder="Transmission"
          value={newCar.transmission}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="engine"
          placeholder="Engine (e.g., capacity)"
          value={newCar.engine.capacity}
          onChange={(e) =>
            setNewCar((prev) => ({
              ...prev,
              engine: { capacity: e.target.value },
            }))
          }
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="features"
          placeholder="Features (comma separated)"
          value={newCar.features.join(",")}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <button
          onClick={addCar}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2980b9",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Car
        </button>
      </div>
    </div>
  );
}
