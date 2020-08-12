// https://css-tricks.com/getting-to-know-the-usereducer-react-hook/
// https://www.robinwieruch.de/react-usecontext-hook
// 간단히 useReducer는 useState처럼 state를 수정함. 다만 단순한 거 말고 복잡한 거 쓸 때 추천. state 요소끼리 연관되어 있을 때
// 간단히 context는 redux와 같은 역할. component 속 여러 component들 옛날처럼 pass in 해서 연결하고 안해도 되게 해줌
import React, { useReducer, createContext } from "react";
import Reducer from "./Reducer";
import axios from "axios";
const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  async function getTransactions() {
    try {
      const res = await axios.get("/api/v1/transactions");
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }
  function deleteTransaction(id) {
    //   type과 payload둘 다 action에 속함. action.type, action.payload 등
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }
  function addTransaction(transaction) {
    dispatch({ type: "ADD_ITEM", payload: transaction });
  }
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <GlobalContext.Provider
      // value 아래에 transactions하고 deleteTransaction pass in 함
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        error: state.error,
        loading: state.loading,
        getTransactions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
