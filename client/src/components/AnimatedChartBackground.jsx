import { useEffect, useRef } from "react";

export default function AnimatedChartBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");

    if (!gl) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();

    window.addEventListener("resize", resize);

    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;

      void main() {
          v_uv = a_position * 0.5 + 0.5;
          gl_Position = vec4(a_position,0.0,1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;

      uniform float u_time;
      varying vec2 v_uv;

      float hash(vec2 p){
          p = fract(p*vec2(123.34,456.21));
          p += dot(p,p+45.32);
          return fract(p.x*p.y);
      }

      void main(){

          vec2 uv = v_uv;

          float scroll = u_time * 0.04;

          vec2 grid = vec2(
              uv.x * 14.0 + scroll,
              uv.y * 8.0
          );

          vec2 id = floor(grid);

          float rnd = hash(id);

          float candleHeight = mix(0.25,0.75,rnd);

          float candleWidth = 0.25;

          float x = fract(grid.x);

          float wick =
              smoothstep(
                  0.015,
                  0.0,
                  abs(x-0.5)
              );

          wick *= step(0.05,uv.y);
          wick *= step(uv.y,0.95);

          float body =
              smoothstep(
                  candleWidth,
                  candleWidth-0.01,
                  abs(x-0.5)
              );

          body *=
              step(
                  candleHeight-0.15,
                  uv.y
              ) *
              step(
                  uv.y,
                  candleHeight+0.15
              );

          vec3 bg = vec3(0.01,0.03,0.08);

          vec3 green = vec3(0.10,0.80,0.35);

          vec3 red = vec3(0.90,0.25,0.25);

          vec3 candle =
              hash(id+10.0)>0.5
              ? green
              : red;

          candle *= 0.18;

          vec3 color = mix(
              bg,
              candle,
              max(
                  wick*0.35,
                  body
              )
          );

          gl_FragColor = vec4(color,1.0);

      }
    `;

    function compile(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
      }

      return shader;
    }

    const vs = compile(gl.VERTEX_SHADER, vertexShaderSource);
    const fs = compile(gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = gl.createProgram();

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    gl.useProgram(program);

    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]);

    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      vertices,
      gl.STATIC_DRAW
    );

    const position = gl.getAttribLocation(
      program,
      "a_position"
    );

    gl.enableVertexAttribArray(position);

    gl.vertexAttribPointer(
      position,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );

    const timeLocation =
      gl.getUniformLocation(program, "u_time");

    let animationFrame;

    function render(time) {
      gl.uniform1f(
        timeLocation,
        time * 0.001
      );

      gl.drawArrays(
        gl.TRIANGLE_STRIP,
        0,
        4
      );

      animationFrame =
        requestAnimationFrame(render);
    }

    render(0);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
    />
  );
}