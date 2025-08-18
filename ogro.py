E = int(input())
D = int(input())

if E == D:
    print('A brincadeira torna impossivel essa possibilidade informa um numero diferente cabaço')
elif E <= 0:
    print('é ogramente impossivel levantar 0 dedos ou menos')
else:
    if E > D:
        print(E + D)
    else:
        print(2 * (D - E))