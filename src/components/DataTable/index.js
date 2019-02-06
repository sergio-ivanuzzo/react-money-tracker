import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import DataRow from './DataRow';


class DataTable extends Component {
    render() {
        const { expenses, income } = this.props;
        return (
            <table>
                { expenses
                    .map(exp => (<DataRow/>))
                }
                { income
                    .map(inc => (<DataRow/>))
                }
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        amount: state.money.amount,
        expenses: state.money.expenses,
        income: state.money.income
    }
};

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