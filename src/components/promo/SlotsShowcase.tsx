import slotBarnToMars from "@/assets/slot-barn-to-mars.png";
import slotCrystalFall from "@/assets/slot-crystal-fall.png";
import slotForestOfWisps from "@/assets/slot-forest-of-wisps.png";
import slotGatesOfEgypt from "@/assets/slot-gates-of-egypt.png";
import slotHappyWreckers from "@/assets/slot-happy-wreckers.png";
import slotJuicyBombs from "@/assets/slot-juicy-bombs.png";
import slotKeplersParadise from "@/assets/slot-keplers-paradise.png";
import slotNeoVegas from "@/assets/slot-neovegas.png";
import slotOinkHeist from "@/assets/slot-oink-heist.png";
import slotRecklessPirates from "@/assets/slot-reckless-pirates.png";
import slotStarline from "@/assets/slot-starline.png";

interface SlotEntry {
  name: string;
  image: string;
}

const SLOTS: SlotEntry[] = [
  { name: "Barn to Mars", image: slotBarnToMars },
  { name: "Crystal Fall", image: slotCrystalFall },
  { name: "Forest of Wisps", image: slotForestOfWisps },
  { name: "Gates of Egypt", image: slotGatesOfEgypt },
  { name: "Happy Wreckers", image: slotHappyWreckers },
  { name: "Juicy Bombs", image: slotJuicyBombs },
  { name: "Keplers Paradise", image: slotKeplersParadise },
  { name: "NeoVegas", image: slotNeoVegas },
  { name: "Oink Heist Pigy Collect", image: slotOinkHeist },
  { name: "Reckless Pirates", image: slotRecklessPirates },
  { name: "Starline", image: slotStarline },
];

export function SlotsShowcase() {
  return (
    <section className="panel space-y-4 p-5">
      <div>
        <h2 className="font-display text-lg font-semibold">Slots</h2>
        <p className="text-sm text-muted-foreground">The SPRIBE slots lineup.</p>
      </div>

      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
        {SLOTS.map((slot) => (
          <div
            key={slot.name}
            title={slot.name}
            className="aspect-[3/2] overflow-hidden rounded-xl border border-border bg-surface-raised"
          >
            <img src={slot.image} alt={slot.name} className="size-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
