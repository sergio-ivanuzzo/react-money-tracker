import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import rand from 'random-key';
import * as actions from '../../store/actions';
import DataRow from './DataRow';


class DataTable extends Component {

    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.select = React.createRef();
    }

    state = {
        value: ''
    }

    ID_LENGTH = 20

    addExpense() {
        const { addExpense } = this.props;
        let expense = {
            transactionId: rand.generate(this.ID_LENGTH),
            category: this.select.current.value
        };
        addExpense(expense);
    }

    addIncome() {
        const { addIncome } = this.props;
        let income = {
            transactionId: rand.generate(this.ID_LENGTH),
            category: this.select.current.value
        };
        addIncome(income);
    }

    addCategory() {
        const { addCategory } = this.props;
        let category = {
            categoryId: rand.generate(this.ID_LENGTH),
            name: this.input.current.value
        };
        addCategory(category);
    }

    render() {
        // properties
        const { expenses, income, categories } = this.props;

        return (
            <Fragment>
                <button onClick={ this.addExpense.bind(this) }>Add Expense</button>
                <button onClick={ this.addIncome.bind(this) }>Add Income</button>
                <button onClick={ this.addCategory.bind(this) }>Add Category</button>

                <input type="text" ref={ this.input } />

                <select ref={ this.select }>
                    {
                        categories
                            .map(cat => (<option key={cat.categoryId}>{cat.name}</option>))
                    }
                </select>

                <table>
                    <tbody>
                        { expenses
                            .map(exp => (<DataRow key={ exp.transactionId } item={exp} />))
                        }
                        { income
                            .map(inc => (<DataRow key={ inc.transactionId } item={inc} />))
                        }
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        amount: state.money.amount,
        expenses: state.money.expenses,
        income: state.money.income,
        categories: state.category.categories
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