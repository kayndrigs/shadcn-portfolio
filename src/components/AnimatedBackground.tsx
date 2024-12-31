import React, { useEffect } from 'react';

interface ParticleTypes {
  [key: string]: string;
}

const particleTypes: ParticleTypes = {
  network: `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>`,
  cloud: `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>`,
  security: `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>`,
  code: `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>`,
  database: `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3c4.97 0 9 1.34 9 3v12c0 1.66-4.03 3-9 3s-9-1.34-9-3V6c0-1.66 4.03-3 9-3z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 6c0 1.66-4.03 3-9 3s-9-1.34-9-3"/>
          </svg>`
};

const AnimatedBackground: React.FC = () => {
  useEffect(() => {
    const createParticle = (container: HTMLElement, isLeft: boolean) => {
      const particle = document.createElement('div');
      particle.className = 'particle floating';
      
      // Constrain horizontal position to the outer edges
      const xPosition = isLeft ? 
        Math.random() * 100 : // 0-20% for left side
        0 + (Math.random() * 100); // 80-100% for right side
      
      particle.style.left = `${xPosition}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Adjust animation timing
      particle.style.animationDuration = `${12 + Math.random() * 8}s, ${10 + Math.random() * 5}s`;
      particle.style.animationDelay = `-${Math.random() * 12}s`;
      
      const types = Object.keys(particleTypes);
      const type = types[Math.floor(Math.random() * types.length)];
      particle.innerHTML = particleTypes[type];
      
      container.appendChild(particle);
    };

    const leftContainer = document.getElementById('left-particles');
    const rightContainer = document.getElementById('right-particles');
    const particlesPerSide = 30; // Reduced number of particles

    if (leftContainer && rightContainer) {
      for (let i = 0; i < particlesPerSide; i++) {
        createParticle(leftContainer, true);
        createParticle(rightContainer, false);
      }
    }

    return () => {
      if (leftContainer) leftContainer.innerHTML = '';
      if (rightContainer) rightContainer.innerHTML = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10" style={{ backgroundColor: '#FFFDD0' }}>
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-120px) rotate(180deg); }
            100% { transform: translateY(0) rotate(360deg); }
          }

          @keyframes sideToSide {
            0% { transform: translateX(-30px); }
            100% { transform: translateX(30px); }
          }

          .particle {
            position: absolute;
            color: #333333;
            opacity: 0.15;
            z-index: 0;
          }

          .floating {
            animation: float 15s linear infinite, sideToSide 10s ease-in-out infinite alternate;
          }

          .side-section {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 25%;
            z-index: 0;
          }

          .left-section {
            left: 0;
          }

          .right-section {
            right: 0;
          }
        `}
      </style>
      
      <div className="side-section left-section" id="left-particles" />
      <div className="side-section right-section" id="right-particles" />
    </div>
  );
};

export default AnimatedBackground;