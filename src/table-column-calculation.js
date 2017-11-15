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
  constructor($table) {
    this.$table = $table;
    this.$table.on('change', 'td input', () => this.runCalculation());
    this.$table.on('recalculation', () => this.runCalculation());
  }

  init() {
    if (!this.hasCalculation()) {
      return;
    }
    this.renderFoot();
    this.runCalculation();
  }

  hasCalculation() {
    return this.tableHeaders().toArray().some((header) => this.columnHasCalculation($(header)));
  }

  columnHasCalculation($header) {
    return $header.data('operator');
  }

  tableHeaders() {
    return this.$table.find('thead th');
  }

  runCalculation() {
    this.tableHeaders().toArray().forEach((header, index) => this.runColumnCalculation($(header), index))
  }

  runColumnCalculation($header, columnIndex) {
    if (!this.columnHasCalculation($header)) {
      return;
    }
    let cellValues = this.getCellValues(columnIndex);
    let calculator = new Calculator(cellValues);
    let operator = $header.data('operator');
    let result = calculator.run(operator);
    return this.renderFootCell(columnIndex, operator, result);
  }

  getCellValues(columnIndex) {
    return this.$table.find(`tbody tr td:nth-child(${columnIndex + 1})`).toArray().map((cell) => this.formattedCellValue($(cell)))
  }

  formattedCellValue($cell) {
    let raw;
    if ($cell.find('input').length > 0) {
      raw = $cell.find('input').val();
    } else {
      raw = $cell.text().trim();
    }
    if (raw) {
      return +raw;
    }
  }

  renderFoot() {
    this.$table.append($('<tfoot class="calculation-foot"><tr></tr></tfoot>'));
    let $tr = this.$table.find('tfoot tr');
    this.tableHeaders().each(() => $tr.append('<th></th>'));
  }

  renderFootCell(columnIndex, operator, result) {
    if (!result) {
      result = '';
    }
    let displayText = `${operator}=${result}`;
    return this.$table.find(`tfoot tr th:nth-child(${columnIndex + 1})`).text(displayText);
  }

};

export const init = function($tables) {
  return $tables.each(function() {
    let $table = $(this);
    let calculator = new TableCalculator($table);
    return calculator.init();
  });
};
