import { actionTypes } from '../actions/action-types';


const initialState = {
    categories: []
}

export const category = (state = initialState, action) => {
    let newCategories = state.categories;
    let category = action.payload && action.payload.category;

    switch (action.type) {
        case actionTypes.NEW_CATEGORY:
            return { ...state, categories: [...state.categories, category] }
        case actionTypes.EDIT_CATEGORY:
            newCategories[category.categoryId] = category;
            return { ...state, categories: newCategories }
        case actionTypes.REMOVE_CATEGORY:
            newCategories.splice(category.categoryId, 1);
            return { ...state, categories: newCategories }
        default:
            return state;
    }
}