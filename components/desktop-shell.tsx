'use client';

import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { TerminalIntro } from '@/components/terminal-intro';
import { workItems } from '@/components/work-items';

type AppId = 'terminal' | 'about' | 'services' | 'portfolio' | 'contact' | 'calculator' | 'weather' | 'notes' | 'snake' | 'game2048' | 'secret';

type WindowState = {
  id: string;
  app: AppId;
  title: string;
  minimized: boolean;
  maximized: boolean;
  z: number;
  x: number;
  y: number;
  w: number;
  h: number;
  booting: boolean;
  bootText: string;
  bootIndex: number;
};

function uid() {
  return Math.random().toString(16).slice(2);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function appTitle(app: AppId) {
  switch (app) {
    case 'terminal':
      return 'Terminal';
    case 'about':
      return 'About Pixaloom';
    case 'services':
      return 'Services';
    case 'portfolio':
      return 'Portfolio';
    case 'contact':
      return 'Contact Us';
    case 'calculator':
      return 'Calculator';
    case 'weather':
      return 'Weather';
    case 'notes':
      return 'Notes';
    case 'snake':
      return 'Snake Game';
    case 'game2048':
      return '2048';
    case 'secret':
      return 'Secret';
  }
}

function bootScript(app: AppId) {
  const name = appTitle(app);
  return [
    `[ OK ] Launching ${name}...`,
    `[ OK ] Initializing UI...`,
    `[ OK ] Mounting modules...`,
    `[ OK ] Rendering window...`,
    `[ OK ] Ready.`,
  ].join('\n');
}

function AboutApp() {
  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
      <div className="p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl">
            🚀
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Pixaloom</h1>
            <p className="text-purple-200">Web Design & Development Studio</p>
          </div>
        </div>
        
        <div className="mb-6 rounded-xl bg-white/10 p-4">
          <h2 className="mb-2 font-semibold text-white">Who We Are</h2>
          <p className="text-sm leading-relaxed text-purple-100">
            Pixaloom is a web design and development studio focused on shipping websites that convert. 
            We combine conversion-first UX, clean engineering, and performance that feels instant.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl bg-white/10 p-4 text-center">
            <div className="text-3xl font-bold text-white">50+</div>
            <div className="text-xs text-purple-200">Projects Delivered</div>
          </div>
          <div className="rounded-xl bg-white/10 p-4 text-center">
            <div className="text-3xl font-bold text-white">100%</div>
            <div className="text-xs text-purple-200">Client Satisfaction</div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="mb-3 font-semibold text-white">What We Care About</h2>
          <div className="space-y-2">
            {[
              { icon: '🎯', text: 'Conversion-first UX and clear messaging' },
              { icon: '⚡', text: 'Performance + SEO (Core Web Vitals)' },
              { icon: '🛠️', text: 'Clean engineering, fast iterations' },
              { icon: '🎨', text: 'Modern, beautiful design' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm text-purple-100">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📍</span>
            <div>
              <div className="font-medium text-white">George, Western Cape</div>
              <div className="text-sm text-purple-200">South Africa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesApp() {
  const services = [
    {
      icon: '🌐',
      title: 'Landing Pages',
      desc: 'High-converting landing pages with compelling copy, strategic layouts, and clear CTAs',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: '🏢',
      title: 'Business Websites',
      desc: 'Fast, modern, SEO-ready websites that represent your brand professionally',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: '📊',
      title: 'Web Applications',
      desc: 'Dashboards, portals, and admin panels with seamless integrations',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: '🔧',
      title: 'Maintenance & Support',
      desc: 'Ongoing updates, performance tuning, and technical support',
      color: 'from-violet-500 to-purple-500',
    },
  ];

  return (
    <div className="h-full overflow-auto bg-slate-900">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6">
        <h1 className="text-2xl font-bold text-white">Our Services</h1>
        <p className="text-cyan-100">What Pixaloom builds for you</p>
      </div>
      
      <div className="p-4 space-y-4">
        {services.map((s, i) => (
          <div key={i} className="rounded-xl bg-slate-800 p-4 border border-slate-700">
            <div className="flex items-start gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-2xl`}>
                {s.icon}
              </div>
              <div>
                <h3 className="font-semibold text-white">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-300">{s.desc}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-6 rounded-xl bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 p-4">
          <h3 className="font-semibold text-cyan-100 mb-2">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL'].map((t) => (
              <span key={t} className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-200">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PortfolioApp() {
  return (
    <div className="h-full overflow-auto bg-neutral-900">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6">
        <h1 className="text-2xl font-bold text-white">Portfolio</h1>
        <p className="text-amber-100">Our recent work</p>
      </div>
      
      <div className="p-4 space-y-4">
        {workItems.map((project) => (
          <div key={project.slug} className="group rounded-xl bg-neutral-800 overflow-hidden border border-neutral-700">
            {project.png && (
              <div className="h-32 overflow-hidden">
                <img 
                  src={project.png} 
                  alt={project.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-white">{project.name}</h3>
                  <p className="text-xs text-neutral-400">{project.meta}</p>
                </div>
              </div>
              {project.stack && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {project.stack.slice(0, 4).map((t) => (
                    <span key={t} className="rounded bg-neutral-700 px-2 py-0.5 text-[10px] text-neutral-300">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactApp() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-rose-900 via-pink-900 to-rose-800">
      <div className="p-6">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-3xl">
            💬
          </div>
          <h1 className="text-2xl font-bold text-white">Get In Touch</h1>
          <p className="text-rose-200">Let&apos;s build something amazing together</p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3">
          <a href="tel:+27662995533" className="flex items-center gap-3 rounded-xl bg-white/10 p-4 hover:bg-white/15 transition">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20 text-xl">📞</span>
            <div>
              <div className="text-xs text-rose-300">Phone</div>
              <div className="font-medium text-white">066 299 5533</div>
            </div>
          </a>
          <a href="mailto:info@pixaloom.co.za" className="flex items-center gap-3 rounded-xl bg-white/10 p-4 hover:bg-white/15 transition">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-xl">✉️</span>
            <div>
              <div className="text-xs text-rose-300">Email</div>
              <div className="font-medium text-white">info@pixaloom.co.za</div>
            </div>
          </a>
          <a href="https://wa.me/27662995533" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl bg-white/10 p-4 hover:bg-white/15 transition">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-xl">💬</span>
            <div>
              <div className="text-xs text-rose-300">WhatsApp</div>
              <div className="font-medium text-white">Send a message</div>
            </div>
          </a>
        </div>

        <div className="rounded-xl bg-white/10 p-4">
          <h2 className="mb-4 font-semibold text-white">Quick Message</h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg bg-white/10 px-4 py-2 text-sm text-white placeholder-rose-300/50 outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg bg-white/10 px-4 py-2 text-sm text-white placeholder-rose-300/50 outline-none focus:ring-2 focus:ring-pink-500"
            />
            <textarea
              placeholder="Your message"
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full rounded-lg bg-white/10 px-4 py-2 text-sm text-white placeholder-rose-300/50 outline-none focus:ring-2 focus:ring-pink-500 resize-none"
            />
            <button className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 py-2 font-medium text-white hover:from-pink-600 hover:to-rose-600 transition">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);

  const handleNum = (n: string) => {
    setDisplay((d) => (d === '0' ? n : d + n));
  };

  const handleOp = (o: string) => {
    setPrev(parseFloat(display));
    setOp(o);
    setDisplay('0');
  };

  const calculate = () => {
    if (prev === null || !op) return;
    const curr = parseFloat(display);
    let result = 0;
    switch (op) {
      case '+': result = prev + curr; break;
      case '-': result = prev - curr; break;
      case '*': result = prev * curr; break;
      case '/': result = curr !== 0 ? prev / curr : 0; break;
    }
    setDisplay(String(result));
    setPrev(null);
    setOp(null);
  };

  const clear = () => {
    setDisplay('0');
    setPrev(null);
    setOp(null);
  };

  return (
    <div className="h-full bg-gray-900 p-4">
      <div className="mb-4 rounded-lg bg-gray-800 p-4 text-right font-mono text-3xl text-white">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {['7', '8', '9', '/'].map((b) => (
          <button key={b} onClick={() => (b === '/' ? handleOp(b) : handleNum(b))} className="rounded-lg bg-gray-700 p-4 text-xl text-white hover:bg-gray-600">{b}</button>
        ))}
        {['4', '5', '6', '*'].map((b) => (
          <button key={b} onClick={() => (b === '*' ? handleOp(b) : handleNum(b))} className="rounded-lg bg-gray-700 p-4 text-xl text-white hover:bg-gray-600">{b}</button>
        ))}
        {['1', '2', '3', '-'].map((b) => (
          <button key={b} onClick={() => (b === '-' ? handleOp(b) : handleNum(b))} className="rounded-lg bg-gray-700 p-4 text-xl text-white hover:bg-gray-600">{b}</button>
        ))}
        {['0', '.', '=', '+'].map((b) => (
          <button key={b} onClick={() => {
            if (b === '=') calculate();
            else if (b === '+') handleOp(b);
            else handleNum(b);
          }} className={`rounded-lg p-4 text-xl text-white ${b === '=' ? 'bg-orange-500 hover:bg-orange-400' : 'bg-gray-700 hover:bg-gray-600'}`}>{b}</button>
        ))}
        <button onClick={clear} className="col-span-4 rounded-lg bg-red-500 p-3 text-white hover:bg-red-400">Clear</button>
      </div>
    </div>
  );
}

function WeatherApp() {
  const [weatherData, setWeatherData] = useState<{ temp: number | null; city: string; wind: number | null } | null>(null);

  useEffect(() => {
    fetch('/api/weather')
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) setWeatherData({ temp: d.temperatureC, city: d.city, wind: d.windKmh });
      })
      .catch(() => {});
  }, []);

  return (
    <div className="h-full bg-gradient-to-br from-sky-400 to-blue-600 p-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🌤️</div>
        <h2 className="text-3xl font-bold text-white mb-2">{weatherData?.city || 'George, WC'}</h2>
        <div className="text-7xl font-light text-white mb-4">
          {weatherData?.temp != null ? `${Math.round(weatherData.temp)}°` : '--°'}
        </div>
        <div className="text-white/80">
          Wind: {weatherData?.wind != null ? `${Math.round(weatherData.wind)} km/h` : '--'}
        </div>
      </div>
    </div>
  );
}

function NotesApp() {
  const [note, setNote] = useState('Welcome to Notes!\n\nStart typing here...');

  return (
    <div className="h-full bg-amber-50">
      <div className="bg-amber-100 border-b border-amber-200 p-3">
        <h2 className="font-semibold text-amber-800">📝 Notes</h2>
      </div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="h-[calc(100%-48px)] w-full resize-none bg-transparent p-4 text-amber-900 outline-none font-mono"
        style={{ lineHeight: '1.8' }}
      />
    </div>
  );
}

function SnakeApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gridSize = 20;
    const tileCount = 20;
    canvas.width = gridSize * tileCount;
    canvas.height = gridSize * tileCount;

    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let dx = 0, dy = 0;
    let running = true;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && dy !== 1) { dx = 0; dy = -1; }
      if (e.key === 'ArrowDown' && dy !== -1) { dx = 0; dy = 1; }
      if (e.key === 'ArrowLeft' && dx !== 1) { dx = -1; dy = 0; }
      if (e.key === 'ArrowRight' && dx !== -1) { dx = 1; dy = 0; }
    };
    window.addEventListener('keydown', handleKey);

    const gameLoop = setInterval(() => {
      if (!running) return;
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      
      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        running = false;
        setGameOver(true);
        return;
      }

      if (snake.some((s) => s.x === head.x && s.y === head.y)) {
        running = false;
        setGameOver(true);
        return;
      }

      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        setScore((s) => s + 10);
        food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
      } else {
        snake.pop();
      }

      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#4ade80';
      snake.forEach((s) => ctx.fillRect(s.x * gridSize, s.y * gridSize, gridSize - 2, gridSize - 2));
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    }, 100);

    return () => {
      clearInterval(gameLoop);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <div className="h-full bg-[#1a1a2e] flex flex-col items-center justify-center p-4">
      <div className="text-white mb-2">Score: {score}</div>
      {gameOver && <div className="text-red-400 mb-2">Game Over! Refresh to restart</div>}
      <canvas ref={canvasRef} className="border border-white/20 rounded" />
      <div className="text-white/50 text-xs mt-2">Use arrow keys to move</div>
    </div>
  );
}

function Game2048App() {
  const [grid, setGrid] = useState(() => {
    const g = Array(4).fill(null).map(() => Array(4).fill(0));
    addRandom(g);
    addRandom(g);
    return g;
  });
  const [score, setScore] = useState(0);

  function addRandom(g: number[][]) {
    const empty: [number, number][] = [];
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) if (g[i][j] === 0) empty.push([i, j]);
    if (empty.length) {
      const [r, c] = empty[Math.floor(Math.random() * empty.length)];
      g[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  function move(dir: string) {
    const newGrid = grid.map((r) => [...r]);
    let moved = false;
    let pts = 0;

    const slide = (row: number[]) => {
      const filtered = row.filter((x) => x !== 0);
      for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
          filtered[i] *= 2;
          pts += filtered[i];
          filtered.splice(i + 1, 1);
        }
      }
      while (filtered.length < 4) filtered.push(0);
      return filtered;
    };

    if (dir === 'left') {
      for (let i = 0; i < 4; i++) {
        const old = [...newGrid[i]];
        newGrid[i] = slide(newGrid[i]);
        if (old.join() !== newGrid[i].join()) moved = true;
      }
    } else if (dir === 'right') {
      for (let i = 0; i < 4; i++) {
        const old = [...newGrid[i]];
        newGrid[i] = slide(newGrid[i].reverse()).reverse();
        if (old.join() !== newGrid[i].join()) moved = true;
      }
    } else if (dir === 'up') {
      for (let j = 0; j < 4; j++) {
        const col = [newGrid[0][j], newGrid[1][j], newGrid[2][j], newGrid[3][j]];
        const newCol = slide(col);
        if (col.join() !== newCol.join()) moved = true;
        for (let i = 0; i < 4; i++) newGrid[i][j] = newCol[i];
      }
    } else if (dir === 'down') {
      for (let j = 0; j < 4; j++) {
        const col = [newGrid[0][j], newGrid[1][j], newGrid[2][j], newGrid[3][j]].reverse();
        const newCol = slide(col).reverse();
        if ([newGrid[0][j], newGrid[1][j], newGrid[2][j], newGrid[3][j]].join() !== newCol.join()) moved = true;
        for (let i = 0; i < 4; i++) newGrid[i][j] = newCol[i];
      }
    }

    if (moved) {
      addRandom(newGrid);
      setGrid(newGrid);
      setScore((s) => s + pts);
    }
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') move('up');
      if (e.key === 'ArrowDown') move('down');
      if (e.key === 'ArrowLeft') move('left');
      if (e.key === 'ArrowRight') move('right');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  const colors: Record<number, string> = {
    0: 'bg-gray-700', 2: 'bg-gray-200 text-gray-800', 4: 'bg-gray-300 text-gray-800',
    8: 'bg-orange-300 text-white', 16: 'bg-orange-400 text-white', 32: 'bg-orange-500 text-white',
    64: 'bg-orange-600 text-white', 128: 'bg-yellow-400 text-white', 256: 'bg-yellow-500 text-white',
    512: 'bg-yellow-600 text-white', 1024: 'bg-yellow-700 text-white', 2048: 'bg-yellow-800 text-white',
  };

  return (
    <div className="h-full bg-gray-800 flex flex-col items-center justify-center p-4">
      <div className="text-white mb-4 text-xl">Score: {score}</div>
      <div className="grid grid-cols-4 gap-2 bg-gray-700 p-2 rounded-lg">
        {grid.flat().map((v, i) => (
          <div key={i} className={`w-16 h-16 rounded flex items-center justify-center font-bold text-lg ${colors[v] || 'bg-purple-500 text-white'}`}>
            {v || ''}
          </div>
        ))}
      </div>
      <div className="text-white/50 text-xs mt-4">Use arrow keys to play</div>
    </div>
  );
}

function SecretApp() {
  return (
    <div className="h-full bg-neutral-900 p-6 font-mono">
      <div className="rounded border border-dashed border-red-500/50 bg-red-500/10 p-4">
        <div className="text-red-400 text-sm mb-2">⚠️ SECRET_FILE.txt</div>
        <div className="text-neutral-300 text-sm leading-relaxed">
          <p className="mb-3">Why did you click this? 🤔</p>
          <p className="mb-3">This was supposed to be a SECRET folder!</p>
          <p className="mb-3">Well, since you&apos;re here...</p>
          <p className="text-green-400">Congratulations! You found the easter egg! 🎉</p>
          <p className="mt-4 text-neutral-500 text-xs">
            PS: Curiosity didn&apos;t kill the cat this time.
          </p>
        </div>
      </div>
    </div>
  );
}

export function DesktopShell() {
  const zTopRef = useRef(10);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const dragRef = useRef<{
    id: string | null;
    startX: number;
    startY: number;
    startLeft: number;
    startTop: number;
  }>({ id: null, startX: 0, startY: 0, startLeft: 0, startTop: 0 });

  const [windows, setWindows] = useState<WindowState[]>(() => {
    // Start with terminal open
    const id = uid();
    const b = bootScript('terminal');
    return [
      {
        id,
        app: 'terminal',
        title: 'Terminal',
        minimized: false,
        maximized: false,
        z: 10,
        x: 120,
        y: 90,
        w: 980,
        h: 640,
        booting: true,
        bootText: b,
        bootIndex: 0,
      },
    ];
  });

  // Boot animation per window
  useEffect(() => {
    const id = window.setInterval(() => {
      setWindows((prev) => {
        let changed = false;
        const next = prev.map((w) => {
          if (!w.booting) return w;
          const step = Math.min(w.bootIndex + 6, w.bootText.length);
          if (step >= w.bootText.length) {
            changed = true;
            return { ...w, booting: false, bootIndex: w.bootText.length };
          }
          changed = true;
          return { ...w, bootIndex: step };
        });
        return changed ? next : prev;
      });
    }, 16);

    return () => window.clearInterval(id);
  }, []);

  // Clock + weather
  const [now, setNow] = useState(() => new Date());
  const [weather, setWeather] = useState<{ temp: number | null; city: string } | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/api/weather', { cache: 'no-store' });
        const data = (await res.json()) as
          | { ok: true; city: string; temperatureC: number | null }
          | { ok: false; error: string };
        if (cancelled) return;
        if ('ok' in data && data.ok) {
          setWeather({ city: data.city, temp: data.temperatureC });
        }
      } catch {
        // ignore
      }
    }
    void load();
    const id = window.setInterval(load, 1000 * 60 * 5);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  function focusWindow(id: string) {
    zTopRef.current += 1;
    const nextZ = zTopRef.current;
    setActiveWindowId(id);
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, z: nextZ, minimized: false } : w)));
  }

  function openApp(app: AppId) {
    // If already open but minimized, restore
    const existing = windows.find((w) => w.app === app);
    if (existing) {
      focusWindow(existing.id);
      return;
    }

    const id = uid();
    const title = appTitle(app);
    const b = bootScript(app);

    zTopRef.current += 1;
    const z = zTopRef.current;

    setWindows((prev) => [
      ...prev,
      {
        id,
        app,
        title,
        minimized: false,
        maximized: false,
        z,
        x: 140 + Math.round(Math.random() * 80),
        y: 90 + Math.round(Math.random() * 60),
        w: app === 'terminal' ? 980 : 720,
        h: app === 'terminal' ? 640 : 520,
        booting: true,
        bootText: b,
        bootIndex: 0,
      },
    ]);
    setActiveWindowId(id);
  }

  function closeWindow(id: string) {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveWindowId((cur) => (cur === id ? null : cur));
  }

  function minimizeWindow(id: string) {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
    setActiveWindowId((cur) => (cur === id ? null : cur));
  }

  function toggleMaximize(id: string) {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)));
  }

  function startDrag(id: string, e: React.PointerEvent<HTMLDivElement>) {
    const win = windows.find((w) => w.id === id);
    if (!win || win.maximized) return;
    focusWindow(id);
    dragRef.current = { id, startX: e.clientX, startY: e.clientY, startLeft: win.x, startTop: win.y };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  }

  function onDragMove(e: React.PointerEvent<HTMLDivElement>) {
    const activeId = dragRef.current.id;
    if (!activeId) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== activeId) return w;
        const nx = clamp(dragRef.current.startLeft + dx, 12, window.innerWidth - 120);
        const ny = clamp(dragRef.current.startTop + dy, 12, window.innerHeight - 120);
        return { ...w, x: nx, y: ny };
      }),
    );
  }

  function endDrag() {
    dragRef.current.id = null;
  }

  const taskbarApps = useMemo(
    () => [
      { app: 'terminal' as const, icon: '/os/terminal.png', label: 'Terminal' },
      { app: 'about' as const, icon: '/os/about.png', label: 'About' },
      { app: 'services' as const, icon: '/os/services.png', label: 'Services' },
      { app: 'portfolio' as const, icon: '/os/portfolio.png', label: 'Portfolio' },
      { app: 'contact' as const, icon: '/os/contact.png', label: 'Contact' },
    ],
    [],
  );

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Wallpaper */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/os/kali-wallpaper.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* Desktop Icons */}
      <div className="absolute left-4 top-4 z-10 grid grid-cols-2 gap-4">
        {[
          { app: 'terminal' as AppId, icon: '🖥️', label: 'Terminal' },
          { app: 'calculator' as AppId, icon: '🧮', label: 'Calculator' },
          { app: 'weather' as AppId, icon: '⛅', label: 'Weather' },
          { app: 'notes' as AppId, icon: '📝', label: 'Notes' },
          { app: 'snake' as AppId, icon: '🐍', label: 'Snake' },
          { app: 'game2048' as AppId, icon: '🎮', label: '2048' },
          { app: 'about' as AppId, icon: 'ℹ️', label: 'About' },
          { app: 'portfolio' as AppId, icon: '📁', label: 'Portfolio' },
          { app: 'secret' as AppId, icon: '📂', label: 'Secret' },
          { app: null as unknown as AppId, icon: '🗑️', label: 'Trash' },
        ].map((item, i) => (
          <button
            key={i}
            onClick={() => item.app && openApp(item.app)}
            className="flex flex-col items-center gap-1 rounded-lg p-2 text-white hover:bg-white/10 transition w-20"
          >
            <span className="text-4xl drop-shadow-lg">{item.icon}</span>
            <span className="text-[10px] text-white/90 drop-shadow">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Windows */}
      {windows
        .filter((w) => !w.minimized)
        .sort((a, b) => a.z - b.z)
        .map((w) => {
          const style = w.maximized
            ? { left: 10, top: 10, width: 'calc(100% - 20px)', height: 'calc(100% - 62px)' }
            : { left: w.x, top: w.y, width: w.w, height: w.h };

          const isTerminal = w.app === 'terminal';

          return (
            <div
              key={w.id}
              className={`absolute rounded-xl border border-neutral-700 shadow-2xl overflow-hidden ${
                w.id === activeWindowId ? 'ring-1 ring-white/20' : ''
              }`}
              style={style as CSSProperties}
              onMouseDown={() => focusWindow(w.id)}
            >
              {/* Titlebar */}
              <div
                className="flex cursor-default items-center justify-between gap-3 border-b border-neutral-700 bg-neutral-800 px-3 py-2"
                onPointerDown={(e) => startDrag(w.id, e)}
                onPointerMove={onDragMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      className="h-3 w-3 rounded-full bg-[#ff5f57]"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (w.app === 'terminal') {
                          minimizeWindow(w.id);
                        } else {
                          closeWindow(w.id);
                        }
                      }}
                      title="Close"
                    />
                    <button
                      className="h-3 w-3 rounded-full bg-[#febc2e]"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        minimizeWindow(w.id);
                      }}
                      title="Minimize"
                    />
                    <button
                      className="h-3 w-3 rounded-full bg-[#28c840]"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMaximize(w.id);
                      }}
                      title="Maximize"
                    />
                  </div>
                  <div className="font-mono text-[11px] text-fg-200">{w.title}</div>
                </div>
                <div className="font-mono text-[10px] text-fg-400">kali@pixa:~</div>
              </div>

              {/* Content */}
              <div className="h-[calc(100%-40px)] overflow-hidden">
                {w.booting ? (
                  <div className="h-full bg-neutral-900 p-4 font-mono text-xs text-green-400">
                    <pre className="whitespace-pre-wrap">{w.bootText.slice(0, w.bootIndex)}</pre>
                    <div className="mt-2 animate-pulse">▮</div>
                  </div>
                ) : isTerminal ? (
                  <div className="h-full bg-[#0d1117]">
                    <TerminalIntro embedded hideHeader hideExit />
                  </div>
                ) : w.app === 'about' ? (
                  <AboutApp />
                ) : w.app === 'services' ? (
                  <ServicesApp />
                ) : w.app === 'portfolio' ? (
                  <PortfolioApp />
                ) : w.app === 'contact' ? (
                  <ContactApp />
                ) : w.app === 'calculator' ? (
                  <CalculatorApp />
                ) : w.app === 'weather' ? (
                  <WeatherApp />
                ) : w.app === 'notes' ? (
                  <NotesApp />
                ) : w.app === 'snake' ? (
                  <SnakeApp />
                ) : w.app === 'game2048' ? (
                  <Game2048App />
                ) : w.app === 'secret' ? (
                  <SecretApp />
                ) : null}
              </div>
            </div>
          );
        })}

      {/* Taskbar - Linux dock style */}
      <div className="absolute bottom-2 left-1/2 z-[80] -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-bg-900/70 px-2 py-2 shadow-2xl backdrop-blur-xl">
          {taskbarApps.map((a) => {
            const win = windows.find((w) => w.app === a.app);
            const active = win && !win.minimized && win.id === activeWindowId;
            const open = !!win && !win.minimized;
            return (
              <button
                key={a.app}
                onClick={() => openApp(a.app)}
                title={a.label}
                className={`group relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-150 hover:scale-110 hover:bg-white/10 ${
                  active ? 'bg-white/15' : open ? 'bg-white/5' : ''
                }`}
              >
                <img src={a.icon} alt={a.label} className="h-8 w-8 object-contain brightness-0 invert" />
                {open && (
                  <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent-500" />
                )}
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-bg-900/90 px-2 py-1 text-xs text-fg-100 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  {a.label}
                </span>
              </button>
            );
          })}

          {/* Separator */}
          <div className="mx-1 h-8 w-px bg-white/10" />

          {/* Clock/Weather widget */}
          <div className="flex flex-col items-center justify-center px-3 text-center">
            <div className="font-mono text-[11px] text-fg-200">
              {now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="font-mono text-[9px] text-fg-400">
              {weather?.temp != null ? `${Math.round(weather.temp)}°C` : '--'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
