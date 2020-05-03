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
            showList: false
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { expenseName, expenseCategory } = this.state
        const expense = {
            name: expenseName,
            category: expenseCategory
        }
        axios.post('http://localhost:5000/expenses/add', expense)
            .then(res => console.log(res.data))

        this.setState({ expenseName: "", expenseCategory: "" })
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
        const { expenseName, expenseCategory, showList } = this.state
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="expenseName">Expense Name :</Label>
                        <Input type="text" name="expense_name" id="expenseName" placeholder="Expense Name" onChange={this.handleChange('expenseName')} value={expenseName} />
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
                {showList === false ?
                    <Button onClick={this.showList}>Show List</Button>
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
