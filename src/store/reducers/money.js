import { actionTypes } from '../actions/action-types';


const initialState = {
    // total sum
    amount: 0,
    income: [],
    expenses: [],
    // counter
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
            expense.hidden.transactionIndex = transactionIndex++;
            return {
                ...state,
                amount: newAmount - Math.abs(expense.amount),
                expenses: [...state.expenses, expense],
                transactionIndex
            };

        case actionTypes.EDIT_EXPENSE:
            newExpenses[expense.transactionId] = expense;
            newAmount = -Math.abs(newExpenses.concat(newIncome).reduce((sum, exp) => sum += exp.amount, 0));
            return { ...state, amount: newAmount, expenses: newExpenses };

        case actionTypes.REMOVE_EXPENSE:
            newAmount += Math.abs(expense.amount);
            newExpenses.splice(expense.transactionId, 1);
            return { ...state, amount: newAmount, expenses: newExpenses };

        // income
        case actionTypes.NEW_INCOME:
            income.hidden.transactionIndex = transactionIndex++;
            return { ...state, amount: newAmount + income.amount, income: [...state.income, income], transactionIndex };

        case actionTypes.EDIT_INCOME:
            console.log('new=', income)
            newIncome[income.transactionId] = income;
            newAmount = newExpenses.concat(newIncome).reduce((sum, inc) => sum += inc.amount, 0);
            return { ...state, amount: newAmount, income: newIncome };

        case actionTypes.REMOVE_INCOME:
            newAmount -= parseFloat(income.amount);
            newIncome.splice(income.transactionId, 1);
            return { ...state, amount: newAmount, income: newIncome };

        default:
            return state;
    }
};