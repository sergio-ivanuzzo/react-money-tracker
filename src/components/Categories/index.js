import React, { Component, Fragment } from 'react';
import {Button, Col, Form, InputGroup, Table} from 'react-bootstrap';
import DataRow from '../DataTable/DataRow';
import rand from "random-key";


class Categories extends Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();

        if (!window.localStorage.getItem('categories')) {
            window.localStorage.setItem('categories', JSON.stringify([]));
        }
    }

    addCategory() {
        const { addCategory } = this.props;
        let category = {
            categoryId: rand.generate(this.ID_LENGTH),
            name: this.input.current.value,
            hidden: {} // not for output
        };

        let categories = JSON.parse(window.localStorage.getItem('categories'));
        categories.push(category);
        window.localStorage.setItem('categories', JSON.stringify(categories));

        addCategory(category);
    }

    render() {
        const { editCategory, removeCategory } = this.props;
        let categories = [];
        if (window.localStorage.getItem('categories')) {
            categories = JSON.parse(window.localStorage.getItem('categories'));
        }

        return (
            <Fragment>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <Button variant="outline-secondary"
                                    onClick={ this.addCategory.bind(this) } size="sm">Add Category</Button>
                        </InputGroup.Prepend>
                        <Form.Control type="text" ref={ this.input } size="sm" />
                    </InputGroup>
                </Col>
                <Table striped bordered hover>
                    <tbody>
                    { categories
                        .map(item => (
                            <DataRow key={ item.categoryId }
                                     item={ item }
                                     edit={ editCategory.bind(this, item) }
                                     remove={ removeCategory.bind(this, item) } />))
                    }
                    </tbody>
                </Table>
            </Fragment>
        );
    }
}

export default Categories;