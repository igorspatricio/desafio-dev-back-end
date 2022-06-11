const express = require("express")
const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.options("*", (req, res, next) => {
    res.header('Acess-Control-Allow-Origin', "*");
    res.header('Acess-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
    res.header('Acess-Control-Allow-Headers', 'Authorization, Content-Lenght, X-Requested-With');
    res.header(200);
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const database = require('./db/db'); 
//conectar e sincronizar o banco
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

app.use((req, res, next) => {
    console.log(`${req.method} - ${req.path} - ${req.ip}`);
    next();
})


app.use(express.static('css'));
app.use(express.static('public'));


const useSubscriptionRoutes = require("./routes/useSubscription")

app.use("/routes/useSubscription", useSubscriptionRoutes);


app.get('/', (req, res) =>{
    res.sendFile(__dirname + "/views/form.html");
});


//--------------------TAREFA DIARIA---------------------------------------//
//popular a tabela mensageFlow
// const mensageFlow = require('./model/mensageFlow');
// mensageFlow.bulkCreate([
//     {template_name: 'mensagem1', posit: 0},//domingo
//     {template_name: 'mensagem2', posit: 1},//segunda...
//     {template_name: 'mensagem3', posit: 2},
//     {template_name: 'mensagem4', posit: 3},
//     {template_name: 'mensagem5', posit: 4},
//     {template_name: 'mensagem6', posit: 5},
//     {template_name: 'mensagem7', posit: 6}
// ])
const nodeSchedule = require('node-schedule');
//função a ser executada diariamente
const job = nodeSchedule.scheduleJob('0 12 * * *', ()=>{ //diariamente as 12h
    diaAtual = new Date();
    diaAtual = diaAtual.getDay();
    // atualiza a ultima mensagem das inscrições
    database.query(`update subscriptions
                set lastmensage = lastmensage + 1
                where id in (
                    select id
                    from  subscriptions
                    where lastmensage+1 in (
                        select posit
                        from "mensageFlows"
                        where posit = ${diaAtual}
                    )
                ) 
            `).then( (resultado)=>{//verifica quais inscrições já receberao todas as mensagens e as desativam
                // resultado armazena as incrições que devem receber mensagem e o id da mensagem a ser enviada
                database.query(`
                update subscriptions
                set active = FALSE
                where active = TRUE and lastmensage + 1 = (
                    select count(id)
                    from  "mensageFlows"
                );`)
            })
   
})

app.listen(PORT, ()=>console.log(`Listening on ${PORT}`));


