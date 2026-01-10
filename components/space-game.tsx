'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/components/utils';

const FACTS = [
  '5+ years dev experience',
  'Based in George, WC',
  'Full-stack developer',
  'React & Next.js expert',
  'TypeScript enthusiast',
  'Performance focused',
  'SEO specialist',
  'UI/UX passionate',
  'Clean code advocate',
  'Loves problem-solving',
  'Available for hire!',
  'Open source contributor',
];

type Alien = {
  id: number;
  x: number;
  y: number;
  fact: string;
  hit: boolean;
};

type Bullet = {
  id: number;
  x: number;
  y: number;
};

type RevealedFact = {
  id: number;
  text: string;
  x: number;
  y: number;
};

export function SpaceGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [playerX, setPlayerX] = useState(50);
  const [aliens, setAliens] = useState<Alien[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [revealedFacts, setRevealedFacts] = useState<RevealedFact[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const bulletIdRef = useRef(0);
  const alienIdRef = useRef(0);

  const initGame = useCallback(() => {
    const shuffled = [...FACTS].sort(() => Math.random() - 0.5);
    const initialAliens: Alien[] = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        initialAliens.push({
          id: alienIdRef.current++,
          x: 15 + col * 20,
          y: 8 + row * 12,
          fact: shuffled[(row * 4 + col) % shuffled.length],
          hit: false,
        });
      }
    }
    setAliens(initialAliens);
    setBullets([]);
    setRevealedFacts([]);
    setScore(0);
    setPlayerX(50);
    setGameOver(false);
    setPlaying(true);
  }, []);

  // Handle keyboard input
  useEffect(() => {
    if (!playing || gameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        setPlayerX((prev) => Math.max(5, prev - 5));
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setPlayerX((prev) => Math.min(95, prev + 5));
      } else if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        setBullets((prev) => [
          ...prev,
          { id: bulletIdRef.current++, x: playerX, y: 85 },
        ]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playing, gameOver, playerX]);

  // Game loop
  useEffect(() => {
    if (!playing || gameOver) return;

    const interval = setInterval(() => {
      // Move bullets up
      setBullets((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y - 4 }))
          .filter((b) => b.y > 0)
      );

      // Move aliens down slowly
      setAliens((prev) => {
        const newAliens = prev.map((a) => ({
          ...a,
          y: a.y + 0.15,
        }));
        
        // Check if any alien reached the bottom
        if (newAliens.some((a) => !a.hit && a.y > 80)) {
          setGameOver(true);
        }
        
        return newAliens;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [playing, gameOver]);

  // Collision detection
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
            Math.abs(bullet.x - alien.x) < 8 &&
            Math.abs(bullet.y - alien.y) < 8
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
            setRevealedFacts((prev) => [
              ...prev,
              { id, text: alien.fact, x: alien.x, y: alien.y },
            ]);
            setScore((prev) => prev + 100);
          }
        });
      }

      return remainingBullets;
    });
  }, [bullets, aliens, playing, gameOver]);

  // Check win condition
  useEffect(() => {
    if (playing && aliens.length > 0 && aliens.every((a) => a.hit)) {
      setGameOver(true);
    }
  }, [aliens, playing]);

  // Handle touch/mouse controls
  const handleMove = (clientX: number) => {
    if (!containerRef.current || !playing || gameOver) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPlayerX(Math.max(5, Math.min(95, x)));
  };

  const handleShoot = () => {
    if (!playing || gameOver) return;
    setBullets((prev) => [
      ...prev,
      { id: bulletIdRef.current++, x: playerX, y: 85 },
    ]);
  };

  return (
    <div className="rounded-lg border border-bg-700 bg-bg-800/50 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-xs font-medium uppercase tracking-wide text-fg-300">
          Space Facts
        </div>
        {playing && (
          <div className="font-mono text-sm text-accent-500">
            Score: {score}
          </div>
        )}
      </div>

      <div
        ref={containerRef}
        className="relative h-64 w-full cursor-crosshair overflow-hidden rounded-lg border border-bg-700 bg-bg-900"
        onMouseMove={(e) => handleMove(e.clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onClick={handleShoot}
        onTouchStart={handleShoot}
      >
        {/* Stars background */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 w-0.5 rounded-full bg-fg-300/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${1 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {!playing && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="mb-4 text-center">
              <div className="text-lg font-bold text-fg-100">Space Facts</div>
              <div className="mt-1 text-xs text-fg-300">
                Shoot aliens to learn about me!
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                initGame();
              }}
              className="rounded-md border border-accent-500 bg-accent-500/10 px-4 py-2 text-sm font-medium text-accent-500 transition hover:bg-accent-500/20"
            >
              Start Game
            </button>
            <div className="mt-4 text-[10px] text-fg-300">
              ← → or A/D to move • Space to shoot
            </div>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-900/80">
            <div className="text-lg font-bold text-fg-100">
              {aliens.every((a) => a.hit) ? 'You Win!' : 'Game Over'}
            </div>
            <div className="mt-1 text-sm text-accent-500">Score: {score}</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                initGame();
              }}
              className="mt-4 rounded-md border border-accent-500 bg-accent-500/10 px-4 py-2 text-sm font-medium text-accent-500 transition hover:bg-accent-500/20"
            >
              Play Again
            </button>
          </div>
        )}

        {playing && (
          <>
            {/* Aliens */}
            {aliens.map((alien) =>
              !alien.hit ? (
                <div
                  key={alien.id}
                  className="absolute flex h-6 w-8 items-center justify-center text-lg transition-all"
                  style={{
                    left: `${alien.x}%`,
                    top: `${alien.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  👾
                </div>
              ) : null
            )}

            {/* Revealed facts */}
            {revealedFacts.map((fact) => (
              <div
                key={fact.id}
                className="absolute whitespace-nowrap rounded bg-accent-500/90 px-2 py-1 text-[10px] font-medium text-bg-900 animate-pulse"
                style={{
                  left: `${fact.x}%`,
                  top: `${fact.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {fact.text}
              </div>
            ))}

            {/* Bullets */}
            {bullets.map((bullet) => (
              <div
                key={bullet.id}
                className="absolute h-3 w-1 rounded-full bg-accent-500 shadow-[0_0_8px_rgba(47,129,247,0.6)]"
                style={{
                  left: `${bullet.x}%`,
                  top: `${bullet.y}%`,
                  transform: 'translateX(-50%)',
                }}
              />
            ))}

            {/* Player ship */}
            <div
              className="absolute bottom-4 text-2xl transition-all duration-75"
              style={{
                left: `${playerX}%`,
                transform: 'translateX(-50%)',
              }}
            >
              🚀
            </div>
          </>
        )}
      </div>

      <div className="mt-3 text-center text-[10px] text-fg-300">
        {playing && !gameOver
          ? 'Click/tap to shoot • Move mouse/touch to aim'
          : 'A fun way to learn about me!'}
      </div>
    </div>
  );
}
