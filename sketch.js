let ima;
let col = ['#00ff00', '#0000ff', '#00ffff', '#ffff00', '#ff00ff'];

function preload() {
  ima = [0];
  ima.push(loadImage('Pic/0.jpg'));
           ima.push(loadImage('Pic/2.jpg'));
  ima.push(loadImage('Pic/3.jpg'));
  ima.push(loadImage('Pic/4.jpg'));
  ima.push(loadImage('Pic/1.jpg'));
}
let board = [],
  size = 8,
  coun = 0,
  cnt = 0,
  limit = 5;
let blaced, da_chon, thutu, dc = 0,
  tt = 0;
let isWin, chose;
let coun_hang = [],
  coun_cot = [],
  coun_ans;
// duoi day la ham spawn random
function spawn() {
  tt = '';
  dc = 0;
  board = [];
  blaced = [];
  coun_hang = [];
  coun_cot = [];
  da_chon = [];
  for (let i = 0; i < size; i++) {
    board.push([]);
    blaced.push([]);
    coun_hang.push([]);
    coun_cot.push([]);
    da_chon.push([]);
    for (let j = 0; j < size; j++) {
      da_chon[i].push(0);
      board[i].push(0);
      blaced[i].push(0);
    }
    for (let j = 0; j < 2 * size; j++) {
      coun_hang[i].push(0);
      coun_cot[i].push(0);
    }
  }

  for (let i = 0; i < limit; i++) {
    x = int(random(0, size - 0.0001));
    y = int(random(0, size - 0.0001));
    if (blaced[x][y] == 1) i--;
    blaced[x][y] = 1;
  }
  thutu = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (blaced[i][j] == 0) {
        coun++;
        thutu.push([i, j]);
      }
    }
  }

  thutu = shuffle(thutu);

  for (let i of thutu) {
    for (let j = 1; j < 2 * size; j++) {
      if (coun_hang[i[0]][j] == 0 && coun_cot[i[1]][j] == 0) {
        coun_hang[i[0]][j] = 1;
        coun_cot[i[1]][j] = 1;
        board[i[0]][i[1]] = j;

        break;
      }
    }
  }
  // for(let i = 0; i < size; i++){
  //   for(let j = 0; j < size; j++){
  //     if(blaced[x][y] == 1){
  //       for(let k = 1; k < 2*size; k++){
  //         if(coun_hang[i][k] == 1 || coun_cot[j][k] == 1){
  //           coun_hang[i][k]++;
  //           coun_cot[j][k]++;
  //           board[i][j] = k;
  //           break;
  //        }
  //       }
  //     }
  //   }
  // }
  coun_ans = 0;
  chose = [];
  for (let i = 1; i < size * 2; i++) {
    chose.push(i);
  }
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] == 0) {
        chose = shuffle(chose);
        for (let k of chose) {
          if (coun_hang[i][k] >= 1 || coun_cot[j][k] >= 1) {
            coun_hang[i][k]++;

            coun_cot[j][k]++;
            if (coun_hang[i][k] == 2) {
              coun_ans++;
            }
            if (coun_cot[j][k] == 2) {
              coun_ans++;
            }
            board[i][j] = k;
            break;
          }
        }
      }
    }
  }

}
//hoan thanh
function hienthi() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      da_chon[i][j] = 0;
      if (blaced[i][j] == 1) {
        da_chon[i][j] = 1;
      }
    }
  }
  dc = limit;
  coun_ans = 0;
  if (tt != 'win') {
    tt = 'lose';

  }
}

function ez() {
  size = 5;
  limit = 5;
  spawn();
}

function me() {
  size = 8;
  limit = 10;
  spawn();
}

function ha() {
  size = 10;
  limit = 15;
  spawn();
}
let sizein, limitin;

function cus() {
  size = min(12, int(sizein.value()));
  limit = min(int(size * size / 5), int(limitin.value()));
  spawn();
}

function setup() {
  createCanvas(800, 600);
  let solution = createButton('Solution :(');
  let easy = createButton('Easy')
  let medium = createButton('Medium');
  let hard = createButton('Hard');
  let custom = createButton('Custom');
  sizein = createInput();
  limitin = createInput();
  solution.position(665, 50);
  easy.position(665, 90);
  medium.position(665, 110);
  hard.position(665, 130);
  custom.position(665, 200);
  sizein.position(665, 155);
  limitin.position(665, 175);
  solution.size(60,40);
  easy.size(60,20);
  medium.size(60,20);
  hard.size(60,20);
  custom.size(60,20);
  sizein.size(55,15);
  limitin.size(55,15);
  solution.mousePressed(hienthi);
  easy.mousePressed(ez);
  medium.mousePressed(me);
  hard.mousePressed(ha);
  custom.mousePressed(cus);
  ez();
}

function layer1() {
  textSize(30);
  if (tt == 'win') {
    textSize(30);
    text('You win!', 415, 15);
  }
  if (tt == 'lose') {
    textSize(30);
    text('You lose!', 415, 15);
  }
  textSize(14);
  textAlign(LEFT);
  noStroke();
  text('Size: ', 605, 165);
  text('So buoc: ', 605, 185);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      
      if (board[j][i] < 5) {
        image(ima[board[j][i]], i * 50, j * 50 + 50, 50, 50);
      } else if (board[j][i] < 9) {
        stroke('black');
        fill(col[board[j][i] - 5]);
        rect(i * 50, j * 50 + 50, 50, 50);
        fill('black');
      } else {
        noFill();
        stroke('black');
        square(i*50,j*50+50,50);
        fill('black');
        textAlign(CENTER,CENTER);
        textSize(30);
        text(board[j][i] - 8, i * 50, j * 50 + 50, 50, 50);
        textSize(14);
      }
      if (da_chon[i][j] == 1) {
        stroke('red');
        strokeWeight(4);
        noFill();
        square(i * 50, j * 50 + 50, 50);
        line(i*50,j*50+50,i*50+50,j*50+100);
        line(i*50+50,j*50+50,i*50,j*50+100);
        strokeWeight(1);
        stroke('black');
        fill('black');
      }
    }
  }
}

function draw() {
  background(255);
  layer1();
  // textAlign(LEFT,TOP);
  // text(thutu,10,510,500,500);
  // text(coun_ans, 315, 15);
  textSize(30);
  textAlign(LEFT,CENTER);
  text('Ban con ' + (limit - dc) + ' luot', 15, 15);
  if (coun_ans == 0 && tt == '') {
    tt = 'win';
  }
}

function mousePressed() {
  if (tt != '') {
    return;
  }
  if (mouseX >= 50 * size || mouseY >= 50 * size + 50 || mouseY < 50) return;
  var i = Math.floor((mouseY - 50) / 50);
  var j = Math.floor(mouseX / 50);
  if (da_chon[j][i] == 0) {
    if (dc >= limit) return;
    da_chon[j][i] = 1;
    if (coun_cot[j][board[i][j]] == 2) {
      coun_ans--;
    }
    if (coun_hang[i][board[i][j]] == 2) {
      coun_ans--;
    }
    coun_cot[j][board[i][j]]--;
    coun_hang[i][board[i][j]]--;

    dc++;
  } else {
    da_chon[j][i] = 0;
    coun_cot[j][board[i][j]]++;
    coun_hang[i][board[i][j]]++;
    if (coun_cot[j][board[i][j]] == 2) {
      coun_ans++;
    }
    if (coun_hang[i][board[i][j]] == 2) {
      coun_ans++;
    }
    dc--;
  }
}