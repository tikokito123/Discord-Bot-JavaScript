const Discord = require("discord.js");

module.exports = {
  name: "tikostocks",
  description: "Tiko finance is here to help you with your invests in the stock market",
  cooldown: 0,
  aliases: ["symbol", "market", "mkt", "ts"],
  guildOnly: true,
  async execute(message, args, client, cmd) {
    const alphaVantageKey  = process.env.alphaVantageKey;
    const request = require("request");
    const stockSymbol = args[0]; // the symbol of the stock you want to retrieve data for
    if (!args) return message.reply("please give me a symbol");
    const searchSymbolUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockSymbol}&apikey=${alphaVantageKey}`;

    request(searchSymbolUrl, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const data = JSON.parse(body);
        const symbolSearchResult = data["bestMatches"][0];

        if (symbolSearchResult) {
          const symbolUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbolSearchResult["1. symbol"]}&apikey=${alphaVantageKey}`;

          request(symbolUrl, (error, response, body) => {
            if (!error && response.statusCode === 200) {
              const data = JSON.parse(body);
              symbolData = data["Global Quote"];    
              

              const newEmbed = new Discord.MessageEmbed()
                .setColor("#ff9966")
                .setTitle(
                  `the results for Stock $${symbolSearchResult["1. symbol"]}`
                )
                .setDescription(
                  "all the stats for the stock you were looking for"
                ).setImage('https://images.livemint.com/img/2022/12/09/600x338/Nifty_1667546435835_1670548265677_1670548265677.jpg');

              for (let key in symbolData) {
                if(!isNaN(symbolData[key])) {
                    newEmbed.addField(key, `$${Math.floor(symbolData[key])}`);    
                }
                else {
                    newEmbed.addField(key, symbolData[key]);
                }
              }
              try{
                symbolData["05. price"] >= symbolData["02. open"] ? newEmbed.setColor("1BFF00") : newEmbed.setColor("FF0000")
              }
              catch(e) {
                console.error(e);
              }

              message.channel.send(newEmbed);
            } 
            else {
              console.error(error);
            }
          });
          
        }
         else {
          message.channel.send("there was no symbol that fit your search");
          return;
        }
      }      
    });
  },
};
