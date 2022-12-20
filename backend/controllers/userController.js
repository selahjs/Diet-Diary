require("dotenv").config();

const mysql = require("mysql");
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//create token method, generates token from id
const createToken = (email) =>{
    return jwt.sign({email}, process.env.SECRET, {expiresIn:'3d'})
}


//create db connection
const db = mysql.createConnection({
    user: process.env.ROOT,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });

//signup
const signup = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        return res.status(400).json('Email and Password can not be empty!')
    }
    if(!validator.isEmail(email)){
        return res.status(400).json('Email is not valid');
    }
    if(!validator.isStrongPassword(password)){
        return res.status(400).json('Password is not Strong enough!');
    }

    // const exists = await db.query("Select email from users where email = (?)",email,(err)=>res.status(400).json({err}));

    // if(exists){
    //     return res.status(400).json('email already in use');
    // }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    await db.query(
      "INSERT INTO users (email, password) VALUES (?,?)",
      [email, password_hash],
      (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
        } else {
            const token = createToken(email);
            res.status(200).json({email, token});
        }
      }
    );
  }

  //login
 const login = async (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        res.status(400).send('Email and Password can not be empty');
    }

    const check_email = await db.query(
        "Select email from users where email =  ?",
        [email],
        async (err, result) => {
          if (err) {
            res.status(400).json({ error: err.message });
          }
          if(!result.length>0){
            res.status(400).json({error:'Email not registered'});
          }
          //if the email exist check if passwords match... this code runs when there is a result
          else{
            await db.query(
                "Select password from users where email =  ?",
                [email],
                async (err, result) => {
                  if (err) {
                    res.status(400).json({ error: err.message });
                  }
                const pass = result.map(p=>p.password);
                //the bcrypt.compare method returns true/false depending on the condition
                const match =  await bcrypt.compare(password, pass[0]);

                if(!match){
                    res.status(400).send({error:'Incorrect Password'}); 
                }else{
                    const token = createToken(email);
                    res.status(200).json({email, token});
                    //console.log(res.status(200).json({email, token}))
                }
        
                
                }
              );
          }
          
        }
      );
    
}

module.exports = {
    signup,
    login
}