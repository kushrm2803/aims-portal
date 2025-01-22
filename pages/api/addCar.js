import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const db = client.db("carDekho");

      const { maker, model, fuelType, transmission, engine, features } =
        req.body;

      if (!maker || !model) {
        return res.status(400).json({ error: "Maker and Model are required" });
      }

      const result = await db.collection("cars").insertOne({
        maker,
        model,
        fuel_type: fuelType,
        transmission,
        engine,
        features,
      });

      res
        .status(201)
        .json({ success: true, car: { ...req.body, id: result.insertedId } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
