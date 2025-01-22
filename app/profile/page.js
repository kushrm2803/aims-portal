import clientPromise from "@/lib/mongodb";

export default async function ProfilePage() {
  const client = await clientPromise;
  const db = client.db("test");
  const users = await db.collection("users").find({}).toArray();

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
