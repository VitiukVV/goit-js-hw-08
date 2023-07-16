import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const { email, message } = form.elements;
const KEY_STORAGE = 'feedback-form-state';
const savedForm = localStorage.getItem(KEY_STORAGE);
let feedbackForm = {
  email: email.value.trim(),
  message: message.value.trim(),
};

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onTextAreaInput, 500));

populateForm();

function onFormSubmit(event) {
  event.preventDefault();
  if (!email.value.trim() || !message.value.trim()) {
    return alert('Усі поля форми повинні бути заповнені!');
  }
  feedbackForm = {
    email: email.value.trim(),
    message: message.value.trim(),
  };
  console.log(feedbackForm);
  event.currentTarget.reset();
  localStorage.removeItem(KEY_STORAGE);
}

function onTextAreaInput(event) {
  feedbackForm[event.target.name] = event.target.value;
  localStorage.setItem(KEY_STORAGE, JSON.stringify(feedbackForm));
}

function populateForm() {
  if (savedForm) {
    email.value = JSON.parse(savedForm).email;
    message.value = JSON.parse(savedForm).message;
  } else {
    email.value = '';
    message.value = '';
  }
}
