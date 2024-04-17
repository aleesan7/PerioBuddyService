const aws = require('aws-sdk');
const db = require('../connectors/dbConnection')
const crypto = require('crypto')

const login = (req, res, next) => {

    var email = req.body.email;
    var pass = req.body.password;
    
    db.query(`SELECT * FROM Users WHERE email = '${email}';`, (err, result) => {
            
        // user does not exists
        if (err) {
            return res.status(400).send({
                msg: err
            });
        }

        if (!result.length) {
            return res.status(401).send({
                msg: 'User or password is incorrect!'
            });
        }

        let hash = crypto.createHash('md5').update(pass).digest("hex");

        if(hash===result[0]['password']){
            return res.status(200).send({
                msg: 'Logged in!',
                user: result[0]
            });
        }else{
            return res.status(401).send({msg: 'Contraseña invalida'})
        }

    });
}

const register = (req, res, next) => {

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var birthdate = req.body.birthdate;
    var gender = req.body.gender;
    var email = req.body.email;
    var pass = req.body.password;
    var urlProfPic = req.body.urlProfPic;

    db.query(
        `SELECT * FROM Users WHERE email = '${email}'`,
        (err, result) => {
        
        if(result!=null){
            if (result.length) {
            return res.status(409).send({
                msg: 'El usuario ya existe!'
            });
            } else {
            // username is available
            let hash = crypto.createHash('md5').update(pass).digest("hex");

            db.query(
                `INSERT INTO Users (firstName, lastName, birthdate, gender, email, password, dateCreated, urlProfPic) VALUES ('${firstName}', '${lastName}', '${birthdate}', '${gender}', '${email}', '${hash}', NOW(), '${urlProfPic}')`,
                (err, result) => {
                if (err) {
                    return res.status(400).send({
                    msg: err
                    });
                }
                return res.status(200).send({
                    msg: 'Usuario registrado exitosamente!'
                });
                }
            );
            }
        }
        }
    );
}

const updateInfo = async (req, res) => {

    var { firstName, lastName, birthdate, gender, email } = req.body;
    
    db.query(
      `UPDATE Users SET firstName = '${firstName}', lastName = '${lastName}', birthDate = '${birthdate}', gender = '${gender}' WHERE email = '${email}'`,
      (err, result) => {
      if (err) {
          return res.status(400).send({
          msg: err
          });
      }
      }
    );
    
    return res.status(200).json({ message: 'Usuario actualizado exitosamente' }); 
  
  }

  const getUserInfo = (req, res) =>{

    var email = req.params.email;
  
    db.query(
      `SELECT * FROM Users WHERE email = '${email}'`,
      (err, result) => {
        if (err) {
            return res.status(400).send({
            msg: err
            });
        }else{
          //console.log(result)
          return res.status(200).send({
            user: result[0]
          })
        }
      }
    );
  }


module.exports = {
    login : login,
    register : register,
    updateInfo : updateInfo,
    getUserInfo : getUserInfo
}