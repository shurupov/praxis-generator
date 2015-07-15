var Praxis = {};

Praxis.Generator = function($outputContainer, $digitCountInput, $operationCountInput,
                            $plusChecker, $minusChecker, $multiplicationChecker, $divisionChecker) {


    var operationCount = 0;

    this._generateNumberLength = function(digitCount) {
        return this._generateNumberMax(Math.pow(10, digitCount));
    };

    this._generateNumberMax = function(max) {
        return Math.floor(Math.random() * max);
    };

    this._getOperationSign = function() {
        var operationNumber = parseFloat(Math.floor(Math.random() * 4));
        switch (operationNumber) {
            case 0 :
                if ($plusChecker[0].checked) {
                    return '+';
                } else {
                    return this._getOperationSign();
                }
                break;
            case 1 :
                if ($minusChecker[0].checked) {
                    return '-';
                } else {
                    return this._getOperationSign();
                }
                break;
            case 2 :
                if ($multiplicationChecker[0].checked) {
                    return '·';
                } else {
                    return this._getOperationSign();
                }
                break;
            case 3 :
                if ($divisionChecker[0].checked) {
                    return ':';
                } else {
                    return this._getOperationSign();
                }
                break;

        }
    };

    this._generateOperation = function(digitCount, result) {

        var operationSign = this._getOperationSign();

        var arg1, arg2;

        switch (operationSign) {
            case '+' :
                arg1 = this._generateNumberMax(result);
                arg2 = result - arg1;
                break;
            case '-' :
                var arg1digitCount = digitCount;
                if (String(result).length > digitCount) {
                    arg1digitCount = String(result).length + 1;
                }
                do {
                    arg1 = this._generateNumberLength(arg1digitCount);
                } while (arg1 < result);
                arg1 = result + this._generateNumberLength(digitCount);
                arg2 = arg1 - result;
                break;
            case '·' :
                do {
                    arg1 = this._generateNumberMax(result);
                } while (result % arg1 > 0);
                arg2 = result / arg1;
                break;
            case ':' :
                arg2 = this._generateNumberLength(Math.min(digitCount, 3));
                arg1 = result * arg2;
                break
        }

        operationCount--;

        return this._generateOperationOrNumber(digitCount, arg1, operationCount) + ' ' +
            operationSign + ' ' +
            this._generateOperationOrNumber(digitCount, arg2, operationCount);

    };

    this._generateOperationOrNumber = function(digitCount, result) {
        if (operationCount == 0) {
            return result;
        }
        return '(' + this._generateOperation(digitCount, result) + ')';
    };

    this.generatePraxis = function(digitCount) {

        var result = this._generateNumberLength(digitCount);

        var praxis = this._generateOperationOrNumber(digitCount, result);

        return praxis + ' = ' + result;

    };

    this.generateAndOutput = function() {

        var digitCount = $digitCountInput.val();
        operationCount = $operationCountInput.val();

        if (!digitCount) {
            alert('Введите количество разрядов в числе!');
            return;
        }

        if (!$plusChecker[0].checked && !$minusChecker[0].checked && !$multiplicationChecker[0].checked && !$divisionChecker[0].checked) {
            alert('Отметьте хотя бы один тип операции!');
            return;
        }

        $outputContainer.append(this.generatePraxis(digitCount));
        $outputContainer.append('<br/>');

    };



};