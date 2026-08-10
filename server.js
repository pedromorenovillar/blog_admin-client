import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static("dist"));

app.get("/*splat", (req, res) => {
  res.sendFile("index.html", { root: "dist" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
});
