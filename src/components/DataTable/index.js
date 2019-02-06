import { React } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';


class DataTable extends React.Component {
    render() {
        return null;
    }
}

const mapStateToProps = (state) => ({
    amount: state.amount,
    expenses: state.expenses,
    income: state.income
});

const mapDispatchToProps = (dispatch) => ({
    // expenses
    addExpense: (expense) => dispatch(actions.addExpense(expense)),
    editExpense: (expense) => dispatch(actions.addExpense(expense)),
    removeExpense: (expense) => dispatch(actions.addExpense(expense)),
    // income
    addIncome: (income) => dispatch(actions.addIncome(income)),
    editIncome: (income) => dispatch(actions.editIncome(income)),
    removeIncome: (income) => dispatch(actions.removeIncome(income)),
    // categories
    addCategory: (category) => dispatch(actions.addCategory(category)),
    editCategory: (category) => dispatch(actions.editCategory(category)),
    removeCategory: (category) => dispatch(actions.removeCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);