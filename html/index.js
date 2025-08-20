document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    // --- Configuração do Canvas ---
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    // --- Variáveis Globais do Jogo ---
    let meuPlayerId;
    const players = {}; // Usaremos um objeto para armazenar todos os jogadores
    const velocity = 5;
    const keys = {};

    // --- Lógica de Desenho (Renderização) ---
    function drawGame() {
        // 1. Limpa o canvas inteiro a cada novo frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 2. Desenha cada jogador na sua posição atual
        for (const id in players) {
            const player = players[id];
            
            // Desenha o quadrado do jogador
            ctx.fillStyle = player.color || 'orange';
            ctx.fillRect(player.posX, player.posY, 50, 50);

            // Desenha o nome do jogador acima do quadrado
            ctx.fillStyle = '#000';
            ctx.font = '16px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(player.name, player.posX + 25, player.posY - 5);
        }
    }

    // Obtém o nome do jogador da URL
    const urlParams = new URLSearchParams(window.location.search);
    const playerName = urlParams.get('nome') || 'Anônimo';
    socket.emit('playerInfo', { name: playerName });

    // --- Eventos do Socket.IO ---

    socket.on('allPlayers', (listaDePlayers) => {
        // Limpa a lista antiga e preenche com a nova
        Object.keys(players).forEach(key => delete players[key]);
        listaDePlayers.forEach((playerInfo) => {
            players[playerInfo.id] = playerInfo;
        });
    });

    socket.on('playerSpawn', playerInfo => {
        players[playerInfo.id] = playerInfo;
        
        if (playerInfo.ipUser === socket.id && !meuPlayerId) {
            meuPlayerId = playerInfo.id;
        }
    });

    socket.on('playerDisconnect', (idDoJogador) => {
        delete players[idDoJogador]; // Remove o jogador da nossa lista
    });

    socket.on('moveSquare', (data) => {
        const { x, y, id } = data;
        if (players[id]) {
            players[id].posX = x;
            players[id].posY = y;
        }
    });

    // --- Controles do Jogador ---

    document.addEventListener('keydown', (e) => { keys[e.key.toLowerCase()] = true; });
    document.addEventListener('keyup', (e) => { keys[e.key.toLowerCase()] = false; });

    function handleMovement() {
        if (!meuPlayerId || !players[meuPlayerId]) {
            return; // Não move se o nosso jogador ainda não existe
        }

        const meuPlayer = players[meuPlayerId];
        let moved = false;

        if (keys["w"] || keys["arrowup"]) {
            meuPlayer.posY -= velocity;
            moved = true;
        }
        if (keys["s"] || keys["arrowdown"]) {
            meuPlayer.posY += velocity;
            moved = true;
        }
        if (keys["a"] || keys["arrowleft"]) {
            meuPlayer.posX -= velocity;
            moved = true;
        }
        if (keys["d"] || keys["arrowright"]) {
            meuPlayer.posX += velocity;
            moved = true;
        }

        // Envia a posição para o servidor apenas se o jogador se moveu
        if (moved) {
            socket.emit('moveSquare', { x: meuPlayer.posX, y: meuPlayer.posY });
        }
    }

    // --- Game Loop ---
    function gameLoop() {
        handleMovement(); // Verifica e atualiza a posição do jogador local
        drawGame();       // Desenha o estado atual do jogo
        requestAnimationFrame(gameLoop); // Pede ao navegador para chamar gameLoop novamente no próximo frame
    }

    // Inicia o loop do jogo
    gameLoop();


    // --- Lógica do Chat (permanece a mesma) ---
    const form = document.getElementById('form');
    const input = document.getElementById('input');
    const messages = document.getElementById('messages');
    const inputNome = document.getElementById('inputNome');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = inputNome.value || playerName; // Usa o nome do jogador se o campo estiver vazio
        if (input.value) {
            socket.emit('chat message', { nome: nome, mensagem: input.value });
            input.value = '';
        }
    });

    socket.on('chat message', (msg) => {
        const item = document.createElement('li');
        item.textContent = `${msg.nome}: ${msg.mensagem}`;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });
});