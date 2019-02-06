import { actionTypes } from '../actions/action-types';


const initialState = {
    categories: []
}

export const category = (state = initialState, action) => {
    let newCategories = state.categories;

    switch (action.type) {
        case actionTypes.NEW_CATEGORY:
            return { ...state, categories: [...state.categories, action.category] }
        case actionTypes.EDIT_CATEGORY:
            newCategories[action.payload.categoryId] = action.category;
            return { ...state, categories: newCategories }
        case actionTypes.REMOVE_CATEGORY:
            newCategories.splice(action.payload.categoryId, 1);
            return { ...state, categories: newCategories }
        default:
            return state;
    }
}