const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Configuração especial para rodar de graça nos servidores da nuvem
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: '/usr/bin/chromium-browser',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('--- ESCANEIE O QR CODE ABAIXO ---');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('VendeFlow está conectado com sucesso no seu WhatsApp!');
});

client.on('message', message => {
    if (message.body.toLowerCase() === 'oi' || message.body.toLowerCase() === 'olá') {
        message.reply('Olá! Este é o VendeFlow, seu assistente automático de vendas. Como posso te ajudar hoje?');
    }
});

client.initialize();
