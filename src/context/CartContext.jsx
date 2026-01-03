import { createContext, useState, useContext, useEffect } from "react";
const CartContext= createContext();
export function CartProvider({children}){ 
    const [cart, setCart]=useState(()=>{
        const savedCart= localStorage.getItem("cartItems");
        return savedCart?JSON.parse(savedCart):[];
    });

    useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);
    
    //Add to cart function
    function addToCart(product){
        const existingItem= cart.find((item)=>item.id===product.id);

        if(existingItem){
            const updatedCart= cart.map((item)=>
            item.id===product.id ? {
                ...item, quantity: item.quantity +1}: item);
                setCart(updatedCart);
        } else{
            setCart([...cart, {...product, quantity:1}])
        }
    }
    

   //Remove from cart functin
   function clearCart() {
    setCart([]);
  }
    
    return(
            <CartContext.Provider value={{cart, setCart, addToCart, clearCart}}>
                {children}
            </CartContext.Provider>
            
        );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useCart(){
    return useContext(CartContext);
    
}