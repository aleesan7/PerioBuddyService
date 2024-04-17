const db = require('../connectors/dbConnection')


const getAllRemindersByUser = (req, res) =>{

    var idUser = req.params.idUser;

    db.query(
        `SELECT * FROM Reminders WHERE idUser = '${idUser}'`,
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

const createReminder = (req, res, next) => {

    const {idUser, reminder_text, reminder_datetime} = req.body;

    db.query(
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
    );
}

const deleteReminder = (req, res, next) => {

    var idReminder = req.params.idReminder;

    db.query(
        `DELETE FROM Reminders WHERE idReminder = ${idReminder}`,
        (err, result) => {
        if (err) {
            return res.status(400).send({
            msg: err
            });
        }
        return res.status(200).send({
            msg: 'Recordatorio eliminado exitosamente!'
        });
        }
    );
}

const updateReminder = (req, res, next) => {

    const {idReminder, reminder_text, reminder_datetime} = req.body;

    db.query(
        `UPDATE Reminders SET reminder_text = '${reminder_text}', reminder_datetime = '${reminder_datetime}', updated_at = NOW() WHERE idReminder = ${idReminder}`,
        (err, result) => {
        if (err) {
            return res.status(400).send({
            msg: err
            });
        }
        return res.status(200).send({
            msg: 'Recordatorio actualizado exitosamente!'
        });
        }
    );
}

const completeReminder = (req, res, next) => {

    const {idReminder} = req.body;

    db.query(
        `UPDATE Reminders SET is_completed = 1, updated_at = NOW() WHERE idReminder = ${idReminder}`,
        (err, result) => {
        if (err) {
            return res.status(400).send({
            msg: err
            });
        }
        return res.status(200).send({
            msg: 'Recordatorio actualizado exitosamente!'
        });
        }
    );
}

  module.exports = {
    getAllRemindersByUser : getAllRemindersByUser,
    createReminder : createReminder,
    deleteReminder : deleteReminder,
    updateReminder : updateReminder,
    completeReminder : completeReminder
}