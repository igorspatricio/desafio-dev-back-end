(async () => {
    const database = require('./db/db');
    const subscription = require('./model/subscription');
    const mensageFlow = require('./model/mensageFlow');
    try {
        const resultado = await database.sync();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
})();

const database = require('./db/db');
diaAtual = new Date();
diaAtual = diaAtual.getDay();
//selecionar quais mensagens devem ser enviadas no dia atua

mensageFlow.findAll({ where: {posit: 0},raw: true, nest: true, logging: false}).then(result =>{
    // for (i of result){
    //     console.log("\n\n ------------",i.id,"---------- \n\n");
    //     //verifica quais inscritos podem receber essas mensagens
    //     subscription.findAll().then(result2 =>{            
    //     });
    // }
    
})