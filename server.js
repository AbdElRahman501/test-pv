import express from "express";
import solarCharger from './routers/solarCharger.js';

const PORT = 3000;


const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));



app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
app.use("/api/solarCharger", solarCharger);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});