import React from "react";
import { Header } from "./components/Header";
import { Balance } from "./components/Balance";
import { IncomeExpenses } from "./components/IncomeExpenses";
import { TransactionList } from "./components/TransactionList";
import { AddTransaction } from "./components/AddTransaction";
import { GlobalProvider } from "./context/GlobalState";

import "./App.css";
// globalprovider 밑에 꺼 떔에 한참 고민함. 보면 알겠지만 export const로 가져온 애들 다 <>안에 넣는다. 그리고 pass in
// 할 애들은 <>하고 </>사이에 넣으면 그 사이에 애가 pass in 됨
function App() {
  return (
    <GlobalProvider>
      <div>
        <Header />
        <div className="container">
          <Balance />
          <IncomeExpenses />
          <TransactionList />
          <AddTransaction />
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;
