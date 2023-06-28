import React, { useState } from 'react';

const SearchInterface = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Filter data based on the selected category
  const filterData = (data) => {
    if (selectedCategory === '') {
      return data; // Return all data if no category is selected
    } else {
      return data.filter((item) => item.category === selectedCategory);
    }
  };

  // Sample data array
  const searchData = [
    {proopsis: 'https://fakestoreapi.com/products'},
    // { title: 'Article 1', category: 'News' },
    // { title: 'Article 2', category: 'Sports' },
    // { title: 'Article 3', category: 'Technology' },
    // ...
  ];

  // Get the filtered data based on the selected category
  const filteredData = filterData(searchData);

  return (
    <div>
      <div>
        <h2>Catagory</h2>
        {/* Category Selector */}
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="Man's clothing">Man's clothing</option>
          <option value="Sports">Sports</option>
          <option value="Electronics">Electronics</option>
          <option value="Women's clothing">Women's clothing</option>
          {/* Add more categories here */}
        </select>
      </div>

      <div>
        <h3>Search Results</h3>
        <ul>
          {/* Render the filtered data */}
          {filteredData.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchInterface;
