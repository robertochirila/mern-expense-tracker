import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

export class Expense extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { expense } = this.props
        return (
            <React.Fragment>
                <Card>
                    <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{expense.name}</CardTitle>
                        <CardSubtitle>{expense.category}</CardSubtitle>
                        <CardText>Price: {expense.price}</CardText>
                        <Button>Button</Button>
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}

export default Expense
