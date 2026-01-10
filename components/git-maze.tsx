'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  commits,
  connections,
  branches,
  badges,
  type CommitNode,
  type Badge,
} from './git-maze-data';

type PlayerState = {
  x: number;
  y: number;
  currentNode: string | null;
  visitedNodes: Set<string>;
  unlockedBadges: Set<string>;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
};

export function GitMaze() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [player, setPlayer] = useState<PlayerState>({
    x: 50,
    y: 95,
    currentNode: null,
    visitedNodes: new Set(),
    unlockedBadges: new Set(),
  });
  const [activePopup, setActivePopup] = useState<CommitNode | null>(null);
  const [showTrivia, setShowTrivia] = useState(false);
  const [triviaAnswer, setTriviaAnswer] = useState<number | null>(null);
  const [triviaResult, setTriviaResult] = useState<'correct' | 'wrong' | null>(null);
  const [newBadge, setNewBadge] = useState<Badge | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const keysRef = useRef<Set<string>>(new Set());

  // Get branch color
  const getBranchColor = (branchId: string) => {
    return branches.find((b) => b.id === branchId)?.color || '#2f81f7';
  };

  // Check if player is near a node
  const findNearbyNode = useCallback((px: number, py: number): CommitNode | null => {
    for (const commit of commits) {
      const dx = px - commit.x;
      const dy = py - commit.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 5) return commit;
    }
    return null;
  }, []);

  // Check if a position is on a valid path
  const isOnPath = useCallback((px: number, py: number): boolean => {
    for (const [fromId, toId] of connections) {
      const from = commits.find((c) => c.id === fromId);
      const to = commits.find((c) => c.id === toId);
      if (!from || !to) continue;

      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len === 0) continue;

      const t = Math.max(0, Math.min(1, ((px - from.x) * dx + (py - from.y) * dy) / (len * len)));
      const closestX = from.x + t * dx;
      const closestY = from.y + t * dy;
      const distToLine = Math.sqrt((px - closestX) ** 2 + (py - closestY) ** 2);

      if (distToLine < 3) return true;
    }
    return false;
  }, []);

  // Handle node interaction
  const interactWithNode = useCallback((node: CommitNode) => {
    setActivePopup(node);
    setPlayer((prev) => {
      const newVisited = new Set(prev.visitedNodes);
      newVisited.add(node.id);

      // Check for badge unlocks
      const newBadges = new Set(prev.unlockedBadges);
      for (const badge of badges) {
        if (newBadges.has(badge.id)) continue;
        if (badge.requiredCommits.length === 0) continue;
        if (badge.requiredCommits.every((c) => newVisited.has(c))) {
          newBadges.add(badge.id);
          setNewBadge(badge);
          setTimeout(() => setNewBadge(null), 3000);
        }
      }

      // Direct badge unlock
      if (node.unlocksBadge && !newBadges.has(node.unlocksBadge)) {
        const badge = badges.find((b) => b.id === node.unlocksBadge);
        if (badge) {
          newBadges.add(node.unlocksBadge);
          setNewBadge(badge);
          setTimeout(() => setNewBadge(null), 3000);
        }
      }

      return { ...prev, currentNode: node.id, visitedNodes: newVisited, unlockedBadges: newBadges };
    });

    if (node.type === 'merge-conflict') {
      setShowTrivia(true);
      setTriviaAnswer(null);
      setTriviaResult(null);
    }

    // Spawn celebration particles
    for (let i = 0; i < 20; i++) {
      particlesRef.current.push({
        x: node.x,
        y: node.y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 60,
        color: getBranchColor(node.branch),
      });
    }
  }, []);

  // Handle trivia answer
  const handleTriviaAnswer = (index: number) => {
    if (!activePopup?.trivia) return;
    setTriviaAnswer(index);
    if (index === activePopup.trivia.correct) {
      setTriviaResult('correct');
      setTimeout(() => {
        setShowTrivia(false);
        setActivePopup(null);
      }, 1500);
    } else {
      setTriviaResult('wrong');
    }
  };

  // Keyboard controls
  useEffect(() => {
    if (!gameStarted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', ' '].includes(e.key)) {
        e.preventDefault();
        keysRef.current.add(e.key.toLowerCase());
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameStarted]);

  // Game loop
  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(() => {
      const keys = keysRef.current;
      let dx = 0;
      let dy = 0;

      if (keys.has('arrowup') || keys.has('w')) dy = -0.8;
      if (keys.has('arrowdown') || keys.has('s')) dy = 0.8;
      if (keys.has('arrowleft') || keys.has('a')) dx = -0.8;
      if (keys.has('arrowright') || keys.has('d')) dx = 0.8;

      if (dx !== 0 || dy !== 0) {
        setPlayer((prev) => {
          const newX = Math.max(5, Math.min(95, prev.x + dx));
          const newY = Math.max(5, Math.min(95, prev.y + dy));

          // Check if new position is valid
          if (isOnPath(newX, newY) || findNearbyNode(newX, newY)) {
            const nearNode = findNearbyNode(newX, newY);
            if (nearNode && nearNode.id !== prev.currentNode && !activePopup) {
              interactWithNode(nearNode);
            }
            return { ...prev, x: newX, y: newY };
          }
          return prev;
        });
      }

      // Update particles
      particlesRef.current = particlesRef.current
        .map((p) => ({ ...p, x: p.x + p.vx * 0.1, y: p.y + p.vy * 0.1, life: p.life - 1 }))
        .filter((p) => p.life > 0);
    }, 33);

    return () => clearInterval(interval);
  }, [gameStarted, isOnPath, findNearbyNode, interactWithNode, activePopup]);

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      const w = dimensions.width;
      const h = dimensions.height;

      // Clear
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, w, h);

      // Draw grid pattern
      ctx.strokeStyle = 'rgba(48, 54, 61, 0.3)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw connections (git branches)
      for (const [fromId, toId] of connections) {
        const from = commits.find((c) => c.id === fromId);
        const to = commits.find((c) => c.id === toId);
        if (!from || !to) continue;

        const fromX = (from.x / 100) * w;
        const fromY = (from.y / 100) * h;
        const toX = (to.x / 100) * w;
        const toY = (to.y / 100) * h;

        // Glow effect
        ctx.strokeStyle = getBranchColor(to.branch);
        ctx.lineWidth = 6;
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();

        // Main line
        ctx.globalAlpha = 0.8;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Draw commit nodes
      for (const commit of commits) {
        const cx = (commit.x / 100) * w;
        const cy = (commit.y / 100) * h;
        const visited = player.visitedNodes.has(commit.id);
        const isActive = activePopup?.id === commit.id;
        const color = getBranchColor(commit.branch);

        // Outer glow
        if (isActive || !visited) {
          const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
          gradient.addColorStop(0, color + '40');
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(cx, cy, 30, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node circle
        ctx.fillStyle = visited ? color : '#21262d';
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cx, cy, commit.type === 'merge-conflict' ? 18 : 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Icon
        ctx.font = commit.type === 'merge-conflict' ? '18px sans-serif' : '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(commit.icon, cx, cy);

        // Label for unvisited nodes
        if (!visited) {
          ctx.font = '10px monospace';
          ctx.fillStyle = '#8b949e';
          ctx.fillText(commit.title.slice(0, 20), cx, cy + 25);
        }
      }

      // Draw particles
      for (const p of particlesRef.current) {
        ctx.globalAlpha = p.life / 60;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc((p.x / 100) * w, (p.y / 100) * h, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Draw player
      const px = (player.x / 100) * w;
      const py = (player.y / 100) * h;

      // Player glow
      const playerGradient = ctx.createRadialGradient(px, py, 0, px, py, 25);
      playerGradient.addColorStop(0, 'rgba(47, 129, 247, 0.4)');
      playerGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = playerGradient;
      ctx.beginPath();
      ctx.arc(px, py, 25, 0, Math.PI * 2);
      ctx.fill();

      // Player body
      ctx.fillStyle = '#2f81f7';
      ctx.strokeStyle = '#58a6ff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(px, py, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Player indicator
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🧑‍💻', px, py);

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [dimensions, player, activePopup]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: Math.min(600, rect.width * 0.75) });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Click to move
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!gameStarted || activePopup) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const nearNode = findNearbyNode(x, y);
    if (nearNode) {
      setPlayer((prev) => ({ ...prev, x: nearNode.x, y: nearNode.y }));
      interactWithNode(nearNode);
    }
  };

  const completionPercent = Math.round((player.visitedNodes.size / commits.length) * 100);

  return (
    <div className="rounded-xl border border-bg-700 bg-bg-800/50 p-4">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-mono text-sm font-medium text-fg-100">git explore --interactive</h3>
          <p className="mt-1 text-xs text-fg-300">Navigate the commit graph to learn about me</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="font-mono text-xs text-fg-300">
            {player.visitedNodes.size}/{commits.length} commits
          </div>
          <div className="h-2 w-24 overflow-hidden rounded-full bg-bg-700">
            <div
              className="h-full bg-accent-500 transition-all"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Badges */}
      {player.unlockedBadges.size > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {badges
            .filter((b) => player.unlockedBadges.has(b.id))
            .map((badge) => (
              <div
                key={badge.id}
                className="inline-flex items-center gap-1 rounded-full border border-accent-500/30 bg-accent-500/10 px-2 py-0.5 text-xs"
                title={badge.description}
              >
                <span>{badge.icon}</span>
                <span className="text-accent-400">{badge.name}</span>
              </div>
            ))}
        </div>
      )}

      {/* Game canvas */}
      <div ref={containerRef} className="relative">
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="w-full cursor-pointer rounded-lg"
          onClick={handleCanvasClick}
          style={{ imageRendering: 'pixelated' }}
        />

        {/* Start overlay */}
        {!gameStarted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-bg-900/90 backdrop-blur-sm">
            <div className="text-center">
              <div className="mb-2 text-4xl">🗺️</div>
              <h2 className="font-mono text-xl font-bold text-fg-100">Git Maze Explorer</h2>
              <p className="mt-2 max-w-sm text-sm text-fg-300">
                Navigate through my commit history. Discover skills, projects, and secrets!
              </p>
              <Button onClick={() => setGameStarted(true)} variant="primary" size="lg" className="mt-6">
                Start Exploring
              </Button>
              <div className="mt-4 font-mono text-xs text-fg-400">
                Use Arrow Keys or WASD • Click nodes to explore
              </div>
            </div>
          </div>
        )}

        {/* Commit popup */}
        {activePopup && !showTrivia && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div
              className="max-w-sm rounded-lg border border-bg-600 bg-bg-850 p-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">{activePopup.icon}</span>
                <span
                  className="rounded-full px-2 py-0.5 text-xs font-medium"
                  style={{ backgroundColor: getBranchColor(activePopup.branch) + '30', color: getBranchColor(activePopup.branch) }}
                >
                  {branches.find((b) => b.id === activePopup.branch)?.name}
                </span>
              </div>
              <h3 className="font-mono text-sm font-bold text-fg-100">{activePopup.title}</h3>
              <p className="mt-2 text-sm text-fg-300">{activePopup.message}</p>

              {activePopup.techStack && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {activePopup.techStack.map((tech) => (
                    <span key={tech} className="rounded bg-bg-700 px-1.5 py-0.5 text-[10px] text-fg-200">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 flex gap-2">
                {activePopup.projectUrl && (
                  <Button href={activePopup.projectUrl} variant="secondary" size="sm">
                    View Project
                  </Button>
                )}
                <Button onClick={() => setActivePopup(null)} variant="ghost" size="sm">
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Trivia popup */}
        {showTrivia && activePopup?.trivia && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div
              className="max-w-sm rounded-lg border border-yellow-500/50 bg-bg-850 p-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                <span className="font-mono text-sm font-bold text-yellow-400">MERGE CONFLICT</span>
              </div>
              <p className="mt-2 text-sm text-fg-100">{activePopup.trivia.question}</p>

              <div className="mt-4 space-y-2">
                {activePopup.trivia.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleTriviaAnswer(i)}
                    disabled={triviaAnswer !== null}
                    className={`w-full rounded border px-3 py-2 text-left text-sm transition ${
                      triviaAnswer === i
                        ? triviaResult === 'correct'
                          ? 'border-green-500 bg-green-500/20 text-green-400'
                          : 'border-red-500 bg-red-500/20 text-red-400'
                        : triviaAnswer !== null && i === activePopup.trivia!.correct
                        ? 'border-green-500 bg-green-500/20 text-green-400'
                        : 'border-bg-600 bg-bg-700 text-fg-200 hover:border-accent-500'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {triviaResult === 'wrong' && (
                <div className="mt-3 rounded border border-yellow-500/30 bg-yellow-500/10 p-2 text-xs text-yellow-300">
                  💡 Hint: {activePopup.trivia.hint}
                </div>
              )}

              {triviaResult === 'correct' && (
                <div className="mt-3 text-center font-mono text-sm text-green-400">
                  ✓ Conflict resolved! Continuing...
                </div>
              )}
            </div>
          </div>
        )}

        {/* New badge notification */}
        {newBadge && (
          <div className="absolute left-1/2 top-4 -translate-x-1/2 animate-bounce rounded-lg border border-accent-500 bg-accent-500/20 px-4 py-2 text-center backdrop-blur">
            <div className="text-2xl">{newBadge.icon}</div>
            <div className="font-mono text-xs font-bold text-accent-400">Badge Unlocked!</div>
            <div className="text-xs text-fg-200">{newBadge.name}</div>
          </div>
        )}
      </div>

      {/* Controls hint */}
      {gameStarted && (
        <div className="mt-3 flex items-center justify-between text-xs text-fg-400">
          <span>🎮 Arrow keys or WASD to move • Click nodes to interact</span>
          <button
            onClick={() => {
              setGameStarted(false);
              setPlayer({ x: 50, y: 95, currentNode: null, visitedNodes: new Set(), unlockedBadges: new Set() });
              setActivePopup(null);
            }}
            className="text-fg-300 hover:text-fg-100"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
