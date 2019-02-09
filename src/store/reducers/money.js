import { actionTypes } from '../actions/action-types';
import LocalStorageService from "../../services/localStorageService";


const initialState = {
    // total sum
    amount: 0,
    income: LocalStorageService.get_from_storage('income'),
    expenses: LocalStorageService.get_from_storage('expenses'),
    // counter (using for sort)
    transactionIndex: 0
};

export const money = (state = initialState, action) => {
    let newAmount = state.amount;
    let newExpenses = state.expenses;
    let newIncome = state.income;
    let expense = action.payload && action.payload.expense;
    let income = action.payload && action.payload.income;
    let transactionIndex = 0;

    switch (action.type) {
        // Expenses
        case actionTypes.NEW_EXPENSE:
            transactionIndex = expense.hidden.transactionIndex;
            newExpenses = [...state.expenses, expense];

            LocalStorageService.save_to_storage('expenses', newExpenses);

            return {
                ...state,
                amount: newAmount - Math.abs(expense.amount),
                expenses: newExpenses,
                transactionIndex
            };

        case actionTypes.EDIT_EXPENSE:
            newAmount = -Math.abs(newExpenses.concat(newIncome).reduce((sum, exp) => sum += exp.amount, 0));
            newExpenses = newExpenses.map((item) =>
                (expense.hidden.transactionIndex === item.hidden.transactionIndex) ? expense : item)

            LocalStorageService.save_to_storage('expenses', newExpenses);

            return {
                ...state,
                amount: newAmount,
                expenses: newExpenses
            };

        case actionTypes.REMOVE_EXPENSE:
            newAmount += Math.abs(expense.amount);
            newExpenses.splice(expense.transactionId, 1);

            LocalStorageService.save_to_storage('expenses', newExpenses);

            return { ...state, amount: newAmount, expenses: newExpenses };

        // income
        case actionTypes.NEW_INCOME:
            transactionIndex = income.hidden.transactionIndex;
            newIncome = [...state.income, income];

            LocalStorageService.save_to_storage('income', newIncome);

            return {
                ...state,
                amount: newAmount + parseFloat(income.amount),
                income: newIncome,
                transactionIndex
            };

        case actionTypes.EDIT_INCOME:
            newAmount = newExpenses.concat(newIncome).reduce((sum, inc) => sum += inc.amount, 0);
            newIncome = newIncome.map((item) =>
                (income.hidden.transactionIndex === item.hidden.transactionIndex) ? income : item)

            LocalStorageService.save_to_storage('income', newIncome);

            return {
                ...state,
                amount: newAmount,
                income: newIncome
            }

        case actionTypes.REMOVE_INCOME:
            newAmount -= parseFloat(income.amount);
            newIncome.splice(income.transactionId, 1);

            LocalStorageService.save_to_storage('income', newIncome);

            return { ...state, amount: newAmount, income: newIncome };

        default:
            return state;
    }
};