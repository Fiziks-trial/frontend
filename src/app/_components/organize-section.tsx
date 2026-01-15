import { ORGANIZE_CARDS } from "@/lib/constants/marketing";
import { DisplayHeading, FeatureCard, SectionLabel } from "@/design-system";

export function OrganizeSection() {
  return (
    <section className="py-16 sm:py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <SectionLabel>ORGANIZE</SectionLabel>
        <DisplayHeading as="h2" size="section" className="mt-4 mb-6">
          Structure That Adapts
          <br />
          to Your Learning
        </DisplayHeading>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12 sm:mb-16">
          Choose any approach that fits your style: organize with subjects,
          topics and tags, or build rich study plans with collections.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ORGANIZE_CARDS.map(({ icon: Icon, ...card }) => (
            <FeatureCard
              key={card.title}
              {...card}
              icon={<Icon className="size-6" />}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
