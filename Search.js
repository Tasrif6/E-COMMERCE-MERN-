import React from 'react';
import Layout from '../components/Layout/Layout';
import { useSearch } from '../context/search';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [values,setValues] = useSearch() 
  return (
    <Layout title={'Search result'}>
        <div className="container">
           <div className="text=center">
               <h1> Search Result</h1>
               <h6>{values?.result.length < 1 
                    ? 'No Products Found' 
                    : `Found ${values?.result.length}`}
               </h6>
               <div className="d-flex flex-wrap mt-4"> 
                {values?.result.map((p) => (
                    <div className="card m-2" style={{ width: "18rem"  }}>
                        <img 
                           src={`/api/v1/product/product-photo/${p._id}`}
                           className= "card-img-top" 
                           alt={p.name}
                        />
                        <div classNme="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card=text"> 
                                {p.description.substring(0, 30)}...
                            </p>
                            <p className="card-text"> $ {p.price}</p> 
                            <button class="btn btn-primary ms-1">More Details</button>
                            <button class="btn btn-primary ms-1">Add To Cart</button>
                        </div>
                    </div> 
                ))}
               </div>
           </div>
        </div>
    </Layout>
  )
}

export default Search