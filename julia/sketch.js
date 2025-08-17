/*
* Julia set - f(z) = z^n + c = z^2 + c | n=2
* - oleh saya
* 17.08.2025
*/

/* Initialize */
const width = 800;
const height = width;
const maxIters = 1000;
const R = 2;
const n = 2;
const cX = -0.8; // real axis
const cY = 0.156; // imaginary axis

function setup() {
  createCanvas(width, height);
  colorMode(HSB, 360, 100, 100, 100);
  noLoop();

  background(0.0, 0.0, 90.0, 100.0);
  noStroke();
  
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let zX = map(x, 0, width, -R, R); 
      let zY = map(y, 0, height, -R, R); 

      let epoch = 0;

      while (((pow(zX, 2) + pow(zY, 2)) < pow(R, 2)) && epoch <= maxIters) {
        let xTmp = pow(pow(zX, 2) + pow(zY, 2), n / 2) * cos(n * atan2(zY, zX)) + cX;
        zY = pow(pow(zX, 2) + pow(zY, 2), n / 2) * sin(n * atan2(zY, zX)) + cY;
        zX = xTmp;

        epoch += 1;
      }
      
      // draw
      let nParam = map(epoch, 0, maxIters, 0.0, 1.0);
      let hueVal = noise(100.0, nParam * 50.0) * 240.0;
      let satVal = 90.0;
      let briVal = 30.0;
      let alpVal = noise(200.0, nParam * 20.0) * 100.0;
      fill(hueVal % 360.0, satVal, briVal, alpVal);
      rect(x, y, 1.0, 1.0);
    }
  }
}
