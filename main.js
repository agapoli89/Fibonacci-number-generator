function generate() {
    let quant = parseInt(document.querySelector("#quant").value);
    let a = parseFloat(document.querySelector("#a").value);
    let b = parseFloat(document.querySelector("#b").value);
    const sequence = [];
    const ratios = ["brak"];

    const sequenceEl = document.querySelector("#sequence");
    const ratioEl = document.querySelector("#ratio");

    if (isNaN(a) || isNaN(b) || isNaN(quant) || quant < 2) {
        ratioEl.textContent = "";
        sequenceEl.textContent = "Podaj poprawne liczby";
        return;
    }

    while (sequence.length < quant) {
        sequence.push(a);
        sequence.push(b);

        a = a + b;
        b = a + b;
    }

    if (sequence.length > quant) {sequence.pop()}

    const newSequence = sequence.map((item, index) => {
        return `<div>${index + 1 <= 9 ? "0" + (index + 1): index + 1} -> <span class="sequence-item">${item}</span></div>`
    })
    sequenceEl.innerHTML = "<h4>n<sub>x<sub> </h4>" + newSequence.join("");


    for (let i=1; i < sequence.length; i++) {
        ratios.push((sequence[i]/sequence[i-1]).toFixed(30));
    }
    const newRatio = ratios.map((ratio, index) => {
        return `<div>${index + 1 <= 9 ? "0" + (index + 1): index + 1} -> <span class="ratio-item">${ratio}</span></div>`
    })

    ratioEl.innerHTML = "<h4>&Phi; = n<sub>x</sub> &divide; n<sub>x-1</sub></h4>" + newRatio.join("");

    makeColorButtonsEnable(sequenceEl, ratioEl);
}

function makeColorButtonsEnable(sequenceEl, ratioEl) {
    const colorButtons = Array.from(document.querySelectorAll(".color-btn"));

    colorButtons.forEach(button => {
        button.disabled = false;
        button.addEventListener("click", (e) => changeColor(sequenceEl, ratioEl, e));
    });
}

function changeColor(sequenceEl, ratioEl, e) {
    const color = e.target.dataset.color;
    const kind = e.target.parentElement.dataset.kind;
    const numbersEl = sequenceEl.querySelectorAll(".sequence-item");
    const numbersRatioEl = ratioEl.querySelectorAll(".ratio-item");
    
    if (kind === "even") {
        numbersEl.forEach(number => { 
            if (Boolean(parseFloat(number.textContent) % 2)) {
                chooseColor(number, color);
            } else return;
        })
    } else if (kind === "odd") {
        numbersEl.forEach(number => { 
            if (!Boolean(parseFloat(number.textContent) % 2)) {
                chooseColor(number, color);
            } else return;
        })
    } else if (kind === "fi") {
        numbersRatioEl.forEach(number => chooseColor(number, color))
    } else {
        numbersEl.forEach(number => chooseColor(number, color))
        numbersRatioEl.forEach(number => chooseColor(number, color))
    }
}

function chooseColor(number, color) {
    if (color === "red") {
        number.classList.add("red");
        number.classList.remove("blue")
    } else {
        number.classList.add("blue");
        number.classList.remove("red")
    }
}

document.getElementById("generate_sequence").addEventListener("click", generate);


// second way:


