import { actionTypes } from '../actions/action-types';


const initialState = {
    categories: []
}

export const category = (state = initialState, action) => {
    let newCategories = state.categories;
    let category = action.payload && action.payload.category;

    switch (action.type) {
        case actionTypes.NEW_CATEGORY:
            let categories = state.categories;
            // do not insert categories with duplicate name
            if (!categories.some(cat => cat.name === category.name)) {
                categories = [...state.categories, category];
            }
            return { ...state, categories }

        case actionTypes.EDIT_CATEGORY:
            return {
                ...state,
                categories: newCategories.map((item) =>
                    (category.categoryId === item.categoryId) ? category : item)
            }

        case actionTypes.REMOVE_CATEGORY:
            newCategories.splice(category.categoryId, 1);
            return { ...state, categories: newCategories }

        default:
            return state;
    }
}