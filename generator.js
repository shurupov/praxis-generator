var Praxis = {};

Praxis.OperationGenerator = function() {

};

Praxis.Generator = function($outputContainer, $digitCountInput, $operationCountInput,
                            $plusChecker, $minusChecker, $multiplicationChecker, $divisionChecker) {

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
                if (result == 0) {
                    arg1 = 0;
                    arg2 = this._generateNumberLength(digitCount);
                } else {
                    do {
                        arg1 = this._generateNumberMax(result);
                    } while (result % arg1 > 0 || arg1 == 0);
                    arg2 = result / arg1;
                }
                break;
            case ':' :
                arg2 = this._generateNumberLength(Math.min(digitCount, 3));
                arg1 = result * arg2;
                break
        }

        return {
            result: result,
            leftArg: arg1,
            sign: operationSign,
            rightArg: arg2
        };

    };

    this._generateOperationLine = function(operation) {

        var leftPart = operation.leftArg.resultLine;
        var rightPart = operation.rightArg.resultLine;

        if (this._isAddOrSub(operation.leftArg.sign) && this._isMultiOrDiv(operation.sign)) {
            leftPart = '(' + leftPart + ')';
        }

        if (
            (this._isAddOrSub(operation.rightArg.sign) && this._isMultiOrDiv(operation.sign)) ||
            (this._isAddOrSub(operation.rightArg.sign) && this._isSubtraction(operation.sign)) ||
            (this._isMultiOrDiv(operation.rightArg.sign) && this._isDivision(operation.sign))
            ) {
            rightPart = '(' + rightPart + ')';
        }

        return leftPart + ' ' + operation.sign + ' ' + rightPart;
    };

    this._generateOperationOrNumber = function(digitCount, result, operationCount) {

        if (operationCount == 0) {
            return {
                result: result,
                resultLine: result
            };
        }

        operationCount--;
        var leftOperationCount = Math.floor(operationCount / 2);
        var rightOperationCount = operationCount - leftOperationCount;

        var operation = this._generateOperation(digitCount, result);

        operation.leftArg = this._generateOperationOrNumber(digitCount, operation.leftArg, leftOperationCount);
        operation.rightArg = this._generateOperationOrNumber(digitCount, operation.rightArg, rightOperationCount);

        operation.resultLine = this._generateOperationLine(operation);

        return operation;
    };

    this._isAddOrSub = function(sign) {
        return sign == '+' || sign == '-';
    };

    this._isMultiOrDiv = function(sign) {
        return sign == '·' || sign == ':';
    };

    this._isSubtraction = function(sign) {
        return sign == '-';
    };

    this._isDivision = function(sign) {
        return sign == ':';
    };

    this.generatePraxis = function(digitCount, operationCount) {

        var result = this._generateNumberLength(digitCount);
        var praxis = this._generateOperationOrNumber(digitCount, result, operationCount);

        console.log(praxis);

        return praxis.resultLine + ' = ' + result;

    };

    this.generateAndOutput = function() {

        var digitCount = $digitCountInput.val();
        var operationCount = $operationCountInput.val();

        if (!digitCount) {
            alert('Введите количество разрядов в числе!');
            return;
        }

        if (!$plusChecker[0].checked && !$minusChecker[0].checked && !$multiplicationChecker[0].checked && !$divisionChecker[0].checked) {
            alert('Отметьте хотя бы один тип операции!');
            return;
        }

        $outputContainer.append(this.generatePraxis(digitCount, operationCount));
        $outputContainer.append('<br/>');

    };



};