'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var COLUMN_WIDTH = 40;
var COLUMN_HEIGHT = 150;
var TEXT_X_GAP = 90;
var TEXT_Y_GAP = 235;
var FONT_GAP = 5;
var CONGRATULATION_X = 235;
var CONGRATULATION_Y = 30;
var CLOUD_COLOR = '#fff';
var CLOUD_SHADOW = 'rgba(0, 0, 0, 0.7)';
var WIN_TEXT = 'Ура вы победили!\nСписок результатов:';
var COLOR = '#000';
var FONT = '16px PT Mono';

// ФУНКЦИЯ, рисует само облако статистики
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// ФУНКЦИЯ, рисует текст победителя
var printCongratulationsText = function (ctx, winText) {
  ctx.fillStyle = COLOR;
  ctx.font = FONT;
  winText = winText.split('\n');
  for (var i = 0; i < winText.length; i++) {
    ctx.fillText(winText[i], CONGRATULATION_X - i * 10, CONGRATULATION_Y + i * 20);
  }
};

// ФУНКЦИЯ, отрисовка колонок
var renderColumns = function (ctx, players, times, proportion) {
  for (var i = 0; i < players.length; i++) {
    ctx.fillText(players[i], CLOUD_X + GAP * 5 + TEXT_X_GAP * i, GAP * 2 + TEXT_Y_GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP * 5 + TEXT_X_GAP * i, TEXT_Y_GAP - FONT_GAP - (times[i] / proportion));
    ctx.fillStyle = (players[i] === 'Вы') ? 'rgb(255, 0, 0, 1)' : 'rgb(0, 0,' + Math.random() * 255 + ')';
    ctx.fillRect(CLOUD_X + GAP * 5 + TEXT_X_GAP * i, TEXT_Y_GAP, COLUMN_WIDTH, -(times[i] / proportion));
    ctx.font = FONT;
    ctx.fillStyle = COLOR;
  }
};

// Статистика
window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  printCongratulationsText(ctx, WIN_TEXT);

  // Пропорция
  var maxTime = Math.max.apply({}, times);
  var proportion = maxTime / COLUMN_HEIGHT;

  renderColumns(ctx, players, times, proportion);

};
