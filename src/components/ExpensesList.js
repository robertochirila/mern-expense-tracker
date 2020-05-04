import React, { Component } from 'react'
import axios from 'axios'
import { Expense } from './Expense'
import { Button, ListGroup, ListGroupItem } from 'reactstrap'
import { Container, Row, Col } from 'reactstrap';
import {
    isMobile
} from "react-device-detect";


export class ExpensesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expensesList: [],
            totalCost: '',
            displayTotal: ''
        }
    }
    componentDidMount() {


        axios.get('http://localhost:5000/expenses/')
            .then(response => {
                this.setState({ expensesList: response.data });
            })
            .catch((error) => {
                console.log(error);
            })

    }

    deleteExpense = (id) => {
        axios.delete('http://localhost:5000/expenses/' + id)
            .then(res => console.log(res.data));
        this.setState({
            expensesList: this.state.expensesList.filter(el => el._id !== id)
        })
    }
    calculateCost = () => {
        const { expensesList } = this.state
        let total = 0;
        expensesList.map((currentExpense) => {
            total = total + currentExpense.price
        })
        this.setState({ totalCost: total, displayTotal: true })

    }

    render() {
        const { expensesList, totalCost, displayTotal } = this.state
        const calculateButtonStyle = {
            float: 'left',
            clear: 'both',
            marginTop: '1rem'
        }
        const calculateButtonStyleMobile = {
            width: '88%',
            marginTop: '1rem'
        }

        const totalCostStyle = {
            float: 'left',
            marginLeft: '2rem',
            marginTop: '1rem'
        }

        const listGroupItemStyle = {
            paddingTop: '2rem'
        }

        const listGroupItemStyleMobile = {
            paddingTop: '2rem',
            width: '100%'
        }

        return (
            <Container>
                <Button style={isMobile ? calculateButtonStyleMobile : calculateButtonStyle} color="success" onClick={this.calculateCost}>Calculate</Button>
                {displayTotal === true ?
                    <h3 style={totalCostStyle}>Total Cost: {totalCost}</h3>
                    :
                    <React.Fragment>
                    </React.Fragment>
                }
                <Container style={{ clear: 'both' }}>
                    <ListGroup style={{ marginTop: '2rem' }}>
                        <Row>
                            {expensesList.map((currentExpense) =>
                                <ListGroupItem style={isMobile ? listGroupItemStyleMobile : listGroupItemStyle} key={currentExpense._id}>
                                    <Expense expense={currentExpense} deleteExpense={this.deleteExpense} />
                                </ListGroupItem>
                            )}
                        </Row>
                    </ListGroup>
                </Container>

            </Container>
        )
    }
}

export default ExpensesList
