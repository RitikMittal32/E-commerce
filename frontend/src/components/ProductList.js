import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
 
const ProductList = () => {
          const[products,setProduct] = useState([]);
          const[check,setCheck] = useState(true);

          useEffect(()=>{
                    getProduct();
          },[])

          const getProduct= async ()=>{
                let result = await fetch('http://localhost:8080/products')
                result = await result.json();
                
                if(result){
                  setProduct(result);
                }else{
                  setCheck(false);
                }
          }

          const deleteProduct = async (id) => {
            let result = await fetch(`http://localhost:8080/product/${id}`,{
              method: 'Delete'
            });
            if(result){
              getProduct();
            }else{
               console.log('Product Detection Failed');
            }
          };

          const searchHandle = async (event) => {
            let key = event.target.value;
            if(key){
              try{
              let result = await fetch(`http://localhost:8080/search/${key}`);
              setProduct(result);
              // result = await result.json();
              }catch(error){
                console.warn("Error detect in search Handle");
              }
              
            }else{
              getProduct();

            }
            

          }

  return (
    <div className='product-list'>
      <h2>Product list</h2>
      <input type='text' placeholder='Search Product' className='search-product-box' onChange={searchHandle}/>
      <ul>
          <li>S. No</li>
          <li>Name</li>
          <li>Price</li>
          <li>Category</li>
          <li>Operation</li>
      </ul>
      {check && products.length > 0 ? (
          products.map((item,index)=> 
                    <ul key={item._id}>
                    <li>{index+1}</li>
                    <li>{item.name}</li>
                    <li>{item.price}</li>
                    <li>{item.category}</li>
                    <li>
                      <button onClick={()=>deleteProduct(item._id)}>Delete</button>
                      <Link to={"/update/"+item._id}>Update</Link>
                      </li>
                    </ul>
          )): (
            <div className='empty'>
              <h1>There is not any list</h1>
            </div> 
          )
      }
    </div>
  )
}

export default ProductList
