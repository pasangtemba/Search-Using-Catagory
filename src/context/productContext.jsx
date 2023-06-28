import { createContext, useContext, useState } from "react";
import getData from "../lib/ListData";

const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [uniqueCategory, setUniqueCategory] = useState([]);
  const [selectedFilteredProduct, setSelectedFilteredProduct] = useState([]);

  const getProductsData = async () => {
    try {
      const data = await getData();
      setProducts(data);
      setFilteredData(data);
      setSelectedFilteredProduct(data);
      const unique = [...new Set(data.map((item) => item.category))];
      setUniqueCategory(unique);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProductContext.Provider
      value={{
        products,
        getProductsData,
        filteredData,
        setFilteredData,
        uniqueCategory,
        selectedFilteredProduct,
        setSelectedFilteredProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
export default ProductContextProvider;
