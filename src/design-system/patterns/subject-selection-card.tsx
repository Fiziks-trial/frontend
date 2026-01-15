import { Card } from "../primitives/card";
import { Badge } from "../primitives/badge";
import { Text } from "../primitives/text";
import { SUBJECTS, type Subject } from "../constants/subjects";

export interface SubjectSelectionCardProps {
  subject: Subject;
  description?: string;
  isSelected: boolean;
  onClick: () => void;
}

export function SubjectSelectionCard({
  subject,
  description,
  isSelected,
  onClick,
}: SubjectSelectionCardProps) {
  const subjectConfig = SUBJECTS[subject];
  const Icon = subjectConfig.icon;

  return (
    <Card
      hover
      className={[
        "cursor-pointer transition-all",
        isSelected && "ring-2 ring-primary ring-offset-2",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div
          className={[
            "p-3 rounded-xl",
            subjectConfig.bgColor,
            subjectConfig.color,
          ].join(" ")}
        >
          <Icon size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Text variant="h4">{subjectConfig.label}</Text>
            {isSelected && (
              <Badge variant="info" size="sm">
                Selected
              </Badge>
            )}
          </div>
          {description && (
            <Text variant="body-sm" color="muted" className="mt-1 line-clamp-2">
              {description}
            </Text>
          )}
        </div>
      </div>
    </Card>
  );
}
