import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Fade } from 'reactstrap';
import { ExpensesList } from './ExpensesList'
import axios from 'axios'
import { Container } from 'reactstrap';
import {
    isMobile
} from "react-device-detect";


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
        const buttonListStyleMobile = {
            width: '90%',
            marginTop: '2rem',
            marginBottom: '1rem'
        }

        const buttonHideStyle = {
            float: 'left',
            marginLeft: '1rem',
            marginTop: '2rem'
        }
        const buttonHideStyleMobile = {
            marginLeft: '0',
            marginTop: '2rem',
            width: '80%'
        }

        const buttonSubmitStyle = {}

        const buttonSubmitStyleMobile = {
            width: '90%'
        }



        const { expenseName, expenseCategory, expensePrice, showList } = this.state
        return (

            <Container>
                {showList === false ?
                    <React.Fragment>
                        <React.Fragment>
                            <Fade timeout={1000}>
                                <Button style={isMobile ? buttonListStyleMobile : buttonListStyle} color="primary" onClick={this.showList}>Show Expenses List</Button>
                            </Fade>
                        </React.Fragment>
                        <Fade timeout={1500}>
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
                                <Fade timeout={2000}>
                                    <Button style={isMobile ? buttonSubmitStyleMobile : buttonSubmitStyle} color="primary">Submit</Button>
                                </Fade>
                            </Form>
                        </Fade>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Fade timeout={500}>
                            <Button style={isMobile ? buttonHideStyleMobile : buttonHideStyle} color="warning" onClick={this.hideList}>Hide List</Button>
                        </Fade>
                        <ExpensesList />
                    </React.Fragment>
                }
            </Container>
        )
    }
}

export default ExpensesForm
