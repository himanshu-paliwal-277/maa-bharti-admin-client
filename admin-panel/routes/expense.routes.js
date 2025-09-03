const express = require('express');
const expense = express.Router();
const {
  addexpense,
  deleteExpense,
  getExpenseList,
  updateExpense,
} = require("../controllers/admin/expense.controller");

/**
 * @swagger
 * /api/expense/get-expense-list:
 *   get:
 *     summary: Retrieve the list of all expenses
 *     description: Returns a list of all expenses stored in the database.
 *     tags:
 *       - Expenses
 *     responses:
 *       200:
 *         description: A list of expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique identifier for the expense.
 *                   name:
 *                     type: string
 *                     description: Name of the expense.
 *                   amount:
 *                     type: number
 *                     description: Amount of the expense.
 *                   date:
 *                     type: string
 *                     format: date
 *                     description: Date of the expense.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

expense.get("/get-expense-list", async (req, res, next) => {
  try {
    return await getExpenseList(req, res);
  } catch (e) {
    next(e);
  }
});
/**
 * @swagger
 * /api/expense/add-expense:
 *   post:
 *     summary: Add a new expense
 *     description: Adds a new expense entry to the database.
 *     tags:
 *       - Expenses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the expense.
 *                 example: "Groceries"
 *               amount:
 *                 type: number
 *                 description: Amount of the expense.
 *                 example: 150.5
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the expense.
 *                 example: "2024-08-30"
 *     responses:
 *       201:
 *         description: Expense created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier for the expense.
 *                 title:
 *                   type: string
 *                   description: Title of the expense.
 *                 amount:
 *                   type: number
 *                   description: Amount of the expense.
 *                 date:
 *                   type: string
 *                   format: date
 *                   description: Date of the expense.
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

expense.post("/add-expense", async (req, res, next) => {
  try {
    return await addexpense(req, res);
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/expense/update-expense/{id}:
 *   put:
 *     summary: Update an existing expense
 *     description: Updates the details of an existing expense by its ID.
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the expense to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated title of the expense.
 *                 example: "Updated Groceries"
 *               amount:
 *                 type: number
 *                 description: Updated amount of the expense.
 *                 example: 200
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Updated date of the expense.
 *                 example: "2024-08-31"
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier for the expense.
 *                 title:
 *                   type: string
 *                   description: Updated title of the expense.
 *                 amount:
 *                   type: number
 *                   description: Updated amount of the expense.
 *                 date:
 *                   type: string
 *                   format: date
 *                   description: Updated date of the expense.
 *       404:
 *         description: Expense not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the expense was not found.
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */


expense.put("/update-expense/:id", async (req, res, next) => {
  try {
    return await updateExpense(req, res);
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/expense/delete-expense/{id}:
 *   delete:
 *     summary: Delete an expense
 *     description: Deletes an expense by its ID.
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the expense to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *                   example: "expense deleted"
 *       404:
 *         description: Expense not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the expense was not found.
 *                   example: "expense not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

expense.delete("/delete-expense/:id", async (req, res, next) => {
  try {
    return await deleteExpense(req, res);
  } catch (e) {
    next(e);
  }
});
module.exports = expense;
