import React, { createContext, useEffect, useState } from 'react';
import PRODUCTS from "../shop-data.json";
import {getCategoriesAndDocuments} from "../utils/firebase";

export const CategoriesContext = createContext({
    products: [],
    setProducts: () => null
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = {categoriesMap};

    useEffect(() => {
      const getCategoriesMap = async () => {
        const categoryMap = await getCategoriesAndDocuments();
        setCategoriesMap(categoryMap);
      }
      getCategoriesMap();
    }, [])

  return (
    <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
  )
}