const aws = require('aws-sdk');
const db = require('../connectors/dbConnection')
const crypto = require('crypto')

const login = (req, res, next) => {

    var email = req.body.email;
    var pass = req.body.password;
    
    db.query(`SELECT * FROM User WHERE email = '${email}';`, (err, result) => {
            
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

module.exports = {
    login : login
}