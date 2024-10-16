document.getElementById('calculateBtn').addEventListener('click', function() {
    let firstNumber = document.getElementById('firstNumber').value;
    let secondNumber = document.getElementById('secondNumber').value;
    const operation = document.querySelector('input[name="operation"]:checked');
    const resultBox = document.getElementById('result');
    const notificationArea = document.getElementById('notificationArea');

    // Clear previous notifications
    notificationArea.classList.add('d-none');
    notificationArea.innerHTML = '';

    // Check if the input fields are empty
    if (isEmpty(firstNumber)) {
        showError('First number is required.');
        return;
    }
    if (isEmpty(secondNumber)) {
        showError('Second number is required.');
        return;
    }

    // Validation
    if (!isValidNumber(firstNumber)) {
        showError('First number is not a valid decimal number or fraction.');
        return;
    }
    if (!isValidNumber(secondNumber)) {
        showError('Second number is not a valid decimal number or fraction.');
        return;
    }

    if (!operation) {
        showError('Please select an operation.');
        return;
    }

    // Convert numbers: if it's a fraction, convert to decimal; otherwise, parse as float
    let num1, num2;

    num1 = convertToNumber(firstNumber);
    num2 = convertToNumber(secondNumber);

    // Check if conversion was successful
    if (num1 === null || num2 === null) {
        showError('Invalid input for numbers.');
        return;
    }

    // Perform calculation
    let result;

    switch (operation.value) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if (num2 === 0) {
                showError('Cannot divide by zero.');
                return;
            }
            result = num1 / num2;
            break;
        default:
            showError('Invalid operation selected.');
            return;
    }

    // Display result
    resultBox.value = result;
});

// Check if the input value is empty
function isEmpty(value) {
    return value.trim() === '';
}

// Check if the input is a valid number or fraction
function isValidNumber(value) {
    return isFraction(value) || (!isNaN(value) && value.trim() !== '');
}

// Check if the input is in fraction format
function isFraction(str) {
    const parts = str.split('/');
    if (parts.length !== 2) {
        return false;
    }

    const numerator = parts[0].trim();
    const denominator = parts[1].trim();

    const isNumeratorValid = /^-?\d+$/.test(numerator);
    const isDenominatorValid = /^-?\d+$/.test(denominator);

    // Mẫu số không được bằng 0
    return isDenominatorValid && parseInt(denominator) !== 0 && isNumeratorValid;
}

// Chuyển đổi phân số thành số thực
function convertToNumber(value) {
    if (isFraction(value)) {
        const parts = value.split('/');
        const numerator = parseInt(parts[0].trim());
        const denominator = parseInt(parts[1].trim());
        return numerator / denominator; // Trả về giá trị số thực
    } else if (!isNaN(value) && value.trim() !== '') {
        return parseFloat(value); // Trả về giá trị thập phân
    }
    return null; // Trả về null nếu không hợp lệ
}

// Show error message in notification area
function showError(message) {
    const notificationArea = document.getElementById('notificationArea');
    notificationArea.classList.remove('d-none');
    notificationArea.innerHTML = message;
}
