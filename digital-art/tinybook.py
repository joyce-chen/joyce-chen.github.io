from random import choice, randrange
from turtle import *

def initialize(size):
    return [["-" for _ in range(size)] for _ in range(size)]

def addWords(ws, size, words):
    answers = []
    for w, word in enumerate(words):
        taken = False
        row, col = w*2, randrange(size - len(word))
        answers.append([(row,col), word])
        for i in range(len(word)):
            ws[row][col+i] = word[i].upper()
    return answers

def randomFill(ws, size):
    letters = "AHIMOTUVWXY"
    for row in range(size):
        for col in range(size):
            if ws[row][col] == "-":
                ws[row][col] = choice(letters)
    
def createWordsearch(size, words):
    ws = initialize(size)
    answers = addWords(ws, size, words)
    randomFill(ws, size)
    return ws, answers

def drawWordsearch(size, words):
    ws, ans = createWordsearch(size, words)
    pt = 20
    px, c, font = pt*4/3, pt*1.45, ("Consolas", pt, "normal")
    setworldcoordinates(-123, -350, 473, 100)
    for row in range(len(ws)):
        for col in range(len(ws[row])):
            pu()
            setpos(c*col, -px*row)
            pd()
            write(ws[row][col], font=font)
    getscreen().getcanvas().postscript(file="w.eps")
    showAnswer(ws, size, px, c, ans)
    ht()
    done()
    
def showAnswer(ws, size, px, c, answers):
    for i in range(len(answers)):
        loc, word = answers[i]
        startX, startY = c*loc[1] - c/2, -px*loc[0]
        width, height = c*len(word) + c/2, px
        pu()
        setpos(startX, startY)
        pd()
        setpos(startX + width, startY)
        setpos(startX + width, startY + height)
        setpos(startX, startY + height)
        setpos(startX, startY)
        getscreen().getcanvas().postscript(file=str(i+1)+".eps")

drawWordsearch(12, ["mouth", "axiom", "vomit", "hoax", "wait", "whim"])
