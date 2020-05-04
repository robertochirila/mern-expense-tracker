import React, { Component } from 'react'
import axios from 'axios'
import { Expense } from './Expense'
import { Button, ListGroup, ListGroupItem } from 'reactstrap'


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
            console.log(currentExpense.price)
            total = total + currentExpense.price
        })
        this.setState({ totalCost: total, displayTotal: true })

    }

    render() {
        const { expensesList, totalCost, displayTotal } = this.state
        return (
            <React.Fragment>
                <Button onClick={this.calculateCost}>Calculate Total</Button>
                {displayTotal === true ?
                    <h1>Total Cost: {totalCost}</h1>
                    :
                    <React.Fragment>
                    </React.Fragment>
                }
                <ListGroup>
                    {expensesList.map((currentExpense) =>
                        <ListGroupItem key={currentExpense._id}>
                            <Expense expense={currentExpense} deleteExpense={this.deleteExpense} />
                        </ListGroupItem>
                    )}
                </ListGroup>
            </React.Fragment>
        )
    }
}

export default ExpensesList
