import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Todo correcto",
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server listening at port 5000...");
});
