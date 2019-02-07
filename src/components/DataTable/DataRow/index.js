import React, { Component } from 'react';


class DataRow extends Component {
    render() {
        let { item } = this.props;
        return (
            <tr>
                {
                    Object.keys(item).map(key => (<td key={item[key]}>{item[key]}</td>))
                }
            </tr>
        );
    }
}

export default DataRow;