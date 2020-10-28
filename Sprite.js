function Sprite(x, y, largura, altura){
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
    this.desenha = function(xCanvas, yCanvas){
        context.drawImage(img, this.x,this.y, this.largura, this.altura, xCanvas, yCanvas);

    }

}

var bg = new Sprite(0, 0, 600, 600);
var spritePersonagem = new Sprite(0,0,50,71);