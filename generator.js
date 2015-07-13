var Praxis = {};

Praxis.Generator = function($outputContainer, $digitCountInput,
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
                    return '*';
                } else {
                    return this._getOperationSign();
                }
                break;
            case 3 :
                if ($divisionChecker[0].checked) {
                    return '/';
                } else {
                    return this._getOperationSign();
                }
                break;

        }
    };

    this._generateOperation = function(digitCount, operation) {

        var operationSign;
        var result;

        switch (operation) {
            case '+' :
                operationSign = '+';
                break;
            case '-' :
                operationSign = '-';
                break;
            case '*' :
                operationSign = '·';
                break;
            case '/' :
                operationSign = ':';
                break;
        }

        return this._generateNumberLength(digitCount) + ' ' + operationSign + ' ' + this._generateNumberLength(digitCount);

    };

    this.generateAndOutput = function() {

        var digitCount = $digitCountInput.val();

        if (!digitCount) {
            alert('Введите количество разрядов в числе!');
            return;
        }

        if (!$plusChecker[0].checked && !$minusChecker[0].checked && !$multiplicationChecker[0].checked && !$divisionChecker[0].checked) {
            alert('Отметьте хотя бы один тип операции!');
            return;
        }

        $outputContainer.append(this._generateOperation(digitCount, this._getOperationSign()));
        $outputContainer.append('<br/>');

    };



};