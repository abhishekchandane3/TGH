import React, { useContext } from 'react'
import './FoodDisplay.css' 
import FoodItem from '../FoodItem/FoodItem'; 
import { StoreContext } from '../../context/StoreContext';

const FoodDisplay = ({ category }) => {
  const { food_list, searchTerm } = useContext(StoreContext);  // 👈 bring searchTerm from context

  return (
    <div className="food-display" id="food-display">
      <h2>Top Products / Food / Dishes</h2>
      <div className='food-display-list'>
        {food_list
          .filter((item) => {
            // ✅ check category + search
            const matchCategory = category === "All" || category === item.category;
            const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchCategory && matchSearch;
          })
          .map((item) => (
            <FoodItem 
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
