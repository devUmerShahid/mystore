import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            MyStore
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Products
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-blue-600 font-medium">
              Cart
            </Link>

            {/* Conditional Auth Links */}
            {user ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600 font-medium">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                  Login
                </Link>
                <Link to="/signup" className="text-gray-700 hover:text-blue-600 font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <Link
            to="/"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            Cart
          </Link>
          {user ? (
            <>
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;









// import { Link } from "react-router-dom";
// import { useState } from "react";

// function Navbar() {
//   // state for toggling the mobile menu
//   const [menuOpen, setMenuOpen] = useState(false);
  

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* main navbar container */}
//         <div className="flex justify-between items-center h-16">

//           {/* logo / brand */}
//           <Link to="/" className="text-2xl font-bold text-blue-600">
//             MyStore
//           </Link>

//           {/* desktop links */}
//           <div className="hidden md:flex space-x-6">
//             <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
//               Products
//             </Link>
//             <Link to="/cart" className="text-gray-700 hover:text-blue-600 font-medium">
//               Cart
//             </Link>

//             <Link to="/login" className="text-gray-700 hover:text-blue-600 fonr-medium">
//             Login
//             </Link>

//             <Link to="/profile" className="text-gray-700 hover:text-blue-600 fonr-medium">
//             Profile
//             </Link>
            
//             <Link to="/signup" className="text-gray-700 hover:text-blue-600 fonr-medium">
//             SignUp
//             </Link>
//           </div>

//           {/* mobile menu button */}
//           <button
//             className="md:hidden text-gray-700 hover:text-blue-600"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {/* hamburger icon */}
//             {/* {menuOpen ? (
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
//                    strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                 <path strokeLinecap="round" strokeLinejoin="round"
//                       d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             ) : (
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
//                    strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                 <path strokeLinecap="round" strokeLinejoin="round"
//                       d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5" />
//               </svg>
//             )} */}
//           </button>
//         </div>
//       </div>

//       {/* mobile menu dropdown */}
//       {menuOpen && (
//         <div className="md:hidden bg-white shadow-lg">
//           <Link
//             to="/"
//             className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
//             onClick={() => setMenuOpen(false)}
//           >
//             Products
//           </Link>
//           <Link
//             to="/cart"
//             className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
//             onClick={() => setMenuOpen(false)}
//           >
//             Cart
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;
