const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
} = require("../controllers/transactions");

router.route("/").get(getTransactions).post(addTransaction);
// delete은 id 필요해서 따로 함
router.route("/:id").delete(deleteTransaction);

module.exports = router;
