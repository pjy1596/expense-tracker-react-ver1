const express = require("express");
// const path = require("path");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
dotenv.config({ path: "./config/config.env" });
// 뭐가 뭔진 몰라도 제대로 꼬임. client에 리액트 미리 넣어놔야 할 듯. 나중에 옮기려니 안 됨
// concurrently는 리액트랑 백엔드 서버가 동시에 돌아가게 해줌
// 둘 다 돌아가게 하려면 리액트 쪽에서도 proxy 적어주고 여기 쪽에서도 표시해줘야 됨, 하는 방식은 동영상 참고
connectDB();
const transactions = require("./routes/transactions");
const app = express();

app.use(express.json());

app.use("/api/v1/transactions", transactions);
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
