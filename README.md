# Maze Generator and Solver

This project is a maze generator and solver implemented in HTML, CSS, and JavaScript. It allows users to generate random mazes of customizable sizes and visualize the process. Additionally, it provides functionality to solve the generated maze and visualize the solution.

## Demo
try it here [demo website](https://omarcodq.github.io/Maze-Generator-and-Solver/)



![Demo](Maze-demo.gif)

## Features

- **Maze Generation**: Generates random mazes using a depth-first search algorithm.
- **Visualization**: Allows users to visualize the maze generation process.
- **Maze Solving**: Solves the generated maze using a breadth-first search algorithm.
- **Path Visualization**: Visualizes the solution path in the maze.
- **Save Maze**: Enables users to save the generated maze as an image.

## Usage

1. Open the `index.html` file in a web browser.
2. Adjust the number of rows and columns using the input fields.
3. Check the "Visualization" checkbox if you want to visualize the maze generation process.
4. Click on the "Generate Maze" button to create a new maze.
5. Once the maze is generated, click on the "Solve Maze" button to find the solution path.
6. Optionally, you can save the maze as an image by clicking on the "Save Maze" button.

## Implementation Details

- **Maze Generation**: Implemented using a depth-first search (DFS) algorithm. The algorithm starts from a cell and moves to a random neighboring cell that has not been visited, carving a passage and marking the cell as visited. If no unvisited neighboring cells are available, it backtracks to the previous cell until all cells have been visited.
- **Maze Solving**: Utilizes a breadth-first search (BFS) algorithm. The algorithm explores all possible paths from the start cell to the end cell, keeping track of visited cells and the path taken. Once the end cell is reached, the algorithm backtracks to find the shortest path.

## Note

Please note that this code might not be the best code, but I tried my best. Thank you for your understanding.

## Dependencies

- HTML2Canvas: A JavaScript library for capturing screenshots of web pages.

## License

This project is licensed under the [MIT License](LICENSE).

## Author

[OMAR SHAABAN] -
