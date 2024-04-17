const db = require('../connectors/dbConnection')


const getAllTips = (req, res) =>{

    db.query(
        `SELECT * FROM Tips`,
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
    getAllTips : getAllTips
}