import { GridDimension } from './basics';
import { ReadPropExpr } from '@angular/compiler';

const times = (n: number, f: (isLast?: boolean, index?: number) => void) => {
  let counter = 1;
  while (counter <= n) {
    f(n === counter, counter);
    counter++;
  }
};

const drawGridLine = (
    dim: GridDimension,
    isFirstLine: boolean,
    isLastLine: boolean,
    emphasized?: boolean,
    highlightColumn?: number): string => {

  let res = '';

  // draw    " \________/        "
  times(
    Math.ceil(dim.width / 2),
    (isLastColumn) => {
      res += ' '.repeat(dim.hexSize - 1);
      res += isFirstLine ? ' ' : '\\';
      res += '_'.repeat(dim.hexSize * 5 / 2);
      res += isFirstLine ? ' ' : '/';
      res += ' '.repeat(dim.hexSize - 1);
      res += isLastColumn ? '' : ' '.repeat(dim.hexSize * 5 / 2);
    }
  );
  res += '\n';

  // draw    " /        \        "
  times(
    dim.hexSize,
    (isLastRowInGroup, indexRow) => {
      times(
        Math.ceil(dim.width / 2),
        (isLastColumn, indexCol) => {
          res += ' '.repeat(dim.hexSize - indexRow);
          res += '/';
          res += (emphasized && indexCol === highlightColumn ? 'X' : ' ').repeat( (dim.hexSize * 5 / 2) + (indexRow - 1) * 2 );
          res += '\\';
          res += ' '.repeat(dim.hexSize - indexRow);
          res += isLastColumn ? '' : (isLastRowInGroup ? '_' : ' ').repeat(dim.hexSize * 5 / 2);
        }
      );
      res += '\n';
    }
  );

  // draw    " \        /        "
  times(
    dim.hexSize - 1,
    (isLastRowInGroup, indexRow) => {
      times(
        Math.ceil(dim.width / 2),
        (isLastColumn, indexCol) => {
          res += ' '.repeat(indexRow - 1);
          res += '\\';
          // TODO: code dup
          res += (emphasized && indexCol === highlightColumn ? 'X' : ' ').repeat( (dim.hexSize * 5 / 2) + (dim.hexSize - indexRow) * 2 );
          res += '/';
          res += ' '.repeat(indexRow - 1);
          res += isLastColumn ? '' : ' '.repeat( (dim.hexSize * 5 / 2));
        }
      );
      res += '\n';
    }
  );

  // ONCE MORE IF THE LAST ROW IN THE WHOLE GRID
  // draw    " \________/        "
  if (isLastLine) {
    times(
      Math.ceil(dim.width / 2),
      (isLastColumn) => {
        res += ' '.repeat(dim.hexSize - 1);
        res += isFirstLine ? ' ' : '\\';
        res += '_'.repeat(dim.hexSize * 5 / 2);
        res += isFirstLine ? ' ' : '/';
        res += ' '.repeat(dim.hexSize - 1);
        res += isLastColumn ? '' : ' '.repeat(dim.hexSize * 5 / 2);
      }
    );
    res += '\n';
  }

  return res;
};

export const gridToAscii = (dim: GridDimension, highlightRow?: number, highlightColumn?: number): string => {
  let resultingString = '';
  for (let i = 1; i <= dim.height; i++) {
    // Math.ceil(highlightColumn / 2) is wrong but indexing of a columns is sccrewed up in drawGridLine
    resultingString += drawGridLine(dim, i === 1, i === dim.height, i === highlightRow, Math.ceil(highlightColumn / 2));
  }
  return resultingString;
};
