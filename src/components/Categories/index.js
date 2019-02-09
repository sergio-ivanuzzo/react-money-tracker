import React, { Component, Fragment } from 'react';
import {Button, Col, Row, Container, Form, InputGroup, Table} from 'react-bootstrap';
import rand from 'random-key';
import DataRow from '../DataTable/DataRow';


class Categories extends Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
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

    render() {
        const { editCategory, removeCategory, categories } = this.props;
        console.log('cat render')
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
                                                 edit={ editCategory.bind(this) }
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