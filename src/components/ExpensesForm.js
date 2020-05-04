import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { ExpensesList } from './ExpensesList'
import axios from 'axios'


export class ExpensesForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expenseName: "",
            expenseCategory: "",
            expensePrice: "",
            showList: false
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { expenseName, expenseCategory, expensePrice } = this.state
        const expense = {
            name: expenseName,
            category: expenseCategory,
            price: expensePrice
        }
        axios.post('http://localhost:5000/expenses/add', expense)
            .then(res => console.log(res.data))

        this.setState({ expenseName: "", expenseCategory: "", expensePrice: "" })
    }

    handleChange = input => e => {

        e.preventDefault()
        this.setState({ [input]: e.target.value })

    }

    showList = () => {
        this.setState({ showList: true })
    }
    hideList = () => {
        this.setState({ showList: false })
    }
    render() {
        const { expenseName, expenseCategory, expensePrice, showList } = this.state
        return (
            <div>
                {showList === false ?
                    <React.Fragment>
                        <React.Fragment>
                            <Button onClick={this.showList}>Show List</Button>
                        </React.Fragment>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="expenseName">Expense Name :</Label>
                                <Input type="text" name="expense_name" id="expenseName" placeholder="Expense Name" onChange={this.handleChange('expenseName')} value={expenseName} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="expensePrice">Expense Price :</Label>
                                <Input type="text" name="expense_price" id="expensePrice" placeholder="Expense Price" onChange={this.handleChange('expensePrice')} value={expensePrice} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="expenseCategory">Select Category :</Label>
                                <Input type="select" name="select" id="expenseCategory" onChange={this.handleChange('expenseCategory')} value={expenseCategory}>
                                    <option>Leisure</option>
                                    <option>Health</option>
                                    <option>Work</option>
                                    <option>Essentials</option>
                                    <option>Transport</option>
                                </Input>
                            </FormGroup>
                            <Button>Submit</Button>
                        </Form>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Button onClick={this.hideList}>Hide List</Button>
                        <ExpensesList />
                    </React.Fragment>
                }
            </div>
        )
    }
}

export default ExpensesForm
