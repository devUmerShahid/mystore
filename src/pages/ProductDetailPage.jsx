import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {useCart} from "../context/CartContext";
import {toast} from "react-toastify";

function ProductDetailPage() {
  const { id } = useParams(); // Get product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProduct, setRelatedProducts]= useState([]);
  const [loadingRelated, setLoadingRelated]= useState(true);
  const [error, setError] = useState(null);
  const {addToCart}=useCart();


  


    // const { cart } = useCart();
    // console.log("Current Cart:", cart);



  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product details");
        const data = await response.json();
        //console.log("Fetched Products", data);
        
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  useEffect(()=>{
    if(!product || !product.category) return;
    async function fetchRelated() {
        try{
            const response = await fetch(`https://fakestoreapi.com/products/category/${product.category}`);
            const data= await response.json();
            const filtered=data.filter((item)=>item.id !== product.id);
            setRelatedProducts(filtered);
            //console.log("Related Products", filtered);
        }catch(err){
            console.error("Error fetching related products", err);
        }finally{
            setLoadingRelated(false);
        }  
    }
    fetchRelated();
  },[product]);


  const handleAddToCart=()=>{
    addToCart(product);
    toast.success(`Product added to your cart!`)
  };

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading product...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;
  if (!product) return <p className="text-center text-gray-500 mt-10">No product found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-80 object-contain"
        />

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.category}</p>
          <p className="text-lg font-semibold mb-2 text-green-700">$ {product.price} Only</p>
          {/*Add to Cart Button*/}
          <button
            onClick={handleAddToCart
              // () => {
              // console.log("Button clicked");
              // addToCart(product);
            }
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Add to Cart
          </button>

          <p className="text-gray-700 mb-6">{product.description}</p>
          {/* <button onClick={()=>{addToCart(product)}}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Add to Cart
          </button> */}

          

        </div>

       
        </div>

         {/*Related Products Section*/}
        <div className="max-w-6xl mx-auto mt-20 inset-shadow-sm p-10 rounded-lg">
            <h1 className="text-2l font-semibold text-gray-800mb-4">Related Products</h1>

            {/*Related Products Container*/}
            <div className="flex gap-6 overflow-x-auto pb-4">
                {loadingRelated?(
                    <p>Loading Related Products...</p>
                ):relatedProduct.length>0?(
                    relatedProduct.map((item)=>(
                        <div
                        key={item.id}
                        className="min-w-[200px] bg-white shdow-md rounded-xl p-4
                        hover:shadow-lg transition"
                        >
                            <img src={item.image} 
                            alt={item.title}
                            className="w-full h-40 object-contain mb-3"/>
                            <h3 className="text-gray-800 font-medium text-sm
                            line-clamp-2">{item.title}</h3>
                            <p className="text-blue-600 font-semibold mt-2">$ {item.price}</p>

                            {/*Add a button to view details*/}
                            <Link to={`/product/${item.id}`}>
                                <button className="text-sm text-blue-600 hover:underline mt-2">
                                    View Details
                                </button>
                            </Link>


                        </div>
                    ))
                ):(
                    <p>No Related Products Found.</p>
                )}
            </div>

      </div>
    </div>
  );
}

export default ProductDetailPage;









// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";

// function ProductDetailPage() {
//     const {id}=useParams();
//     const [product, setProduct]=useState(null);
//     const [loading, setLoading]=useState(true);
//     const [error, setError]=useState(null);

//     useEffect(()=>{
//         async function fetchProduct(){
//             try{
//                 const response=await fetch(`https://fakestoreapi.com/products/${id}`);
//                 if(!response.ok) throw new Error("Failed to fetch product details!");
//                 const data=await response.json();
//                 setProduct(data);   
//             }catch(err){
//                 setError(err.message);
//             }finally{
//                 setLoading(false);
//             }
//         }
//     },[id]);

//     if(loading)
//         return <p>Loading...</p>;
//     if(error)
//         return <p>{error}</p>;
//     if(!product)
//         return<p>No Product Found</p>; 


//   return(
//     <div className="max-w-4xl mx-auto p-6">
//       <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
//         ← Back to Products
//       </Link>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//         {/* Product Image */}
//         <img
//           src={product.image}
//           alt={product.title}
//           className="w-full h-80 object-contain"
//         />

//         {/* Product Info */}
//         <div>
//           <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
//           <p className="text-gray-600 mb-4">{product.category}</p>
//           <p className="text-lg font-semibold mb-2 text-green-700">${product.price}</p>
//           <p className="text-gray-700 mb-6">{product.description}</p>
//           <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default ProductDetailPage;
    