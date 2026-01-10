'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const FACTS = [
  'NEXT.JS', 'REACT', 'TYPESCRIPT', 'TAILWIND', 'NODE.JS', 'SEO PRO',
  'UI/UX', 'FULL-STACK', '5+ YEARS', 'FAST SITES', 'CLEAN CODE', 'HIRE ME',
];

const phone = '0662995533';
const whatsapp = 'https://wa.me/27662995533?text=';

type Star = { x: number; y: number; z: number; size: number };
type Comet = { x: number; y: number; vx: number; vy: number; length: number; opacity: number };
type Nebula = { x: number; y: number; size: number; color: string; opacity: number };
type Alien = { id: number; x: number; y: number; fact: string; hit: boolean; type: number; row: number; col: number };
type Bullet = { id: number; x: number; y: number };
type Explosion = { id: number; x: number; y: number; frame: number };
type AlienBullet = { id: number; x: number; y: number };

export function HeroGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'gameover' | 'won'>('intro');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [highScore, setHighScore] = useState(0);
  const [playerX, setPlayerX] = useState(50);
  const [aliens, setAliens] = useState<Alien[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [alienBullets, setAlienBullets] = useState<AlienBullet[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [collectedFacts, setCollectedFacts] = useState<string[]>([]);
  const [alienDirection, setAlienDirection] = useState(1);
  const [showHeroInfo, setShowHeroInfo] = useState(true);
  
  const bulletIdRef = useRef(0);
  const alienIdRef = useRef(0);
  const explosionIdRef = useRef(0);
  const alienBulletIdRef = useRef(0);
  const lastShotRef = useRef(0);
  const starsRef = useRef<Star[]>([]);
  const cometsRef = useRef<Comet[]>([]);
  const nebulaeRef = useRef<Nebula[]>([]);

  // Initialize space background
  useEffect(() => {
    // Create stars at different depths
    const stars: Star[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        z: Math.random() * 3 + 0.5,
        size: Math.random() * 2 + 0.5,
      });
    }
    starsRef.current = stars;

    // Create nebulae
    const nebulae: Nebula[] = [];
    const colors = ['rgba(99,102,241,0.08)', 'rgba(168,85,247,0.06)', 'rgba(59,130,246,0.07)'];
    for (let i = 0; i < 5; i++) {
      nebulae.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 300 + 150,
        color: colors[i % colors.length],
        opacity: Math.random() * 0.5 + 0.3,
      });
    }
    nebulaeRef.current = nebulae;
  }, []);

  // Animate space background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      
      // Clear
      ctx.fillStyle = '#0a0a12';
      ctx.fillRect(0, 0, w, h);

      // Draw nebulae
      nebulaeRef.current.forEach((nebula) => {
        const gradient = ctx.createRadialGradient(
          (nebula.x / 100) * w, (nebula.y / 100) * h, 0,
          (nebula.x / 100) * w, (nebula.y / 100) * h, nebula.size
        );
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      });

      // Update and draw stars (parallax)
      starsRef.current.forEach((star) => {
        star.y += star.z * 0.02;
        if (star.y > 100) {
          star.y = 0;
          star.x = Math.random() * 100;
        }
        
        const brightness = 0.3 + (star.z / 3.5) * 0.7;
        ctx.fillStyle = `rgba(255,255,255,${brightness})`;
        ctx.beginPath();
        ctx.arc((star.x / 100) * w, (star.y / 100) * h, star.size * (star.z / 2), 0, Math.PI * 2);
        ctx.fill();
      });

      // Randomly spawn comets
      if (Math.random() < 0.003) {
        cometsRef.current.push({
          x: Math.random() * 100,
          y: -5,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 3 + 2,
          length: Math.random() * 60 + 40,
          opacity: Math.random() * 0.5 + 0.5,
        });
      }

      // Update and draw comets
      cometsRef.current = cometsRef.current.filter((comet) => {
        comet.x += comet.vx;
        comet.y += comet.vy;
        
        if (comet.y > 110) return false;

        const cx = (comet.x / 100) * w;
        const cy = (comet.y / 100) * h;
        
        // Comet trail
        const gradient = ctx.createLinearGradient(
          cx, cy, cx - comet.vx * comet.length * 0.5, cy - comet.vy * comet.length * 0.5
        );
        gradient.addColorStop(0, `rgba(147,197,253,${comet.opacity})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx - comet.vx * comet.length * 0.5, cy - comet.vy * comet.length * 0.5);
        ctx.stroke();

        // Comet head
        ctx.fillStyle = `rgba(255,255,255,${comet.opacity})`;
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      // Scanlines
      ctx.fillStyle = 'rgba(0,0,0,0.03)';
      for (let y = 0; y < h; y += 4) {
        ctx.fillRect(0, y, w, 2);
      }

      animationId = requestAnimationFrame(animate);
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const initGame = useCallback(() => {
    const shuffled = [...FACTS].sort(() => Math.random() - 0.5);
    const initialAliens: Alien[] = [];
    
    // Classic Space Invaders formation: 5 rows, 11 columns
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 8; col++) {
        initialAliens.push({
          id: alienIdRef.current++,
          x: 12 + col * 10,
          y: 8 + row * 8,
          fact: shuffled[(row * 8 + col) % shuffled.length],
          hit: false,
          type: row === 0 ? 2 : row < 2 ? 1 : 0,
          row,
          col,
        });
      }
    }
    
    setAliens(initialAliens);
    setBullets([]);
    setAlienBullets([]);
    setExplosions([]);
    setCollectedFacts([]);
    setScore(0);
    setLives(3);
    setPlayerX(50);
    setAlienDirection(1);
    setGameState('playing');
    setShowHeroInfo(false);
  }, []);

  // Auto-start after intro
  useEffect(() => {
    if (gameState === 'intro') {
      const timer = setTimeout(() => {
        initGame();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gameState, initGame]);

  // Keyboard controls
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        setPlayerX((prev) => Math.max(5, prev - 3));
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setPlayerX((prev) => Math.min(95, prev + 3));
      } else if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        const now = Date.now();
        if (now - lastShotRef.current > 300) {
          lastShotRef.current = now;
          setBullets((prev) => [...prev, { id: bulletIdRef.current++, x: playerX, y: 88 }]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, playerX]);

  // Main game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      frameRef.current++;
      
      // Move bullets up
      setBullets((prev) => prev.map((b) => ({ ...b, y: b.y - 2.5 })).filter((b) => b.y > 0));
      
      // Move alien bullets down
      setAlienBullets((prev) => {
        const newBullets = prev.map((b) => ({ ...b, y: b.y + 1.5 })).filter((b) => b.y < 100);
        
        // Check if alien bullet hits player
        newBullets.forEach((bullet) => {
          if (Math.abs(bullet.x - playerX) < 4 && bullet.y > 85) {
            setLives((l) => {
              const newLives = l - 1;
              if (newLives <= 0) {
                setHighScore((hs) => Math.max(hs, score));
                setGameState('gameover');
              }
              return newLives;
            });
            setExplosions((prev) => [...prev, { id: explosionIdRef.current++, x: playerX, y: 90, frame: 0 }]);
          }
        });
        
        return newBullets.filter((b) => !(Math.abs(b.x - playerX) < 4 && b.y > 85));
      });

      // Move aliens
      setAliens((prev) => {
        let hitEdge = false;
        const newAliens = prev.map((a) => {
          if (a.hit) return a;
          const newX = a.x + alienDirection * 0.3;
          if (newX < 5 || newX > 95) hitEdge = true;
          return { ...a, x: newX };
        });

        if (hitEdge) {
          setAlienDirection((d) => -d);
          return newAliens.map((a) => (a.hit ? a : { ...a, y: a.y + 2 }));
        }

        // Check if aliens reached bottom
        if (newAliens.some((a) => !a.hit && a.y > 82)) {
          setHighScore((hs) => Math.max(hs, score));
          setGameState('gameover');
        }

        return newAliens;
      });

      // Aliens shoot randomly
      if (frameRef.current % 40 === 0) {
        setAliens((currentAliens) => {
          const shooters = currentAliens.filter((a) => !a.hit);
          if (shooters.length > 0) {
            const shooter = shooters[Math.floor(Math.random() * shooters.length)];
            setAlienBullets((prev) => [
              ...prev,
              { id: alienBulletIdRef.current++, x: shooter.x, y: shooter.y + 3 },
            ]);
          }
          return currentAliens;
        });
      }

      // Update explosions
      setExplosions((prev) =>
        prev.map((e) => ({ ...e, frame: e.frame + 1 })).filter((e) => e.frame < 12)
      );
    }, 33);

    return () => clearInterval(interval);
  }, [gameState, alienDirection, playerX, score]);

  // Collision detection
  useEffect(() => {
    if (gameState !== 'playing') return;

    setBullets((currentBullets) => {
      const remainingBullets: Bullet[] = [];
      const hitAlienIds: number[] = [];

      currentBullets.forEach((bullet) => {
        let bulletHit = false;
        aliens.forEach((alien) => {
          if (!alien.hit && Math.abs(bullet.x - alien.x) < 5 && Math.abs(bullet.y - alien.y) < 5) {
            bulletHit = true;
            hitAlienIds.push(alien.id);
          }
        });
        if (!bulletHit) remainingBullets.push(bullet);
      });

      if (hitAlienIds.length > 0) {
        setAliens((prev) => prev.map((a) => (hitAlienIds.includes(a.id) ? { ...a, hit: true } : a)));

        hitAlienIds.forEach((id) => {
          const alien = aliens.find((a) => a.id === id);
          if (alien) {
            setExplosions((prev) => [...prev, { id: explosionIdRef.current++, x: alien.x, y: alien.y, frame: 0 }]);
            setCollectedFacts((prev) => (prev.includes(alien.fact) ? prev : [...prev, alien.fact]));
            const points = alien.type === 2 ? 300 : alien.type === 1 ? 200 : 100;
            setScore((prev) => prev + points);
          }
        });
      }

      return remainingBullets;
    });
  }, [bullets, aliens, gameState]);

  // Win condition
  useEffect(() => {
    if (gameState === 'playing' && aliens.length > 0 && aliens.every((a) => a.hit)) {
      setHighScore((hs) => Math.max(hs, score));
      setGameState('won');
    }
  }, [aliens, gameState, score]);

  // Mouse/touch controls
  const handleMove = (clientX: number) => {
    if (!containerRef.current || gameState !== 'playing') return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPlayerX(Math.max(5, Math.min(95, x)));
  };

  const handleShoot = () => {
    if (gameState !== 'playing') return;
    const now = Date.now();
    if (now - lastShotRef.current > 300) {
      lastShotRef.current = now;
      setBullets((prev) => [...prev, { id: bulletIdRef.current++, x: playerX, y: 88 }]);
    }
  };

  const waText = encodeURIComponent("Hi Cameron — I'd like to chat about a website/web app project.");

  return (
    <section id="top" className="relative min-h-[600px] overflow-hidden sm:min-h-[700px]">
      {/* Space background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ imageRendering: 'pixelated' }}
      />

      {/* Game container */}
      <div
        ref={containerRef}
        className="relative mx-auto h-full min-h-[600px] max-w-6xl cursor-crosshair px-4 sm:min-h-[700px] sm:px-6"
        onMouseMove={(e) => handleMove(e.clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onClick={handleShoot}
        onTouchStart={(e) => { e.preventDefault(); handleShoot(); }}
      >
        {/* HUD */}
        <div className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between font-mono text-xs sm:left-6 sm:right-6 sm:top-6 sm:text-sm">
          <div className="flex items-center gap-4">
            <span className="text-fg-300">
              SCORE <span className="text-accent-500">{String(score).padStart(6, '0')}</span>
            </span>
            <span className="hidden text-fg-300 sm:inline">
              HI <span className="text-yellow-400">{String(highScore).padStart(6, '0')}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-fg-300">LIVES</span>
            <span className="text-red-400">{'▲'.repeat(lives)}</span>
          </div>
        </div>

        {/* Skills collected bar */}
        {collectedFacts.length > 0 && gameState === 'playing' && (
          <div className="absolute left-4 right-4 top-14 z-20 sm:left-6 sm:right-6 sm:top-16">
            <div className="flex flex-wrap gap-1">
              {collectedFacts.map((fact, i) => (
                <span
                  key={i}
                  className="rounded border border-accent-500/50 bg-accent-500/20 px-1.5 py-0.5 font-mono text-[8px] text-accent-400 sm:text-[10px]"
                >
                  {fact}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Intro screen with hero info */}
        {gameState === 'intro' && (
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            <div className="max-w-2xl px-4 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-bg-700 bg-bg-850/80 px-3 py-1 text-xs text-fg-200 backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent-500" />
                <span>George, Western Cape · 5 years experience</span>
              </div>

              <h1 className="font-mono text-3xl font-bold tracking-tight text-fg-100 sm:text-5xl">
                CAMERON FALCK
              </h1>
              <h2 className="mt-2 font-mono text-xl text-accent-500 sm:text-2xl">
                FULL-STACK DEVELOPER
              </h2>

              <p className="mx-auto mt-4 max-w-lg text-sm text-fg-300 sm:text-base">
                I build modern, conversion-first websites and web apps with a clean engineering mindset.
              </p>

              <div className="mt-6 animate-pulse font-mono text-sm text-accent-400">
                ▶ GAME STARTING... ◀
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {FACTS.slice(0, 6).map((fact) => (
                  <span key={fact} className="kbd text-[10px]">{fact}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Game Over / Won screen */}
        {(gameState === 'gameover' || gameState === 'won') && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-bg-900/70 backdrop-blur-sm">
            <div className="max-w-md px-4 text-center">
              <div
                className="font-mono text-3xl font-bold tracking-widest sm:text-4xl"
                style={{
                  color: gameState === 'won' ? '#4ade80' : '#ef4444',
                  textShadow: gameState === 'won'
                    ? '0 0 30px rgba(74,222,128,0.5)'
                    : '0 0 30px rgba(239,68,68,0.5)',
                }}
              >
                {gameState === 'won' ? '◀ YOU WIN ▶' : '◀ GAME OVER ▶'}
              </div>
              
              <div className="mt-4 font-mono text-xl text-accent-500">
                FINAL SCORE: {score}
              </div>

              {collectedFacts.length > 0 && (
                <div className="mt-4">
                  <div className="mb-2 font-mono text-xs text-fg-300">SKILLS DISCOVERED:</div>
                  <div className="flex flex-wrap justify-center gap-1">
                    {collectedFacts.map((fact, i) => (
                      <span key={i} className="rounded border border-accent-500/50 bg-accent-500/20 px-1.5 py-0.5 font-mono text-[10px] text-accent-400">
                        {fact}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button onClick={initGame} variant="primary" size="lg">
                  Play Again
                </Button>
                <Button href="#contact" variant="secondary" size="lg">
                  Start a Project
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Button href={whatsapp + waText} variant="ghost" size="sm">
                  WhatsApp
                </Button>
                <Button href={`tel:${phone}`} variant="ghost" size="sm">
                  {phone}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Game elements */}
        {gameState === 'playing' && (
          <>
            {/* Aliens */}
            {aliens.map((alien) =>
              !alien.hit ? (
                <div
                  key={alien.id}
                  className="absolute font-mono text-base font-bold transition-none sm:text-xl"
                  style={{
                    left: `${alien.x}%`,
                    top: `${alien.y}%`,
                    transform: 'translate(-50%, -50%)',
                    color: alien.type === 2 ? '#f472b6' : alien.type === 1 ? '#a855f7' : '#22d3ee',
                    textShadow: `0 0 10px ${alien.type === 2 ? 'rgba(244,114,182,0.6)' : alien.type === 1 ? 'rgba(168,85,247,0.6)' : 'rgba(34,211,238,0.6)'}`,
                  }}
                >
                  {alien.type === 2 ? '◣◢' : alien.type === 1 ? '╔╗' : '▓▓'}
                </div>
              ) : null
            )}

            {/* Explosions */}
            {explosions.map((exp) => (
              <div
                key={exp.id}
                className="absolute font-mono text-2xl sm:text-3xl"
                style={{
                  left: `${exp.x}%`,
                  top: `${exp.y}%`,
                  transform: 'translate(-50%, -50%)',
                  opacity: 1 - exp.frame / 12,
                  color: '#fbbf24',
                  textShadow: '0 0 15px rgba(251,191,36,0.8)',
                }}
              >
                {exp.frame < 4 ? '✦' : exp.frame < 8 ? '✴' : '·'}
              </div>
            ))}

            {/* Player bullets */}
            {bullets.map((bullet) => (
              <div
                key={bullet.id}
                className="absolute bg-accent-500"
                style={{
                  left: `${bullet.x}%`,
                  top: `${bullet.y}%`,
                  width: '4px',
                  height: '16px',
                  transform: 'translateX(-50%)',
                  boxShadow: '0 0 10px rgba(47,129,247,0.8)',
                }}
              />
            ))}

            {/* Alien bullets */}
            {alienBullets.map((bullet) => (
              <div
                key={bullet.id}
                className="absolute bg-red-500"
                style={{
                  left: `${bullet.x}%`,
                  top: `${bullet.y}%`,
                  width: '4px',
                  height: '12px',
                  transform: 'translateX(-50%)',
                  boxShadow: '0 0 8px rgba(239,68,68,0.8)',
                }}
              />
            ))}

            {/* Player ship */}
            <div
              className="absolute font-mono text-xl font-bold text-accent-500 sm:text-2xl"
              style={{
                left: `${playerX}%`,
                bottom: '8%',
                transform: 'translateX(-50%)',
                textShadow: '0 0 15px rgba(47,129,247,0.6)',
              }}
            >
              ◢█◣
            </div>

            {/* Controls hint */}
            <div className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 font-mono text-[10px] text-fg-400 sm:bottom-4">
              [←][→] MOVE • [SPACE] FIRE • Click/Tap to shoot
            </div>
          </>
        )}
      </div>
    </section>
  );
}
