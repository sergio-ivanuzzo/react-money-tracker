import { actionTypes } from '../actions/action-types';


const initialState = {
    amount: 0,
    income: [],
    expenses: []
}

export const money = (state = initialState, action) => {
    let newAmount = state.amount;
    let newExpenses = state.expenses;
    let newIncome = state.income;
    let expense = action.payload && action.payload.expense;
    let income = action.payload && action.payload.income;

    switch (action.type) {
        // Expenses
        case actionTypes.NEW_EXPENSE:
            return { ...state, amount: newAmount - expense.amount, expenses: [...state.expenses, expense] }
        case actionTypes.EDIT_EXPENSE:
            newExpenses[expense.transactionId] = expense;
            newAmount -= state.expenses.reduce((sum, exp) => sum += exp.amount, 0);
            return { ...state, amount: newAmount, expenses: newExpenses }
        case actionTypes.REMOVE_EXPENSE:
            newAmount += expense.amount;
            newExpenses.splice(expense.transactionId, 1);
            return { ...state, amount: newAmount, expenses: newExpenses }

        // income
        case actionTypes.NEW_INCOME:
            return { ...state, amount: newAmount + income.amount, income: [...state.income, income] }
        case actionTypes.EDIT_INCOME:
            newIncome[income.transactionId] = income;
            newAmount += state.income.reduce((sum, inc) => sum += inc.amount, 0);
            return { ...state, amount: newAmount, income: newIncome }
        case actionTypes.REMOVE_INCOME:
            newAmount -= action.amount;
            newIncome.splice(income.transactionId, 1);
            return { ...state, amount: newAmount, income: newIncome }

        default:
            return state;
    }
}