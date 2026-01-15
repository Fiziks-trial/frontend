import { MessageCircle, Twitter, Users } from "lucide-react";
import {
  COMMUNITY_FEATURES,
  LEADERBOARD_DATA,
} from "@/lib/constants/marketing";
import {
  DisplayHeading,
  DisplayHeadingMuted,
  FeatureRow,
  GradientBlob,
  LeaderboardRow,
  PillButton,
  SectionLabel,
} from "@/design-system";

export function CommunitySection() {
  return (
    <section className="py-16 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="lg:col-span-5">
            <SectionLabel>THE COMMUNITY</SectionLabel>
            <DisplayHeading as="h2" size="section" className="mt-6 mb-8">
              Learn together, <br />
              <DisplayHeadingMuted className="not-italic text-gray-300">
                grow together.
              </DisplayHeadingMuted>
            </DisplayHeading>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Join thousands of students mastering physics together. Share
              strategies, celebrate wins, and get help when you&apos;re stuck.
            </p>

            <div className="space-y-4 sm:space-y-6">
              {COMMUNITY_FEATURES.map(({ icon: Icon, ...feature }) => (
                <FeatureRow key={feature.title} icon={<Icon />} {...feature} />
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="lg:col-span-7 relative">
            <GradientBlob
              position="top-right"
              size="lg"
              color="indigo"
              className="opacity-50"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
              {/* Members Card */}
              <div className="bg-gray-50 rounded-4xl p-8 border border-gray-100 shadow-sm flex flex-col items-center text-center">
                <div className="size-16 bg-white rounded-2xl flex items-center justify-center text-indigo-500 shadow-sm mb-6">
                  <Users size={32} />
                </div>
                <h3 className="font-serif text-2xl text-gray-900">
                  12,450+ Members
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Active learners in our community.
                </p>
                <div className="flex -space-x-2 mt-6">
                  <div className="size-8 rounded-full bg-rose-200 border-2 border-white" />
                  <div className="size-8 rounded-full bg-sky-200 border-2 border-white" />
                  <div className="size-8 rounded-full bg-amber-200 border-2 border-white" />
                  <div className="size-8 rounded-full bg-emerald-200 border-2 border-white" />
                  <div className="size-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-500">
                    +99
                  </div>
                </div>
              </div>

              {/* Leaderboard Card */}
              <div className="bg-white rounded-4xl p-8 border border-gray-100 shadow-xl flex flex-col justify-center gap-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Top Helpers This Week
                </h4>
                {LEADERBOARD_DATA.map((row) => (
                  <LeaderboardRow key={row.rank} {...row} />
                ))}
              </div>

              {/* CTA Card */}
              <div className="sm:col-span-2 bg-sky-50 rounded-4xl p-8 border border-sky-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-serif text-2xl text-gray-900 mb-2">
                    Ready to join?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Connect with students from 50+ countries.
                  </p>
                  <div className="flex gap-3">
                    <PillButton
                      icon={<MessageCircle size={16} />}
                      variant="dark"
                      size="sm"
                    >
                      Discord
                    </PillButton>
                    <PillButton
                      icon={<Twitter size={16} />}
                      variant="outline"
                      size="sm"
                    >
                      Twitter
                    </PillButton>
                  </div>
                </div>
                <div className="relative z-10 text-left sm:text-right">
                  <p className="text-4xl font-serif text-sky-900">50+</p>
                  <p className="text-xs font-bold text-sky-700 uppercase tracking-widest">
                    Countries
                  </p>
                </div>
                <div className="absolute top-0 right-0 size-64 bg-white/30 rounded-full blur-2xl -mr-10 -mt-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
