const db = require('../connectors/dbConnection')

const createDiagnosis = (req, res, next) => {

    const { idUser, responses } = req.body;

    //console.log(req.body)
    //temporary code, need to re-write it later
    let points = 0
    let fumador = false
    let diabetico = false
    let severidad = ""

    let recomendaciones = []
    //console.log(idUser);
    
    responses.forEach((obj, index) => {
        //console.log(`Object ${index + 1}:`, obj);
        console.log(obj['questionId'])
        console.log(obj['answerId'])
        
        switch(parseInt(obj['questionId'])){
            case 0: //Rangos de edad
                if(obj['answerId']=='a' || obj['answerId']=='b'){
                    points = points + 1
                } else if (obj['answerId']=='c' || obj['answerId']=='d'){
                    points = points + 2
                }else if (obj['answerId']=='e' || obj['answerId']=='f'){
                    points = points + 3
                }
                break;
            case 1: //Genero
                if(obj['answerId']=='a'){
                    points = points + 1
                }else if (obj['answerId']=='b'){
                    points = points + 2
                }
                break;
            case 2: //Fumador?
                if(obj['answerId']=='a'){
                    points = points + 3
                    fumador = true
                }
                break;
            case 3: //Diabetico?
                if(obj['answerId']=='a'){
                    points = points + 3
                    diabetico = true
                }
                break;
            case 4: //Encias sangran?
                if(obj['answerId']=='a'){
                    points = points + 2
                }
                break;
            case 5: //Dientes presentan movilidad
                if(obj['answerId']=='a'){
                    points = points + 2
                }
                break;
        }
    });

    if(points > 0 && points <= 5){
        severidad = "baja"
        recomendaciones.push("No olvides agender una cita con el odontologo minimo 2 veces al año para una limpieza.")
        recomendaciones.push("Utiliza pasta dental convencional, nada de pastas dentales blanqueadoras.")
        recomendaciones.push("Utiliza un cepillo dental de cerdas finas que tenga como minimo 30,000 cerdas.")
        recomendaciones.push("Utiliza cepillo interdental convencional.")
        recomendaciones.push("Utiliza enjuague bucal convencional, sin agentes blanqueadores.")
    }else if(points > 5 && points <= 10){
        severidad = "media"
        recomendaciones.push("Es recomendable que agendes una cita con el odontologo para obtener una evaluación más a fondo y especifica.")
        recomendaciones.push("Utiliza pasta dental marca Kin, nada de pastas dentales blanqueadoras.")
        recomendaciones.push("Utiliza un cepillo dental de cerdas finas que tenga como minimo 30,000 cerdas.")
        recomendaciones.push("Utiliza cepillo interdental convencional y de ser necesario seda dental.")
        recomendaciones.push("Utiliza enjuague bucal marca Kin, sin agentes blanqueadores.")
    }else if(points > 10 && points <= 15){
        severidad = "alta"
        recomendaciones.push("Agenda una cita con el odontologo de manera urgente, puedes requerir atención inmediata.")
        recomendaciones.push("Utiliza pasta dental marca Kin, nada de pastas dentales blanqueadoras.")
        recomendaciones.push("Utiliza un cepillo dental de cerdas finas que tenga como minimo 30,000 cerdas.")
        recomendaciones.push("Utiliza cepillo interdental convencional y de ser necesario seda dental.")
        recomendaciones.push("Utiliza enjuague bucal marca Kin, sin agentes blanqueadores.")
    }

    if(fumador){
        recomendaciones.push("Dejar de fumar es algo vital para una correcta higiene bucal, busca ayuda con un profesional de la salud que te pueda guiar en este proceso.")
    }

    if(diabetico){
        recomendaciones.push("Ser diabetico aumenta considerablemente el riesgo de padecer complicaciónes relacionadas a nuestra boca y a nivel sistemico, si no eres diabetico controlado visita a un medico para que te pueda guiar en este proceso.")
    }

    db.query(
        `INSERT INTO User_Diagnosis (idUser, severity, dateDiagnosed) VALUES ('${idUser}', '${severidad}', NOW())`,
        (err, result) => {
            if (err) {
                return res.status(400).send({
                msg: err
                });
            }else{
                let diagnosisId = result.insertId

                recomendaciones.forEach(recomendacion=>{
                    db.query(`INSERT INTO Recommendations (idDiagnosis, recommendation) VALUES ('${diagnosisId}', '${recomendacion}')`,
                    (err2, result2) =>{
                        if(err2){
                            return res.status(400).send({
                                msg: err2
                            })
                        }
                    })
                })
            }
        }
    );

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