import { Avatar } from "@/design-system/primitives/Avatar/Avatar";
import { Badge } from "@/design-system/primitives/Badge/Badge";
import { Card } from "@/design-system/primitives/Card/Card";
import { Text } from "@/design-system/primitives/Text/Text";

const RECENT_GAMES = [
  {
    id: 1,
    opponent: "NewtonianMaster",
    result: "win",
    score: "1200 - 950",
    mode: "Ranked",
    date: "2h ago",
    eloChange: "+24",
  },
  {
    id: 2,
    opponent: "QuantumCat",
    result: "loss",
    score: "800 - 1050",
    mode: "Casual",
    date: "5h ago",
    eloChange: "-12",
  },
  {
    id: 3,
    opponent: "EntropyKing",
    result: "win",
    score: "1500 - 1420",
    mode: "Tournament",
    date: "1d ago",
    eloChange: "+45",
  },
  {
    id: 4,
    opponent: "SpeedOfLight",
    result: "win",
    score: "1100 - 800",
    mode: "Ranked",
    date: "2d ago",
    eloChange: "+18",
  },
];

export function RecentGames() {
  return (
    <Card
      variant="default"
      className="h-full bg-[var(--color-bg-secondary)] border-[var(--glass-border)]"
    >
      <div className="p-4 border-b border-[var(--glass-border)] flex justify-between items-center">
        <Text variant="h4" className="font-semibold text-base">
          Recent Battles
        </Text>
        <Text
          variant="caption"
          className="text-[var(--color-text-muted)] hover:text-[var(--color-primary-400)] cursor-pointer"
        >
          View All
        </Text>
      </div>

      <div className="divide-y divide-[var(--glass-border)]">
        {RECENT_GAMES.map((game) => (
          <div
            key={game.id}
            className="p-4 hover:bg-[var(--glass-bg-hover)] transition-colors group"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <Avatar size="xs" name={game.opponent} />
                <div>
                  <Text
                    variant="bodySmall"
                    className="font-medium text-[var(--color-text-primary)]"
                  >
                    vs {game.opponent}
                  </Text>
                  <Text
                    variant="caption"
                    className="text-[var(--color-text-muted)]"
                  >
                    {game.mode} • {game.date}
                  </Text>
                </div>
              </div>
              <Badge
                variant={game.result === "win" ? "success" : "error"}
                className="uppercase text-[10px] tracking-wider"
              >
                {game.result}
              </Badge>
            </div>

            <div className="flex justify-between items-center pl-8">
              <Text
                variant="caption"
                className="font-mono text-[var(--color-text-secondary)]"
              >
                {game.score}
              </Text>
              <Text
                variant="caption"
                className={`font-medium ${game.result === "win" ? "text-[var(--color-success-400)]" : "text-[var(--color-error-400)]"}`}
              >
                {game.eloChange} ELO
              </Text>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
