import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { PropsRoute } from '../../router/propsRoute';
import DataTable from '../DataTable';
import * as actions from '../../store/actions';
import Categories from '../Categories';
import Charts from '../Charts';

class App extends Component {
    render() {
        // properties
        const { expenses, income, categories, amount, transactionIndex } = this.props;
        // methods
        const { addExpense, addIncome, addCategory } = this.props;
        const { editExpense, editIncome, editCategory } = this.props;
        const { removeExpense, removeIncome, removeCategory } = this.props;

        return (
            <Fragment>
                <Navbar bg="dark" variant="dark" expand="sm" className="mb-3">
                    <Navbar.Brand href="#home">React Money Tracker</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/money">Money</Nav.Link>
                            <Nav.Link href="/categories">Categories</Nav.Link>
                            <Nav.Link href="/chart">Chart</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Router>
                    <Switch>
                        <PropsRoute
                            path='/money'
                            component={ DataTable }
                            addExpense={ addExpense }
                            addIncome={ addIncome }
                            editExpense={ editExpense }
                            editIncome={ editIncome }
                            removeExpense={ removeExpense }
                            removeIncome={ removeIncome }
                            expenses={ expenses }
                            income={ income }
                            amount={ amount }
                            transactionIndex={ transactionIndex } />

                        <PropsRoute path='/categories'
                                    component={ Categories }
                                    addCategory={ addCategory }
                                    editCategory={ editCategory }
                                    removeCategory={ removeCategory }
                                    categories={ categories } />

                        <PropsRoute path='/chart' component={ Charts } />

                        <Redirect from='/' to='/money' />

                    </Switch>
                </Router>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        amount: state.money.amount,
        expenses: state.money.expenses,
        income: state.money.income,
        categories: state.category.categories,
        transactionIndex: state.money.transactionIndex
    }
};

const mapDispatchToProps = (dispatch) => ({
    // expenses
    addExpense: (expense) => dispatch(actions.addExpense(expense)),
    editExpense: (expense) => dispatch(actions.editExpense(expense)),
    removeExpense: (expense) => dispatch(actions.removeExpense(expense)),
    // income
    addIncome: (income) => dispatch(actions.addIncome(income)),
    editIncome: (income) => dispatch(actions.editIncome(income)),
    removeIncome: (income) => dispatch(actions.removeIncome(income)),
    // categories
    addCategory: (category) => dispatch(actions.addCategory(category)),
    editCategory: (category) => dispatch(actions.editCategory(category)),
    removeCategory: (category) => dispatch(actions.removeCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);