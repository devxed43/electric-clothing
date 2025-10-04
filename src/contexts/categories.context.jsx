import { createContext, useEffect, useState } from "react";

// pulls down products from db
import { getCategoriesAndDocuments } from "../utils/firebase.utils.js";

import SHOP_DATA from "../shop-data.js";

export const CategoriesContext = createContext({
  // we interface with objects keys
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      // getCategoriesAndDocuments pulls data down
      const categoryMap = await getCategoriesAndDocuments();
      console.log("categoryMap:", categoryMap);
      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
