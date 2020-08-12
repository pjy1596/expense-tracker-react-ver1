const Transaction = require("../models/Transaction");
// node js에서는 exports.~~~로 하거나(문서당 여러 개) 맨 밑에 module.exports=~~~(문서당 하나) 하면 됨.
// 물론 exports.~~로 쓰면 여러 개니까 { }안에 넣어주기(react도 비슷한거 있음) module로 쓰면 안 넣어도 됨
// https://programmingsummaries.tistory.com/340
// get all transactions
// api/v1/transactions
// model 쓰는 거면 promise 생기니까 async 써주는 거 잊지 않았겠지?
exports.getTransactions = async (req, res, next) => {
  try {
    // 여기서 find 그냥 쓴 거는 Transaction에 속하는 애들 다 찾는 거
    const transactions = await Transaction.find();
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    // create가 웃긴 것이 새로운 부분만 위에서 정해주면
    // 나머지 부분(createdAt)은 알아서 저장됨. 반면 save는 다 만들어야 됨
    const transaction = await Transaction.create(req.body);
    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    // 내 꺼는 대체 왜 안뜨는지 이해를 못하겠는데 하여튼 err.name하고 message가 표시가 안 됨. 흠.
    if (err.name === "ValidationError") {
      const errorMessages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: true,
        error: errorMessages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }
    // 밑에 await + data 변경 깜빡함. 물론 밑에 return까지는 안해도 되지만 그냥 미관상
    await transaction.remove();
    return res.status(201).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
