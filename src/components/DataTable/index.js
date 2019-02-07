import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import rand from 'random-key';
import { Container, Table, Dropdown, Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import * as actions from '../../store/actions';
import DataRow from './DataRow';


class DataTable extends Component {

    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.moneyInput = React.createRef();
        this.category = null;
    }

    ID_LENGTH = 20;

    addExpense() {
        const { addExpense } = this.props;
        let expense = {
            transactionId: rand.generate(this.ID_LENGTH),
            category: this.category.name,
            amount: -parseFloat(this.moneyInput.current.value),
            hidden: {} // not for output
        };
        addExpense(expense);
    }

    addIncome() {
        const { addIncome } = this.props;
        let income = {
            transactionId: rand.generate(this.ID_LENGTH),
            category: this.category.name,
            amount: parseFloat(this.moneyInput.current.value),
            hidden: {} // not for output
        };
        addIncome(income);
    }

    addCategory() {
        const { addCategory } = this.props;
        let category = {
            categoryId: rand.generate(this.ID_LENGTH),
            name: this.input.current.value,
            hidden: {} // not for output
        };
        addCategory(category);
    }

    setCategory(category) {
        this.category = category;
    }

    render() {
        // properties
        const { expenses, income, categories, amount } = this.props;

        let data = expenses
            .concat(income)
            .sort((a, b) => a.hidden.transactionIndex < b.hidden.transactionIndex ? 1 : -1);

        return (
            <Fragment>
                <Form>
                    <Container>
                        <Form.Row>
                            <Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <Button variant="outline-secondary"
                                                onClick={ this.addExpense.bind(this) } size="sm">Add Expense</Button>
                                        <Button variant="outline-secondary"
                                                onClick={ this.addIncome.bind(this) } size="sm">Add Income</Button>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" ref={ this.moneyInput } size="sm" placeholder="0.00" />
                                </InputGroup>

                            </Col>

                            <Col>
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-secondary"
                                                     id="dropdown-basic" size="sm" disabled={ !categories.length }>
                                        Categories
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {
                                            categories.map(cat => (
                                                <Dropdown.Item
                                                    onSelect={this.setCategory(cat)}
                                                    key={ cat.categoryId }>
                                                    { cat.name }
                                                </Dropdown.Item>)
                                            )
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>

                            <Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <Button variant="outline-secondary"
                                                onClick={ this.addCategory.bind(this) } size="sm">Add Category</Button>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" ref={ this.input } size="sm" />
                                </InputGroup>
                            </Col>

                        </Form.Row>
                        <Row>
                            <Col>
                                <strong>Amount</strong>: { amount }
                            </Col>
                        </Row>
                    </Container>
                </Form>

                <div>
                    <Container>
                        <Table striped bordered hover>
                            <thead>
                            </thead>
                            <tbody>
                            { data
                                .map(item => (<DataRow key={ item.transactionId } item={ item } />))
                            }
                            </tbody>
                        </Table>
                    </Container>
                </div>
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