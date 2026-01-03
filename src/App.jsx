import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer";
import Hero from "/hero.png";
import Checkout from "./pages/Checkout";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import Profile from "./pages/Profile.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <Router>
      {/* Full-page flex container */}
      <div className="flex flex-col min-h-screen">

        {/* Navbar (Top) */}
        <Navbar />

        {/* Main content area */}
        <main className="flex-grow max-w-7xl mx-auto px-4 py-6 w-full">
          <Routes>
            

            {/* Home Route */}
            <Route
              path="/"
              element={
                <>
                  {/* Hero Section */}
                  <section className="flex flex-col md:flex-row rounded-lg items-center justify-between px-6 md:px-12 py-16 bg-gradient-to-br from-blue-50 to-blue-100">
                    {/* Hero Text */}
                    <div className="max-w-xl">
                      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        My First Ecommerce App
                      </h1>
                      <p className="text-gray-600 mb-6">
                        Manage your shopping deliveries effortlessly with our modern, efficient, and
                        customer-friendly platform.
                      </p>
                      <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
                        Get Started
                      </button>
                    </div>

                    {/* Hero Image */}
                    <div className="mt-10 md:mt-0">
                      <img
                        alt="shopping Illustration"
                        src={Hero}
                        className="w-80 md:w-[500px]"
                      />
                    </div>
                  </section>

                  {/* Products grid */}
                  <ProductsPage />
                </>
              }
            />

            {/* Product Detail Page */}
            <Route path="/product/:id" element={<ProductDetailPage />} />

            {/* Cart Page */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          </Routes>

          <ToastContainer position="top-center" autoClose={5000} hideProgressBar="true"/>
        </main>

        {/* Footer (Bottom) */}
        <Footer />
      </div>
      <Analytics />
    </Router>
  );
}

export default App;










// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import ProductsPage from "./pages/ProductsPage";
// import ProductDetailPage from "./pages/ProductDetailPage";
// import CartPage from "./pages/CartPage";
// import Footer from "./components/Footer";
// import Hero from "/hero.png";
// import Checkout from "./pages/Checkout";
// import LoginPage from "./pages/LoginPage.jsx";
// import SignupPage from "./pages/SignupPage.jsx";
// import MyOrders from "./pages/MyOrders.jsx";
// import Profile from "./pages/Profile.jsx";
// //import { db } from "./firebase";
// //import {collection, getDocs} from "firebase/firestore";
// //import { useEffect } from "react";n
// //import { useCart } from "./context/CartContext";


// function App() {

// //   useEffect(() => {
// //   async function testFirebase() {
// //     const querySnapshot = await getDocs(collection(db, "test"));
// //     console.log("Firebase connected:", querySnapshot);
// //   }
// //   testFirebase();
// // }, []);

//   return (
//     <Router>
//       <Navbar />

//       <main className="max-w-7xl mx-auto px-4 py-6">
//         <Routes>

//           {/* Home Route */}
//           <Route
//             path="/"
//             element={
//               <>
//                 {/* Hero Section (only visible on home page) */}
//                 <section className="flex flex-col md:flex-row rounded-lg items-center justify-between px-6 md:px-12 py-16 bg-gradient-to-br from-blue-50 to-blue-100">
//                   {/* Hero Text */}
//                   <div className="max-w-xl">
//                     <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//                       My First Ecommerce App
//                     </h1>

//                     <p className="text-gray-600 mb-6">
//                       Manage your shopping deliveries effortlessly with our modern, efficient, and
//                       customer-friendly platform.
//                     </p>

//                     <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
//                       Get Started
//                     </button>
//                   </div>

//                   {/* Hero Image */}
//                   <div className="mt-10 md:mt-0">
//                     <img
//                       alt="shopping Illustration"
//                       src={Hero}
//                       className="w-80 md:w-[500px]"
//                     />
//                   </div>
//                 </section>

//                 {/* Products grid */}
//                 <ProductsPage />
//               </>
//             }
//           />

//           {/* Product Detail Page */}
//           <Route path="/product/:id" element={<ProductDetailPage />} />

//           {/* Cart Page */}
//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/signup" element={<SignupPage/>}/>
//           <Route path="/profile" element={<Profile/>}/>
//           <Route path="/my-orders" element={<MyOrders/>}/>

//         </Routes>
//       </main>

//       <Footer />
//     </Router>
//   );
// }

// export default App;