import React from 'react';
import { useSearch } from '../../context/search'; // Ensure the correct path
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const [values, setValues] = useSearch(); // Get the keyword and result from context
    const navigate = useNavigate();

    // Form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        try {
            // Make an API call to get the search results
            const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`);
            console.log("API Response:", data);
            setValues({ ...values, result: data }); // Store the result in the context
            navigate("/search"); // Redirect user to the search page
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
                    value={keyword} // The keyword typed by the user
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })} // Update keyword on user input
                />
                <button className="btn btn-outline-success" type="submit">
                    Search
                </button>
            </form>

            {/* Conditional rendering for search results */}
            <div>
                {values.result && values.result.length > 0 ? (
                    values.result.map(item => (
                        <div key={item._id}>
                            <h5>{item.name}</h5> {/* Display product name */}
                            <p>{item.description}</p> {/* Display product description */}
                            <p>Price: ${item.price}</p> {/* Display product price if available */}
                            {/* Optionally display more fields */}
                        </div>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    );
};

export default SearchInput;
