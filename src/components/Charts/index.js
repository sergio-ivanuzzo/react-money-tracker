import React, { Component, Fragment } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import LocalStorageService from '../../services/localStorageService';
import { Container, Row, Col } from 'react-bootstrap';


class Charts extends Component {

    getChartData(labels, data) {
        return {
            labels: labels,
            datasets: [
                {
                    label: 'Total',
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data
                }
            ]
        }
    }

    render() {
        const expenses = LocalStorageService.get_from_storage('expenses');
        const income = LocalStorageService.get_from_storage('income');

        // total chart
        const totalExpenses = -Math.abs(parseFloat(expenses.reduce((sum, exp) => sum += exp.amount, 0)));
        const totalIncome = parseFloat(income.reduce((sum, inc) => sum += inc.amount, 0));
        const total = this.getChartData(
            ['Expenses', 'Income'],
            [totalExpenses, totalIncome]
        )

        // sorted by categories
        const getDataSortedByCategories = (data) => {
            let categories = [];
            let totalCategorySum = {};

            data.forEach(item => {
                if (!totalCategorySum[item.category]) {
                    categories.push(item.category);
                    totalCategorySum[item.category] = parseFloat(item.amount);
                } else {
                    totalCategorySum[item.category] += parseFloat(item.amount);
                }
            });

            return this.getChartData(categories, Object.values(totalCategorySum));
        }

        const expensesByCategory = getDataSortedByCategories(expenses);
        const incomeByCategory = getDataSortedByCategories(income);

        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            <Bar
                                data={ total }
                                options={ {
                                    maintainAspectRatio: false
                                } }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Doughnut
                                data={ expensesByCategory }
                                options={ {
                                    maintainAspectRatio: false
                                } }
                            />
                        </Col>
                        <Col>
                            <Doughnut
                                data={ incomeByCategory }
                                options={ {
                                    maintainAspectRatio: false
                                } }
                            />
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default Charts;