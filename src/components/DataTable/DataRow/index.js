import React, { Component } from 'react';


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
        let { item } = this.props;
        return (
            <tr>
                {
                    Object.keys(item)
                        .filter(key => typeof item[key] !== 'object')
                        .map(
                        key => (
                            <td key={ item[key] } className={ DataRow.getClassName(key, item[key]) }>
                                { DataRow.format(key, item[key]) }
                            </td>
                        )
                    )
                }
            </tr>
        );
    }
}

export default DataRow;