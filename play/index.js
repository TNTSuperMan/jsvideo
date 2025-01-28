// src/layer/base.ts
var rgba = (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${1 - a})`;

class LayerState {
  x = 0;
  y = 0;
  size = 0;
  transparent = 0;
  rotate = 0;
  cx = 0;
  cy = 0;
}

class Layer {
  state;
  originalState;
  drawer;
  callstack;
  originalGenerator;
  constructor(state, generator, drawer) {
    this.originalState = state;
    this.state = structuredClone(state);
    this.drawer = drawer;
    this.originalGenerator = generator;
    this.callstack = [generator(this.state)];
  }
  draw(ctx) {
    if (this.callstack.length === 0)
      throw new Error("Callstack is empty");
    const { done, value } = this.callstack.findLast(() => true).next();
    if (done) {
      this.callstack.pop();
      if (this.callstack.length === 0)
        return true;
      else
        return this.draw(ctx);
    } else if (typeof value === "function") {
      this.callstack.push(value(this.state));
      return this.draw(ctx);
    } else {
      const asrad = this.state.rotate * Math.PI / 180;
      ctx.translate(this.state.x, this.state.y);
      ctx.rotate(asrad);
      this.drawer(this.state, ctx);
      ctx.rotate(-asrad);
      ctx.translate(-this.state.x, -this.state.y);
      return !!value;
    }
  }
  init() {
    this.state = structuredClone(this.originalState);
    this.callstack = [this.originalGenerator(this.state)];
  }
}

// src/layer/rect.ts
class RectangleLayerState extends LayerState {
  size = 1;
  r = 0;
  g = 0;
  b = 0;
  width = 0;
  height = 0;
}
var createRectLayer = (generator) => new Layer(new RectangleLayerState, generator, (state, ctx) => {
  ctx.fillStyle = rgba(state.r, state.g, state.b, state.transparent);
  ctx.fillRect(state.cx, state.cy, state.width * state.size, state.height * state.size);
});

// src/layer/text.ts
class TextLayerState extends LayerState {
  size = 12;
  r = 0;
  g = 0;
  b = 0;
  text = "";
  font = "sans-serif";
}
var createTextLayer = (generator) => new Layer(new TextLayerState, generator, (state, ctx) => {
  ctx.strokeStyle = rgba(state.r, state.g, state.b, state.transparent);
  ctx.font = `${state.size}px ${state.font}`;
  ctx.strokeText(state.text, state.cx, state.cy + state.size);
});

// src/layer/index.ts
var L = {
  text: createTextLayer,
  rect: createRectLayer
};

// src/index.ts
var createVideoRenderer = (width, height, layers) => {
  let currentLayers = layers.map((e) => e);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get 2d context");
  } else {
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const images = currentLayers.map((e) => e.draw(ctx));
      return images.every((e) => e);
    };
    const init = () => currentLayers = layers.map((e) => (e.init(), e));
    return { canvas, render, init, capture: () => new Promise((res, rej) => {
      init();
      const stream = canvas.captureStream(60);
      const recorder = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9" });
      recorder.ondataavailable = (e) => res(e.data);
      recorder.onerror = (e) => rej(e);
      recorder.start();
      requestAnimationFrame(function callback() {
        if (render())
          recorder.stop();
        else
          requestAnimationFrame(callback);
      });
    }) };
  }
};

// play/index.ts
var v = createVideoRenderer(640, 480, [
  L.rect(function* (state) {
    state.r = 0;
    state.g = 0;
    state.b = 0;
    state.x = 0;
    state.y = 0;
    state.width = 640;
    state.height = 480;
    while (true)
      yield true;
  }),
  L.text(function* (state) {
    state.text = "えーりんえーりん！";
    state.r = 255;
    state.g = 255;
    state.b = 255;
    state.x = 0;
    state.y = 0;
    yield;
    for (let j = 0;j < 4; j++) {
      for (let i = 0;i < 20; i++) {
        state.y += (100 - state.y) / 10;
        yield;
      }
      for (let i = 0;i < 20; i++) {
        state.y += (0 - state.y) / 10;
        yield;
      }
    }
    for (let i = 0;i < 20; i++) {
      state.rotate += (100 - state.rotate) / 10;
      yield;
    }
  })
]);
document.body.append(v.canvas);
v.capture().then((e) => {
  console.log(URL.createObjectURL(e));
});
