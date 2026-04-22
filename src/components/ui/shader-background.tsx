"use client";

import { useEffect, useRef, useCallback } from "react";

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  const render = useCallback(() => {
    // Completely disable on mobile to ensure maximum performance and stability
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false });
    if (!gl) {
      canvas.style.display = "none";
      return;
    }

    // Resize
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Vertex shader
    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader - AxentriX branded flowing lines
    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;

      vec4 bgColor1 = vec4(0.008, 0.016, 0.031, 1.0);
      vec4 bgColor2 = vec4(0.020, 0.060, 0.120, 1.0);
      vec4 lineColor = vec4(0.0, 0.831, 1.0, 1.0);

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 5; i++) {
          value += amplitude * noise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        vec2 p = uv * 3.0;

        // Background gradient
        vec4 bg = mix(bgColor1, bgColor2, uv.y * 0.8 + fbm(uv * 2.0 + u_time * 0.05) * 0.3);

        // Flowing energy lines
        float line1 = smoothstep(0.0, 0.015, abs(fbm(p + vec2(u_time * 0.15, 0.0)) - uv.y - 0.2));
        float line2 = smoothstep(0.0, 0.012, abs(fbm(p * 1.5 + vec2(u_time * 0.1, u_time * 0.05)) - uv.y + 0.1));
        float line3 = smoothstep(0.0, 0.02, abs(fbm(p * 0.8 + vec2(-u_time * 0.08, u_time * 0.12)) - uv.y - 0.5));

        float lines = (1.0 - line1) * 0.3 + (1.0 - line2) * 0.2 + (1.0 - line3) * 0.15;

        // Glow orbs
        float orb1 = 0.03 / length(uv - vec2(0.3 + sin(u_time * 0.2) * 0.1, 0.5 + cos(u_time * 0.15) * 0.2));
        float orb2 = 0.02 / length(uv - vec2(0.7 + cos(u_time * 0.18) * 0.15, 0.3 + sin(u_time * 0.22) * 0.15));

        vec4 glow = lineColor * (lines + (orb1 + orb2) * 0.15);

        gl_FragColor = bg + glow * 0.6;
      }
    `;

    // Compile shaders
    function createShader(type: number, source: string): WebGLShader | null {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error(gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) {
      canvas.style.display = "none";
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      canvas.style.display = "none";
      return;
    }

    gl.useProgram(program);

    // Full-screen quad
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");

    const startTime = performance.now();

    const draw = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
  }, []);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    render();

    const handleResize = () => {
      cancelAnimationFrame(animationRef.current);
      render();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [render]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: "none" }}
    />
  );
}
