H = int(input("Horas: "))
M = int(input("Minutos: "))
S = int(input("Segundos: "))

T = int(input("atraso: "))

S = S + T
if (S >= 60):
    M = M + (S // 60)
    S = S % 60
if (M >= 60):
    H = H + (M // 60)
    M = M % 60
if (H >= 24):
    print("O dia só tem 24 horas, não existe hora maior que 23 seu burro")

if (H < 0 or H > 23):
    print("Hora inválida")
    exit()
elif (M < 0 or M > 59):
    print("Minuto inválido")
    exit()
elif (S < 0 or S > 59):
    print("Segundos inválidos")
    exit()
elif (T < 0 or T > 10**9):
    print("Atraso inválido")
    exit()

print(f"{H:02d}:{M:02d}:{S:02d}")
print("myeggs")