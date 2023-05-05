const API_KEY = ''
const submitButton = document.querySelector('#submit');
const outputElement = document.querySelector('#output');
const inputElement = document.querySelector('input');
const historyElement = document.querySelector('.history');
const buttonElement = document.querySelector('button');

const changeInput = (value) => {
  inputElement.value = value;
};

const getMessage = async () => {
  console.log('getMessage call success')
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: inputElement.value }],
      max_tokens: 50
    }),

  }
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', options);
    const { choices } = await response.json();
    console.log(choices);
    const content = choices[0].message.content;
    outputElement.textContent = content;
    if (content && inputElement.value) {
      const pEl = document.createElement('p');
      pEl.textContent = inputElement.value;
      pEl.addEventListener('click', () => changeInput(pEl.textContent));
      historyElement.append(pEl);
    }
  } catch (error) {
    console.error(error);
  }
};

submitButton.addEventListener('click', getMessage);

const clearInput = () => {
  inputElement.value = '';
};

buttonElement.addEventListener('click', clearInput);

inputElement.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    getMessage();
  }
});