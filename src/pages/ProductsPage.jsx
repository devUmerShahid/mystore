import {useEffect, useState} from "react";
import ProductCard from "../components/ProductCard";

function ProductsPage() {

    const [products, setProducts]=useState([]);
    const [loading, setLoading]= useState(true);
    const [error, setError]=useState(null);

    useEffect(()=>{
        async function fetchProducts(){
            try{
              //const response= await fetch("https://fakestoreapiserver.reactbd.org/api/products");
                const response=await fetch("https://fakestoreapi.com/products");
                if(!response.ok) throw new error("Failed to display products!");
                const data= await response.json();
                //console.log("Fetched Products", data);
                setProducts(data);
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        }
        fetchProducts();
    }, );


    if(loading)
        return <p className="text-center text-gray-500 mt-10">Loading Products...</p>;
    if(error)
        return <p className="text-center text-red-500 mt-10">Error: {error}</p>
  return(
    <div className="max-w-7xl mx-auto px-4 py-6">
    {/* Page heading */}
    <h1 className="text-3xl font-bold text-gray-800 mb-6">
      Featured Products
    </h1>

    {/* Product grid container */}
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product)=>(
        <ProductCard key={product.id} product={product}/>
      ))}
    </div>
  </div>
  )
}
export default ProductsPage;