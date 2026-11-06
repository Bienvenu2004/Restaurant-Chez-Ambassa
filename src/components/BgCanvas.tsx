"use client";

import { useEffect, useRef } from "react";

/**
 * DESIGN.md, « WebGL » : fond fixe en plein écran, octaèdres (sdOctahedron) qui flottent et tournent,
 * dérive au bruit, légère pulsation, teintes ramenées sur la palette papier / mousse / acajou.
 * Canevas transparent (alpha) posé sur le fond CSS. Rendu en demi-résolution pour rester léger,
 * en pause quand l'onglet est caché, une seule image fixe si « réduire les animations » est actif.
 */
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;

float sdOctahedron(vec3 p, float s){ p = abs(p); return (p.x + p.y + p.z - s) * 0.57735027; }
mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash(float n){ return fract(sin(n) * 43758.5453); }
float noise(float x){ float i = floor(x), f = fract(x); return mix(hash(i), hash(i + 1.0), f * f * (3.0 - 2.0 * f)); }

vec2 scene(vec3 p){
  float d = 1e3; float id = 0.0;
  for (int i = 0; i < 5; i++){
    float fi = float(i);
    vec3 c = vec3(sin(fi * 2.1 + u_time * 0.07) * 2.6, cos(fi * 1.7 + u_time * 0.05) * 1.6 + (noise(u_time * 0.1 + fi) - 0.5), -1.5 - fi * 0.9);
    vec3 q = p - c;
    q.xz *= rot(u_time * 0.25 + fi);
    q.xy *= rot(u_time * 0.18 + fi * 0.7);
    float s = 0.42 + 0.06 * sin(u_time * 0.8 + fi * 1.3);
    float o = sdOctahedron(q, s);
    if (o < d){ d = o; id = fi; }
  }
  return vec2(d, id);
}

vec3 normalAt(vec3 p){
  vec2 e = vec2(0.002, 0.0);
  return normalize(vec3(scene(p + e.xyy).x - scene(p - e.xyy).x, scene(p + e.yxy).x - scene(p - e.yxy).x, scene(p + e.yyx).x - scene(p - e.yyx).x));
}

// Ramène une teinte vers la palette chaude (équivalent du hueRotateSepia de DESIGN.md).
vec3 sepia(vec3 c){ return vec3(dot(c, vec3(0.393, 0.769, 0.189)), dot(c, vec3(0.349, 0.686, 0.168)), dot(c, vec3(0.272, 0.534, 0.131))); }

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  vec3 ro = vec3(0.0, 0.0, 3.0);
  vec3 rd = normalize(vec3(uv, -1.6));
  float t = 0.0; vec2 h = vec2(1.0, 0.0);
  for (int i = 0; i < 56; i++){ h = scene(ro + rd * t); if (h.x < 0.002 || t > 12.0) break; t += h.x; }
  if (t > 12.0){ gl_FragColor = vec4(0.0); return; }
  vec3 p = ro + rd * t; vec3 n = normalAt(p);
  float diff = clamp(dot(n, normalize(vec3(0.6, 0.8, 0.5))), 0.0, 1.0);
  float rim = pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 2.0);
  vec3 moss = vec3(0.180, 0.227, 0.184); vec3 mahogany = vec3(0.361, 0.220, 0.133); vec3 paper = vec3(0.961, 0.937, 0.902);
  vec3 base = mix(moss, mahogany, step(2.5, h.y));
  vec3 col = mix(base, paper, 0.55 + 0.35 * diff) + rim * 0.12;
  col = mix(col, sepia(col), 0.35);
  float fog = exp(-0.12 * t);
  gl_FragColor = vec4(col, 0.55 * fog);
}`;

export default function BgCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false, antialias: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const scale = 0.5 * Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = Math.max(1, Math.floor(window.innerWidth * scale));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let raf = 0;
    const draw = (now: number) => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, still ? 12 : (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!still && !document.hidden) raf = requestAnimationFrame(draw);
    };
    const onVisible = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVisible);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return <canvas ref={ref} id="bg-canvas" className="bg-canvas" aria-hidden="true" />;
}
