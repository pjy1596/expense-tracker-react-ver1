export default (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };
    case "REMOVE_ITEM":
      return {
        //   일단은 현재 state 써줘야 됨, 그리고 바꾸고 싶은 state 속의 value, 여기서는 transactions
        // 밑에 쓸 때 어디 소속인지 써줘야 됨 ex) state.transactions, action.type, action.payload
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    case "ADD_ITEM":
      return {
        ...state,
        // 참고로 밑에 꺼는 순서임. add할 때 위에서부터 더해지냐 밑에서부터 더해지냐
        transactions: [...state.transactions, action.payload],
      };
    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
