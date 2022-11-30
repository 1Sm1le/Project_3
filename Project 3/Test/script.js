let container = document.querySelector('.container');
let curreny = document.querySelector('.curreny');
let currenciesButton = document.querySelectorAll('.rightBorder');
let currencies = document.querySelectorAll('.currencies');
let currenyLeft = document.querySelector('.currenyLeft');
let currenyRight = document.querySelector('.currenyRight');
let rightBorder = document.querySelector('.rightBorder');
let letfborders = document.querySelector('.letfborders');
let rates = document.querySelector('.rates');
let rates1 = document.querySelector('.rates1');
let inpPutLeft = document.querySelector('.inpPutLeft');
let inpPutRight = document.querySelector('.inpPutRight');
let change = document.querySelector('.change');
let loadingWindow = document.querySelector('.loadingWindow')
let val1 = 'RUB';
let val2 = 'USD';
let kurs;
let kurs1;
let isReverse = false;
updateRatesText()
currenyStyle(currenyRight);
currenyStyle(currenyLeft);


async function updateRatesText() {
    try {
        if (val1 === val2) {
            inpPutRight.oninput = (() => {
                inpPutLeft.value = inpPutRight.value;
            });
            inpPutLeft.oninput = (() => {
                inpPutRight.value = inpPutLeft.value;
            });
            rates.innerText = `1 ${val1} = 1.0000 ${val2}`;
            rates1.innerText = rates.innerText;
            inpPutRight.value = inpPutLeft.value
        } else {
            let id = setTimeout(() => {
            }, 500);
            const val1ToVal2 = await fetch(`https://api.exchangerate.host/latest?base=${val1}&symbols=${val2}`);
            const val1ToVal2Json = await val1ToVal2.json();

            kurs = val1ToVal2Json.rates[val2];
            rates.innerText = `1 ${val1} = ${kurs} ${val2}`;

            const val2ToVal1 = await fetch(`https://api.exchangerate.host/latest?base=${val2}&symbols=${val1}`);
            const val2ToVal1Json = await val2ToVal1.json();
            kurs1 = val2ToVal1Json.rates[val1].toFixed(4);
            rates1.innerText = `1 ${val2} = ${kurs1} ${val1}`;
            clearTimeout(id);
            loadingWindow.style.display = 'none'
                
            inpPutRight.value = (kurs * inpPutLeft.value).toFixed(4); 
            inpPutLeft.oninput = (() => {
                inpPutRight.value = (kurs * inpPutLeft.value).toFixed(4);              
            });
            inpPutRight.oninput = (() => { //по изменениям в правом инпуте
                inpPutLeft.value = (kurs1 * inpPutRight.value).toFixed(4);
            });
           
        }
    } catch (err) {
        console.log(err);
    }
}

function reverseButton(selection, num) {
    selection.querySelectorAll('button').forEach((item) => {
        item.style.backgroundColor = 'white';
        item.style.color = '#9F9F9F';
        if (item.innerText === num) {
            item.style.backgroundColor = '#833AE0';
            item.style.color = 'white';
        }
    })
    selection.querySelectorAll('select').forEach((item) => {
        item.style.backgroundColor = 'white';
        item.style.color = '#9F9F9F';
        if (item.value === num) {
            item.value = num;
            item.style.backgroundColor = '#833AE0';
            item.style.color = 'white';
        }
    })
}

change.addEventListener('click', () => {
    let a = rates.innerText;
    let b = rates1.innerText;
    let rev1 = val1;
    let rev2 = val2;
    if ((val1 !== 'RUB' && val1 !== 'EUR' && val1 !== 'GBP' && val1 !== 'USD') || (val2 !== 'RUB' && val2 !== 'EUR' && val2 !== 'GBP' && val2 !== 'USD')) {
        currenyLeft.querySelector('select').value = val2
        currenyRight.querySelector('select').value = val1
    }

    if (inpPutRight.value !== inpPutLeft.value) {
        if (isReverse) {
            inpPutRight.value = (kurs * inpPutLeft.value).toFixed(4);
            reverseButton(currenyLeft, val2);
            reverseButton(currenyRight, val1);
            val1 = rev2;
            val2 = rev1;
        } else {
            inpPutRight.value = (kurs1 * inpPutLeft.value).toFixed(4);
            reverseButton(currenyLeft, val2);
            reverseButton(currenyRight, val1);
            val1 = rev2;
            val2 = rev1;
        }
        isReverse = !isReverse;
        rates.innerText = b;
        rates1.innerText = a;
    }
})


currenyLeft.querySelectorAll('button').forEach((item) => {
    item.addEventListener('click', () => {
        val1 = item.innerText;
        updateRatesText();
    });
})

currenyRight.querySelectorAll('button').forEach((item) => {
    item.addEventListener('click', () => {
        val2 = item.innerText;
        updateRatesText();
    });
})

rightBorder.addEventListener('change', (e) => {
    val1 = e.target.value;
    updateRatesText();
});

letfborders.addEventListener('change', (e1) => {
    val2 = e1.target.value;
    updateRatesText();
});

function currenyStyle(targetObject) {
    targetObject.querySelectorAll('button').forEach((item) => {
        item.addEventListener('click', () => {
            targetObject.querySelectorAll('select').forEach((item) => {
                item.style.backgroundColor = 'white';
                item.style.color = '#9F9F9F';
            })
            targetObject.querySelectorAll('button').forEach((item) => {
                item.style.backgroundColor = 'white';
                item.style.color = '#9F9F9F';
            });
            item.style.backgroundColor = '#833AE0';
            item.style.color = 'white';
        })
    })
}

currenciesButton.forEach((item) => {
    item.addEventListener('change', () => {
        item.style.backgroundColor = '#833AE0';
        item.style.color = 'white';
        item.parentElement.querySelectorAll('button').forEach((item) => {
            item.style.backgroundColor = 'white';
            item.style.color = '#9F9F9F';
        });
    })
})

