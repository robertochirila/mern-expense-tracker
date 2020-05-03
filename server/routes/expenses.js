const router = require('express').Router()
let Expenses = require('../models/Expenses')


router.route('/').get((req, res) => {
    Expenses.find()
        .then(expenses => res.json(expenses))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const name = req.body.name
    const type = req.body.type
    //const date = Date.parse(req.body.date)

    const newExpense = new Expenses({
        name,
        type
    })

    newExpense.save()
        .then(() => res.json('Expense added succesfully'))
        .catch(err => res.status(400).json('Error: ', +err))

})

module.exports = router