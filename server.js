import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static("dist"));

app.get("/*splat", (req, res) => {
  res.sendFile("index.html", { root: "dist" });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
});
