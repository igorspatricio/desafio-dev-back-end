const express = require('express');
const router = express.Router();

const subscription = require('../model/subscription');
router.route('/').get(subReply).post(subReply)

function subReply(req, res){
    const method = req.method;
    console.log(method);
    const noveEmail = method === "GET" ? req.query.email : req.body.email;
    
    //verifica o email   
    if(validateEmail(noveEmail)){
        try{            
            subscription.findOne({where:{name:noveEmail}}).then(result=>{
                //verifica se o e-mail já esta cadastrado
                if (result === null){
                    //adciona o email
                    let data  = timeStamp()                    
                    subscription.create({
                        name: noveEmail,
                        subscription_date: data,
                        lastmensage: 0,
                        active: false
                    });

                    //responde informando sucesso!
                    res.status(201).send("e-mail inscrito com sucesso!");
                }else{
                    //e-mail já existe no banco
                    res.status(409).send("e-mail já cadastrado");
                }
            })
        }catch(err){
            console.log(err);
        }
        

    }else{
        //formato de email invalido
        res.status(406).send("e-mail invalido!");
    }

}
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function timeStamp(){
    const dateObject = new Date();
    const date = (`0${dateObject.getDate()}`).slice(-2);
    const month = (`0${dateObject.getMonth() + 1}`).slice(-2); 
    const year = dateObject.getFullYear(); 
    const hours = dateObject.getHours(); 
    const minutes = dateObject.getMinutes(); 
    const seconds = dateObject.getSeconds();     
    //date & time in YYYY-MM-DD HH:MM:SS format
    return(`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
}

module.exports = router;