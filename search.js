import {useState,useContext,createContext} from 'react';


const SearchContext = createContext();



const SearchProvider = ({children}) => {
    const [SearchProvider,setSearchProvider] = useState({
        keyword:"",
        result: [],
    });


    return (
        <SearchContext.Provider value={[SearchProvider,setSearchProvider]}>
            {children}
        </SearchContext.Provider>
    )

}

// custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };