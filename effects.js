// 现代化交互特效
document.addEventListener('DOMContentLoaded', function() {
    // 添加页面加载动画
    addPageLoadAnimations();
    
    // 添加鼠标跟随效果
    addMouseFollowEffect();
    
    // 添加滚动视差效果
    addScrollParallax();
    
    // 添加输入框焦点特效
    addInputFocusEffects();
    
    // 添加按钮点击波纹效果
    addRippleEffect();
    
    // 添加卡片悬停效果
    addCardHoverEffects();
});

// 页面加载动画
function addPageLoadAnimations() {
    const elements = document.querySelectorAll('.form-section, .code-panel, .header');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// 鼠标跟随效果
function addMouseFollowEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.7;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // 悬停时放大光标
    document.addEventListener('mouseover', (e) => {
        if (e.target.matches('button, a, input, select, textarea')) {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'linear-gradient(135deg, #f093fb, #f5576c)';
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.matches('button, a, input, select, textarea')) {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        }
    });
}

// 滚动视差效果
function addScrollParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.header, .settings-panel, .code-panel');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// 输入框焦点特效
function addInputFocusEffects() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.2), 0 8px 25px rgba(99, 102, 241, 0.15)';
            
            // 添加发光动画
            this.style.animation = 'glow 2s ease-in-out infinite';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
            this.style.animation = '';
        });
    });
}

// 按钮点击波纹效果
function addRippleEffect() {
    document.addEventListener('click', function(e) {
        if (e.target.matches('button')) {
            const button = e.target;
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
}

// 卡片悬停效果
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.form-section, .code-panel');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
            
            // 添加边框发光效果
            this.style.borderColor = 'rgba(99, 102, 241, 0.5)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4), 0 0 20px rgba(99, 102, 241, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
            this.style.borderColor = '';
        });
    });
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.05);
            opacity: 0.8;
        }
    }
    
    @keyframes glow {
        0%, 100% {
            box-shadow: 0 0 5px rgba(99, 102, 241, 0.3);
        }
        50% {
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.6), 0 0 30px rgba(99, 102, 241, 0.4);
        }
    }
    
    .form-section, .code-panel {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .form-section:hover, .code-panel:hover {
        transform: translateY(-10px) scale(1.02);
    }
    
    button {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    input, select, textarea {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);

// 添加粒子背景效果
function addParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.3;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.color = `hsl(${Math.random() * 360}, 50%, 70%)`;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    // 创建粒子
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // 响应窗口大小变化
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// 初始化粒子背景
addParticleBackground(); 