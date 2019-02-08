import React, { Component, Fragment } from 'react';
import {Button, Col, Row, Container, Form, InputGroup, Table} from 'react-bootstrap';
import rand from 'random-key';
import DataRow from '../DataTable/DataRow';


class Categories extends Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        this._init_storage();
    }

    _init_storage() {
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

        this._save_to_storage('categories', category);

        addCategory(category);
    }

    _save_to_storage(key, item) {
        let items = JSON.parse(window.localStorage.getItem(key));
        items.push(item);
        window.localStorage.setItem(key, JSON.stringify(items));
    }

    render() {
        const { editCategory, removeCategory } = this.props;
        let categories = [];
        if (window.localStorage.getItem('categories')) {
            categories = JSON.parse(window.localStorage.getItem('categories'));
        }

        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <Button variant="outline-secondary"
                                            onClick={ this.addCategory.bind(this) } size="sm">Add Category</Button>
                                </InputGroup.Prepend>
                                <Form.Control type="text" ref={ this.input } size="sm" />
                            </InputGroup>
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
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default Categories;