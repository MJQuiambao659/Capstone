require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/usersRoute");
const emailRoute = require("./routes/emailCheckRoute");
const scholarshipsRoute = require("./routes/scholarshipRoute");
const programRoute = require("./routes/programRoute");
const courseRoute = require("./routes/coursesRoute");
const schoolRoute = require("./routes/schoolRoute");
const subjectRoute = require("./routes/subjectRoute");
const authRoute = require("./routes/authRoute");
const userRoleRoute = require("./routes/userRoleRoute");

const app = express();
const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/user-role", userRoleRoute);
app.use("/api/user", userRoute);
app.use("/api/check-email", emailRoute);
app.use("/scholarships", scholarshipsRoute);
app.use("/programs", programRoute);
app.use("/schools", schoolRoute);
app.use("/courses", courseRoute);
app.use("/subjects", subjectRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
