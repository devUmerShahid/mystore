// import { useNavigate } from "react-router-dom";

// function ProductCard({product}){
//     const navigate=useNavigate();
//     return(
//         <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">

            
            
//             {/*Card Image*/}           
//             <img src={product.image} 
//             alt={product.title} 
//             className="w-full h-48 object-contain mb-4" />

//             {/*Product Title*/}
//             <h2 className="text-lg font-semibold text-gray-800 truncate">
//                 {product.title}
//             </h2>

//             {/*Product Price*/}
//             <p className="text-blue-600 font-bold mt-2">${product.price}</p>

//             {/*Product Details Button*/}

//             <button onClick={()=>navigate(`/product/${product.id}`)}
//                 className="bg-blue-600 pl-2 pe-2 text-white rounded-lg cursor-pointer">More →</button>

//             {/* <Link 
//             to={`/product/${product.id}`} 
//             className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//             View Details
//             </Link> */}

//         </div>
//     )
// }
// export default ProductCard;







import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition-all duration-300 flex flex-col 
        justify-between cursor-pointer hover:-translate-y-1 w-full sm:max-w-xs md:max-w-sm "
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Product Image */}
      <div className="flex justify-center items-center">
        <img
          src={product.image}
          alt={product.title}
          className="
            w-full 
            h-26
            sm:h-48 
            object-contain 
            mb-4 
            md:h-56
            lg:h-64
            transition-all
            duration-300
          "
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow">
        <h2
          className="
            text-base 
            sm:text-lg 
            font-semibold 
            text-gray-800 
            line-clamp-2 
            min-h-[3rem]
          "
        >
          {product.title}
        </h2>

        <p
          className="
            text-blue-600 
            font-bold 
            mt-2 
            text-sm 
            sm:text-base
          "
        >
          ${product.price}
        </p>

        {/* Product Details Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.id}`);
          }}
          className="
            mt-4 
            bg-blue-600 
            text-white 
            rounded-lg 
            py-2 
            w-full 
            hover:bg-blue-700 
            transition-colors 
            duration-300 
            text-sm 
            sm:text-base
          "
        >
          View Details →
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
