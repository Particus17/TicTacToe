//Game Logic
let playerText = document.getElementById('gameTxt')
let res = document.getElementById('restart')
let boxes = Array.from(document.getElementsByClassName('box'))

let win = getComputedStyle(document.body).getPropertyValue('--winner')
let playCount = 0

const O_txt = "O"
const X_txt = "X"
let P1 = X_txt
let spaces = Array(9).fill(null)


const start = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}
 function boxClicked(e){
    const id = e.target.id
    if(!spaces[id] && playCount < 9){
        spaces[id] = P1
        e.target.innerText = P1
        
        if(winner() !== false){
            playerText.innerHTML = `${P1} has won!`
            let winning_blocks = winner()
            playCount = 10
            winning_blocks.map( box => boxes[box].style.backgroundColor = win)
            return
        }
        playCount++
        P1 = P1 == X_txt ? O_txt : X_txt
    }
    if(playCount === 9){
        playerText.innerHTML = "Tie Game!"
        boxes.forEach(box => box.style.color = "#fff")
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function winner(){
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}

res.addEventListener('click', restart)
function restart(){
    spaces.fill(null)

    playCount = 0
    boxes.forEach(box =>{
        box.innerText = ''
        box.style.backgroundColor=''
        box.style.color = "#54a460"
    })
    playerText.innerHTML = 'Tic Tac Toe'

    P1 = X_txt
}
start()







