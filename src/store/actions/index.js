import {actionTypes} from "./action-types";


// expense
export const addExpense = (expense) => ({
    type: actionTypes.NEW_EXPENSE,
    payload: {
        expense
    }
});

export const editExpense = (expense) => ({
    type: actionTypes.EDIT_EXPENSE,
    payload: {
        expense
    }
});

export const removeExpense = (expense) => ({
    type: actionTypes.REMOVE_EXPENSE,
    payload: {
        expense
    }
});

// income
export const addIncome = (expense) => ({
    type: actionTypes.NEW_INCOME,
    payload: {
        expense
    }
});

export const editIncome = (expense) => ({
    type: actionTypes.EDIT_INCOME,
    payload: {
        expense
    }
});

export const removeIncome = (expense) => ({
    type: actionTypes.REMOVE_INCOME,
    payload: {
        expense
    }
});

// categories
export const addCategory = (category) => ({
    type: actionTypes.NEW_CATEGORY,
    payload: {
        category
    }
});

export const editCategory = (category) => ({
    type: actionTypes.EDIT_CATEGORY,
    payload: {
        category
    }
});

export const removeCategory = (category) => ({
    type: actionTypes.REMOVE_CATEGORY,
    payload: {
        category
    }
});