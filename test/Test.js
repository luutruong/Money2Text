var assert = require('assert');
var Money2Text = require('../Money2Text');

describe('Money2Text', function () {
  it('12500', function () {
    assert.equal(Money2Text(12500), 'Mười hai nghìn năm trăm đồng chẵn');
  });

  it('333250', function () {
    assert.equal(Money2Text(333250), 'Ba trăm ba mươi ba nghìn hai trăm năm mươi đồng chẵn');
  });

  it('5240750', function () {
    assert.equal(Money2Text(5240750), 'Năm triệu hai trăm bốn mươi nghìn bảy trăm năm mươi đồng chẵn');
  });

  it('55200000', function () {
    assert.equal(Money2Text(55200000), 'Năm mươi năm triệu hai trăm nghìn đồng chẵn');
  });
});