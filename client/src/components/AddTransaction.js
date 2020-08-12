// export default는 default export로 불리며 그냥 import myitem from 'aaa'로 가능
// export const는 named export로 불리며 import { myitem } from 'aaa'로 해줘야 됨
// export default는 한 문서에 하나만, export const는 한 문서에서도 여러 개 가능
// {my item as item} 식으로 이름을 바꿔서 부르는 것도 가능
// https://stackoverflow.com/questions/33611812/export-const-vs-export-default-in-es6#:~:text=export%20const%20is%20a%20named,a%20const%20declaration%20or%20declarations.&text=export%20may%20also%20be%20applied,one%20default%20export%20per%20file.

import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const AddTransaction = () => {
  const { addTransaction } = useContext(GlobalContext);
  const [text, setState] = useState("");
  const [amount, setAmount] = useState(0);
  const Submitting = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
    };
    addTransaction(newTransaction);
  };
  return (
    <>
      <h3>Add new transaction</h3>
      <form id="form" onSubmit={Submitting}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            placeholder="Enter text..."
            value={text}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            id="amount"
            placeholder="Enter amount..."
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};
