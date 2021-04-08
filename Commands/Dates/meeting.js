module.exports = {
    name: 'meeting',
    aliases: ['m'],
    description: 'give a date and I will countdown the hours to the next meeting',
    execute(message, args){     
        const countDownDate = new Date(args[0]);
        
        const now = new Date().getTime();
    }
}