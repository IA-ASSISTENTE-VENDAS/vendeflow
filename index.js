const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Cria o robozinho configurado para destravar no Windows
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Mostra o QR Code na tela para você escanear
client.on('qr', (qr) => {
    console.log('--- ESCANEIE O QR CODE ABAIXO ---');
    qrcode.generate(qr, { small: true });
});

// Avisa quando o sistema estiver conectado e funcionando
client.on('ready', () => {
    console.log('VendeFlow está conectado com sucesso no seu WhatsApp!');
});

// Responde automaticamente às mensagens criando um menu dinâmico
client.on('message', message => {
    const textoCliente = message.body.toLowerCase();

    // Se o cliente saudar, o robô envia o menu principal
    if (textoCliente === 'oi' || textoCliente === 'olá' || textoCliente === 'menu') {
        let menu = `👋 Olá! sou a *IA*, sua assistente virtual.\n\n`;
        menu += `Digite o número da opção desejada:\n`;
        menu += `*1* - Ver Catálogo de Produtos\n`;
        menu += `*2* - Informações de Pagamento (PIX)\n`;
        menu += `*3* - Falar com um Atendente Humano`;
        
        message.reply(menu);
    } 
    // Se o cliente escolher a opção 1
    else if (textoCliente === '1') {
        message.reply('📦 *Nosso Catálogo:* \n- Produto A: R\$ 50,00\n- Produto B: R\$ 80,00\n\n_Para voltar ao menu, digite *menu*._');
    } 
    // Se o cliente escolher a opção 2
    else if (textoCliente === '2') {
        message.reply('🔑 *Chave PIX para Pagamento:* \nCNPJ: 00.000.000/0001-00\nNome: VendeFlow Enterprise\n\n_Após pagar, envie o comprovante aqui!_');
    } 
    // Se o cliente escolher a opção 3
    else if (textoCliente === '3') {
        message.reply('⏳ Entendido! Aguarde um momento que um de nossos atendentes já vai te responder de forma manual.');
    }
});

// Liga o motor do sistema
client.initialize();