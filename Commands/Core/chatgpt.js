module.exports = {
  name: '',
  description: 'chatgpt is here for your service',
  cooldown: 0,
  aliases: ['gpt'],
  guildOnly: true,
  async execute(message, args) {
    const { openAiKey } = require('../../config.json')
    const axios = require("axios");

    
    if(!args.length) { return message.reply('enter a question!');}
    const question = args.join(' ');

    // Request data
    const requestData = {
      prompt: question,
      max_tokens: 100,
      temperature: 0.5,
      top_p: 1.0
    };

    // Send the API request
    axios.post("https://api.openai.com/v1/engines/text-davinci-002/completions", requestData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAiKey}`
      }
    })
      .then(response => {
        message.channel.send(response.data.choices[0].text);
      })
      .catch(error => {
        console.error(error);
      });
  }
}