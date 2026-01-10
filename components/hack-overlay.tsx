'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type HackGameId = 'snake' | '2048' | 'guess';

type HackOverlayProps = {
  open: boolean;
  onCloseAction: () => void;
  onSelectAction: (id: HackGameId) => void;
};

type GameOverlayProps = {
  open: boolean;
  onCloseAction: () => void;
};

function empty4() {
  return Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => 0));
}

function addRandomTile(g: number[][]) {
  const empties: [number, number][] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (g[r][c] === 0) empties.push([r, c]);
    }
  }
  if (!empties.length) return g;
  const [r, c] = empties[Math.floor(Math.random() * empties.length)];
  const v = Math.random() < 0.9 ? 2 : 4;
  const next = g.map((row) => row.slice());
  next[r][c] = v;
  return next;
}

function compressLine(line: number[]) {
  const nonZero = line.filter((n) => n !== 0);
  const merged: number[] = [];
  let gained = 0;
  for (let i = 0; i < nonZero.length; i++) {
    if (nonZero[i] && nonZero[i] === nonZero[i + 1]) {
      const v = nonZero[i] * 2;
      merged.push(v);
      gained += v;
      i++;
    } else {
      merged.push(nonZero[i]);
    }
  }
  while (merged.length < 4) merged.push(0);
  return { line: merged, gained };
}

export function HackOverlay({ open, onCloseAction, onSelectAction }: HackOverlayProps) {
  const [index, setIndex] = useState(0);
  const items = useMemo(
    () => [
      { id: 'snake' as const, name: 'Snake', desc: 'Classic grid snake' },
      { id: '2048' as const, name: '2048', desc: 'Merge tiles to 2048' },
      { id: 'guess' as const, name: 'Guess', desc: 'Guess the number' },
    ],
    [],
  );

  useEffect(() => {
    if (!open) return;
    setIndex(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseAction();
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setIndex((i) => (i - 1 + items.length) % items.length);
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setIndex((i) => (i + 1) % items.length);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        onSelectAction(items[index].id);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, index, items, onCloseAction, onSelectAction]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-bg-900/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-bg-700 bg-bg-850 shadow-xl">
        <div className="flex items-center justify-between border-b border-bg-700 px-4 py-3">
          <div className="font-mono text-sm font-semibold text-fg-100">hack menu</div>
          <button className="text-xs text-fg-300 hover:text-fg-100" onClick={onCloseAction}>
            Esc
          </button>
        </div>

        <div className="p-2">
          {items.map((it, i) => {
            const active = i === index;
            return (
              <button
                key={it.id}
                onClick={() => onSelectAction(it.id)}
                className={`w-full rounded-lg px-3 py-3 text-left transition ${
                  active
                    ? 'border border-accent-500/40 bg-accent-500/10'
                    : 'border border-transparent hover:border-bg-700 hover:bg-bg-900/30'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-mono text-sm text-fg-100">{it.name}</div>
                    <div className="mt-1 text-xs text-fg-300">{it.desc}</div>
                  </div>
                  <div className="font-mono text-xs text-fg-400">{active ? '▶' : ''}</div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="border-t border-bg-700 px-4 py-3 text-xs text-fg-300">
          Use ↑/↓ then Enter
        </div>
      </div>
    </div>
  );
}

export function SnakeGame({ open, onCloseAction }: GameOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dirRef = useRef<{ x: number; y: number }>({ x: 1, y: 0 });
  const pendingDirRef = useRef<{ x: number; y: number } | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!open) return;
    setScore(0);
    setGameOver(false);
    dirRef.current = { x: 1, y: 0 };
    pendingDirRef.current = null;
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseAction();
        return;
      }
      if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') pendingDirRef.current = { x: 0, y: -1 };
      if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') pendingDirRef.current = { x: 0, y: 1 };
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') pendingDirRef.current = { x: -1, y: 0 };
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') pendingDirRef.current = { x: 1, y: 0 };
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onCloseAction]);

  useEffect(() => {
    if (!open) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const grid = 18;
    const cell = 18;
    const w = grid * cell;
    const h = grid * cell;
    canvas.width = w;
    canvas.height = h;

    let snake: { x: number; y: number }[] = [
      { x: 8, y: 9 },
      { x: 7, y: 9 },
      { x: 6, y: 9 },
    ];
    let food = { x: 12, y: 9 };

    function placeFood() {
      while (true) {
        const nx = Math.floor(Math.random() * grid);
        const ny = Math.floor(Math.random() * grid);
        if (!snake.some((s) => s.x === nx && s.y === ny)) {
          food = { x: nx, y: ny };
          return;
        }
      }
    }

    placeFood();

    const interval = window.setInterval(() => {
      if (gameOver) return;

      const pending = pendingDirRef.current;
      if (pending) {
        const cur = dirRef.current;
        const isReverse = pending.x === -cur.x && pending.y === -cur.y;
        if (!isReverse) dirRef.current = pending;
        pendingDirRef.current = null;
      }

      const dir = dirRef.current;
      const head = snake[0];
      const next = { x: head.x + dir.x, y: head.y + dir.y };

      if (next.x < 0 || next.y < 0 || next.x >= grid || next.y >= grid) {
        setGameOver(true);
        return;
      }
      if (snake.some((s) => s.x === next.x && s.y === next.y)) {
        setGameOver(true);
        return;
      }

      snake = [next, ...snake];

      if (next.x === food.x && next.y === food.y) {
        setScore((s) => s + 1);
        placeFood();
      } else {
        snake.pop();
      }

      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(48, 54, 61, 0.5)';
      for (let i = 0; i <= grid; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cell, 0);
        ctx.lineTo(i * cell, h);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * cell);
        ctx.lineTo(w, i * cell);
        ctx.stroke();
      }

      ctx.fillStyle = '#2f81f7';
      for (const s of snake) {
        ctx.fillRect(s.x * cell + 2, s.y * cell + 2, cell - 4, cell - 4);
      }

      ctx.fillStyle = '#f85149';
      ctx.fillRect(food.x * cell + 4, food.y * cell + 4, cell - 8, cell - 8);

      if (gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', w / 2, h / 2);
      }
    }, 120);

    return () => window.clearInterval(interval);
  }, [open, gameOver]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-bg-900/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border border-bg-700 bg-bg-850 shadow-xl">
        <div className="flex items-center justify-between border-b border-bg-700 px-4 py-3">
          <div className="font-mono text-sm text-fg-100">snake — score {score}</div>
          <button className="text-xs text-fg-300 hover:text-fg-100" onClick={onCloseAction}>
            Esc
          </button>
        </div>
        <div className="p-4">
          <canvas ref={canvasRef} className="mx-auto rounded-lg border border-bg-700" style={{ imageRendering: 'pixelated' }} />
          <div className="mt-3 text-center text-xs text-fg-300">Arrow keys / WASD • Esc to exit</div>
        </div>
      </div>
    </div>
  );
}

 export function Game2048({ open, onCloseAction }: GameOverlayProps) {
  const [grid, setGrid] = useState<number[][]>([]);
  const [score, setScore] = useState(0);

  const move = useCallback((dir: 'left' | 'right' | 'up' | 'down') => {
    setGrid((prev) => {
      const before = prev.map((r) => r.slice());
      let gainedTotal = 0;

      const next = empty4();

      const get = (r: number, c: number) => before[r][c];
      const set = (r: number, c: number, v: number) => {
        next[r][c] = v;
      };

      if (dir === 'left' || dir === 'right') {
        for (let r = 0; r < 4; r++) {
          const line = Array.from({ length: 4 }, (_, c) => get(r, c));
          const arranged = dir === 'right' ? line.reverse() : line;
          const { line: out, gained } = compressLine(arranged);
          gainedTotal += gained;
          const final = dir === 'right' ? out.reverse() : out;
          for (let c = 0; c < 4; c++) set(r, c, final[c]);
        }
      } else {
        for (let c = 0; c < 4; c++) {
          const line = Array.from({ length: 4 }, (_, r) => get(r, c));
          const arranged = dir === 'down' ? line.reverse() : line;
          const { line: out, gained } = compressLine(arranged);
          gainedTotal += gained;
          const final = dir === 'down' ? out.reverse() : out;
          for (let r = 0; r < 4; r++) set(r, c, final[r]);
        }
      }

      const changed = JSON.stringify(before) !== JSON.stringify(next);
      const withRand = changed ? addRandomTile(next) : next;
      if (gainedTotal) setScore((s) => s + gainedTotal);
      return withRand;
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    setScore(0);
    const g0 = addRandomTile(addRandomTile(empty4()));
    setGrid(g0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseAction();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        move('left');
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        move('right');
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        move('up');
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        move('down');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onCloseAction, move]);

  if (!open) return null;

  const tileBg = (v: number) => {
    if (!v) return 'bg-bg-900/40 border-bg-700';
    if (v <= 8) return 'bg-accent-500/10 border-accent-500/30';
    if (v <= 64) return 'bg-accent-500/20 border-accent-500/40';
    return 'bg-accent-500/30 border-accent-500/50';
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-bg-900/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-bg-700 bg-bg-850 shadow-xl">
        <div className="flex items-center justify-between border-b border-bg-700 px-4 py-3">
          <div className="font-mono text-sm text-fg-100">2048 — score {score}</div>
          <button className="text-xs text-fg-300 hover:text-fg-100" onClick={onCloseAction}>
            Esc
          </button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-4 gap-2 rounded-lg border border-bg-700 bg-bg-900/30 p-2">
            {grid.flatMap((row, r) =>
              row.map((v, c) => (
                <div
                  key={`${r}-${c}`}
                  className={`flex h-16 items-center justify-center rounded-md border font-mono text-sm ${tileBg(v)} ${
                    v ? 'text-fg-100' : 'text-fg-400'
                  }`}
                >
                  {v ? v : ''}
                </div>
              )),
            )}
          </div>
          <div className="mt-3 text-center text-xs text-fg-300">Arrow keys • Esc to exit</div>
        </div>
      </div>
    </div>
  );
 }

 export function GuessGame({ open, onCloseAction }: GameOverlayProps) {
  const [target, setTarget] = useState<number>(() => 1 + Math.floor(Math.random() * 100));
  const [guess, setGuess] = useState('');
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    if (!open) return;
    setTarget(1 + Math.floor(Math.random() * 100));
    setGuess('');
    setLog(['Guess a number between 1 and 100']);
  }, [open]);

  const submit = useCallback(() => {
    const n = Number(guess);
    if (!Number.isFinite(n) || n < 1 || n > 100) {
      setLog((l) => ['Invalid guess. Enter 1-100.', ...l]);
      return;
    }
    if (n === target) {
      setLog((l) => [`Correct! The number was ${target}.`, ...l]);
      return;
    }
    setLog((l) => [`${n} is too ${n < target ? 'low' : 'high'}.`, ...l]);
  }, [guess, target]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseAction();
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        submit();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onCloseAction, submit]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-bg-900/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-bg-700 bg-bg-850 shadow-xl">
        <div className="flex items-center justify-between border-b border-bg-700 px-4 py-3">
          <div className="font-mono text-sm text-fg-100">guess</div>
          <button className="text-xs text-fg-300 hover:text-fg-100" onClick={onCloseAction}>
            Esc
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <input
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="1-100"
              className="w-full rounded-md border border-bg-700 bg-bg-900/40 px-3 py-2 font-mono text-sm text-fg-100 outline-none"
            />
            <button
              className="rounded-md border border-accent-500/30 bg-accent-500/10 px-3 py-2 font-mono text-sm text-accent-400 hover:border-accent-500/60"
              onClick={submit}
            >
              Enter
            </button>
          </div>

          <div className="mt-4 max-h-56 overflow-y-auto rounded-lg border border-bg-700 bg-black/20 p-3 font-mono text-xs text-fg-200">
            {log.map((l, i) => (
              <div key={i} className="mt-1 whitespace-pre-wrap">
                {l}
              </div>
            ))}
          </div>

          <div className="mt-3 text-center text-xs text-fg-300">Press Enter to submit • Esc to exit</div>
        </div>
      </div>
    </div>
  );
 }
