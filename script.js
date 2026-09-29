const display = document.getElementById('display');

function appendValue(value) {
    if (display.value === 'Error') clearDisplay();
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    if (display.value === 'Error') {
        clearDisplay();
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function calculateResult() {
    try {
        if (display.value.trim() !== "") {
            let result = eval(display.value);
            display.value = Number.isInteger(result) ? result : result.toFixed(4);
        }
    } catch (error) {
        display.value = 'Error';
    }
}

async function fetchMathFact() {
    const apiResult = document.getElementById('api-result');
    apiResult.innerText = 'Cargando dato...';
    
    try {
        const response = await fetch('http://numbersapi.com/random/math');
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.text();
        apiResult.innerText = `"${data}"`;
        
    } catch (error) {
        console.error('Error al ejecutar fetch:', error);
        apiResult.innerText = 'No se pudo conectar con la API.';
    }
}


document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[0-9+\-*/.]/.test(key)) {
        appendValue(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});