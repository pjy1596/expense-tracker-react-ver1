import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Transaction } from "./Transaction";

export const TransactionList = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);
  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line 대괄호 안에 getTransactions 넣으라고 에러
    // 뜰 텐데 넣으면 무한루프에 빠짐. 이거 방지하려고 걍 비워놓음
    // useEffect는 http request가 async 하니까 쓴다고 함
  }, []);
  return (
    <>
      <h3>History</h3>
      <ul id="list" className="list">
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};
