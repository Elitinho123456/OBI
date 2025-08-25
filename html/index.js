const tela = document.getElementById('tela-conexao')
const tela_jogo = document.getElementById('tela-jogo')

const input_nome = document.getElementById('nome-jogador')
const input_ip = document.getElementById('ip-servidor')
const btn_conectar = document.getElementById('btn-conectar')

const statusRodada = document.getElementById('status-rodada')
const palavraA = document.getElementById('palavra')
const tempoR = document.getElementById('tempo-restante')

const listaJ = document.getElementById('lista-jogadores')

const canvas = document.getElementById('lousa')
const ctx = canvas.getContext('2d')
const Cpincel = document.getElementById('color-pincel')
const Tpincel = document.getElementById('tamanho-pincel')
const btn_limpar = document.getElementById('btn-limpar')

const chatM = document.getElementById('mensagens')
const input_chat = document.getElementById('input-chat')

let sockte;

let nome_jogador = '';

let is_draw = false;
let pode_desenhar = false;

let ultimo_x = 0;
let ultimo_y = 0;

btn_conectar.addEventListener('click', ()=>
{
    nome_jogador = input_nome.value.trim();
    const ip_servidor = input_ip.value.trimn();

    if (!nome_jogador || !ip_servidor){
        alert("bota nome e ip");
        return
    }

    const sockteUrl = `ws://${ip_servidor}:8080`;
    sockte = new WebSocket(sockteUrl);

    sockte.onopen = () => {
        console.log("Conectado ao servidor");
        tela.classList.add('hidden');
        tela_jogo.classList.remove('hidden');
        enviarMensagem({tipo:'registrar', nome: nome_jogador});
    }
    sockte.onmessage = (event) =>{
        const msg = JSON.parse(event.data)
        processarMensagem(msg)
    }
    sockte.onerror = (error) =>{
        console.error(error)
        alert("deu erro no servidor")
    }
    sockte.onclose = () =>{
        console.log("DESCONTADO")
        alert("voce foi desconectado")
        tela_jogo.classList.add('hidden')
        tela.classList.remove('hidden')
    }});

    function enviarMensagem (data) {
        sockte.send(JSON.stringify(data));
    }

    function processarMensagem(msg){
    }