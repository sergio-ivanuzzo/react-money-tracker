import { actionTypes } from '../actions/action-types';
import LocalStorageService from '../../services/localStorageService';


const initialState = {
    categories: LocalStorageService.get_from_storage('categories')
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

            LocalStorageService.save_to_storage('categories', categories);

            return { ...state, categories }

        case actionTypes.EDIT_CATEGORY:
            newCategories = newCategories.map((item) =>
                (category.categoryId === item.categoryId) ? category : item);

            LocalStorageService.save_to_storage('categories', newCategories);

            return {
                ...state,
                categories: newCategories
            }

        case actionTypes.REMOVE_CATEGORY:
            newCategories.splice(category.categoryId, 1);

            LocalStorageService.save_to_storage('categories', newCategories);

            return { ...state, categories: newCategories }

        default:
            return state;
    }
}