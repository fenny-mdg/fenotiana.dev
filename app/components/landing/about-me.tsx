import { useTranslation } from "react-i18next";
import Title from "../title.tsx";
import Container from "./container.tsx";
import type { StackProps } from "../stack.tsx";
import StackListing from "../stack.tsx";

import ReactIcon from "../icon/react.tsx";
import TypescriptIcon from "../icon/typescript.tsx";
import ViteIcon from "../icon/vite.tsx";
import TailwindcssIcon from "../icon/tailwindcss.tsx";
import NodejsIcon from "../icon/nodejs.tsx";
import PostgresIcon from "../icon/postgresql.tsx";
import AngularIcon from "../icon/angular.tsx";
import ApacheIcon from "../icon/apache.tsx";
import AwsIcon from "../icon/aws.tsx";
import DockerIcon from "../icon/docker.tsx";
import MongoIcon from "../icon/mongo.tsx";
import MySqlIcon from "../icon/mysql.tsx";
import TerraformIcon from "../icon/terraform.tsx";

const preferedStack: StackProps["stacks"] = [
  { image: <ReactIcon />, href: "https://reactjs.org/" },
  { image: <TypescriptIcon />, href: "https://www.typescriptlang.org/" },
  { image: <ViteIcon />, href: "https://vitejs.dev/" },
  { image: <TailwindcssIcon />, href: "https://tailwindcss.com/" },
  { image: <NodejsIcon />, href: "https://nodejs.org/" },
  { image: <PostgresIcon />, href: "https://www.postgresql.org/" },
];

const otherStack: StackProps["stacks"] = [
  { image: <AngularIcon />, href: "https://angular.io/" },
  { image: <ApacheIcon />, href: "https://httpd.apache.org/" },
  { image: <AwsIcon />, href: "https://aws.amazon.com/" },
  { image: <DockerIcon />, href: "https://www.docker.com/" },
  { image: <MongoIcon />, href: "https://www.mongodb.com//" },
  { image: <MySqlIcon />, href: "https://www.mysql.com/" },
  { image: <TerraformIcon />, href: "https://www.terraform.io/" },
];

export default function AboutMe() {
  const { t } = useTranslation();
  return (
    <Container className="!h-fit flex-col p-8">
      <Title>{t("aboutMe.title")}</Title>

      <p>{t("aboutMe.biography")}</p>

      <StackListing
        title={t("aboutMe.favouriteStacks")}
        stacks={preferedStack}
      />
      <StackListing title={t("aboutMe.otherStacks")} stacks={otherStack} />
    </Container>
  );
}
