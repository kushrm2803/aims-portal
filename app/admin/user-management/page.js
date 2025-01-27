"use client";
import Link from "next/link";

export default function UserManagement() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">User Management</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Effortlessly manage users and batches.
        </p>
        <div className="space-y-6">
          <Link href="/admin/user-management/create-user">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 ease-in-out shadow-md">
              Create User
            </button>
          </Link>
          <Link href="/admin/user-management/view-users">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 ease-in-out shadow-md">
              View Users
            </button>
          </Link>
          <Link href="/admin/user-management/create-batch">
            <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 ease-in-out shadow-md">
              Create Batch
            </button>
          </Link>
          <Link href="/admin/user-management/view-batches">
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 ease-in-out shadow-md">
              View Batch
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
