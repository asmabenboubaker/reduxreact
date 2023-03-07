import { useEffect, useState } from "react";
import CardGroup from "react-bootstrap/CardGroup";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// import products from "../products.json";
import ProductFunc from "./ProductFunc";
import Alert from 'react-bootstrap/Alert';
import { getallProducts,deleteProduct } from "../service/api";
import {setProducts} from "../redux/slices/productsSlice"
function ProductsFunc(props) {
  const dispatch = useDispatch();
    const [showAlert,setshowAlert]=useState(false);
    const [showWelcome,setshowWelcome]=useState(true);

  const products = useSelector((state) => state.products.products);
    //Get Products
    useEffect(() => {
      getallProducts().then(products => dispatch(setProducts(products)));
    }, [dispatch]);
    
    
    const deleteProd = async (id) => {
      const result = window.confirm("Are you sure you want to delete?");
      if (result) {
        await deleteProduct(id);
        const products = await getallProducts();
        dispatch(setProducts(products));
      }
    }
    
    const buy = (product,updateQuantity) => {
        product.quantity--;
        updateQuantity(product.quantity);
        console.log( product.quantity--)
        showAlert1();
        
       };
    
       
       const showAlert1 = () => {
        setshowAlert(true);
        setTimeout(()=>{
            setshowAlert(false)
        },2000);
      
      };
      useEffect(()=>{
       
        setTimeout(()=>{
            setshowWelcome(false)
        },3000);
      
      })
    return ( <>
     {showWelcome && (
          <Alert variant="success">Welcome to our store!</Alert>
        )}
        <CardGroup>
          {products.map((p, i) => (
             <ProductFunc key={i} product={p} buyFunction={buy} deleteProd={deleteProd}/>))}
             
         </CardGroup>
         {showAlert && (
          <Alert variant="success">You bought an Item</Alert>
        )}
        
    </> );
}

export default ProductsFunc;