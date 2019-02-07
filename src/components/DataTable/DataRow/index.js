import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';


class DataRow extends Component {

    state = {
        editingColumns: {},
        updatePressed: false,
        editMode: false
    }

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

    setEditMode(key, item) {
        let columns = { ...this.state.editingColumns };
        columns[key] = item;

        this.setState({
            editingColumns: columns,
            updatePressed: false,
            editMode: true
        });
    }

    update(oldItem) {

        let newItem = { ...oldItem, ...this.state.editingColumns };
        console.log(newItem)

        this.setState({editingColumns: {}, updatePressed: true}, () => {
            let { edit } = this.props;
            edit(newItem);
        });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(this.state.editMode, nextState.editMode)
        if (nextState.updatePressed || !nextState.editMode) {
            return true;
        }

        return false;
    }

    render() {
        let { item, remove } = this.props;
        let { editingColumns } = this.state;
        let keys = Object.keys(item).filter(key => typeof item[key] !== 'object');

        return (
            <tr>
                {
                    keys.map(
                        key => (
                            <td onClick={ this.setEditMode.bind(this, key, item[key]) }
                                key={ item[key] }
                                className={ DataRow.getClassName(key, item[key]) }>
                                { editingColumns[key] ?
                                    (<input type="text"
                                            value={ this.state.editingColumns[key] }
                                            onChange={ (e) => {
                                                this.setState({editingColumns: {[key]: e.target.value}})
                                            } }
                                    />) :
                                    DataRow.format(key, item[key])
                                }
                            </td>
                        )
                    )
                }
                <td>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="outline-secondary" onClick={ this.update.bind(this, item) }>
                            <span className="fas fa-edit"></span>
                        </Button>
                        <Button variant="outline-secondary" onClick={ remove }>
                            <span className="fas fa-trash-alt"></span>
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
        );
    }
}

export default DataRow;