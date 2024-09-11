// import React from 'react';
// import Layout from '../components/Layout/Layout';
// import {useAuth} from "../context/auth";

// const HomePage = () => {
//   const [auth,setAuth] = useAuth();
//   return (
    
//     <Layout title={"Best offers"}>
//       <h1>HomePage</h1>
//       <pre>{JSON.stringify(auth,null,4)}</pre>
//     </Layout>
//   );
// };

// export default HomePage


// import React, { useState, useEffect } from 'react;
// import Layout from "../components/Layout/Layout";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Checkbox, Radio } from 'antd';
// import { Prices } from '../components/Prices';


// const HomePage = () => {
//   const navigate = useNavigate();
//   const [ cart, setCart ] = useCart();
//   const [ products, setProducts ] = useState([]);
//   const [ categories, setCategories ] = useState([]);
//   const [ checked setChecked ] = useState([]);
//   const [ radio, setRadio ] = useState([]);
//   const [ total, setTotal ] = useState([]);
//   const [ page, setPage ] = useState([]);
//   const [ loading, setLoading ] = useState([]);

//   const getAllCategory = async () => {
//     try {
//       const { data } = await.axios.get('api/v1/category/get-category');
//       if (data?.success) {
//         setCategories(data?.category);
//       }
//     } catch(error) {
//       console.log(error);
//     }
//   }; 

//   useEffect(() => {
//     getAllCategory();
//     getTotal();
//   }, []);

//   const getAllProducts = async () => {
//     try {
//       setLoading(true);
//       const { data } = await.axios.get('api/v1/product/product-list/${page}');
//       setLoading(false);
//       setProducts(data.products);
//     } catch(error) {
//       setLoading(false);
//       console.log(error);
//     }
//   };

//   // get total part

//   const getTotal = async () => {
//     try {
//       const { data } = await.axios.get('api/v1/product/product-count');
//       setTotal(data?.total);
//     } catch(error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (page === 1) return;
//     loadMore();
//   }, [page]);


//   const loadMore = async () => {
//     try {
//       setLoading(true);
//       const { data } = await.axios.get('api/v1/product/product-list/${page}');
//       setLoading(false);
//       setProducts([...products,...data?.products]);
//     } catch(error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };



//   const handleFilter = (value, id) => {
//     let all = [..checked];
//     if (value) {
//       all.push(id);
//     } else {
//         all = all.filter((c) => c !== id);
//     }
//     setChecked(all);
//   };

//   useEffect(() => {
//     if (!checked.length || !radio.length) getAllProducts();
//   }, [checked.length, radio.length]);

//   useEffect(() => {
//     if (checked.length || radio.length) filterProduct();
//   }, [checked, radio]);


//   const filterProduct = async () => {
//     try {
//       const { data } = await.axios.get('api/v1/product/product-filters', {
//          checked,
//          radio,
//       });
//       setProducts(data?.products);
//     } catch(error) {
//       console.log(error);
//     }
//   }; 

//   return (
//     <layout title = {"All Products- Best Offers"}>
//       <div className = "container-fluid row mt-3">
//         <div className= "col-md-2">
//           <h4 className= "text-center"> Filter By Category </h4>
//           <div className= "d-flex flex-column">
//             {




      
//   };
      
      
  


import React, { useState, useEffect } from 'react';
import Layout from "../components/Layout/Layout";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';



const HomePage = () => {
    const navigate = useNavigate();
    const [ cart, setCart ] = useCart();
    const [ products, setProducts ] = useState([]);
    const [ categories, setCategories ] = useState([]);
    const [ checked, setChecked ] = useState([]);
    const [ radio, setRadio ] = useState([]);
    const [ total, setTotal ] = useState([]);
    const [ page, setPage ] = useState([]);
    const [ loading, setLoading ] = useState([]);

    //get cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('api/v1/category/get-category');
            if (data?.success) {
            setCategories(data?.category);
            }
        } catch(error) {
            console.log(error);
        }
    }; 

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);

    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch(error) {
            setLoading(false);
            console.log(error);
        }
    };

    // get total part

    const getTotal = async () => {
        try {
            const { data } = await axios.get('api/v1/product/product-count');
            setTotal(data?.total);
        } catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);


    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products,...data?.products]);
        } catch(error) {
            console.log(error);
            setLoading(false);
        }
    };



    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);



    //get filter product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post('api/v1/product/product-filters', {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch(error) {
            console.log(error);
        }
    };


    return (
        <Layout title = {"All Products - Best Offers"}>
            <div className = "container-fluid row mt-3">
                <div className = "col-md-2">
                    <h4 className = "text-center">Filter By Category</h4>
                    <div className = "d-flex flex-column">
                        {categories?.map((c) => (
                            <Checkbox key = {c._id} onChange= {(e) => handleFilter(e.target.checked, c._id)} >
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                
                    {/* <div className = "d-flex flex-column">
                    {categories?.map((c) => (
                        <Checkbox
                        key = {c._id}
                        onChange= {(e) => handleFilter(e.target.checked, c._id)}
                        >
                        {c.name}
                        </Checkbox>
                    ))}
                    </div> */}
                    {/* Price Filter */}
                    <h4 className = "text-center">Filter By Price</h4>
                    <div className = "d-flex flex-column">
                        <Radio.Group onChange= {(p) => setRadio(e.target.value)}>
                            {Prices?.map((c) => ( 
                            <div key = {p._id}>
                                <Radio value = {p.array} > {p.name}
                                </Radio>
                            </div>
                            ))}
                        </Radio.Group>
                    </div>
                </div>
                <div className='col-md-9'>
                    {JSON.stringify(radio, null, 4)}
                    <h4 className = "text-center">All Product List</h4>
                    <div className = "d-flex flex-wrap"></div>
                        {products?.map((p) => (
                            <div className='card m-2' style={{width: '18rem'}}>
                                <img src= {`/api/v1/product/product-photo/${p._id}`}
                                className='card-img-top'
                                alt = {p.name}/>

                                <div className='card-body'>
                                    <h5 className='card-title'>{p.name}</h5>
                                    <p className='card-text'>{p.description.subString(0,30)}...</p>
                                    <p className='card-text'>{p.price} bdt </p>
                                    <button className= "btn btn-primary ms-1"
                                        onClick={() => navigate(`/product/${p.slug}`)
                                    }>More Details
                                    </button>
                                    <button class= "btn btn-secondary ms-1" 
                                    onClick={() => {setCart(...cart, p)
                                        toast.success("Item added to the cart")
                                    }}> Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                        <h1>Products</h1>
                    </div>
                </div>
        </Layout>
    )






};




        
        






  

