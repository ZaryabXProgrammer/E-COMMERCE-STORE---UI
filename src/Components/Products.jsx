import styled from "styled-components";
// import { popularProducts } from "../data";
import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const Products = ({ cat, filters, sort }) => {

  const [products, setproducts] = useState([]);

  const [filteredProducts, setfilteredProducts] = useState([]);

  //when category(cat here) changes just run the function, gave cat dependency to the useEffect function
  //useEffect to get products on change

  useEffect(() => {
    const getProducts = async () => {
      try {
        //if there is category available in the params then it will detect and use it
        const res = await axios.get(
          cat
            ? `https://e-commerce-store-api-backend.onrender.com/api/products?category=${cat}`
            : "https://e-commerce-store-api-backend.onrender.com/api/products"
        );

        // setproducts(res.data)
        setproducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [cat]);

  //useEffect for the filtered products, once we recieve products from api now we call it

  useEffect(() => {
    if (cat && filters) { // Check if 'filters' exists
      setfilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) => {
            return item[key].includes(value);
            // Object.entries(filters) converts the filters object into an array of key-value pairs. In this example, it would look like: //
            //             ```
            // [  ["color", "Red"],
            //   ["size", "M"],   --> filters array had objects conmverted to key value pair from object.entries
            //  -->you can access properties of an object using bracket notation, like item['color'], if
            // ]
            // ```
          })
        )
      );

    }


  }, [cat, filters, products]);

  // The 'useEffect' dependencies list specifies that the effect should re-run whenever 'cat', 'filters', or 'products' change.

  //useEffect for the sort filter! 
  useEffect(() => {

    if (sort === 'newest') {
      //it will return current items in the filteredProducts array and then the newest item using the sort function and createAt time stamp
      setfilteredProducts(
        (prev) => [...prev].sort((a, b) => a.createdAt - b.createdAt))


    } else if (sort === 'asc') {
      setfilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price)
      )

    } else if (sort === 'desc') {
      setfilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price))

    }

  }, [sort])

  //checking on which route we are, if we are on products route
  const location = useLocation();

  const baseUrl = location.pathname === '/products'


  return (
    <Container>
      {
        cat ? (
          filteredProducts.map((item) => <Product item={item} key={item._id} />)
        ) : (
          baseUrl ? (
            products.map((item) => <Product item={item} key={item._id} />)
          ) : (
            products.slice(0, 8).map((item) => <Product item={item} key={item._id} />)
          )
        )
      }

    </Container>
  );
};

export default Products;
