/*
1. select elements and create an array for storage
2. Add functionalities to the deposit and expenses
 ° selecting the buttons and displaying the box for inputs
 ° customizing it for each data eg. The expenses data's 
 3. collect the datas, create an object and put the datas in the object 
  ° push it to the storage array 
  ° display it to the histories 
  ° update balance
  ° do some styling amd personal customizing 
  ° add icons 
  ° add date
  ° design 
*/

//select elements and initializing arrays 
let incomeBalance = document.getElementById('income');
let expBalance = document.getElementById('expenses');
const histories = document.getElementById('histories');
const layer = document.querySelector('.popup-layer');
const layer2 = document.querySelector('.popup-layer2');
const form2 = layer2.querySelector('form');
const depBtn = document.querySelector('#depositBtn');
const expBtn = document.querySelector('button:nth-child(2)');
const incomeBox = document.querySelector('.income');
const expBox = document.querySelector('.expenses');
const description = document.getElementById('options');
const description2 = document.getElementById('options2');
const amtInput = document.querySelector('input');
const form = document.querySelector('form');
const p = document.querySelector('p');
let totalIncome = 0;
let totelExpenses = 0;
const history = [];

//Add functions to the deposit button
depBtn.addEventListener('click', () => {
  layer.style.display = 'flex';
  incomeBox.style.transform = 'translateY(0)';
  //activate the input field wem it's focused
  incomeBox.querySelector('input').addEventListener('focus', (e) => {
    e.target.style.opacity = '1';
  });
  //blur the iput field when it's not focused 
  incomeBox.querySelector('input').addEventListener('blur', (e) => {
    e.target.style.opacity = '0.4';
  });
});


//Add function to the expenses button 
expBtn.addEventListener('click', () => {
  layer2.style.display = 'flex';
  expBox.style.transform = 'translateY(0)';
  expBox.querySelector('input').addEventListener('focus', (e) => {
  e.target.style.opacity = '1';
  });

  expBox.querySelector('input').addEventListener('blur', (e) => {
  e.target.style.opacity = '0.4';
  });
})


//stop propagation so the layer won't close when the box is clicked
document.querySelector('.income').addEventListener('click', (e) => e.stopPropagation());
document.querySelector('.expenses').addEventListener('click', (e) => e.stopPropagation());


//Enable the narration input when the select is set to other
document.querySelector('.income select').addEventListener('change', () => {
    if (description.value === '') {
      document.querySelector('#category').style.display = 'block';
    } else {
      document.querySelector('#category').style.display = 'none';
    }
  });
  description2.addEventListener('change', () => {
    if (description2.value === 'other') {
      document.querySelector('#category2').style.display = 'block';
    } else {
      document.querySelector('#category2').style.display = 'none';
    }
  })

// function to collect the form details to display in history
function handleData(e) {
  e.preventDefault();
  document.querySelector('input[type="submit"]').value = 'Recording...';
  const formObj = new FormData(form);
  const amount = Number(formObj.get('amount'));
  const textInput = layer.querySelector('#category').value;
  const narration = document.getElementById('options').value || textInput;
  
  if (amount && narration) {
    const historyData = {
      amount,
      narration,
      type: 'income',
      time: date()
    }
    //console.log(historyData);
    history.push(historyData)
    totalIncome += historyData.amount;
    incomeBalance.textContent = `${totalIncome.toLocaleString()}.00`;
    
    
  } else {
    alert('Please fill in all details');
    return;
  }
    
    saveToLocaleStorage(history);
    
   renderHistory();
   form.reset();
   document.querySelector('input[type="submit"]').value = 'Record';
}

//Expenses function
function handleData2(e) {
  e.preventDefault();
  let amount = Number(layer2.querySelector('div input').value);
  const options = layer2.querySelector('select').value;
  const inputText = layer2.querySelector('#category2').value;
  
  if (amount && options && amount > 0) {
      layer2.querySelector('input[type="submit"]').value = 'Recording...';
     const historyData = {
      amount,
      narration: (function () {
         if (inputText && inputText !== null) {
            return inputText;
        } else if (options === 'other') {
          alert('Please fill in the description');
          return;
        } else {
          return options;
        }
      })(),
      type: 'expenses',
      time: date()
    }
    //console.log(historyData);
    history.push(historyData);
    totelExpenses += historyData.amount;
    expBalance.textContent = totelExpenses.toLocaleString() + '.00';
    
  } else {
      alert('Please fill in all datas');
      return;
  }
  
  saveToLocaleStorage(history);
  
  renderHistory();
  
  form2.reset();
  layer2.querySelector('input[type="submit"]').value = 'Record';
}

const date = () => {
  const d = new Date();
  const dateFormat = d.toLocaleString('default', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
  
  return dateFormat;
}

//function to display history from the array 
function renderHistory() {
  histories.innerHTML = null;
  histories.style.padding = '16px';
  //const content = history.length > 0 ? history : console.log('history failed') || JSON.parse(localStorage.getItem('transactions'));
  history.forEach((data) => {
    if (data.type === 'expenses') {
      const li = document.createElement('li');
      li.classList = 'list';
      const span = document.createElement('span');
      span.appendChild(document.createTextNode(data.narration));
      const span2 = document.createElement('span');
      span2.appendChild(document.createTextNode(`-$${data.amount.toLocaleString()}`));
      span2.classList = 'red';
      const span3 = document.createElement('small');
      const time = document.createTextNode(data.time);
      span3.appendChild(time);
      const div = document.createElement('div');
      div.setAttribute('id', 'dateAndNarrate');
      const i = document.createElement('i');
      i.className = 'fa fa-arrow-up';
      li.appendChild(i);
      div.appendChild(span);
      div.appendChild(span3);
      li.appendChild(div);
      li.appendChild(span2)
      histories.appendChild(li);
     
    } else {
      const li = document.createElement('li');
      li.classList = 'list';
      const span = document.createElement('span');
      span.appendChild(document.createTextNode(data.narration));
      const span2 = document.createElement('span');
      span2.appendChild(document.createTextNode(`+$${data.amount.toLocaleString()}`));
      span2.classList = 'green'
      const span3 = document.createElement('small');
      const time = document.createTextNode(data.time);
      span3.appendChild(time);
      const div = document.createElement('div');
      div.setAttribute('id', 'dateAndNarrate');
      const i = document.createElement('i');
      i.className = 'fa fa-arrow-down';
      li.appendChild(i);
      div.appendChild(span);
      div.appendChild(span3);
      li.appendChild(div);
      li.appendChild(span2)
      histories.appendChild(li);
    }
  })

}

form.addEventListener('submit', handleData);
form2.addEventListener('submit', handleData2);


//close the layer when outside of the box is clicked 
layer.addEventListener('click', (e) => {
  e.currentTarget.style.display = 'none';
});
layer2.addEventListener('click', (e) => {
  e.currentTarget.style.display = 'none';
});

function saveToLocaleStorage(items) {
  const itemsStr = JSON.stringify(items);
  localStorage.setItem('transactions', itemsStr)
}

renderHistory()