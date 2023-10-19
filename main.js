const width = 320;
const height = 480;

let container = null;

let heroElement = null;
const heroSize = width / 10;
let heroX = width / 2;
let heroY = height / 2 + 150;

const bulletSize = width / 30;
const bulletSpeed = width / 25;

class Character {
    constructor(x, y, size, angle, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.angle = angle;
        this.speed = speed;
        const element = document.createElement("div");
        container.appendChild(element);
        element.style.position = "absolute";
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        this.element = element;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.element.style.left = `${this.x - this.size / 2}px`;
        this.element.style.top = `${this.y - this.size / 2}px`;
      }

    remove(){
        this.element.remove();
    }

    isAvailable() {
        if (
          this.x < -this.size ||
          this.x > width + this.size ||
          this.y < -this.size ||
          this.y > height + this.size
        ) {
          this.remove();
          return false;
        }
        return true;
      }
}

class Bullet extends Character{
    constructor(angle){
        super(heroX, heroY, bulletSize, angle, bulletSpeed)
        this.element.style.backgroundColor = "#ff0";
        this.element.style.borderRadius = "50%";
    }
}

const update = () => {
    heroElement.style.left = `${heroX - heroSize / 2}px`;
    heroElement.style.top = `${heroY - heroSize / 2}px`;
  };

const init = () => {
    container = document.createElement("div");
    container.style.position = "absolute";
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;
    container.style.overflow = "hidden"
    container.style.backgroundColor = "#202";
    document.body.appendChild(container);
    
    heroElement = document.createElement("div");
    heroElement.style.position = "absolute";
    heroElement.style.display = "flex";
    heroElement.style.alignItems = "center";
    heroElement.style.justifyContent = "center";
    heroElement.style.width = `${heroSize}px`;
    heroElement.style.height = `${heroSize}px`;
    heroElement.style.fontSize = `${heroSize}px`;
    heroElement.textContent = "🎃";
    container.appendChild(heroElement); 
    update();

    {               
        let originalX = -1;
        let originalY = -1;
        let originalHeroX = -1;
        let originalHeroY = -1;
        document.onpointerdown = (e) => {
            e.preventDefault();
            originalX = e.pageX;
            originalY = e.pageY;
            originalHeroX = heroX;
            originalHeroY = heroY;
        };
        document.onpointermove = (e) => {
            e.preventDefault();
            if (originalX !== -1){
                const dx = e.pageX - originalX;
                const dy = e.pageY - originalY;
                heroX = originalHeroX + dx * 1.5;
                heroY = originalHeroY + dy * 1.5;
                heroX = Math.min(width - heroSize / 2, Math.max(heroSize / 2, heroX));
                heroY = Math.min(height - heroSize / 2, Math.max(heroSize / 2, heroY));
                update();
            }
        };
        document.onpointerup = (e) => {
            e.preventDefault();
            originalX = -1;
        };
    }
};

window.onload = async () => {
    init();
    
    let bulletList = [];
    let bulletInterval = 0;
    while (true){
        await new Promise(r => setTimeout(r, 16));
        if (bulletInterval === 0) {
            bulletInterval = 5;
            bulletList.push(new Bullet(-90 * Math.PI / 180));
            bulletList.push(new Bullet(-60 * Math.PI / 180));
            bulletList.push(new Bullet(-120 * Math.PI / 180));
        }

        bulletInterval --;
        for (let bullet of bulletList){
            bullet.update();
        }
        bulletList = bulletList.filter((v) => v.isAvailable());
    }
};