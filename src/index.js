import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "Todo correcto",
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server listening at port 5000...");
});
