import { useTranslation } from "react-i18next";
import Button from "../button/button";
import Input from "../input/input";
import Textarea from "../input/textarea";
import Title from "../title";
import Container from "./container";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <Container className="!h-fit flex-col p-8">
      <Title>{t("contact.title")}</Title>
      <form
        className="flex h-fit w-full flex-wrap gap-8"
        method="post"
        action="/contact"
      >
        <Input
          name="fullname"
          placeholder={t("contact.fullNamePlaceholder") || ""}
          label={t("contact.fullNameLabel") || ""}
          className=" h-14 w-full md:w-[calc(50%-1rem)]"
          required
        />
        <Input
          type="email"
          name="email"
          placeholder={t("contact.emailPlaceholder") || ""}
          label={t("contact.emailLabel") || ""}
          className=" h-14 w-full md:w-[calc(50%-1rem)]"
          required
        />
        <Textarea
          name="message"
          placeholder={t("contact.messagePlaceholder") || ""}
          label={t("contact.messageLabel") || ""}
          className="w-full"
          required
        />

        <div className="flex-1"></div>
        <Button type="submit">{t("contact.sendButton")}</Button>
      </form>
    </Container>
  );
}
