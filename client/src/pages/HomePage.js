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


import React, { useState, useEffect } from 'react;
import Layout from "../components/Layout/Layout";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';


const HomePage = () => {
  const navigate = useNavigate();
  const [ cart, setCart ] = useCart();
  const [ products, setProducts ] = useState([]);
  const [ categories, setCategories ] = useState([]);
  const [ checked setChecked ] = useState([]);
  const [ radio, setRadio ] = useState([]);
  const [ total, setTotal ] = useState([]);
  const [ page, setPage ] = useState([]);
  const [ loading, setLoading ] = useState([]);

  const getAllCategory = async () => {
    try {
      const { data } = await.axios.get('api/v1/category/get-category');
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
      const { data } = await.axios.get('api/v1/product/product-list/${page}');
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
      const { data } = await.axios.get('api/v1/product/product-count');
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
      const { data } = await.axios.get('api/v1/product/product-list/${page}');
      setLoading(false);
      setProducts([...products,...data?.products]);
    } catch(error) {
      console.log(error);
      setLoading(false);
    }
  };



  const handleFilter = (value, id) => {
    let all = [..checked];
    if (value) {
      all.push(id);
    } else {
        all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
     

    
      
      
      
  
    
  
  

