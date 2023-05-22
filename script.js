

const billAmount = document.getElementById('bill-amount');
const cashAmount = document.getElementById("cash-amount");
const message = document.createElement('p');
const numNotesDiv = document.querySelectorAll('.num-notes');

const sectionBillAmount = document.querySelector('.bill-amount-input');
const sectionCashAmountInput = document.querySelector('.cash-amount-input');
const sectionCashReturnOutput = document.querySelector('.cash-return-output');

const btnSubmit = document.querySelector('.btn-submit');
const btnCashSubmit = document.querySelector('.btn-submit-cash')
const btnReset = document.querySelector('.btn-reset')

const returnAmount = document.querySelector('.return-amount');

message.className = 'hidden';
const notes = [2000, 500, 100, 20, 10, 5, 1];

//billAmount.focus(); //

btnSubmit.addEventListener('click', handleBillAmountSubmit);

function handleBillAmountSubmit(e) {
    
    const billAmountValue = billAmount.value;

    if(billAmountValue === ""  || billAmountValue === null) {
        displayErrorMessage(true, 'Please enter a valid bill amount', sectionBillAmount);
    }

    
    else if (Number(billAmountValue) <= 0) {
        displayErrorMessage( true, "Please enter a valid bill amount", sectionBillAmount);
    } 

    
    else {
        displayErrorMessage(false, "", sectionBillAmount);

        changeDisplay(btnSubmit, false);
        changeDisplay(sectionCashAmountInput, true);

        cashAmount.focus();
    }
}



btnCashSubmit.addEventListener('click', handleCashSubmit);
function handleCashSubmit(e) {
    const cashAmountInput = cashAmount.value;
    const billAmountValue = billAmount.value;

    if ( cashAmountInput === "" || billAmountValue === "" || cashAmountInput === null || billAmountValue === null) {
        displaySuccessMessage(false, "", sectionCashAmountInput);

        displayErrorMessage( true, "Please enter valid bill and cash amount to continue", sectionCashAmountInput);

        changeDisplay(sectionCashReturnOutput, false);
    } 

  
    else if(parseInt(billAmountValue) <= 0 || parseInt(cashAmountInput) <= 0) {
        displaySuccessMessage(false, "", sectionCashAmountInput);

        displayErrorMessage(true, "Please enter a valid bill and cash amount to continue", sectionCashAmountInput);

        changeDisplay(sectionCashReturnOutput, false);
    }

    else {
        displayErrorMessage(false, "", sectionCashAmountInput);
        changeDisplay(sectionCashReturnOutput, false);

        let bill = parseInt(Math.round(billAmountValue, 0));
        let cash = parseInt(Math.round(cashAmountInput, 0));

        
        if (cash < bill) {
            displaySuccessMessage(false, "", sectionCashAmountInput);

            displayErrorMessage(true, "Cash paid is less than bill. Please enter the right amount",sectionCashAmountInput);
        } 
        
     
        else if (cash === bill) {
            displaySuccessMessage(true, "No amount should be returned.", sectionCashAmountInput);
        } 

        else {
            bill = parseInt(Math.round(billAmountValue, 0));
            cash = parseInt(Math.round(cashAmountInput, 0));
            displaySuccessMessage(true, `₹${cash-bill} to be returned`, sectionCashAmountInput);
            changeDisplay(sectionCashAmountInput, true);
            changeDisplay(sectionCashReturnOutput, true);

            clearNumNotesDiv();
            calculateNumNotes(cash, bill);
        }
    }
}



btnReset.addEventListener('click', reset);

function reset(e) {
    cashAmount.value = "";
    billAmount.value = "";

    clearNumNotesDiv();

    displayErrorMessage(false, "", sectionBillAmount);
    displaySuccessMessage(false, "", sectionCashAmountInput);
    changeDisplay(btnSubmit, true);
    changeDisplay(sectionCashAmountInput, false);
    changeDisplay(sectionCashReturnOutput, false);

    billAmount.focus();
}


function displayErrorMessage(display, messageText, section) {
    if(display) {
        message.classList.add('visible');
        message.classList.add("error-message");
        message.classList.remove('hidden');
        message.textContent = messageText;
        section.appendChild(message);
    }
    else {
        message.classList.add("hidden");
        message.classList.remove("error-message");
        message.classList.remove("visible");
        message.textContent = "";
        if(section.contains(message)){
            section.removeChild(message);
        }    
    }
}

function changeDisplay(element, display) {
    if(display) {
        element.classList.add('visible');
        element.classList.remove('hidden');
    }
    else {
        element.classList.remove("visible");
        element.classList.add("hidden");
    }
}


function displaySuccessMessage(display, messageText, section) {
    if (display) {
        message.classList.add("visible");
        message.classList.add("success-message");
        message.classList.remove("hidden");
        message.textContent = messageText;
        section.appendChild(message);
    } 
    else {
        message.classList.add("hidden");
        message.classList.remove("success-message");
        message.classList.remove("visible");
        message.textContent = "";
        if (section.contains(message)) {
            section.removeChild(message);
        }
    }
}

function calculateNumNotes(cash, bill) {
    let change = cash - bill;
    let numNotes = [];
    for(let i = 0; i <notes.length; i++) {
        if(change >= notes[i]) {
            numNotes[i] = parseInt(change / notes[i])
            
            change = change % notes[i];
        }
        else {
            numNotes[i] = "";
        }
        numNotesDiv[i].innerHTML = numNotes[i];
    }

    console.log(numNotes)
    
}


function clearNumNotesDiv() {
    for(let i = 0; i<numNotesDiv.length; i++) {
        numNotesDiv[i].innerHTML = "";
    }
}