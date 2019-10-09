const sudoku =  [
    [1,0,0,0,2,6,0,3,9],
    [0,0,8,7,0,0,6,0,1],
    [0,0,0,0,0,0,2,0,0],
    [4,0,0,9,0,0,5,1,6],
    [0,0,0,0,0,0,0,0,0],
    [7,9,6,0,0,4,0,0,8],
    [0,0,9,0,0,0,0,0,0],
    [3,0,1,0,0,2,9,0,0],
    [6,4,0,1,8,0,0,0,3]
];

const possibleOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let options = [...possibleOptions];

const isFinished = sudoku => {
    let countOfUnfinished = 0;
    sudoku.map(row=>row.map(cell => {
        if(cell===0 || Array.isArray(cell)){
            countOfUnfinished++
        };
        return cell;
    }))
    return !countOfUnfinished;
}   

const checkRowForOccurency = (row, searchNumber) => {
    const contains = row.find(cell => cell === searchNumber);
    return contains !== undefined;
}
const checkColumnForOccurency = (sudoku, colIndex, searchNumber) => {
    let found = false;
    sudoku.forEach(row => found = found?found:row[colIndex] === searchNumber);
    return found;
}

const checkCellForOccurency = (sudoku, startCoords, searchNumber) => {
    let found = false;
    for(let x = startCoords.x; x < startCoords.x+3;x++){
      for(let y = startCoords.y; y < startCoords.y+3; y++){
          found = found?found:sudoku[x][y] === searchNumber;
      }  
    }
    return found;
}


const getCoords = (x, y) => {
    coordX = x<3?0:x<6?3:6;
    coordY = y<3?0:y<6?3:6;
    return {
        x:coordX,
        y:coordY
    }
}
const printSudoku = sudoku => {
    sudoku.forEach((row, indexX) => {
      row.forEach((item, indexY) => {
            if(indexY % 3 === 0){
                process.stdout.write(" ");
            }
            process.stdout.write(item + "");
        })
        console.log();
        if((indexX+1) % 3 === 0){
            console.log();
        }
    })
}
const getOptions = cell => Array.isArray(cell)?[...cell]:[...possibleOptions];

const checkIfIsPossibleToFillCell = (sudoku, x, y, option) => {
    const inRow = checkRowForOccurency(sudoku[x],option);
    const inColumn = checkColumnForOccurency(sudoku, y, option)
    const inCell = checkCellForOccurency(sudoku, getCoords(x, y), option);
    return !inRow && !inColumn && !inCell
}

do{
    sudoku.map((row, indexX) => {
        row.map((cell, indexY) => {
            let candidates = [];
            if(sudoku[indexX][indexY] === 0 || Array.isArray(sudoku[indexX][indexY])){
                options = getOptions(sudoku[indexX][indexY]);  
                options.forEach(option => {
                    if(checkIfIsPossibleToFillCell(sudoku, indexX, indexY, option)){
                        candidates = [...candidates, option]   
                    }
                })
                if(candidates.length === 1){
                    sudoku[indexX][indexY] = candidates[0];
                }else{
                    sudoku[indexX][indexY] = candidates;
                }
            }
        })
    })
    
}while(!isFinished(sudoku));
printSudoku(sudoku);  

