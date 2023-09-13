import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


const UpdateProduct = () => {
          const [name,setName] = React.useState("");
          const[price,setPrice] = React.useState('');
          const[company,setCompany] = React.useState('');
          const[category, setCategory] = React.useState('');
          const params = useParams();
          const navigate = useNavigate();

          useEffect (() => {
                    getProductDetails();
          },[])

          const getProductDetails = async () => {
                  console.warn(params);
                  let result = await fetch(`http://localhost:5000/product/${params.id}`);
                  result = await result.json();
                  setName(result.name);
                  setPrice(result.price);
                  setCategory(result.category);
                  setCompany(result.company);
          }
          const updateProduct = async () => {
                    let result  = await fetch(`http://localhost:5000/product/${params.id}`, {
                              method: 'Put',
                              body : JSON.stringify({name,price,category,company}),
                              headers: {
                                        'Content-Type':"application/json"
                              }
                    });
                    if(result){
                             alert("result is updated");
                             navigate('/');
                    }
                    result = await result.json();
          
          }

  return (
    <div className='product'>
          <h1>Update Product</h1>
          <input type='text' placeholder='Enter Product Name' value={name} className='inputBox' onChange={(e)=>setName(e.target.value)}/>
          <input type='text' placeholder='Enter Product Price' value={price} className='inputBox'  onChange={(e)=>setPrice(e.target.value)} />

          <input type='text' placeholder='Enter Product Category' value={category} className='inputBox' onChange={(e)=>setCategory(e.target.value)}/>

          <input type='text' placeholder='Enter Product Company' value={company} className='inputBox' onChange={(e)=>setCompany(e.target.value)}/>

          <button className='registerButton' onClick={updateProduct} >Update Product</button>
    </div>
  )
}

export default UpdateProduct;
