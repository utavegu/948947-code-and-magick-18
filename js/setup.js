'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var NUMBER_OF_CHARACTERS_DISPLAYED = 4;

// Сам попуп. Показать попуп.
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// ФУНКЦИЯ, перемешивающая получаемый на вход массив
var mixArray = function (array) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    var randomIndex = Math.floor(Math.random() * array.length);
    result.push(array[randomIndex]);
    array.splice(randomIndex, 1);
    i--;
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

// Погнали
var wizards = createWizards(WIZARD_NAMES, WIZARD_SURNAMES, COAT_COLORS, EYE_COLORS, NUMBER_OF_CHARACTERS_DISPLAYED);

// Сюда сунем
var similarListElement = document.querySelector('.setup-similar-list');

// А тут шаблон
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// ФУНКЦИЯ, отрисовывающая мага
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
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

// И покажем как у нас заебись всё получилось
document.querySelector('.setup-similar').classList.remove('hidden');
