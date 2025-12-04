'use client';

import { useEffect, useRef } from 'react';

/**
 * NetworkBackground - Spinnennetz DAG Hintergrund
 *
 * Optimiert für KASPA-NEXUS:
 * - Dichtes Netzwerk über den GANZEN Hintergrund
 * - Flow von links nach rechts (wie Transaktionen)
 * - Subtil genug dass Content lesbar bleibt
 * - Premium Tech-Look
 */

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  connections: number[];
  opacity: number;
  size: number;
}

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const nodeIdRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration
    const NODE_COUNT_BASE = 80; // Base number of nodes
    const CONNECTION_DISTANCE = 180; // Max distance to connect
    const FLOW_SPEED = 0.3; // Horizontal flow speed
    const NODE_SIZE_MIN = 1.5;
    const NODE_SIZE_MAX = 3;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    const initNodes = () => {
      nodesRef.current = [];
      nodeIdRef.current = 0;

      // Calculate node count based on screen size
      const area = canvas.width * canvas.height;
      const nodeCount = Math.floor(NODE_COUNT_BASE * (area / (1920 * 1080)));

      // Create nodes distributed across the screen
      for (let i = 0; i < nodeCount; i++) {
        createNode(
          Math.random() * (canvas.width + 200) - 100,
          Math.random() * canvas.height
        );
      }

      // Initial connection calculation
      updateConnections();
    };

    const createNode = (x: number, y: number): Node => {
      const node: Node = {
        id: nodeIdRef.current++,
        x,
        y,
        vx: FLOW_SPEED + Math.random() * 0.2, // Slight speed variation
        connections: [],
        opacity: 0.3 + Math.random() * 0.4,
        size: NODE_SIZE_MIN + Math.random() * (NODE_SIZE_MAX - NODE_SIZE_MIN),
      };
      nodesRef.current.push(node);
      return node;
    };

    const updateConnections = () => {
      const nodes = nodesRef.current;

      // Clear existing connections
      nodes.forEach((node) => {
        node.connections = [];
      });

      // Find connections based on distance
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            // Only connect to nodes that are to the right (flow direction)
            if (dx > 0) {
              nodes[i].connections.push(nodes[j].id);
            } else {
              nodes[j].connections.push(nodes[i].id);
            }
          }
        }
      }
    };

    let frameCount = 0;

    const animate = () => {
      frameCount++;

      // Clear with dark background
      ctx.fillStyle = '#060d17';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const nodeMap = new Map(nodes.map((n) => [n.id, n]));

      // Update node positions (flow right)
      nodes.forEach((node) => {
        node.x += node.vx;

        // Slight vertical drift
        node.y += Math.sin(frameCount * 0.01 + node.id) * 0.1;

        // Keep y in bounds
        if (node.y < 20) node.y = 20;
        if (node.y > canvas.height - 20) node.y = canvas.height - 20;
      });

      // Remove nodes that went off screen right, add new ones on left
      nodesRef.current = nodes.filter((node) => {
        if (node.x > canvas.width + 100) {
          // Respawn on left
          node.x = -50;
          node.y = Math.random() * canvas.height;
          node.id = nodeIdRef.current++;
          return true;
        }
        return true;
      });

      // Update connections periodically
      if (frameCount % 30 === 0) {
        updateConnections();
      }

      // === DRAW CONNECTIONS (SPINNENNETZ) ===
      nodes.forEach((node) => {
        node.connections.forEach((targetId) => {
          const target = nodeMap.get(targetId);
          if (!target) return;

          const dx = target.x - node.x;
          const dy = target.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Opacity based on distance
          const distanceOpacity = 1 - distance / CONNECTION_DISTANCE;

          // Fade at edges
          const avgX = (node.x + target.x) / 2;
          const edgeFade = Math.min(
            (avgX + 50) / 200,
            (canvas.width - avgX + 50) / 200
          );

          const lineOpacity = Math.max(0, Math.min(1, distanceOpacity * edgeFade)) * 0.12;

          if (lineOpacity <= 0.01) return;

          // Draw connection
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = `rgba(73, 234, 203, ${lineOpacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      });

      // === DRAW NODES ===
      nodes.forEach((node) => {
        // Fade at edges
        const edgeFade = Math.min(
          (node.x + 50) / 150,
          (canvas.width - node.x + 50) / 150,
          (node.y + 20) / 100,
          (canvas.height - node.y + 20) / 100
        );
        const fade = Math.max(0, Math.min(1, edgeFade));

        if (fade <= 0) return;

        const finalOpacity = node.opacity * fade;

        // Glow
        const glowRadius = node.size * 4;
        const glow = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowRadius
        );
        glow.addColorStop(0, `rgba(73, 234, 203, ${finalOpacity * 0.6})`);
        glow.addColorStop(0.5, `rgba(0, 212, 255, ${finalOpacity * 0.2})`);
        glow.addColorStop(1, 'rgba(0, 212, 255, 0)');

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(73, 234, 203, ${finalOpacity})`;
        ctx.fill();
      });

      // === OVERLAYS ===

      // Vignette
      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.height * 0.4,
        canvas.width / 2, canvas.height / 2, canvas.height
      );
      vignette.addColorStop(0, 'rgba(6, 13, 23, 0)');
      vignette.addColorStop(1, 'rgba(6, 13, 23, 0.4)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
