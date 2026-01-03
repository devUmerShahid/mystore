import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const { user } = useAuth(); // Get logged-in user
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders in real-time from Firestore
  useEffect(() => {
    // If user not logged in, redirect to login
    if (!user) {
      navigate("/login");
      return;
    }

    // Reference to the user's orders collection
    const ordersRef = collection(db, "users", user.uid, "orders");
    // Create a query to get orders sorted by creation time (latest first)
    const q = query(ordersRef, orderBy("createdAt", "desc"));

    // Real-time listener
    const unsubscribe = onSnapshot(
      q,(snapshot) => {
        const ordersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [user, navigate]);

  // Loading state
  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  // No orders state
  if (!orders.length)
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        <p className="text-gray-500">You haven’t placed any orders yet.</p>
      </div>
    );

  // Render orders
  return (
    <div className="max-w-4xl mx-auto ">
      {/* <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2> */}

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="shadow-gray-50  p-4 bg-white"
          >
            <div className="flex justify-between items-center border-b pb-2 mb-3">
              <p className="font-semibold text-gray-700">
                Order ID: <span className="text-gray-500">{order.id}</span>
              </p>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            <ul className="space-y-2">
              {order.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex justify-between text-gray-700 text-sm"
                >
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <div className="flex justify-between mt-4 font-semibold">
              <span>Total:</span>
              <span>${order.total?.toFixed(2)}</span>
            </div>

            <p className="text-gray-500 text-sm mt-2">
              Date:{" "}
              {order.createdAt?.seconds
                ? new Date(order.createdAt.seconds * 1000).toLocaleString()
                : "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
