const db = require('../connectors/dbConnection')

const getContentByType = (req, res) =>{

    var contentType = req.params.contentType;
  
    db.query(
      `SELECT * FROM Educational_content WHERE content_type = '${contentType}'`,
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

  const getAllContent = (req, res) =>{

    db.query(
      `SELECT * FROM Educational_content`,
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
    getContentByType : getContentByType,
    getAllContent : getAllContent
}