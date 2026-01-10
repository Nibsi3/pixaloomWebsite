'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const FACTS = [
  '5+ YEARS EXP',
  'GEORGE, WC',
  'FULL-STACK',
  'REACT EXPERT',
  'TYPESCRIPT',
  'FAST SITES',
  'SEO PRO',
  'UI/UX LOVER',
  'CLEAN CODE',
  'PROBLEM SOLVER',
  'HIRE ME!',
  'OPEN SOURCE',
];

type Alien = {
  id: number;
  x: number;
  y: number;
  fact: string;
  hit: boolean;
  type: number;
  wobble: number;
};

type Bullet = {
  id: number;
  x: number;
  y: number;
};

type Explosion = {
  id: number;
  x: number;
  y: number;
  frame: number;
};

export function SpaceGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [playerX, setPlayerX] = useState(50);
  const [aliens, setAliens] = useState<Alien[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [collectedFacts, setCollectedFacts] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const bulletIdRef = useRef(0);
  const alienIdRef = useRef(0);
  const explosionIdRef = useRef(0);
  const lastShotRef = useRef(0);

  const initGame = useCallback(() => {
    const shuffled = [...FACTS].sort(() => Math.random() - 0.5);
    const initialAliens: Alien[] = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        const xOffset = (Math.random() - 0.5) * 6;
        const yOffset = (Math.random() - 0.5) * 4;
        initialAliens.push({
          id: alienIdRef.current++,
          x: 18 + col * 18 + xOffset,
          y: 12 + row * 14 + yOffset,
          fact: shuffled[(row * 4 + col) % shuffled.length],
          hit: false,
          type: Math.floor(Math.random() * 3),
          wobble: Math.random() * Math.PI * 2,
        });
      }
    }
    setAliens(initialAliens);
    setBullets([]);
    setExplosions([]);
    setCollectedFacts([]);
    setScore(0);
    setLives(3);
    setPlayerX(50);
    setGameOver(false);
    setWon(false);
    setShowExplosion(false);
    setPlaying(true);
  }, []);

  useEffect(() => {
    if (!playing || gameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        setPlayerX((prev) => Math.max(8, prev - 4));
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setPlayerX((prev) => Math.min(92, prev + 4));
      } else if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        const now = Date.now();
        if (now - lastShotRef.current > 200) {
          lastShotRef.current = now;
          setBullets((prev) => [
            ...prev,
            { id: bulletIdRef.current++, x: playerX, y: 82 },
          ]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playing, gameOver, playerX]);

  useEffect(() => {
    if (!playing || gameOver) return;

    const interval = setInterval(() => {
      setBullets((prev) =>
        prev.map((b) => ({ ...b, y: b.y - 3 })).filter((b) => b.y > 0)
      );

      setAliens((prev) => {
        const newAliens = prev.map((a) => ({
          ...a,
          y: a.y + 0.12,
          x: a.x + Math.sin(a.wobble + Date.now() / 500) * 0.15,
          wobble: a.wobble,
        }));

        const hitPlayer = newAliens.some((a) => !a.hit && a.y > 78);
        if (hitPlayer) {
          setShowExplosion(true);
          setTimeout(() => {
            setGameOver(true);
          }, 1500);
        }

        return newAliens;
      });

      setExplosions((prev) =>
        prev
          .map((e) => ({ ...e, frame: e.frame + 1 }))
          .filter((e) => e.frame < 8)
      );
    }, 50);

    return () => clearInterval(interval);
  }, [playing, gameOver]);

  useEffect(() => {
    if (!playing || gameOver) return;

    setBullets((currentBullets) => {
      const remainingBullets: Bullet[] = [];
      const hitAlienIds: number[] = [];

      currentBullets.forEach((bullet) => {
        let bulletHit = false;
        aliens.forEach((alien) => {
          if (
            !alien.hit &&
            Math.abs(bullet.x - alien.x) < 6 &&
            Math.abs(bullet.y - alien.y) < 6
          ) {
            bulletHit = true;
            hitAlienIds.push(alien.id);
          }
        });
        if (!bulletHit) {
          remainingBullets.push(bullet);
        }
      });

      if (hitAlienIds.length > 0) {
        setAliens((prev) =>
          prev.map((a) =>
            hitAlienIds.includes(a.id) ? { ...a, hit: true } : a
          )
        );

        hitAlienIds.forEach((id) => {
          const alien = aliens.find((a) => a.id === id);
          if (alien) {
            setExplosions((prev) => [
              ...prev,
              { id: explosionIdRef.current++, x: alien.x, y: alien.y, frame: 0 },
            ]);
            setCollectedFacts((prev) => {
              if (prev.includes(alien.fact)) return prev;
              return [...prev, alien.fact];
            });
            setScore((prev) => prev + 100);
          }
        });
      }

      return remainingBullets;
    });
  }, [bullets, aliens, playing, gameOver]);

  useEffect(() => {
    if (playing && aliens.length > 0 && aliens.every((a) => a.hit)) {
      setWon(true);
      setGameOver(true);
    }
  }, [aliens, playing]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !playing || gameOver) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPlayerX(Math.max(8, Math.min(92, x)));
  };

  const handleShoot = () => {
    if (!playing || gameOver) return;
    const now = Date.now();
    if (now - lastShotRef.current > 200) {
      lastShotRef.current = now;
      setBullets((prev) => [
        ...prev,
        { id: bulletIdRef.current++, x: playerX, y: 82 },
      ]);
    }
  };

  const alienSprites = ['▓░▓', '╔▓╗', '◢▓◣'];
  const explosionFrames = ['✦', '✴', '💥', '✳', '✦', '·', '·', ''];

  return (
    <div className="arcade-cabinet mx-auto max-w-2xl">
      <div className="rounded-t-xl border-x-4 border-t-4 border-bg-600 bg-gradient-to-b from-bg-700 to-bg-800 px-3 py-2">
        <div className="flex items-center justify-between font-mono">
          <div className="text-[10px] uppercase tracking-widest text-accent-500">
            ◀ SPACE FACTS ▶
          </div>
          <div className="flex gap-4 text-xs">
            <span className="text-fg-300">
              SCORE: <span className="text-accent-500">{String(score).padStart(5, '0')}</span>
            </span>
            <span className="text-fg-300">
              LIVES: <span className="text-red-400">{'♥'.repeat(lives)}</span>
            </span>
          </div>
        </div>
      </div>

      {collectedFacts.length > 0 && playing && (
        <div className="border-x-4 border-bg-600 bg-bg-850 px-2 py-1.5">
          <div className="flex flex-wrap gap-1.5">
            {collectedFacts.map((fact, i) => (
              <span
                key={i}
                className="rounded border border-accent-500/50 bg-accent-500/20 px-1.5 py-0.5 font-mono text-[9px] text-accent-400"
                style={{ imageRendering: 'pixelated' }}
              >
                {fact}
              </span>
            ))}
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        className="relative cursor-crosshair overflow-hidden border-x-4 border-bg-600 bg-[#0a0a12]"
        style={{ height: '340px', imageRendering: 'pixelated' }}
        onMouseMove={(e) => handleMove(e.clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onClick={handleShoot}
        onTouchStart={handleShoot}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />

        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 23) % 100}%`,
                width: i % 3 === 0 ? '2px' : '1px',
                height: i % 3 === 0 ? '2px' : '1px',
                opacity: 0.3 + (i % 5) * 0.1,
              }}
            />
          ))}
        </div>

        {!playing && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="mb-6 text-center font-mono">
              <div
                className="mb-2 text-2xl font-bold tracking-wider text-accent-500"
                style={{ textShadow: '0 0 10px rgba(47,129,247,0.5)' }}
              >
                ◀ SPACE FACTS ▶
              </div>
              <div className="text-xs text-fg-300">
                DESTROY ALIENS TO LEARN ABOUT ME
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                initGame();
              }}
              className="animate-pulse rounded border-2 border-accent-500 bg-accent-500/20 px-6 py-3 font-mono text-sm font-bold tracking-wider text-accent-400 transition hover:bg-accent-500/30"
            >
              ▶ INSERT COIN ◀
            </button>
            <div className="mt-6 font-mono text-[10px] text-fg-300">
              [←] [→] MOVE &nbsp;&nbsp; [SPACE] FIRE
            </div>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a12]/90">
            {showExplosion && !won && (
              <div
                className="absolute text-6xl"
                style={{
                  left: `${playerX}%`,
                  bottom: '10%',
                  transform: 'translateX(-50%)',
                  animation: 'explosion 0.5s ease-out',
                }}
              >
                💥
              </div>
            )}
            <div
              className="mb-4 font-mono text-3xl font-bold tracking-widest"
              style={{
                color: won ? '#4ade80' : '#ef4444',
                textShadow: won
                  ? '0 0 20px rgba(74,222,128,0.5)'
                  : '0 0 20px rgba(239,68,68,0.5)',
                imageRendering: 'pixelated',
              }}
            >
              {won ? '◀ YOU WIN ▶' : '◀ GAME OVER ▶'}
            </div>
            <div className="mb-2 font-mono text-lg text-accent-500">
              SCORE: {score}
            </div>
            {collectedFacts.length > 0 && (
              <div className="mb-4 max-w-md text-center">
                <div className="mb-2 font-mono text-[10px] text-fg-300">
                  FACTS DISCOVERED:
                </div>
                <div className="flex flex-wrap justify-center gap-1">
                  {collectedFacts.map((fact, i) => (
                    <span
                      key={i}
                      className="rounded border border-accent-500/50 bg-accent-500/20 px-1.5 py-0.5 font-mono text-[9px] text-accent-400"
                    >
                      {fact}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                initGame();
              }}
              className="animate-pulse rounded border-2 border-accent-500 bg-accent-500/20 px-6 py-3 font-mono text-sm font-bold tracking-wider text-accent-400 transition hover:bg-accent-500/30"
            >
              ▶ PLAY AGAIN ◀
            </button>
          </div>
        )}

        {playing && !showExplosion && (
          <>
            {aliens.map((alien) =>
              !alien.hit ? (
                <div
                  key={alien.id}
                  className="absolute font-mono text-lg font-bold transition-none"
                  style={{
                    left: `${alien.x}%`,
                    top: `${alien.y}%`,
                    transform: 'translate(-50%, -50%)',
                    color:
                      alien.type === 0
                        ? '#a855f7'
                        : alien.type === 1
                        ? '#22d3ee'
                        : '#f472b6',
                    textShadow: `0 0 8px ${
                      alien.type === 0
                        ? 'rgba(168,85,247,0.5)'
                        : alien.type === 1
                        ? 'rgba(34,211,238,0.5)'
                        : 'rgba(244,114,182,0.5)'
                    }`,
                  }}
                >
                  {alienSprites[alien.type]}
                </div>
              ) : null
            )}

            {explosions.map((exp) => (
              <div
                key={exp.id}
                className="absolute font-mono text-2xl"
                style={{
                  left: `${exp.x}%`,
                  top: `${exp.y}%`,
                  transform: 'translate(-50%, -50%)',
                  color: '#fbbf24',
                  textShadow: '0 0 10px rgba(251,191,36,0.8)',
                }}
              >
                {explosionFrames[exp.frame] || ''}
              </div>
            ))}

            {bullets.map((bullet) => (
              <div
                key={bullet.id}
                className="absolute bg-accent-500"
                style={{
                  left: `${bullet.x}%`,
                  top: `${bullet.y}%`,
                  width: '4px',
                  height: '12px',
                  transform: 'translateX(-50%)',
                  boxShadow: '0 0 8px rgba(47,129,247,0.8)',
                }}
              />
            ))}

            <div
              className="absolute font-mono text-lg font-bold text-accent-500"
              style={{
                left: `${playerX}%`,
                bottom: '8%',
                transform: 'translateX(-50%)',
                textShadow: '0 0 10px rgba(47,129,247,0.5)',
              }}
            >
              ◢█◣
            </div>
          </>
        )}

        {showExplosion && !gameOver && (
          <div
            className="absolute text-6xl"
            style={{
              left: `${playerX}%`,
              bottom: '8%',
              transform: 'translateX(-50%)',
              animation: 'explosion 1s ease-out',
            }}
          >
            💥
          </div>
        )}
      </div>

      <div className="rounded-b-xl border-x-4 border-b-4 border-bg-600 bg-gradient-to-b from-bg-800 to-bg-700 px-3 py-2">
        <div className="flex items-center justify-center gap-4 font-mono text-[10px] text-fg-300">
          <span>◀ CLICK TO FIRE ▶</span>
          <span className="text-fg-400">|</span>
          <span>◀ MOVE TO AIM ▶</span>
        </div>
      </div>
    </div>
  );
}
