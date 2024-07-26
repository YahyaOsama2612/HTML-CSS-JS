document.querySelector(".control-buttons span").onclick = function () {

  let yourName = prompt("Whats Your Name?");

  if (yourName == null || yourName == "") {

    document.querySelector(".name span").innerHTML = 'Unknown';

  } else {

    document.querySelector(".name span").innerHTML = yourName;

  }

  document.querySelector(".control-buttons").remove();

};


let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);


let orderRange = Array.from(Array(blocks.length).keys());


shuffle(orderRange);

blocks.forEach((block, index) => {

  block.style.order = orderRange[index];
  block.addEventListener('click', function () {

    // Trigger The Flip Block Function
    flipBlock(block);

  });

});

function flipBlock(selectedBlock) {

  // Add Class is-flipped
  selectedBlock.classList.add('is-flipped');

  // Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

  // If Theres Two Selected Blocks
  if (allFlippedBlocks.length === 2) {

    // console.log('Two Flipped Blocks Selected');

    // Stop Clicking Function
    stopClicking();

    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

  }

}

// Stop Clicking Function
function stopClicking() {

  // Add Class No Clicking on Main Container
  blocksContainer.classList.add('no-clicking');

  // Wait Duration
  setTimeout(() => {

    // Remove Class No Clicking After The Duration
    blocksContainer.classList.remove('no-clicking');

  }, duration);

}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {

  let triesElement = document.querySelector('.tries span');

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

    firstBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');

    firstBlock.classList.add('has-match');
    secondBlock.classList.add('has-match');

    

  } else {

    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {

      firstBlock.classList.remove('is-flipped');
      secondBlock.classList.remove('is-flipped');

    }, duration);

    

  }

}

// Shuffle Function
function shuffle(array) {

  // Settings Vars
  let current = array.length,
      temp,
      random;

  while (current > 0) {

    // Get Random Number
    random = Math.floor(Math.random() * current);

    // Decrease Length By One
    current--;

    // [1] Save Current Element in Stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;

  }
  return array;
}


