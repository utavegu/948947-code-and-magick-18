'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var PLAYER_X = 100;
var PLAYER_Y = 80;
var COLUMN_WIDTH = 40;
var COLUMN_X = 100;
var COLUMN_Y = 120;
var INTERVAL = 75; // С 50 не согласен, думаю тут заказчик что-то напутал. По предоставленному макету даже очевидно, что там не 50.
var CONGRATULATION_X = 235;
var CONGRATULATION_Y = 30;
var columnHeight = 1;

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CONGRATULATION_X, CONGRATULATION_Y);
  ctx.fillText('Список результатов:', CONGRATULATION_X - 10, CONGRATULATION_Y + 20);

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(players[i], PLAYER_X + INTERVAL * (i + 1), PLAYER_Y);
    ctx.fillText(Math.round(times[i] / 1000) + ' сек.', PLAYER_X + INTERVAL * (i + 1), PLAYER_Y + INTERVAL / 3);
    if (times[i] >= 15000) {
      times[i] = 15000;
    }
    ctx.fillRect(COLUMN_X + INTERVAL * (i + 1), COLUMN_Y, COLUMN_WIDTH, columnHeight * times[i] / 100);
  }
};
