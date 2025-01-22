import clientPromise from "@/lib/mongodb";
import CarsList from "./CarsList";

export default async function ProfilePage() {
  const client = await clientPromise;
  const db = client.db("carDekho");

  // Fetch and sort cars alphabetically
  const cars = await db
    .collection("cars")
    .find({})
    .sort({ maker: 1, model: 1 })
    .toArray();

  const formattedCars = cars.map((car) => ({
    id: car._id.toString(),
    maker: car.maker,
    model: car.model,
    fuelType: car.fuel_type,
    transmission: car.transmission,
    engine: car.engine,
    features: car.features,
  }));

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      <h1 style={{ color: "white" }}>Cars List</h1>
      <CarsList cars={formattedCars} />
    </div>
  );
}
