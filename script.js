// JavaScript code created by Omar Shaaban


document.addEventListener('DOMContentLoaded', function() {
const maze = document.getElementById('maze');
let rowsInput = document.getElementById('rows');
let colsInput = document.getElementById('cols');
let startCell, endCell;
window.generateMaze = generateMaze;
window.solveMaze = solveMaze;
window.saveMaze = saveMaze;
function generateMaze() {
    const rowsInput = document.getElementById('rows');
    const colsInput = document.getElementById('cols');
    const rows = parseInt(rowsInput.value);
    const cols = parseInt(colsInput.value);

const withVisualization = document.getElementById('visualization').checked;

// Clear any existing timeouts
clearTimeouts();

// Clear the previous maze content
maze.innerHTML = '';

// Adjust maze container size
maze.style.width = cols * 20 + 'px';
maze.style.height = rows * 20 + 'px';

// Generate maze cells
for (let i = 0; i < rows; i++) {
for (let j = 0; j < cols; j++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    maze.appendChild(cell);
}
}
  window.generateMaze = generateMaze;
// Generate maze using depth-first search
const cells = Array.from(maze.children).map((_, index) => ({
row: Math.floor(index / cols),
col: index % cols,
visited: false
}));
const stack = [];
let current = { row: 0, col: 0 };
cells[current.row * cols + current.col].visited = true;

if (withVisualization) {
generateRecursiveWithVisualization(current, stack, cells, cols);
} else {
generateRecursive(current, stack, cells, cols);
}

// Set start and end points
startCell = maze.children[0];
endCell = maze.children[(rowsInput.value - 1) * cols + (colsInput.value - 1)];
if (!startCell.classList.contains('start')) {
startCell.classList.add('start');
}
if (!endCell.classList.contains('end')) {
endCell.classList.add('end');
}
}

// Function to clear any existing timeouts
function clearTimeouts() {
let id = window.setTimeout(function() {}, 0);
while (id--) {
window.clearTimeout(id); // Will do nothing if no timeout with id is present
}
}


function generateRecursive(current, stack, cells, cols) {
    const { row, col } = current;
    const neighbors = [];

    if (row > 0 && !cells[(row - 1) * cols + col].visited) neighbors.push({ row: row - 1, col });
    if (row < rowsInput.value - 1 && !cells[(row + 1) * cols + col].visited) neighbors.push({ row: row + 1, col });
    if (col > 0 && !cells[row * cols + (col - 1)].visited) neighbors.push({ row, col: col - 1 });
    if (col < colsInput.value - 1 && !cells[row * cols + (col + 1)].visited) neighbors.push({ row, col: col + 1 });

    if (neighbors.length > 0) {
        const next = neighbors[Math.floor(Math.random() * neighbors.length)];
        stack.push(current);
        cells[next.row * cols + next.col].visited = true;
        removeWall(current, next, cols);
        generateRecursive(next, stack, cells, cols);
    } else if (stack.length > 0) {
        const backtrack = stack.pop();
        generateRecursive(backtrack, stack, cells, cols);
    }
}

function generateRecursiveWithVisualization(current, stack, cells, cols) {
    const { row, col } = current;
    const neighbors = [];

    if (row > 0 && !cells[(row - 1) * cols + col].visited) neighbors.push({ row: row - 1, col });
    if (row < rowsInput.value - 1 && !cells[(row + 1) * cols + col].visited) neighbors.push({ row: row + 1, col });
    if (col > 0 && !cells[row * cols + (col - 1)].visited) neighbors.push({ row, col: col - 1 });
    if (col < colsInput.value - 1 && !cells[row * cols + (col + 1)].visited) neighbors.push({ row, col: col + 1 });

    if (neighbors.length > 0) {
        const next = neighbors[Math.floor(Math.random() * neighbors.length)];
        stack.push(current);
        cells[next.row * cols + next.col].visited = true;
        removeWall(current, next, cols);
        setTimeout(() => {
            maze.children[next.row * cols + next.col].classList.add('current-gen');
            setTimeout(() => {
                maze.children[next.row * cols + next.col].classList.remove('current-gen');
                generateRecursiveWithVisualization(next, stack, cells, cols);
            }, 50); // Delay after highlighting current cell
        }, 0); // Delay before highlighting current cell
    } else if (stack.length > 0) {
        const backtrack = stack.pop();
        setTimeout(() => generateRecursiveWithVisualization(backtrack, stack, cells, cols), 20); // Add a small delay for visualization
    }
}

function removeWall(current, next, cols) {
    const dx = next.col - current.col;
    const dy = next.row - current.row;

    if (dx === 1) {
        maze.children[current.row * cols + current.col].style.borderRight = 'none';
        maze.children[next.row * cols + next.col].style.borderLeft = 'none';
    } else if (dx === -1) {
        maze.children[current.row * cols + current.col].style.borderLeft = 'none';
        maze.children[next.row * cols + next.col].style.borderRight = 'none';
    } else if (dy === 1) {
        maze.children[current.row * cols + current.col].style.borderBottom = 'none';
        maze.children[next.row * cols + next.col].style.borderTop = 'none';
    } else if (dy === -1) {
        maze.children[current.row * cols + current.col].style.borderTop = 'none';
        maze.children[next.row * cols + next.col].style.borderBottom = 'none';
    }
}



function solveMaze() {
const startRow = 0;
const startCol = 0;
const endRow = parseInt(rowsInput.value) - 1;
const endCol = parseInt(colsInput.value) - 1;

const start = { row: startRow, col: startCol };
const end = { row: endRow, col: endCol };

/// Add a class to the end cell before solving the maze
if (!endCell.classList.contains('end')) {
endCell.classList.add('end');
}

const path = findPath(start, end);
if (path) {
visualizePathfinding(path);
setTimeout(() => {
    visualizePathfinding(path);
    // Reset color for start cell
    startCell.classList.add('start');
    // Ensure end cell retains its original styling
    endCell.classList.remove('current-solve', 'alt-current-solve');
    endCell.classList.add('end');
}, path.length * 100); // Delay path visualization after pathfinding
} else {
alert("No path found!");
}
}


function visualizePathfinding(path) {
    let delay = 0;
    path.forEach((cell, index) => {
        setTimeout(() => {
            if (index === path.length - 1) {
                maze.children[cell.row * parseInt(colsInput.value) + cell.col].classList.add('alt-current-solve');
            } else if (index === 0) {
                maze.children[cell.row * parseInt(colsInput.value) + cell.col].classList.add('head-solve'); // Adding class for head of the path
            } else {
                maze.children[cell.row * parseInt(colsInput.value) + cell.col].classList.add('current-solve');
            }
        }, delay);
        delay += 60; // Adjust delay as needed for visualization speed
    });
}




// Function to find neighbors of a cell
function getNeighbors(cell) {
    const { row, col } = cell;
    const neighbors = [];

    if (row > 0) neighbors.push({ row: row - 1, col });
    if (row < parseInt(rowsInput.value) - 1) neighbors.push({ row: row + 1, col });
    if (col > 0) neighbors.push({ row, col: col - 1 });
    if (col < parseInt(colsInput.value) - 1) neighbors.push({ row, col: col + 1 });

    return neighbors.filter(neighbor => !isWall(cell, neighbor));
}
function findPath(start, end) {
    const visited = new Set();
    const queue = [{ cell: start, path: [] }];

    while (queue.length > 0) {
        const { cell, path } = queue.shift(); // BFS: Use queue instead of stack

        if (cell.row === end.row && cell.col === end.col) {
            return path.concat(cell); // Return the path when the end cell is reached
        }

        visited.add(`${cell.row},${cell.col}`);

        const neighbors = getNeighbors(cell);
        for (const neighbor of neighbors) {
            if (!visited.has(`${neighbor.row},${neighbor.col}`)) {
                queue.push({ cell: neighbor, path: path.concat(cell) });
            }
        }
    }

    return null; // Return null if no path is found
}



// Fix the indexing bug in the isWall function
function isWall(current, neighbor) {
    const dx = neighbor.col - current.col;
    const dy = neighbor.row - current.row;

    if (dx === 1) {
        return maze.children[current.row * parseInt(colsInput.value) + current.col + 1].style.borderLeft !== 'none';
    } else if (dx === -1) {
        return maze.children[current.row * parseInt(colsInput.value) + current.col].style.borderLeft !== 'none';
    } else if (dy === 1) {
        return maze.children[(current.row + 1) * parseInt(colsInput.value) + current.col].style.borderTop !== 'none';
    } else if (dy === -1) {
        return maze.children[current.row * parseInt(colsInput.value) + current.col].style.borderTop !== 'none';
    }
    return false;
}

function saveMaze() {
html2canvas(document.querySelector("#maze"), {
logging: true, // Enable logging for debugging
allowTaint: true, // Allow images from other domains
onrendered: function(canvas) {
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let link = document.createElement('a');
    link.download = 'maze.png';
    link.href = image;
    link.click();
}
});
}
const lock = document.createElement('meta');
lock.name = 'darkreader-lock';
document.head.appendChild(lock);
});
