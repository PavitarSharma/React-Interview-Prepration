import { useState, useEffect } from 'react'
import Product from './Product'
import Serachbar from './Serachbar';
import "./styles.css";

const Filter = () => {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('');
    const [timeOutDebounce, setTimeOutDebounce] = useState(0);

    useEffect(() => {
        getProduct(search)
    }, [])

    const getProduct = async (title) => {


        let url = "https://fakestoreapi.com/products"
        if (search !== "") {
            url = `https://fakestoreapi.com/products?title=${title}`
        }

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setProducts(data)
    }

    
    const handleInputChange = (e) => {
        setSearch(e.target.value);
        if (timeOutDebounce !== 0) {
          clearTimeout(timeOutDebounce);
        }
        let timerId = setTimeout(() => getProduct(e.target.value), 500);
        setTimeOutDebounce(timerId);
      };

    
    return (
        <div className="filters">
            <Serachbar 
                search={search}
                handleInputChange={handleInputChange}
            />
            <Product products={products} />
        </div>
    )
}

export default Filter