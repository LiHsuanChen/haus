const mysql = require('promise-mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let connection;

mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  port     : 3306,
  password : 'root12345',
  database : 'haus',
}).then((c) => {
  connection = c;
});


async function hashPassword(plainPassword){
  const res = await bcrypt.hash(plainPassword, saltRounds);
  return res;
}

async function createUser(email, plainPassword){
  const hashedPassword = await hashPassword(plainPassword);
  await connection.query(`INSERT INTO user SET ?`, { email, password: hashedPassword});
  return true;
}

async function getUser(email){
  const user = await connection.query(`select * from user where email = ?`, email);
  if(user.length > 0){
    return user[0];
  }
  return false;
}

async function verifyUser(email, plainPassword){
  const user = await getUser(email);
  if(!user){
    return false;
  }
  const passwordMatch = await bcrypt.compare(plainPassword, user.password);
  if(!passwordMatch){
    return false;
  }
  return user;
}

async function createFeedback(feedback, userID){
  return await connection.query(`INSERT INTO feedback SET ?`, { user_id: userID, payload: feedback });
}

async function getAllFeedback(userID){
  return await connection.query(`SELECT * FROM feedback WHERE user_id = ?`, userID);
}

module.exports = {
  getUser,
  verifyUser,
  createUser,
  createFeedback,
  getAllFeedback,
}