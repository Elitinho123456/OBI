import random, math

#Nota minima
C = 0
#Candidatos
N = random.randint(1, 500)

#Quantidade Minima de aprovados 
K = 0

map = {}
    
for i in range(N):
    notas = random.randint(1, 100)
    map[i] = notas
media = math.floor(sum(map.values()) / len(map))

C = media

for i in range(N):
    if (map[i] > C):
        K += 1

print(map)
print(C)
print(K)
