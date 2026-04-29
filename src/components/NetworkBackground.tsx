import React, { useEffect, useRef } from 'react';

export const NetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; color: string; luminescent: boolean }[] = [];
    let numNodes = Math.min(Math.floor((width * height) / 9000), 400); 
    const colors = ['#00f0ff', '#0a84ff', '#5ac8fa', '#4a6b8c', '#2c4b6b'];

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2.0 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        luminescent: Math.random() > 0.7
      });
    }

    let animationFrameId: number;

    const draw = () => {
      // Deep blue gradient to very dark navy
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#021124'); 
      gradient.addColorStop(1, '#00050b');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw lines
      ctx.lineWidth = 1.5;
      for (let i = 0; i < numNodes; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < numNodes; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 30000) { 
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            
            const alpha = 1 - dist / 173.2;
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.3})`;
            ctx.stroke();
          }
        }
      }

      // Update and draw nodes
      for (let i = 0; i < numNodes; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) { node.x = 0; node.vx *= -1; }
        if (node.x > width) { node.x = width; node.vx *= -1; }
        if (node.y < 0) { node.y = 0; node.vy *= -1; }
        if (node.y > height) { node.y = height; node.vy *= -1; }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        
        if (node.luminescent) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = node.color;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; 
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        
        const newNumNodes = Math.min(Math.floor((width * height) / 9000), 400); 
        if (newNumNodes > numNodes) {
          for (let i = numNodes; i < newNumNodes; i++) {
            nodes.push({
              x: Math.random() * width,
              y: Math.random() * height,
              vx: (Math.random() - 0.5) * 1.5,
              vy: (Math.random() - 0.5) * 1.5,
              radius: Math.random() * 2.0 + 1.5,
              color: colors[Math.floor(Math.random() * colors.length)],
              luminescent: Math.random() > 0.7
            });
          }
        }
        numNodes = newNumNodes;
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }} 
    />
  );
};
