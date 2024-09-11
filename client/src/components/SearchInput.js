import React from 'react';
import { useSearch } from '../../context/search'; // Correct path
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`/api/v1/product/search/${values.keywords}`);
            setValues({ ...values, result: data });
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    };

    // Check if values is defined and has the keyword property
    const keyword = values ? values.keyword : '';

    return (
        <div>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input 
                    className="form-control me-2" 
                    type="search" 
                    placeholder="Search" 
                    aria-label="Search" 
                    value={keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                />
                <button className="btn btn-outline-success" type="submit">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchInput;
