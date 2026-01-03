// import React, { useState } from "react";
// import Checkout from "./Checkout";
// import { useNavigate } from "react-router-dom";
// // importing the global cart context
// import { useCart } from "../context/CartContext";

// export function CartPage() {
//   // Access cart state and functions from context
//   const { cart, setCart } = useCart();
//   const [selectedItems, setSelectedItems]= useState([]);
//   const navigate = useNavigate();

//   //function to select the itemsfor checkout
//   function handleSelectItem(id){
//     if(selectedItems.includes(id)){
//         setSelectedItems(selectedItems.filter((itemId)=> itemId!==id));
//     }else{
//         setSelectedItems([...selectedItems, id]);
//     }
//   }

//   //Function to increase quantity
//   function increaseQuantity(id) {
//     const updatedCart = cart.map((item) =>
//       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//     );
//     setCart(updatedCart);
//   }

//   //Function to decrease quantity
//   function decreaseQuantity(id) {
//     const updatedCart = cart.map((item) =>
//       item.id === id && item.quantity > 1
//         ? { ...item, quantity: item.quantity - 1 }
//         : item
//     );
//     setCart(updatedCart);
//   }

//   //Function to remove item completely
//   function removeFromCart(id) {
//     const updatedCart = cart.filter((item) => item.id !== id);
//     setCart(updatedCart);
//   }

//   //Calculate total amount
//   const totalPrice = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

  
//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       {/* <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h1> */}

//       {/* Check if cart is empty */}
//       {cart.length === 0 ? (
//         <p className="text-center text-gray-500">Your cart is empty.</p>
//       ) : (
//         <div className="space-y-6">
//           {/* Loop through cart items */}
//           {cart.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
//             >
//               <div className="flex items-center gap-4">
//                 <input type="checkbox"
//                 checked={selectedItems.includes(item.id)}
//                 onChange={()=>handleSelectItem(item.id)} />
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-20 h-20 object-cover rounded"
//                 />
//                 <div>
//                   <h2 className="text-lg font-semibold">{item.name}</h2>
//                   <p className="text-gray-600">Price: ${item.price}</p>
//                 </div>
//               </div>

//               {/* Quantity and actions */}
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => decreaseQuantity(item.id)}
//                   className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                 >
//                   –
//                 </button>
//                 <span className="w-6 text-center">{item.quantity}</span>
//                 <button
//                   onClick={() => increaseQuantity(item.id)}
//                   className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                 >
//                   +
//                 </button>

//                 {/* Remove button */}
//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="ml-4 text-red-500 hover:text-red-700 font-medium"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}

//           {/* Total Price Section */}
//           <div className="flex justify-between items-center border-t pt-4">
//             <h2 className="text-xl font-bold">Total:</h2>
//             <p className="text-xl font-semibold">${totalPrice.toFixed(2)}</p>
//           </div>

//           {/* Checkout Button */}
//           <div className="text-center mt-6">
//             <button onClick={()=>navigate("/checkout", {state:{selectedItems}})}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CartPage;





import React, { useState } from "react";
import Checkout from "./Checkout";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export function CartPage() {
  const { cart, setCart } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  function handleSelectItem(id) {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  }

  function removeFromCart(id) {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  }

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
      {cart.length === 0 ? (
        <p className="text-center text-gray-500 py-8">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition-all"
            >
              {/* Left Section */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                  className="h-5 w-5 accent-blue-600"
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold truncate">
                    {item.name}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Price: <span className="font-medium">${item.price}</span>
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    –
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm sm:text-base"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total and Checkout */}
          <div className="border-t pt-4 flex flex-col sm:flex-row justify-between items-center">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Total:
            </h2>
            <p className="text-lg sm:text-xl font-bold text-blue-600">
              ${totalPrice.toFixed(2)}
            </p>
          </div>

          <div className="text-center mt-4">
            <button
              onClick={() =>
                navigate("/checkout", { state: { selectedItems } })
              }
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;







// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// export function CartPage() {
//   const { cart, setCart } = useCart();
//   const [selectedItems, setSelectedItems] = useState([]);
//   const navigate = useNavigate();

//   // Select or deselect items for checkout
//   function handleSelectItem(id) {
//     if (selectedItems.includes(id)) {
//       setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
//     } else {
//       setSelectedItems([...selectedItems, id]);
//     }
//   }

//   // Increase quantity
//   function increaseQuantity(id) {
//     const updatedCart = cart.map((item) =>
//       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//     );
//     setCart(updatedCart);
//   }

//   // Decrease quantity
//   function decreaseQuantity(id) {
//     const updatedCart = cart.map((item) =>
//       item.id === id && item.quantity > 1
//         ? { ...item, quantity: item.quantity - 1 }
//         : item
//     );
//     setCart(updatedCart);
//   }

//   // Remove item
//   function removeFromCart(id) {
//     const updatedCart = cart.filter((item) => item.id !== id);
//     setCart(updatedCart);
//   }

//   // Calculate total price
//   const totalPrice = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="min-h-screen  py-10 px-4">
//       <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8">
//         <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
//           Your Cart
//         </h1>

//         {/* Empty cart message */}
//         {cart.length === 0 ? (
//           <p className="text-center text-gray-500 text-lg">
//             Your cart is empty. Add some products to continue shopping.
//           </p>
//         ) : (
//           <div className="space-y-6">
//             {/* Cart items */}
//             {cart.map((item) => (
//               <div
//                 key={item.id}
//                 className="
//                   flex flex-col sm:flex-row items-center justify-between 
//                   border border-gray-200 rounded-xl p-4 sm:p-5 
//                   shadow-sm hover:shadow-md 
//                   transition-all duration-300 bg-white
//                 "
//               >
//                 {/* Left: Image + Info */}
//                 <div className="flex items-center w-full sm:w-auto gap-4 mb-4 sm:mb-0">
//                   <input
//                     type="checkbox"
//                     checked={selectedItems.includes(item.id)}
//                     onChange={() => handleSelectItem(item.id)}
//                     className="w-4 h-4 accent-blue-600 cursor-pointer"
//                   />
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg border"
//                   />
//                   <div>
//                     <h2 className="text-lg font-semibold text-gray-800">
//                       {item.name}
//                     </h2>
//                     <p className="text-gray-600 text-sm sm:text-base">
//                       Price:{" "}
//                       <span className="font-medium text-blue-600">
//                         ${item.price}
//                       </span>
//                     </p>
//                   </div>
//                 </div>

//                 {/* Right: Quantity + Actions */}
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => decreaseQuantity(item.id)}
//                     className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 font-bold text-lg"
//                   >
//                     –
//                   </button>
//                   <span className="w-6 text-center font-medium">
//                     {item.quantity}
//                   </span>
//                   <button
//                     onClick={() => increaseQuantity(item.id)}
//                     className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 font-bold text-lg"
//                   >
//                     +
//                   </button>

//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="ml-4 text-red-500 hover:text-red-700 font-medium text-sm sm:text-base"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}

//             {/* Total section */}
//             <div className="flex flex-col sm:flex-row justify-between items-center border-t pt-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">
//                 Total:
//               </h2>
//               <p className="text-2xl font-semibold text-blue-700">
//                 ${totalPrice.toFixed(2)}
//               </p>
//             </div>

//             {/* Checkout button */}
//             <div className="text-center mt-8">
//               <button
//                 onClick={() =>
//                   navigate("/checkout", { state: { selectedItems } })
//                 }
//                 className="
//                   bg-blue-600 hover:bg-blue-700 text-white font-semibold 
//                   px-8 py-3 rounded-xl 
//                   transition-all duration-300 
//                   shadow-md hover:shadow-lg
//                 "
//               >
//                 Proceed to Checkout →
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CartPage;
