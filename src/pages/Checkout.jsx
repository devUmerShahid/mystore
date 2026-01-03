import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import {toast} from "react-toastify";

function Checkout() {
  //Access cart and auth context
  const { cart, setCart } = useCart();
  const { user } = useAuth();

  //Access routing and passed selected items
  const location = useLocation();
  const navigate = useNavigate();
  const selectedItems = location.state?.selectedItems || [];

  //Filter only items selected for checkout
  const selectedProducts = cart.filter((item) =>
    selectedItems.includes(item.id)
  );

  //Calculate total order amount
  const total = selectedProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  //Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  // const handlePuchaseItem=()=>{
  //   toast.success(`Order Completed Successfully!`);
  // }

  //Checkout submission handler (integrated with Firestore)
  const onSubmit = async (data) => {
    try {
      // Step 1: Ensure user is logged in
      if (!user) {
        alert("Please log in before placing your order.");
        navigate("/login");
        return;
      }

      // Step 2: Create order object
      const orderData = {
        userDetails: data, // name, address, phone, payment method
        items: selectedProducts,
        total,
        createdAt: serverTimestamp(), // Firestore server timestamp
        status: "Pending",
      };

      // Step 3: Save to Firestore (users/{userId}/orders/{autoId})
      const orderRef = collection(db, "users", user.uid, "orders");
      await addDoc(orderRef, orderData);

      // Step 4: Remove purchased items from cart
      const updatedCart = cart.filter(
        (item) => !selectedItems.includes(item.id)
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Step 5: Reset form and notify user
      reset();
      toast.success(`Order Completed Successfully!`);
      //alert("Order placed successfully!");
      navigate("/");

    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again later.");
      //alert("Failed to place order. Please try again later.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/*LEFT SIDE: ORDER SUMMARY*/}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">Order Summary</h2>

        {selectedProducts.length === 0 ? (
          <p className="text-gray-600">No items selected for checkout.</p>
        ) : (
          <ul className="space-y-4">
            {selectedProducts.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="bg-sky-200 h-20 w-20 object-cover rounded"
                  />
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-500 text-sm">
                    {item.quantity} × ${item.price}
                  </p>
                </div>
                <p className="font-medium text-blue-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        )}

        <hr className="my-4" />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/*RIGHT SIDE: CHECKOUT FORM*/}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          Checkout Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              {...register("name", { required: "Full name is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Address
            </label>
            <input
              {...register("address", { required: "Address is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter your delivery address"
            />
            {errors.address && (
              <p className="text-red-600 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <input
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Enter a valid phone number",
                },
              })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="03XXXXXXXXX"
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Payment Method
            </label>
            <select
              {...register("payment", { required: "Select a payment method" })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Method</option>
              <option value="cod">Cash on Delivery</option>
              <option value="bank" disabled>
                Bank Transfer (Coming Soon)
              </option>
            </select>
            {errors.payment && (
              <p className="text-red-600 text-sm mt-1">
                {errors.payment.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;