import React, { Component } from 'react'
import axios from 'axios'
import { Expense } from './Expense'
import { ListGroup, ListGroupItem } from 'reactstrap';



export class ExpensesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expensesList: []
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

    render() {
        const { expensesList } = this.state
        return (
            <ListGroup>
                {expensesList.map((currentExpense) =>
                    <ListGroupItem key={currentExpense._id}>
                        <Expense expense={currentExpense} deleteExpense={this.deleteExpense} />
                    </ListGroupItem>
                )}
            </ListGroup>
        )
    }
}

export default ExpensesList
