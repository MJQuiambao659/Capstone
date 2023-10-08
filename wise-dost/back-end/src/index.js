require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/usersRoute");
const emailRoute = require("./routes/emailCheckRoute")

const app = express();
const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/check-email", emailRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
