
N = int(input("Digite o tamanho do tabuleiro (N): "))
Q = int(input("Digite o número de simulações (Q): "))

# Leitura das N linhas para formar o tabuleiro inicial
tabuleiro = []
for _ in range(N):
    linha = [int(char) for char in input()]
    tabuleiro.append(linha)

# Executa a simulação por Q passos
for _ in range(Q):
    # Cria um novo tabuleiro para armazenar o próximo estado, inicializado com células mortas (0)
    novo_tabuleiro = [[0 for _ in range(N)] for _ in range(N)]

# Jogo da Vida de Conway
    for i in range(N):
        for j in range(N):
            vizinhos_vivos = 0
            # Itera sobre os 8 vizinhos possíveis e a própria célula
            for di in [-1, 0, 1]:
                for dj in [-1, 0, 1]:
                    # Ignora a própria célula
                    if di == 0 and dj == 0:
                        continue
                    
                    # Calcula as coordenadas do vizinho
                    ni, nj = i + di, j + dj

                    # Verifica se o vizinho está dentro dos limites do tabuleiro
                    if 0 <= ni < N and 0 <= nj < N:
                        vizinhos_vivos += tabuleiro[ni][nj]

            # Estado da célula atual
            celula_atual_viva = (tabuleiro[i][j] == 1)

            
            if celula_atual_viva and (vizinhos_vivos == 2 or vizinhos_vivos == 3):
                novo_tabuleiro[i][j] = 1
            
            elif not celula_atual_viva and vizinhos_vivos == 3:
                novo_tabuleiro[i][j] = 1


    tabuleiro = novo_tabuleiro

# Imprime o estado final do tabuleiro após Q simulações
print("Estado final do tabuleiro após", Q, "simulações:")
for linha in tabuleiro:
    print(linha)