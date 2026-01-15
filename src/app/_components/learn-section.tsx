import { LEARN_FEATURES, PRACTICE_TASKS } from "@/lib/constants/marketing";
import {
  DisplayHeading,
  FeatureItem,
  GradientBlob,
  PillButton,
  SectionLabel,
  TaskItem,
} from "@/design-system";

export function LearnSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-indigo-100/50 overflow-hidden">
      <GradientBlob position="top-left" size="md" color="white" />
      <GradientBlob position="bottom-right" size="lg" color="white" />

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Mockups */}
          <div className="relative hidden md:block">
            <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-gray-200" />
                  <div className="size-3 rounded-full bg-gray-200" />
                  <div className="size-3 rounded-full bg-gray-200" />
                </div>
                <span className="ml-4 text-sm text-gray-500">
                  Practice Queue
                </span>
              </div>
              <div className="space-y-3">
                {PRACTICE_TASKS.map((task) => (
                  <TaskItem key={task.label} {...task} />
                ))}
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 bg-orange-50 rounded-2xl shadow-xl p-6 max-w-xs border border-orange-100">
              <h4 className="font-semibold text-gray-900 mb-3">
                Projectile Motion
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  "Initial velocity: 20 m/s",
                  "Launch angle: 45°",
                  "Find maximum height",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <div className="size-4 rounded border border-gray-300" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                Use kinematic equations to solve for the maximum height reached
                by the projectile...
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <SectionLabel>LEARN</SectionLabel>
            <DisplayHeading as="h2" size="section" className="mt-4 mb-6">
              From first concept
              <br />
              to full mastery
            </DisplayHeading>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              In Fiziks, your learning moves with you — capture ideas instantly
              across all your devices, then practice them when you're ready.
              Transform quick notes into deep understanding you're proud to
              share.
            </p>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {LEARN_FEATURES.map(({ icon: Icon, label }) => (
                <FeatureItem
                  key={label}
                  icon={<Icon className="size-5" />}
                  label={label}
                />
              ))}
            </div>

            <PillButton href="/sign-up" variant="primary" className="mt-10">
              Learn more
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
