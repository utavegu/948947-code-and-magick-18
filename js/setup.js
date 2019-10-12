'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var NUMBER_OF_CHARACTERS_DISPLAYED = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;


// ---------- БЛОК ПОХОЖИХ ПЕРСОНАЖЕЙ ----------


// ФУНКЦИЯ, перемешивающая получаемый на вход массив
var mixArray = function (array) {
  var arrayCopy = array.slice();
  var result = [];
  var i = 0;
  while (i < arrayCopy.length) {
    var randomIndex = Math.floor(Math.random() * arrayCopy.length);
    result.push(arrayCopy[randomIndex]);
    arrayCopy.splice(randomIndex, 1);
    i++;
  }
  return result;
};

// ФУНКЦИЯ, генерирующая мага
var createWizards = function (names, surnames, coatColors, eyeColors, wizardsCount) {
  var wizards = [];
  names = mixArray(names);
  surnames = mixArray(surnames);
  coatColors = mixArray(coatColors);
  eyeColors = mixArray(eyeColors);
  for (var i = 0; i < wizardsCount; i++) {
    wizards.push({
      name: names[i] + ' ' + surnames[i],
      coatColor: coatColors[i],
      eyesColor: eyeColors[i]
    });
  }
  return wizards;
};

// Заполняем массив со случайно сгенерированными магами-объектами
var wizards = createWizards(WIZARD_NAMES, WIZARD_SURNAMES, COAT_COLORS, EYE_COLORS, NUMBER_OF_CHARACTERS_DISPLAYED);

// Сюда сунем
var similarListElement = document.querySelector('.setup-similar-list');

// А тут шаблон
var similarWizardTemplateElement = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// ФУНКЦИЯ, отрисовывающая мага
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplateElement .cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

// Новый фрагмент
var fragment = document.createDocumentFragment();

// Упакуем туда отрисованных магов
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

// Сунем готовый кусок в разметку
similarListElement.appendChild(fragment);

// И покажем результат проделанной работы
document.querySelector('.setup-similar').classList.remove('hidden');


// ---------- БЛОК СМЕНЫ ВНЕШНЕГО ВИДА ГГ ----------


var setup = document.querySelector('.setup'); // Попуп
var setupOpen = document.querySelector('.setup-open'); // Иконка
var setupClose = setup.querySelector('.setup-close'); // Крестик (внимание, оптимизация за счёт поиска сразу внутри попапа)
var userNameInput = setup.querySelector('.setup-user-name'); // Инпут ввода имени (поиск внутри попапа!)
var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat'); // Цвет мантии мага ГГ
var wizardEye = setup.querySelector('.setup-wizard .wizard-eyes'); // Цвет глаз мага ГГ
var wizardFireball = setup.querySelector('.setup-fireball-wrap'); // Цвет шаров мага ГГ
var inputCoatColor = document.querySelector('input[name="coat-color"]'); // Невидимый инпут с информацией о цвете мантии мага
var inputEyeColor = document.querySelector('input[name="eyes-color"]'); // Невидимый инпут с информацией о цвете глаз мага
var inputFireballColor = document.querySelector('input[name="fireball-color"]'); // Невидимый инпут с информацией о цвете шаров мага

// ФУНКЦИЯ открытия попапа
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress); // Окно появилось, начинаем слушать хоткеи...
  document.removeEventListener(setupOpen); // Это вы имели в виду? <<<<<<<<???
};

// ФУНКЦИЯ закрытия попапа
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress); // Спрятали окно, хоткеи больше не слушаем...
  document.removeEventListener(setupClose); // Ну тогда и так заодно <<<<<<<<!!!
};

// ОБРАБОТЧИК закрытия попапа - в любом месте эскейпом
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

// ОБРАБОТЧИК открытия попапа - клик
setupOpen.addEventListener('click', function () { // Жмакнул по портрету - попуп появился
  openPopup();
});

// ОБРАБОТЧИК открытия попапа - хоткей
setupOpen.addEventListener('keydown', function (evt) { // Портрет зафокусил, нажал ентер - попап появился
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// ОБРАБОТЧИК закрытия попапа - клик
setupClose.addEventListener('click', function () { // Жмакнул по крестику - попуп спрятался
  closePopup();
});

// ОБРАБОТЧИК закрытия попапа - энтером по крестику в фокусе
setupClose.addEventListener('keydown', function (evt) { // Крестик зафокусил, нажал ентер - попап спрятался
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// ОБРАБОТЧИК, реагирующий на кнопку сабмита при неверно заполненном поле
userNameInput.addEventListener('invalid', function () {
  // if (userNameInput.validity.tooShort) {
  //   userNameInput.setCustomValidity('ДЛИННЕЕ! НАДО ДЛИННЕЕ! СЛИШКОМ КОРОТКОЕ ИМЯ, ДЛЯ ШЕЛУДЛИВОГО ПСА!');
  // } else --- !!!РАСКОММЕНТИРУЙ ПОТОМ!!!
  if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Слишком длинно, пёс!');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Заполни поле, пёс!');
  } else {
    userNameInput.setCustomValidity('');
  }
});

// ОБРАБОТЧИК, слушающий каждый ввод на текущем поле
userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Слишком коротко, пёс!');
  } else {
    target.setCustomValidity('');
  }
});

// ОБРАБОТЧИК, не дающий всплывать событиям с данного инпута (если он в фокусе, врочем это общее правило для события кейдаун)
userNameInput.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});

// ФУНКЦИЯ выбирающая случайный цвет из массива
var generateRandomColor = function (arrayOfColor) {
  return Math.floor((Math.random() * arrayOfColor.length));
};

// ОБРАБОТЧИК, меняющий цвет мантии мага и поля для отправки формы
wizardCoat.addEventListener('click', function () {
  var temporaryWizardCoat = COAT_COLORS[generateRandomColor(COAT_COLORS)];
  wizardCoat.style.fill = temporaryWizardCoat;
  inputCoatColor.value = temporaryWizardCoat;
});

// ОБРАБОТЧИК, меняющий цвет глаз мага и поля для отправки формы
wizardEye.addEventListener('click', function () {
  var temporaryWizardEye = EYE_COLORS[generateRandomColor(EYE_COLORS)];
  wizardEye.style.fill = temporaryWizardEye;
  inputEyeColor.value = temporaryWizardEye;
});

// ОБРАБОТЧИК, меняющий цвет шаров мага и поля для отправки формы
wizardFireball.addEventListener('click', function () {
  var temporaryWizardFireball = FIREBALL_COLORS[generateRandomColor(FIREBALL_COLORS)];
  wizardFireball.style.background = temporaryWizardFireball;
  inputFireballColor.value = temporaryWizardFireball;
});
