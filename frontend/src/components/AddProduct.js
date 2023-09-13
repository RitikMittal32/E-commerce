import React, { useState } from 'react'

const AddProduct = () => {
          const [name,setName] = useState("");
          const[price,setPrice] = useState('');
          const[company,setCompany] = useState('');
          const[category, setCategory] = useState('');
          const[error,setError] = useState(false);

          const addProduct = async () => {

                    if(!name || !price || !category || !company){
                              setError(true)
                              return false;
                    }

                    const userId = JSON.parse(localStorage.getItem('user'))._id;
                    let result = await fetch('http://localhost:5000/add-product',{
                              method:'post',
                              body:JSON.stringify({name,price,company,category,userId}),
                              headers:{
                                        'Content-Type':'application/json'
                              }
                              
                    })
                    result = await result.json();
                    console.warn(result)
          }

  return (
    <div className='product'>
          <h1>Add Product</h1>
          <input type='text' placeholder='Enter Product Name' value={name} className='inputBox' onChange={(e)=>setName(e.target.value)}/>
          {error && !name && <span className='invalid-input'>Enter valid name</span>}
          <input type='text' placeholder='Enter Product Price' value={price} className='inputBox'  onChange={(e)=>setPrice(e.target.value)} />
          {error && !price && <span className='invalid-input'>Enter price name</span>}

          <input type='text' placeholder='Enter Product Category' value={category} className='inputBox' onChange={(e)=>setCategory(e.target.value)}/>
          {error && !category && <span className='invalid-input'>Enter category name</span>}

          <input type='text' placeholder='Enter Product Company' value={company} className='inputBox' onChange={(e)=>setCompany(e.target.value)}/>
          {error && !company && <span className='invalid-input'>Enter company name</span>}

          <button className='registerButton' onClick={addProduct}>Add Product</button>
    </div>
  )
}

export default AddProduct
