const controlBtn = document.querySelector(".control-btn");
const startGame = document.querySelector(".control-btn span");
const helloName = document.querySelector(".name span");
const duration = 1000;
const blocksContainer = document.querySelector(".blocks");

const blocks = Array.from(blocksContainer.children);
const orderRange = [...Array(blocks.length).keys()];

startGame.onclick = () => {
    let yourName = prompt("Whats Your Name ?");
    if (!yourName) {
        helloName.innerHTML = "Unknown";
    } else {
        helloName.innerHTML = yourName;
    }
    controlBtn.remove();
}

// console.log(orderRange)
shuffle(orderRange)
// console.log(orderRange)

blocks.forEach((block,index) => {
    block.style.order = orderRange[index];
    block.addEventListener("click",() => {
        flipBlock(block);
    });
});


function flipBlock(selectedBlock) {
    selectedBlock.classList.add("is-flipped");
    // filter the flipped blocks
    let flippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));
    if(flippedBlocks.length === 2) {
        // stop clicking function
        stopClicking();
        // check matched blocks function
        checkMatched(flippedBlocks[0],flippedBlocks[1]);
    }
}

function stopClicking() {
    blocksContainer.classList.add("no-clicking");
    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking");
    },duration)
}

function checkMatched(firstBlock,secondBlock) {
    let triesElement = document.querySelector(".tries span");
    
    if(firstBlock.dataset.animal === secondBlock.dataset.animal) {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
        firstBlock.classList.add("matched");
        secondBlock.classList.add("matched");
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration);
    }
}

function shuffle(array) {
    let current = array.length,
    temp,
    random;

    while(current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        // save current element in temp variable
        temp = array[current];
        // current element = random element
        array[current] = array[random];
        // random element = get element from temp
        array[random] = temp;
    }

    return array;
}

