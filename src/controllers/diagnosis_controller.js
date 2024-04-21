const db = require('../connectors/dbConnection')

const createDiagnosis = (req, res, next) => {

    const { idUser, responses } = req.body;

    //temporary code, need to re-write it later

    console.log(idUser);
    
    responses.forEach((obj, index) => {
        //console.log(`Object ${index + 1}:`, obj);
        console.log(obj['num'])
        console.log(obj['answer'])
        // Process each object here as needed
    });

    return res.status(200).send({
        msg: 'Diagnostico registrado exitosamente!'
    });

    /* Here we need to calculate the diagnosis severity based on the user's answers. */

    /*db.query(
        `INSERT INTO Reminders (idUser, reminder_text, reminder_datetime, is_completed, created_at, updated_at) VALUES (${idUser}, '${reminder_text}', '${reminder_datetime}', 0, NOW(), NOW())`,
        (err, result) => {
        if (err) {
            return res.status(400).send({
            msg: err
            });
        }
        return res.status(200).send({
            msg: 'Recordatorio registrado exitosamente!'
        });
        }
    );*/
}

module.exports = {
    createDiagnosis : createDiagnosis
}