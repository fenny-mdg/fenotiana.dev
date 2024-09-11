import {ReactNode} from 'react';
import {Card, CardContent} from './card';

export type Skill = {title: string; description: string};

type SkillCardProps = {
  title: string;
  skills: Skill[];
  leftPanel?: ReactNode;
};

export const SkillCard = ({title, skills, leftPanel}: SkillCardProps) => {
  return (
    <Card>
      <CardContent className="flex max-lg:flex-col lg:items-center pt-4 group">
        <div className="relative w-full lg:w-1/2 shrink-0 [&>div]:w-16  [&>div]:h-16 h-48 lg:h-full flex items-center justify-center">
          {leftPanel}
        </div>
        <div className="bg-violet-500 p-8 rounded">
          <h3 className="text-xl font-medium">{title}</h3>
          <ul className="text-sm lg:text-base list-disc [&_p]:underline [&_p]:font-medium space-y-2">
            {skills.map(skill => (
              <li key={skill.title}>
                <p>{skill.title}: </p> {skill.description}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

SkillCard.displayName = 'SkillCard';
