const router = require('express').Router()
let Expenses = require('../models/Expenses')
const auth = require('../middleware/auth')


router.route('/').get((req, res) => {
    Expenses.find()
        .then(expenses => res.json(expenses))
        .catch(err => res.status(400).json('Error: ' + err))
})


router.post('/add', auth, (req, res) => {
    const name = req.body.name
    const category = req.body.category
    const price = req.body.price

    const newExpense = new Expenses({
        name,
        category,
        price
    })



    newExpense.save()
        .then(() => res.json('Expense added succesfully'))
        .catch(err => res.status(400).json('Error: ', +err))

})
/*router.route('/add', auth).post((req, res) => {
    const name = req.body.name
    const category = req.body.category
    const price = req.body.price

    const newExpense = new Expenses({
        name,
        category,
        price
    })

    console.log(newExpense)


    newExpense.save()
        .then(() => res.json('Expense added succesfully'))
        .catch(err => res.status(400).json('Error: ', +err))

})*/
router.delete('/:id', auth, (req, res) => {
    Expenses.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
})

/*router.route('/:id', auth).delete((req, res) => {
    Expenses.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});*/

module.exports = router