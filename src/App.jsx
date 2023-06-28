import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import List from "./Component/List";
import { useProductContext } from "./context/productContext";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import "./App.css";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const searchBarRef = useRef(null);

  const {
    products,
    getProductsData,
    setFilteredData,
    uniqueCategory,
    selectedFilteredProduct,
    setSelectedFilteredProduct,
  } = useProductContext();

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        searchBarRef.current.focus();
      }
    };
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const searchData = [];

  const inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    const filter = selectedFilteredProduct.filter((data) => {
      return data.title.toLowerCase().includes(lowerCase);
    });
    setFilteredData(filter);
  };
  const priceHandler = (e) => {
    setPrice(e.target.value);
    const filter = selectedFilteredProduct.filter((data) => {
      if (e.target.value === "") {
        return data;
      }
      return data.price < e.target.value;
    });
    setFilteredData(filter);
    setSelectedFilteredProduct(filter);
  };

  const categoryHandler = (e) => {
    setSelectedCategory(e.target.value);
    const filter = products.filter((data) => {
      if (e.target.value === "") {
        return data;
      }
      return data.category === e.target.value;
    });
    setFilteredData(filter);
    setSelectedFilteredProduct(filter);
  };

  return (
    <Container fixed>
      <h1 className="text-center text-4xl font-bold mt-6 mb-4 ">
        Product List
      </h1>

      <div className="navbar navbar-dark bd-dark">
        <form className="w-75 text-end">
          <input
            type="text"
            className="border"
            placeholder="Search    CTRL + K"
            id="search"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            ref={searchBarRef}
          />
        </form>
      </div>

      <div className=" flex flex-row justify-between  mt-6">
        <div className=" flex-[0.5] mr-2">
          <FormControl fullWidth>
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              id="category"
              value={selectedCategory}
              label="Category"
              onChange={categoryHandler}
            >
              <MenuItem value="">None</MenuItem>
              {uniqueCategory.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="flex-[0.5]">
          <FormControl fullWidth>
            <InputLabel id="price">Price</InputLabel>
            <Select
              labelId="price"
              id="price"
              value={price}
              label="Price"
              onChange={priceHandler}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value={100}>less than $100</MenuItem>
              <MenuItem value={300}>less than $300</MenuItem>
              <MenuItem value={500}>less than $500</MenuItem>
              <MenuItem value={700}>less than $700</MenuItem>
              <MenuItem value={1000}>less than $1000</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <Box sx={{ marginTop: "30px" }}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <List input={inputText} />
        </Paper>
      </Box>
    </Container>
  );
};

export default App;
