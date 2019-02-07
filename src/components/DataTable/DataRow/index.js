import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';


class DataRow extends Component {

    static getClassName(key, item) {
        if (key === 'amount') {
            return (item < 0) ? 'expense' : 'income';
        }
    }

    static format(key, item) {
        if (key === 'amount') {
            return parseFloat(item).toFixed(2);
        } else {
            return item;
        }
    }

    render() {
        let { item, edit, remove } = this.props;
        let keys = Object.keys(item).filter(key => typeof item[key] !== 'object');

        return (
            <tr>
                {
                    keys.map(
                        key => (
                            <td key={ item[key] } className={ DataRow.getClassName(key, item[key]) }>
                                { DataRow.format(key, item[key]) }
                            </td>
                        )
                    )
                }
                <td>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="outline-secondary" onClick={edit}>
                            <span className="fas fa-edit"></span>
                        </Button>
                        <Button variant="outline-secondary" onClick={remove}>
                            <span className="fas fa-trash-alt"></span>
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
        );
    }
}

export default DataRow;