let color_palette = ["#9DADBE", "#5D759A", "#9CD3CC", "#222837"]; // #945031 → #9CD3CC
let basePalette = ["#78ade5", "#465365"];

function setup() {
    createCanvas(2000, 1400); // 畫布大小：width, height
    background(random(basePalette)); // 背景顏色
    colorMode(HSB);
    let xsum = 0;
    // 使用迴圈繪製 - 底色層
    for (let i = 0; i < 30; i++) {
        let x = xsum;
        let y = 0;
        let xCount = int(random(5, 20));
        let yCount = 350;
        let R = 4;
        let xSpan = R + random(2, 5);
        let ySpan = R + random(3);
        RJ_rect(x, y, xCount, yCount, xSpan, ySpan, R);
        xsum += xCount * xSpan;
    }
    noLoop();
}

function draw() {
}

// _x: 起始x座標, _y: 起始y座標, _xCount: x方向點點排數, _yCount: y方向點點排數, _xSpan: x方向間距, _ySpan: y方向間距, _R: 點點大小
function RJ_rect(_x, _y, _xCount, _yCount, _xSpan, _ySpan, _R) {
    let mainClr = random(color_palette); // 隨機選一個顏色
    let fade_scale = random(); // 0-1
    let lightClr = "#A1AFB7"; // 原本白色細線改為固定色
    let noiseStep = 0.002; // 波型取樣距離，小->波型變化小；大->波型變化大
    let sharpness = 0.1; // 銳利取樣範圍，大->比較不銳利；銳利畫取樣範圍，小-> 邊緣銳利
    let noiseRnd = random();

    // 繪製點點矩陣
    for (let i = 0; i < _xCount; i++) {
        let px = i * _xSpan + _x; // 計算 x 座標
        for (let j = 0; j < _yCount; j++) {
            let py = j * _ySpan + _y; // 計算 y 座標
            let fade_rate = j / _yCount; // 0-1
            fade_rate = map(fade_rate, 0, 1, 0, fade_scale);
            if (random() > fade_rate) {
                push(); // 儲存畫布目前狀態
                translate(px, py); // 移動畫布原點
                // 繪製 noise 生鏽
                if (noiseRnd < 0.5) {
                    let off = noise(px * noiseStep, py * noiseStep);
                    let offStroke = constrain(map(off, 0.5 - sharpness, 0.5 + sharpness, 0, 1) * _R * 2, 0, _R * 2)
                    stroke("#9CD3CC");
                    noFill();
                    strokeWeight(2);
                    circle(0, 0, offStroke);
                }
                // 繪製主要形狀
                fill(mainClr); // 填色
                fill(abs(sin(px / 10)) < 0.3 ? lightClr : mainClr); // 畫出細線
                noStroke(); // 不要外框線
                let r = _R * random(0.8, 1.5) + random(0.6, 0.8);
                circle(0, 0, r); //
                // 用線條繪製 XX 材質
                if (random() < 0.05) {
                    noFill();
                    stroke(mainClr);
                    strokeWeight(2);
                    line(-r, -r, r, r);
                    line(-r, r, r, -r);
                }
                // 用弧線繪製毛茸茸材質
                if (random() < 0.01) {
                    noFill();
                    stroke(random(color_palette)); // 隨機跳色
                    strokeWeight(2);
                    push();
                    rotate(random(TWO_PI));
                    let arcW = r * 2 * random(0.8, 2);
                    let arcH = r * 2 * random(0.8, 2);
                    arc(-random(r), random(r), arcW, arcH, 0, PI * 1.5);
                    pop();
                }
                pop(); // 回復至畫布先前狀態
            }
        }
    }
}