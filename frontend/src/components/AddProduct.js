import React from 'react';
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;


const AddProduct =()=>{
    const [name,setName]=React.useState('');
    const [price,setPrice]=React.useState('');
    const [category,setCategory]=React.useState('');
    const [company,setCompany]=React.useState('');
    const [error,setError] = React.useState(false);

    const addProduct= async()=>{

        console.warn(!name); //returns true 
        if(!name || !price || !category || !company)
        {
            setError(true);
            return false; //returns code upto here
        }
       const userId = new ObjectId(JSON.parse(localStorage.getItem('user'))._id);
    //    const userId = JSON.parse(localStorage.getItem('user'))._id;
       console.log("Userid :" ,userId);
       console.warn(name,price,category,company,userId);
       let result = await fetch("http://127.0.0.1:5000/add-product",{
            method:'post',
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                "Content-type":"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        });
        result = await result.json();
        console.warn(result);
    }

    return(
        <div className='product'>
            <h1>Add Product</h1>
            <input type="text"  placeholder='Enter Product Name' className='inputBox' 
            onChange={(e)=>{setName(e.target.value)}} value={name}/>

           {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input type="text"  placeholder='Enter Product Price' className='inputBox'
            onChange={(e)=>{setPrice(e.target.value)}} value={price}/>
                       {error && !price && <span className='invalid-input'>Enter valid price</span>}

            <input type="text"  placeholder='Enter Product Category' className='inputBox'
            onChange={(e)=>{setCategory(e.target.value) }} value={category}/>
                       {error && !category && <span className='invalid-input'>Enter valid category</span>}


            <input type="text"  placeholder='Enter Product Company' className='inputBox'
            onChange={(e)=>{setCompany(e.target.value)}} value={company}/>
                {error && !company && <span className='invalid-input'>Enter valid company</span>}


            <button className='appButton' onClick={addProduct}>Add Product</button>

        </div>
    )
}

export default AddProduct;