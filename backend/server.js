require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const { 
  getMeals,
  createMeals, 
  getUserMeals,
  saveMeals} = require('./controllers/mealsController');

const { 
  signup,
  login } = require('./controllers/userController');


//This method is used to parse the incoming requests with JSON payloads and is based upon the bodyparse
app.use(cors());
app.use(express.json());

//#1 - home root api
app.get("/", (req, res) => {
  res.json("Diet Diary Home");
});

// get all meals
app.get("/api/meals", getMeals);

// create mills for user
app.post("/api/meals", createMeals);

// save mills for user
app.post("/api/user/meals", saveMeals);

//get meals for a single user
app.get("/api/user/meals/:uid", getUserMeals);

///user routes
//user signup
app.post("/api/user/signup", signup);

//user signup
app.post("/api/user/login", login);



app.listen(process.env.PORT, () => console.log("listning on port 3000"));
