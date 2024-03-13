const form = document.querySelector('.feedback-form');
const FORM_STORAGE_KEY = 'feedback-form-state';
const INITIAL_FORM_DATA = {
  email: '',
  message: '',
};

const formDataStorage = localStorage.getItem(FORM_STORAGE_KEY);
const parsedFormDataStorage = JSON.parse(formDataStorage);
let currentFormData = parsedFormDataStorage || INITIAL_FORM_DATA;

form.elements.email.value = currentFormData.email;
form.elements.message.value = currentFormData.message;

form.addEventListener('input', event => {
  const { name, value } = event.target;

  currentFormData[name] = value.trim();
  setToLocalStorage(currentFormData);
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const { email, message } = currentFormData;

  if (email && message) {
    console.log('submit', currentFormData);
    formReset();
  }
});

function formReset() {
  form.reset();
  currentFormData = INITIAL_FORM_DATA;
  localStorage.removeItem(FORM_STORAGE_KEY);
}

function setToLocalStorage(data, key = FORM_STORAGE_KEY) {
  localStorage.setItem(key, JSON.stringify(data));
}
