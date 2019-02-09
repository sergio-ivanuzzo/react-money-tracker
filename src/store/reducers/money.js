import { actionTypes } from '../actions/action-types';
import LocalStorageService from '../../services/localStorageService';


const initialState = {
    // total sum
    amount: LocalStorageService.get_from_storage('amount', 0),
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
    let transactionIndex = state.transactionIndex;

    switch (action.type) {
        // Expenses
        case actionTypes.NEW_EXPENSE:
            transactionIndex = expense.hidden.transactionIndex;
            newExpenses = [...state.expenses, expense];
            newAmount -= Math.abs(expense.amount);

            LocalStorageService.save_to_storage('expenses', newExpenses);
            LocalStorageService.save_to_storage('amount', newAmount);

            return {
                ...state,
                amount: newAmount,
                expenses: newExpenses,
                transactionIndex
            };

        case actionTypes.EDIT_EXPENSE:
            newExpenses = newExpenses.map((item) =>
                (expense.hidden.transactionIndex === item.hidden.transactionIndex) ? expense : item);

            newAmount = -Math.abs(newExpenses.concat(newIncome).reduce((sum, exp) => sum += parseFloat(exp.amount), 0));

            LocalStorageService.save_to_storage('expenses', newExpenses);
            LocalStorageService.save_to_storage('amount', newAmount);

            return {
                ...state,
                amount: newAmount,
                expenses: newExpenses
            };

        case actionTypes.REMOVE_EXPENSE:
            newAmount += Math.abs(expense.amount);
            let expensePos = newExpenses.findIndex(exp => exp.transactionId === expense.transactionId);
            newExpenses.splice(expensePos, 1);

            LocalStorageService.save_to_storage('expenses', newExpenses);
            LocalStorageService.save_to_storage('amount', newAmount);

            return { ...state, amount: newAmount, expenses: newExpenses };

        // income
        case actionTypes.NEW_INCOME:
            transactionIndex = income.hidden.transactionIndex;
            newIncome = [...state.income, income];
            newAmount += parseFloat(income.amount);

            LocalStorageService.save_to_storage('income', newIncome);
            LocalStorageService.save_to_storage('amount', newAmount);

            return {
                ...state,
                amount: newAmount,
                income: newIncome,
                transactionIndex
            };

        case actionTypes.EDIT_INCOME:
            newIncome = newIncome.map((item) =>
                (income.hidden.transactionIndex === item.hidden.transactionIndex) ? income : item);

            newAmount = newExpenses.concat(newIncome).reduce((sum, inc) => sum += parseFloat(inc.amount), 0);

            LocalStorageService.save_to_storage('income', newIncome);
            LocalStorageService.save_to_storage('amount', newAmount);

            return {
                ...state,
                amount: newAmount,
                income: newIncome
            }

        case actionTypes.REMOVE_INCOME:
            newAmount -= parseFloat(income.amount);

            let incomePos = newExpenses.findIndex(inc => inc.transactionId === income.transactionId);
            newIncome.splice(incomePos, 1);

            LocalStorageService.save_to_storage('income', newIncome);
            LocalStorageService.save_to_storage('amount', newAmount);

            return { ...state, amount: newAmount, income: newIncome };

        default:
            return state;
    }
};