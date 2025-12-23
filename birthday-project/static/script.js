// =====================
// SCENE NAVIGATION
// =====================
let currentScene = 1;

function goToScene(sceneNumber) {
    // Hilangkan scene yang aktif
    const activeScene = document.querySelector('.scene.active');
    if (activeScene) {
        activeScene.classList.remove('active');
    }

    // Tampilkan scene baru
    const newScene = document.getElementById(`scene${sceneNumber}`);
    if (newScene) {
        setTimeout(() => {
            newScene.classList.add('active');
            currentScene = sceneNumber;
            
            // Trigger confetti di scene tertentu
            if (sceneNumber === 1 || sceneNumber === 5) {
                createConfetti();
            }
        }, 300);
    }
}

// =====================
// CONFETTI ANIMATION
// =====================
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiParticles = [];

class Confetti {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 8 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = this.randomColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }

    randomColor() {
        const colors = ['#ffd700', '#ff6b9d', '#74b9ff', '#a29bfe', '#fd79a8', '#55efc4'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

function createConfetti() {
    confettiParticles = [];
    for (let i = 0; i < 100; i++) {
        confettiParticles.push(new Confetti());
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateConfetti);
}

// =====================
// BALLOONS (optional)
// =====================
function createBalloons() {
    const colors = ['#ff6b9d', '#74b9ff', '#ffd700', '#a29bfe'];
    const container = document.body;

    for (let i = 0; i < 5; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.cssText = `
            position: fixed;
            bottom: -150px;
            left: ${Math.random() * 90 + 5}%;
            width: 60px;
            height: 80px;
            background: radial-gradient(circle at 30% 30%, ${colors[i % colors.length]}, ${colors[(i + 1) % colors.length]});
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            animation: floatUp ${6 + Math.random() * 3}s ease-in-out infinite;
            animation-delay: ${i * 0.5}s;
            z-index: 1;
        `;
        container.appendChild(balloon);
    }
}

// =====================
// INITIALIZATION
// =====================
window.addEventListener('load', () => {
    createConfetti();
    animateConfetti();
    createBalloons();
});

// Resize canvas saat window di-resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// =====================
// CARA MENAMBAH SCENE BARU
// =====================
/*
1. Tambahkan HTML di index.html:
   <div class="scene" id="scene6">
       <div class="content">
           <h2>Scene Baru</h2>
           <button class="btn" onclick="goToScene(7)">Next</button>
       </div>
   </div>

2. Update button scene sebelumnya:
   onclick="goToScene(6)"

3. Tambahkan styling khusus di style.css jika perlu

4. Fungsi goToScene() sudah otomatis handle scene baru!
*/