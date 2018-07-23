const superagent = require("superagent")
const request = require("request")
const rn = require('random-number');
module.exports.run = async (client, message) => {
    const url = "https://api.myjson.com/bins/n1r2y";
    request(url, (err, res, body) => {

    console.log('chargement !')

    if(err || res.statusCode!== 200)return;

    console.log('chargé avec succés')
  //base de données
    let userData = JSON.parse(body);
    var Sender = message.author;
    if(!userData[Sender.id]){
        message.reply("Tu n'es pas enregistré fais !register pour mettre à jour la base.")
        return;
    }else{
    const mines = [userData[Sender.id].mine , userData[Sender.id].mine, userData[Sender.id].mine*2]
    if(!userData[Sender.id]){
        message.reply("Tu n'es pas enregistré fais !register pour mettre à jour la base.")
        return;
    }else{
        let r = rn({
            min: 0,
            max: mines.length - 1,
            integer: true
        });
    let miness = mines[r];
    if(userData[Sender.id].currentMana === 0){
        message.channel.send("Tu n'as plus de mana. <:chat:469113692492005376>")
    }else{
    userData[Sender.id].currentMana--;
    userData[Sender.id].coins += miness;
    message.channel.send(`Tu as gagné ${miness} <a:coins:467999444567195651> [${userData[Sender.id].currentMana}/${userData[Sender.id].manaMax}]`)
    request({ url: url, method: 'PUT', json: userData})
    }
}
}
})
}

module.exports.help = {
    name:"mine"
}