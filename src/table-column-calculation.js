const Calculator = class Calculator {
  constructor(elements) {
    this.elements = elements;
  }

  nonEmptyElements() {
    return this.elements.filter((element) => element);
  }

  hasElement() {
    return this.elements.some((element) => element);
  }

  sum() {
    return this.nonEmptyElements().reduce((ele, total) => ele + total);
  }

  max() {
    return Math.max.apply(this, this.nonEmptyElements());
  }

  min() {
    return Math.min.apply(this, this.nonEmptyElements());
  }

  avg() {
    return this.sum() / this.nonEmptyElements().length;
  }

  run(operator) {
    if (!this.hasElement()) {
      return;
    }
    let rawValue = this[operator]();
    if (rawValue) {
      return Number(rawValue.toFixed(2));
    }
  }
};

const TableCalculator = class TableCalculator {
  constructor(table) {
    this.table = table;
    let headerNodeList = this.table.querySelectorAll('thead th');
    this.headers = Array.prototype.slice.call(headerNodeList);
    this.table.onchange = () => this.runCalculation();
    // this.table.on('recalculation', () => this.runCalculation());
  }

  init() {
    if (!this.hasCalculation()) {
      return;
    }
    this.renderFoot();
    this.runCalculation();
  }

  hasCalculation() {
    return this.headers.some((header) => this.columnHasCalculation(header));
  }

  columnHasCalculation(header) {
    return header.dataset.operator;
  }

  tableHeaders() {
    return this.$table.find('thead th');
  }

  runCalculation() {
    this.headers.forEach((header, index) => this.runColumnCalculation(header, index))
  }

  runColumnCalculation(header, columnIndex) {
    if (!this.columnHasCalculation(header)) {
      return;
    }
    let cellValues = this.getCellValues(columnIndex);
    let calculator = new Calculator(cellValues);
    let operator = header.dataset.operator;
    let result = calculator.run(operator);
    return this.renderFootCell(columnIndex, operator, result);
  }

  getCellValues(columnIndex) {
    let cellNodeList = this.table.querySelectorAll(`tbody tr td:nth-child(${columnIndex + 1})`)
    return Array.prototype.slice.call(cellNodeList).map((cell) => this.formattedCellValue(cell))
  }

  formattedCellValue(cell) {
    let raw;
    if (cell.querySelector('input')) {
      raw = cell.querySelector('input').value;
    } else {
      raw = cell.innerText.trim();
    }
    if (raw) {
      return +raw;
    }
  }

  renderFoot() {
    let foot = document.createElement('tfoot');
    foot.innerHTML = '<tr></tr>';
    this.table.appendChild(foot);
    let tr = this.table.querySelector('tfoot tr');
    this.headers.forEach(() => {
      let th = document.createElement('th');
      tr.appendChild(th);
    });
  }

  renderFootCell(columnIndex, operator, result) {
    if (!result) {
      result = '';
    }
    let displayText = `${operator}=${result}`;
    return this.table.querySelector(`tfoot tr th:nth-child(${columnIndex + 1})`).innerText = displayText;
  }

};

export const init = function($tables) {
  return $tables.each(function() {
    let calculator = new TableCalculator(this);
    return calculator.init();
  });
};
