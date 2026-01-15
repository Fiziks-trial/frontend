"use client";

import {
  Card,
  Text,
  SubjectRating,
  SUBJECTS,
  type Subject,
} from "@/design-system";

interface SubjectRatingData {
  subject: Subject;
  rating: string;
  progress: number;
}

interface SubjectRatingsCardProps {
  ratings: SubjectRatingData[];
}

export function SubjectRatingsCard({ ratings }: SubjectRatingsCardProps) {
  return (
    <Card className="lg:col-span-4">
      <Text variant="h3" serif className="mb-4">
        Subject Ratings
      </Text>
      <div className="space-y-4">
        {ratings.map((item) => {
          const subjectConfig = SUBJECTS[item.subject];
          return (
            <SubjectRating
              key={item.subject}
              icon={<subjectConfig.icon size={16} />}
              subject={subjectConfig.label}
              rating={item.rating}
              progress={item.progress}
              color={item.subject}
            />
          );
        })}
      </div>
    </Card>
  );
}
