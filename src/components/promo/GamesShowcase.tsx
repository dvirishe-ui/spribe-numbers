import gameAviator from "@/assets/game-aviator.webp";
import gameBalloon from "@/assets/game-balloon.png";
import gameDice from "@/assets/game-dice.png";
import gameGoal from "@/assets/game-goal.png";
import gameHilo from "@/assets/game-hilo.png";
import gameHotline from "@/assets/game-hotline.png";
import gameKeno from "@/assets/game-keno.png";
import gameMines from "@/assets/game-mines.png";
import gameMiniRoulette from "@/assets/game-mini-roulette.png";
import gamePilotChicken from "@/assets/game-pilot-chicken.png";
import gamePlinko from "@/assets/game-plinko.png";
import gameTrader from "@/assets/game-trader.png";

interface GameEntry {
  name: string;
  slug: string;
  image?: string;
}

const GAMES: GameEntry[] = [
  { name: "Aviator", slug: "aviator", image: gameAviator },
  { name: "Mines", slug: "mines", image: gameMines },
  { name: "Plinko", slug: "plinko", image: gamePlinko },
  { name: "Goal", slug: "goal", image: gameGoal },
  { name: "Dice", slug: "dice", image: gameDice },
  { name: "Hilo", slug: "hi-lo", image: gameHilo },
  { name: "Mini Roulette", slug: "mini-roulette", image: gameMiniRoulette },
  { name: "Keno", slug: "keno", image: gameKeno },
  { name: "Hotline", slug: "hotline", image: gameHotline },
  { name: "Balloon", slug: "balloon", image: gameBalloon },
  { name: "Pilot Chicken", slug: "pilot-chicken", image: gamePilotChicken },
  { name: "Trader", slug: "trader", image: gameTrader },
];

export function GamesShowcase() {
  return (
    <section className="panel space-y-4 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold">Our games</h2>
          <p className="text-sm text-muted-foreground">The full SPRIBE lineup, live across our network.</p>
        </div>
        <a
          href="https://spribe.co/games"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-primary hover:underline"
        >
          See all games on spribe.co ↗
        </a>
      </div>

      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
        {GAMES.map((game) => (
          <a
            key={game.slug}
            href={`https://spribe.co/games/${game.slug}`}
            target="_blank"
            rel="noreferrer"
            title={game.name}
            className="group relative aspect-[3/2] overflow-hidden rounded-xl border border-border bg-surface-raised transition-colors hover:border-primary/50"
          >
            {game.image ? (
              <img
                src={game.image}
                alt={`${game.name} — SPRIBE`}
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex size-full items-center justify-center p-3 text-center">
                <span className="text-sm font-medium">{game.name}</span>
              </div>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
