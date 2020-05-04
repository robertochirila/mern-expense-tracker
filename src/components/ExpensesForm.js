import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { ExpensesList } from './ExpensesList'
import axios from 'axios'
import { Container, Row, Col } from 'reactstrap';


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
        const buttonListStyle = {
            marginTop: '2rem',
            marginBottom: '1rem',
            float: 'left'
        }

        const buttonHideStyle = {
            float: 'left',
            marginLeft: '1rem',
            marginTop: '2rem'
        }

        const { expenseName, expenseCategory, expensePrice, showList } = this.state
        return (
            <Container>
                {showList === false ?
                    <React.Fragment>
                        <React.Fragment>
                            <Button style={buttonListStyle} outline color="primary" onClick={this.showList}>Show Expenses List</Button>
                        </React.Fragment>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Input type="text" name="expense_name" id="expenseName" placeholder="Expense Name" onChange={this.handleChange('expenseName')} value={expenseName} />
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="expense_price" id="expensePrice" placeholder="Expense Price" onChange={this.handleChange('expensePrice')} value={expensePrice} />
                            </FormGroup>
                            <FormGroup>
                                <Input type="select" name="select" id="expenseCategory" onChange={this.handleChange('expenseCategory')} value={expenseCategory}>
                                    <option>Leisure</option>
                                    <option>Health</option>
                                    <option>Work</option>
                                    <option>Essentials</option>
                                    <option>Transport</option>
                                </Input>
                            </FormGroup>
                            <Button outline color="primary">Submit</Button>
                        </Form>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Button style={buttonHideStyle} outline color="warning" onClick={this.hideList}>Hide List</Button>
                        <ExpensesList />
                    </React.Fragment>
                }
            </Container>
        )
    }
}

export default ExpensesForm
