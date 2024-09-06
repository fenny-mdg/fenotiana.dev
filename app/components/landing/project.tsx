import { useTranslation } from "react-i18next";

import ProjectCard from "../project-card";
import Title from "../title";
import Container from "./container";
import bsaPreview from "../../../public/images/bsa-preview.png";
import chatPreview from "../../../public/images/chat-preview.png";

export type Project = {
  title: string;
  link?: string;
  description: string;
  preview?: string;
};

const projects: Array<Project> = [
  {
    title: "project.bsa-title",
    description: "project.bsa-description",
    link: "https://bsa-utils.vercel.app/",
    preview: bsaPreview,
  },
  {
    title: "project.chat-title",
    description: "project.chat-description",
    link: "https://chat.fenotiana.dev/",
    preview: chatPreview,
  },
];

export default function ProjectSection() {
  const { t } = useTranslation();

  return (
    <Container className="!h-fit flex-col p-8">
      <Title>{t("project.title")}</Title>

      <div className="flex flex-wrap justify-center gap-8 md:justify-start">
        {projects?.map(({ title, description, preview, link }) => (
          <ProjectCard
            key={title}
            title={t(title) || title}
            description={t(description) || description}
            preview={preview}
            link={link}
          />
        ))}
      </div>
    </Container>
  );
}
