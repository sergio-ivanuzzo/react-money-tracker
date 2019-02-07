import React, { Component, Fragment } from 'react';
import rand from 'random-key';
import { Container, Table, Dropdown, Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import DataRow from './DataRow';


class DataTable extends Component {

    constructor(props) {
        super(props);
        this.moneyInput = React.createRef();
        this.category = null;
    }

    ID_LENGTH = 50;

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



    setCategory(category) {
        this.category = category;
    }

    getEditMethod(item) {
        const { editExpense, editIncome } = this.props;
        return (parseFloat(item.amount) < 0) ? editExpense.bind(this) : editIncome.bind(this);
    }

    getRemoveMethod(item) {
        const { removeExpense, removeIncome } = this.props;
        return (parseFloat(item.amount) < 0) ? removeExpense.bind(this) : removeIncome.bind(this);
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
                            <tbody>
                            { data
                                .map(item => (
                                    <DataRow key={ item.transactionId }
                                             item={ item }
                                             edit={ this.getEditMethod(item) }
                                             remove={ this.getRemoveMethod(item) } />))
                            }
                            </tbody>
                        </Table>
                    </Container>
                </div>
            </Fragment>
        );
    }
}

export default DataTable;