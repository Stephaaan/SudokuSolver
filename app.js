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


const getCoords = (x, y) => ({
    x:x<3?0:x<6?3:6,
    y:y<3?0:y<6?3:6
})

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

const checkIfIsPossibleToFillCell = (sudoku, x, y, option) => !checkRowForOccurency(sudoku[x],option) && 
                                                              !checkColumnForOccurency(sudoku, y, option) && 
                                                              !checkCellForOccurency(sudoku, getCoords(x, y), option)

const solveSudoku = unsolvedSudoku => {
    let sudoku = [...unsolvedSudoku];
    do{
        sudoku.forEach((row, indexX) => {
            row.forEach((cell, indexY) => {
                if(cell === 0 || Array.isArray(cell)){
                    let candidates = [];
                    getOptions(cell).forEach(option => candidates = checkIfIsPossibleToFillCell(sudoku, indexX, indexY, option)?[...candidates, option]:[...candidates])
                    sudoku[indexX][indexY] = candidates.length === 1?candidates[0]:candidates; 
                    //TODO: dorobit upgrade ze zovsadial vymazat to cislo candidates[0] 
                }
            })
        })
    }while(!isFinished(sudoku));
    return sudoku;  
}
module.exports = {
    solveSudoku
}