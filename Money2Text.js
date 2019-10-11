(function() {
  /**
   * Generate a string from a number to vietnamese language.
   * @param {number} number
   * @returns {string}
   */
  function Money2Text(number) {
    var numString = number.toString();
    var baseNumbers = [
      // 0
      'không',
      // 1
      'một',
      // 2
      'hai',
      // 3,
      'ba',
      // 4
      'bốn',
      // 5
      'năm',
      // 6
      'sáu',
      // 7
      'bảy',
      // 8
      'tám',
      // 9
      'chín',
    ];
    var exponents = {
      10: 'mười',
      100: 'trăm',
      1000: 'nghìn',
      1000000: 'triệu',
      1000000000: 'tỷ',
    };

    function _readNumberFromString(str) {
      var strLength = str.length;
      var strAsNum = parseInt(str);

      if (strAsNum <= 0) {
        return '';
      }

      if (strLength === 1) {
        return baseNumbers[str];
      } else if (strLength === 2) {
        var unit = baseNumbers[str[1]];
        var tenth = baseNumbers[str[0]] + ' ' + exponents[10];

        if (str[0] > 1) {
          tenth = baseNumbers[str[0]] + ' mươi';
        } else if (str[0] === '1') {
          tenth = exponents[10];
        }
        if (str[0] >= 1 && str[1] === '0') {
          unit = '';
        }

        return tenth + ' ' + unit;
      }

      var hundred = baseNumbers[str[0]] + ' ' + exponents[100];

      return hundred + ' ' + _readNumberFromString(str.substring(1));
    }

    function _readNumberExponent(number) {
      var exponentText = '';
      var num = parseInt(number);
      var j = 0;

      for (j; j < exponentKeys.length; j++) {
        if (num >= exponentKeys[j]) {
          exponentText = exponents[exponentKeys[j]];
          break;
        }
      }

      return exponentText;
    }

    var blocks = [],
      results = [];
    var length = numString.length;

    while (length > 0) {
      blocks.push(numString.substring(length - 3, length));
      length -= 3;
    }

    blocks.reverse();
    var exponentKeys = Object.keys(exponents).reverse();

    while (blocks.length > 0) {
      var blockStr = blocks.shift();
      var result = _readNumberFromString(blockStr);

      if (result !== '') {
        if (blocks.length > 0) {
          var exponentText = _readNumberExponent(blockStr + blocks.join(''));
          if (exponentText !== '') {
            result += ' ' + exponentText;
          }
        }

        results.push(result);
      }
    }

    var resultText = results.join(' ') + ' đồng';
    if (number % 2 === 0) {
      resultText += ' chẵn';
    }

    resultText = resultText[0].toLocaleUpperCase() + resultText.substr(1);
    resultText = resultText.replace(/\s+/g, ' ');

    return resultText;
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Money2Text;
  } else {
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return Money2Text;
      });
    } else {
      window.Money2Text = Money2Text;
    }
  }
})();
