require("dotenv").config();

const mysql = require("mysql");

//create db connection
const db = mysql.createConnection({
    user: process.env.ROOT,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  });

//get all meals
const getMeals = async (req,res) => {
    await db.query("SELECT * FROM meals", (err, result) => {
        if (err) {
          console.log(err);
          res.send(err)
        } else {
          res.send(result);
        }
      });
  }

//create meals
const createMeals = async (req, res) => {
    const name = req.body.name;
    const calorie = req.body.calorie;

    await db.query(
    "INSERT INTO meals (name, calorie) VALUES (?,?)",
    [name, calorie],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.json(`meal created: ${result}`);
      }
    });

  }

  //create meals
const saveMeals = async (req, res) => {
    const user_id = req.body.uid;
    const meal_id = req.body.mid;
    const edate = req.body.edate;
    const eat_type = req.body.etype;

    await db.query(
    "INSERT INTO eats (uid, mid,edate, etype) VALUES (?,?,?,?)",
    [user_id, meal_id, edate, eat_type],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.json(`meal created: ${result}`);
      }
    });

  }
  //get meals for a single user
  const getUserMeals = async (req, res) => {
    const uid = req.params;
    //console.log(uid);
    await db.query(
      "select name,etype from eats as e inner join meals as m on e.mid = m.id inner join users as u on e.uid = u.id where e.uid = ?",
      [uid.uid],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
      }
    );
  }
module.exports = {
    getMeals,
    createMeals,
    getUserMeals,
    saveMeals
}