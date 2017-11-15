(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["tableColumnCalculation"] = factory();
	else
		root["tableColumnCalculation"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Calculator = function () {
  function Calculator(elements) {
    _classCallCheck(this, Calculator);

    this.elements = elements;
  }

  _createClass(Calculator, [{
    key: 'nonEmptyElements',
    value: function nonEmptyElements() {
      return this.elements.filter(function (element) {
        return element;
      });
    }
  }, {
    key: 'hasElement',
    value: function hasElement() {
      return this.elements.some(function (element) {
        return element;
      });
    }
  }, {
    key: 'sum',
    value: function sum() {
      return this.nonEmptyElements().reduce(function (ele, total) {
        return ele + total;
      });
    }
  }, {
    key: 'max',
    value: function max() {
      return Math.max.apply(this, this.nonEmptyElements());
    }
  }, {
    key: 'min',
    value: function min() {
      return Math.min.apply(this, this.nonEmptyElements());
    }
  }, {
    key: 'avg',
    value: function avg() {
      return this.sum() / this.nonEmptyElements().length;
    }
  }, {
    key: 'run',
    value: function run(operator) {
      if (!this.hasElement()) {
        return;
      }
      var rawValue = this[operator]();
      if (rawValue) {
        return Number(rawValue.toFixed(2));
      }
    }
  }]);

  return Calculator;
}();

var TableCalculator = function () {
  function TableCalculator($table) {
    var _this = this;

    _classCallCheck(this, TableCalculator);

    this.$table = $table;
    this.$table.on('change', 'td input', function () {
      return _this.runCalculation();
    });
    this.$table.on('recalculation', function () {
      return _this.runCalculation();
    });
  }

  _createClass(TableCalculator, [{
    key: 'init',
    value: function init() {
      if (!this.hasCalculation()) {
        return;
      }
      this.renderFoot();
      this.runCalculation();
    }
  }, {
    key: 'hasCalculation',
    value: function hasCalculation() {
      var _this2 = this;

      return this.tableHeaders().toArray().some(function (header) {
        return _this2.columnHasCalculation($(header));
      });
    }
  }, {
    key: 'columnHasCalculation',
    value: function columnHasCalculation($header) {
      return $header.data('operator');
    }
  }, {
    key: 'tableHeaders',
    value: function tableHeaders() {
      return this.$table.find('thead th');
    }
  }, {
    key: 'runCalculation',
    value: function runCalculation() {
      var _this3 = this;

      this.tableHeaders().toArray().forEach(function (header, index) {
        return _this3.runColumnCalculation($(header), index);
      });
    }
  }, {
    key: 'runColumnCalculation',
    value: function runColumnCalculation($header, columnIndex) {
      if (!this.columnHasCalculation($header)) {
        return;
      }
      var cellValues = this.getCellValues(columnIndex);
      var calculator = new Calculator(cellValues);
      var operator = $header.data('operator');
      var result = calculator.run(operator);
      return this.renderFootCell(columnIndex, operator, result);
    }
  }, {
    key: 'getCellValues',
    value: function getCellValues(columnIndex) {
      var _this4 = this;

      return this.$table.find('tbody tr td:nth-child(' + (columnIndex + 1) + ')').toArray().map(function (cell) {
        return _this4.formattedCellValue($(cell));
      });
    }
  }, {
    key: 'formattedCellValue',
    value: function formattedCellValue($cell) {
      var raw = void 0;
      if ($cell.find('input').length > 0) {
        raw = $cell.find('input').val();
      } else {
        raw = $cell.text().trim();
      }
      if (raw) {
        return +raw;
      }
    }
  }, {
    key: 'renderFoot',
    value: function renderFoot() {
      this.$table.append($('<tfoot class="calculation-foot"><tr></tr></tfoot>'));
      var $tr = this.$table.find('tfoot tr');
      this.tableHeaders().each(function () {
        return $tr.append('<th></th>');
      });
    }
  }, {
    key: 'renderFootCell',
    value: function renderFootCell(columnIndex, operator, result) {
      if (!result) {
        result = '';
      }
      var displayText = operator + '=' + result;
      return this.$table.find('tfoot tr th:nth-child(' + (columnIndex + 1) + ')').text(displayText);
    }
  }]);

  return TableCalculator;
}();

var init = function init($tables) {
  return $tables.each(function () {
    var $table = $(this);
    var calculator = new TableCalculator($table);
    return calculator.init();
  });
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=table-column-calculation.js.map