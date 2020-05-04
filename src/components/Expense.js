import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';


export class Expense extends Component {
    constructor(props) {
        super(props)
    }

    delete = () => {
        const { expense } = this.props
        this.props.deleteExpense(expense._id)
    }

    render() {
        const { expense } = this.props
        return (
            <Col>
                <Card>
                    <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle><h6>{expense.name}</h6></CardTitle>
                        <CardSubtitle><h6>{expense.category}</h6></CardSubtitle>
                        <CardText>Price: {expense.price}</CardText>
                        <Button color="danger" onClick={this.delete}>Delete</Button>
                    </CardBody>
                </Card>
            </Col>


        )
    }
}

export default Expense
