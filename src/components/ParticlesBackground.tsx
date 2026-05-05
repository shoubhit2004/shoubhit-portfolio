"use client";

import { useEffect, useRef } from "react";

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Very subtle diffused neon accent colors
    const colors = [
      "rgba(0, 245, 255, 0.12)",
      "rgba(123, 97, 255, 0.12)",
      "rgba(0, 229, 255, 0.12)",
      "rgba(138, 43, 226, 0.12)",
    ];
    const traceColor = "rgba(255, 255, 255, 0.015)";
    const padColor = "rgba(255, 255, 255, 0.02)";
    const bgColor = "#050505"; // Match the typical dark background or clear it

    interface Point {
      x: number;
      y: number;
    }

    interface Node extends Point {
      radius: number;
    }

    interface Segment {
      p1: Point;
      p2: Point;
      dist: number;
    }

    interface Path {
      points: Point[];
      segments: Segment[];
      length: number;
    }

    interface Pulse {
      path: Path;
      progress: number;
      speed: number;
      color: string;
      length: number;
    }

    let nodes: Node[] = [];
    let paths: Path[] = [];
    let pulses: Pulse[] = [];

    const GRID_SIZE = 40;
    const snap = (v: number) => Math.round(v / GRID_SIZE) * GRID_SIZE;

    // Create a PCB-style trace (orthogonal and 45-degree angles)
    const createPath = (p1: Point, p2: Point): Point[] => {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const adx = Math.abs(dx);
      const ady = Math.abs(dy);

      if (adx === 0 || ady === 0 || adx === ady) {
        return [p1, p2];
      }

      const signX = Math.sign(dx);
      const signY = Math.sign(dy);

      if (adx > ady) {
        return [p1, { x: p1.x + ady * signX, y: p1.y + ady * signY }, p2];
      } else {
        return [p1, { x: p1.x + adx * signX, y: p1.y + adx * signY }, p2];
      }
    };

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Reset parallax
      targetMouseX = width / 2;
      targetMouseY = height / 2;
      mouseX = width / 2;
      mouseY = height / 2;

      // Add a 100px buffer around edges so parallax doesn't show cutoffs
      const margin = 100;
      const safeWidth = width + margin * 2;
      const safeHeight = height + margin * 2;
      
      const nodeCount = Math.floor((safeWidth * safeHeight) / 15000);
      const nodeSet = new Set<string>();
      nodes = [];
      
      let attempts = 0;
      while (nodes.length < nodeCount && attempts < nodeCount * 3) {
        const x = snap((Math.random() * safeWidth) - margin);
        const y = snap((Math.random() * safeHeight) - margin);
        const key = `${x},${y}`;
        if (!nodeSet.has(key)) {
          nodeSet.add(key);
          nodes.push({ x, y, radius: Math.random() > 0.8 ? 2.5 : 1.5 });
        }
        attempts++;
      }

      paths = [];
      nodes.forEach((node, i) => {
        // Connect to 2 nearest neighbors to create a network
        const neighbors = [...nodes]
          .filter((_, j) => i !== j)
          .map(n => ({ n, dist: Math.hypot(n.x - node.x, n.y - node.y) }))
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 2);

        neighbors.forEach(({ n }) => {
          const pathPoints = createPath(node, n);
          let length = 0;
          const segments: Segment[] = [];
          for (let k = 0; k < pathPoints.length - 1; k++) {
            const p1 = pathPoints[k];
            const p2 = pathPoints[k + 1];
            const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
            segments.push({ p1, p2, dist });
            length += dist;
          }
          if (length > 0) {
            paths.push({ points: pathPoints, segments, length });
          }
        });
      });

      const pulseCount = Math.max(6, Math.floor(paths.length / 8));
      pulses = Array.from({ length: pulseCount }).map(() => createPulse());
    };

    const createPulse = (): Pulse => {
      const path = paths[Math.floor(Math.random() * paths.length)];
      return {
        path,
        progress: Math.random() * path.length, // Start at random point
        speed: Math.random() * 0.3 + 0.1, // Extremely slow, calm movement
        color: colors[Math.floor(Math.random() * colors.length)],
        length: Math.random() * 60 + 30, // Longer, softer trails
      };
    };

    const getPointOnPath = (path: Path, progress: number): Point => {
      if (progress <= 0) return path.segments[0].p1;
      if (progress >= path.length) return path.segments[path.segments.length - 1].p2;

      let currentDist = 0;
      for (const seg of path.segments) {
        if (progress <= currentDist + seg.dist) {
          const t = (progress - currentDist) / seg.dist;
          return {
            x: seg.p1.x + t * (seg.p2.x - seg.p1.x),
            y: seg.p1.y + t * (seg.p2.y - seg.p1.y),
          };
        }
        currentDist += seg.dist;
      }
      return path.segments[path.segments.length - 1].p2;
    };

    let animationFrameId: number;

    const render = () => {
      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Clear canvas (transparent)
      ctx.clearRect(0, 0, width, height);

      const offsetX = (mouseX - width / 2) * -0.015;
      const offsetY = (mouseY - height / 2) * -0.015;

      ctx.save();
      ctx.translate(offsetX, offsetY);

      // 1. Draw static PCB traces
      ctx.strokeStyle = traceColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      paths.forEach(path => {
        ctx.moveTo(path.points[0].x, path.points[0].y);
        for (let i = 1; i < path.points.length; i++) {
          ctx.lineTo(path.points[i].x, path.points[i].y);
        }
      });
      ctx.stroke();

      // 2. Draw nodes (pads)
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = padColor;
        ctx.fill();
        if (node.radius > 2) {
          ctx.strokeStyle = traceColor;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // 3. Draw animated data pulses
      pulses.forEach(pulse => {
        pulse.progress += pulse.speed;
        
        // Respawn when reaching end
        if (pulse.progress > pulse.path.length + pulse.length) {
          Object.assign(pulse, createPulse(), { progress: 0 });
        }

        const startProgress = Math.max(0, pulse.progress - pulse.length);
        const endProgress = Math.min(pulse.path.length, pulse.progress);

        if (startProgress < pulse.path.length && endProgress > 0) {
          const points: Point[] = [];
          points.push(getPointOnPath(pulse.path, startProgress));

          let currentDist = 0;
          for (const seg of pulse.path.segments) {
            currentDist += seg.dist;
            if (currentDist > startProgress && currentDist < endProgress) {
              points.push(seg.p2);
            }
          }

          points.push(getPointOnPath(pulse.path, endProgress));

          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
          }

          ctx.strokeStyle = pulse.color;
          ctx.lineWidth = 3; // Slightly wider but more diffused
          ctx.shadowBlur = 20; // Soft ambient blur effect
          ctx.shadowColor = pulse.color;
          ctx.stroke();
          ctx.shadowBlur = 0; // reset

          // Pulse head dot
          if (endProgress === pulse.progress) {
            const head = points[points.length - 1];
            ctx.beginPath();
            ctx.arc(head.x, head.y, 3, 0, Math.PI * 2); // Larger, softer head
            ctx.fillStyle = pulse.color; // Match pulse color instead of harsh white
            ctx.shadowBlur = 25; // Large soft ambient glow
            ctx.shadowColor = pulse.color;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    init();
    render();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        init();
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
    />
  );
}
