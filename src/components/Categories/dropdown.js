import React, { Component, Fragment } from 'react';
import { Dropdown, Row, Col } from 'react-bootstrap';
import LocalStorageService from '../../services/localStorageService';


class CategoriesDropdown extends Component {

    state = {
        selected: ''
    }

    setCategory(category) {
        const { setCategory } = this.props;

        this.setState({
            selected: category.name
        }, () => {
            setCategory(category);
        })
    }

    render() {
        let categories = LocalStorageService.get_from_storage('categories');

        return (
            <Fragment>
                <Row>
                    <Col>
                        <Dropdown className="d-inline-block">
                            <Dropdown.Toggle variant="outline-secondary"
                                             id="dropdown-basic" size="sm" disabled={ !categories.length }>
                                Categories
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    categories.map(cat => (
                                        <Dropdown.Item
                                            onSelect={this.setCategory.bind(this, cat)}
                                            key={ cat.categoryId }>
                                            { cat.name }
                                        </Dropdown.Item>)
                                    )
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className="d-inline-block ml-3">
                            Category: { this.state.selected }
                        </div>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default CategoriesDropdown;