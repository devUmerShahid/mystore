import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import MyOrders from "./MyOrders";
import MyCart from "./CartPage";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  // Fetch user data from Firestore
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          console.log("No user data found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, navigate]);

  // Update profile info
  const handleSave = async () => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Try again.");
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading profile...</p>;
  if (!profile)
    return <p className="text-center text-gray-500 mt-10">No user data found.</p>;

  return (
    <div className="min-h-screen  py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-4">
        {/* Sidebar */}
        <aside className="bg-gray-50 border-r border-gray-200 p-4 flex flex-col space-y-4">
          <div className="text-center mb-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-3xl font-semibold text-blue-700">
              {profile.name?.[0] || "U"}
            </div>
            <h2 className="text-lg font-semibold mt-3 text-gray-800">
              {profile.name || "User"}
            </h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>

          <nav className="flex flex-col space-y-2">
            {[
              { key: "profile", label: "Profile Info" },
              { key: "cart", label: "My Cart" },
              { key: "orders", label: "My Orders" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`text-left px-4 py-2 rounded-md font-medium transition-all ${
                  activeTab === key
                    ? "bg-blue-100 text-blue-700 shadow-sm"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {label}
              </button>
            ))}

            <button
              onClick={handleLogout}
              className="text-left px-4 py-2 rounded-md font-medium text-red-600 hover:bg-red-100 transition-all"
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Content */}
        <main className="col-span-3 p-2">
          {activeTab === "profile" && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                Profile Information
              </h3>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profile.email || ""}
                    disabled
                    className="w-full border border-gray-200 rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={profile.phone || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">
                    Address
                  </label>
                  <textarea
                    value={profile.address || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, address: e.target.value })
                    }
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  onClick={handleSave}
                  className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "cart" && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                My Cart
              </h3>
              <MyCart />
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                My Orders
              </h3>
              <MyOrders />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}











// import React, { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { db } from "../firebase";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import MyOrders from "./MyOrders";
// import MyCart from "./CartPage"; 
// import { useNavigate } from "react-router-dom";

// export default function Profile() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("profile");

//   //fetch user data from Firestore
//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     const fetchUserData = async () => {
//       try {
//         const docRef = doc(db, "users", user.uid);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setProfile(docSnap.data());
//         } else {
//           console.log("No user data found in Firestore.");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [user, navigate]);

//   //update user profile info
//   const handleSave = async () => {
//     if (!user) return;
//     try {
//       const userRef = doc(db, "users", user.uid);
//       await updateDoc(userRef, {
//         name: profile.name || "",
//         email: profile.email || "",
//         phone: profile.phone || "",
//         address: profile.address || "",
//       });
//       alert("Profile updated successfully!");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Failed to update profile. Try again.");
//     }
//   };

//   //handle logout
//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   if (loading) return <p className="text-center">Loading profile...</p>;
//   if (!profile) return <p className="text-center">No user data found.</p>;

//   return (
//     <div className="max-w-6xl mx-auto bg-white  grid grid-cols-1 md:grid-cols-4 gap-6 border border-gray-400">
//       {/*Left Sidebar */}
//       <div className="col-span-1 border-r border-gray-400 pt-8">
//         {/* <h2 className="text-2xl font-bold mb-6">My Profile</h2> */}
//         <div className="flex flex-col space-y-3">
//           {/* Profile Info */}
//           <button
//             onClick={() => setActiveTab("profile")}
//             className={`text-left px-4 py-2 font-medium  ${
//               activeTab === "profile"
//                 ? "border border-gray-300 bg-gray-300"
//                 : "hover:bg-gray-300"
//             }`}
//           >
//             Profile Info
//           </button>

//           {/* Cart */}
//           <button
//             onClick={() => setActiveTab("cart")}
//             className={`text-left px-4 py-2 font-medium ${
//               activeTab === "cart"
//                 ? "border border-gray-300 bg-gray-300"
//                 : "hover:bg-gray-300"
//             }`}
//           >
//             Cart
//           </button>

//           {/* My Orders */}
//           <button
//             onClick={() => setActiveTab("orders")}
//             className={`text-left px-4 py-2 font-medium ${
//               activeTab === "orders"
//                 ? "border border-gray-300 bg-gray-300"
//                 : "hover:bg-gray-50"
//             }`}
//           >
//             My Orders
//           </button>

//           {/* Logout */}
//           <button
//             onClick={handleLogout}
//             className="text-left px-4 py-2 font-medium text-red-600 hover:bg-red-50"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* 🔹 Right Content */}
//       <div className="col-span-3 p-8">
//         {/* Profile Info Tab */}
//         {activeTab === "profile" && (
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Profile Information</h3>

//             <div className="space-y-4">
//               <div>
//                 <label className="block mb-1 text-gray-700 font-medium">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   value={profile.name || ""}
//                   onChange={(e) =>
//                     setProfile({ ...profile, name: e.target.value })
//                   }
//                   className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 text-gray-700 font-medium">
//                   Email
//                 </label>
//                 <input
//                   type="text"
//                   value={profile.email || ""}
//                   disabled
//                   className="w-full border rounded-md p-2 bg-gray-100 cursor-not-allowed"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 text-gray-700 font-medium">
//                   Phone
//                 </label>
//                 <input
//                   type="text"
//                   value={profile.phone || ""}
//                   onChange={(e) =>
//                     setProfile({ ...profile, phone: e.target.value })
//                   }
//                   className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 text-gray-700 font-medium">
//                   Address
//                 </label>
//                 <textarea
//                   value={profile.address || ""}
//                   onChange={(e) =>
//                     setProfile({ ...profile, address: e.target.value })
//                   }
//                   className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                   rows="3"
//                 ></textarea>
//               </div>

//               <button
//                 onClick={handleSave}
//                 className="mt-4 bg-blue-600 text-white px-6 py-2 
//                  hover:bg-blue-700 transition"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Cart Tab */}
//         {activeTab === "cart" && (
//           <div>
//             <h3 className="text-xl font-semibold mb-4">My Cart</h3>
//             <MyCart /> {/* ✅ Display the user's cart */}
//           </div>
//         )}

//         {/* Orders Tab */}
//         {activeTab === "orders" && (
//           <div>
//             <h3 className="text-xl font-semibold mb-4">My Orders</h3>
//             <MyOrders />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }