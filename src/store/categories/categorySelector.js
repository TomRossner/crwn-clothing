import {createSelector} from "reselect";

const selectCategoriesReducer = (state) => state.categories;

export const selectCategories = createSelector([selectCategoriesReducer], (categoriesSlice) => {
    return categoriesSlice.categoriesMap;
});

export const selectCategoriesMap = createSelector([selectCategories], (categories) => { // Not used
    if (!categories.length) return;
    return Object.values(categories).reduce((acc, category) => {
        console.log("hey");
        const {title, items} = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
});

export const selectCategoriesIsLoading = createSelector([selectCategoriesReducer], (categoriesSlice) => categoriesSlice.isLoading);