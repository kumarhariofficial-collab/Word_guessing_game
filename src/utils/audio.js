let audioCtx;

function getAudio(){
  if(!audioCtx) audioCtx = new (window.AudioContext||window.webkitAudioContext)();
  return audioCtx;
}

function playTone(freq, type='sine', duration=0.15, vol=0.3, muted=false){
  if(muted) return;
  try{
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); 
    gain.connect(ctx.destination);
    osc.type = type; 
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+duration);
    osc.start(); 
    osc.stop(ctx.currentTime+duration);
  }catch(e){}
}

export const sounds = {
  correct: (muted) => { [523,659,784].forEach((f,i)=>setTimeout(()=>playTone(f,'sine',0.2,0.3, muted),i*80)); },
  wrong: (muted) => { playTone(200,'sawtooth',0.3,0.25, muted); },
  win: (muted) => { [523,659,784,1047].forEach((f,i)=>setTimeout(()=>playTone(f,'sine',0.3,0.4, muted),i*120)); },
  lose: (muted) => { [400,300,200].forEach((f,i)=>setTimeout(()=>playTone(f,'triangle',0.4,0.3, muted),i*150)); },
  click: (muted) => { playTone(800,'sine',0.05,0.1, muted); },
  hint: (muted) => { playTone(440,'sine',0.2,0.2, muted); },
  timer: (muted) => { playTone(1200,'square',0.05,0.05, muted); }
};

export function launchConfetti(){
  let canvas = document.getElementById('confetti');
  if(!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'confetti';
    document.body.appendChild(canvas);
  }
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; 
  canvas.height = window.innerHeight;
  const pieces = Array.from({length:120},()=>({
    x: Math.random()*window.innerWidth, y:-20,
    size: Math.random()*10+5,
    color:`hsl(${Math.random()*360},90%,60%)`,
    speed: Math.random()*4+2,
    ang: Math.random()*360,
    spin: (Math.random()-0.5)*4,
    wx: (Math.random()-0.5)*2
  }));
  let frame;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p=>{
      p.y+=p.speed; p.ang+=p.spin; p.x+=p.wx;
      ctx.save();
      ctx.translate(p.x,p.y);
      ctx.rotate(p.ang*Math.PI/180);
      ctx.fillStyle=p.color;
      ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size/2);
      ctx.restore();
    });
    if(pieces.some(p=>p.y<canvas.height+50)) frame=requestAnimationFrame(draw);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  draw();
  setTimeout(()=>{cancelAnimationFrame(frame);ctx.clearRect(0,0,canvas.width,canvas.height);},4000);
}
