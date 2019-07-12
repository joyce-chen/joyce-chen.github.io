# WordSearch by Joyce Chen
from random import choice, randint
from turtle import *
def initialize(width, height):
    return [["-" for _ in range(width)] for _ in range(height)]
def goodFill(ws, width, height, word):
    collision = True
    while(collision):
        direction = choice([[1,0], [0,1], [1,1]])
        rows = height - 1 if direction[1] == 0 else height - len(word)
        cols = width - 1  if direction[0] == 0 else width - len(word)
        row, col, count = randint(0, rows), randint(0, cols), 0
        for i in range(len(word)):
            space = ws[row + direction[1]*i][col + direction[0]*i]
            count += 1 if (space != word[i] and space != "-") else 0
        collision = (count != 0)
    return direction, row, col
def addWords(ws, width, height, words):
    answers = []
    for word in words:
        direction, row, col = goodFill(ws, width, height, word.upper())
        answers.append([(row, col), direction, word])
        for i in range(len(word)):
            ws[row + direction[1]*i][col + direction[0]*i] = word[i].upper()
    return answers
def randomFill(ws, width, height):
    for r in range(height):
        for c in range(width):
            ws[r][c] = choice("AHIMOTUVWXY") if ws[r][c] == "-" else ws[r][c]
def createWordsearch(width, height, words):
    ws = initialize(width, height)
    answers = addWords(ws, width, height, words)
    randomFill(ws, width, height)
    return ws, answers
X, Y = 260, -140
def drawWordsearch(width, height, words):
    ws, ans = createWordsearch(width, height, words)
    setup(width=550, height=340, startx=0, starty=0)
    px, py, font = 20*4/3, 20*1.45, ("Consolas", 20, "normal")
    for r in range(height):
        for c in range(width):
            pu(),setpos(py*c-X,-px*r-Y),pd(),write(ws[r][c],font=font),ht()
    getscreen().getcanvas().postscript(file="ws.eps")
    showAnswer(ws, px, py, ans), done()   
def showAnswer(ws, px, py, answers):
    for i in range(len(answers)):
        loc, direction, word = answers[i]
        x, y = py*loc[1] - py/4 - X, -px*loc[0] + px - Y
        color(choice(["red","blue","green","purple"])),width(3),pu(),setpos(x,y)
        w, W, h, H = py*0.9, py*len(word), px*0.9, px*len(word)
        if direction == [1,0]: #horizontal
            pd(), setpos(x+W, y), setpos(x+W, y-h), setpos(x, y-h), setpos(x, y)
        elif direction == [0,1]: #vertical
            pd(), setpos(x+w, y), setpos(x+w, y-H), setpos(x, y-H), setpos(x, y)
        else: #diagonal
            w, h = w*0.6, h*0.6
            pd(), setpos(x, y-h), setpos(x+W-w, y-H), setpos(x+W, y-H)
            setpos(x+W, y-H+h), setpos(x+w, y), setpos(x, y)
        if (i+1) % int(len(answers)/6) == 0:
            ht(), getscreen().getcanvas().postscript(file="a"+str(i+1)+".eps")
w1=["axiom","await","whim","iota","oath","youth","vita","amity","myth","atom"]
w2=["mouth","taxi","wavy","waxy","moat","miaow","motto","tooth","vomit","hoax"]
w3=["wayout","tomato","mahimahi","himation","tatami","umami","moat","mutt"]
drawWordsearch(18, 12, w1+w2+w3+["yautia","autotomy"])
