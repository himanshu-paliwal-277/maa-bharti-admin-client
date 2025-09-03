var Expense = require('../../model/expense.model');


exports.addexpense = async function (req, res) {
  try {
    var newExpense = new Expense({
      title: req.body.title,
      amount: req.body.amount,
      date: req.body.date,
    });

    // Use async/await instead of callback
    let result = await newExpense.save();

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getExpenseList = async function (req, res) {
  try {
    // Use async/await to fetch data
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateExpense = async function (req, res) {
  try {
    // Use async/await for the update operation
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    res.status(200).json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.deleteExpense = async function(req, res) {
  try {
    // Use async/await for the delete operation
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    
    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    res.status(200).json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
