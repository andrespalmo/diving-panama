import { useTranslations } from "next-intl";
import Image from "next/image";
import { Container, SectionHeading } from "@/components/ui";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="pt-28 pb-20">
      <Container>
        <SectionHeading title={t("title")} />

        {/* About Section */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-[family-name:var(--font-jakarta)] mb-4">
              {t("intro_title")}
            </h2>
            <p className="text-lg text-muted leading-relaxed">{t("intro_text")}</p>
          </div>
        </section>

        {/* Mission */}
        <section className="mb-20 bg-surface rounded-2xl p-8 sm:p-12 border border-border shadow-sm">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight font-[family-name:var(--font-jakarta)] mb-4">
              {t("mission_title")}
            </h2>
            <p className="text-muted leading-relaxed">{t("mission_text")}</p>
          </div>
        </section>

        {/* Coiba National Park */}
        <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-[family-name:var(--font-jakarta)] mb-4">
              {t("coiba_title")}
            </h2>
            <p className="text-muted leading-relaxed mb-4">{t("coiba_text1")}</p>
            <p className="text-muted leading-relaxed">{t("coiba_text2")}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-48 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/about/coiba.jpg"
                alt="Coiba National Park"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative h-48 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/about/coral.jpg"
                alt="Coral reef"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/about/instructors-francisco-and-sebas.jpg"
                alt="Francisco and Sebas - SCUBA 507 Instructors"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-[family-name:var(--font-jakarta)] mb-4">
                {t("team_title")}
              </h2>
              <p className="text-muted leading-relaxed">{t("team_text")}</p>
            </div>
          </div>
        </section>

        {/* Getting Here */}
        <section className="mb-20 bg-surface rounded-2xl p-8 sm:p-12 border border-border shadow-sm">
          <h2 className="text-2xl font-extrabold text-foreground tracking-tight font-[family-name:var(--font-jakarta)] mb-4 text-center">
            {t("location_title")}
          </h2>
          <p className="text-muted leading-relaxed text-center max-w-3xl mx-auto mb-8">
            {t("location_text")}
          </p>
          <div className="rounded-2xl overflow-hidden shadow-md h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15822.0!2d-81.56!3d7.63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fab7c4bbda0e3e3%3A0x0!2sPixvae%2C%20Veraguas!5e0!3m2!1sen!2spa!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SCUBA 507 Location - Pixvae, Veraguas, Panama"
            />
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-extrabold text-foreground tracking-tight font-[family-name:var(--font-jakarta)] mb-8 text-center">
            {t("contact_title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-surface shadow-sm border border-border">
              <h3 className="font-semibold text-foreground mb-2">{t("phone")}</h3>
              <a href="https://wa.me/50765358376" className="text-primary hover:text-primary-dark transition-colors font-medium">
                +507 6535-8376
              </a>
            </div>
            <div className="text-center p-6 rounded-2xl bg-surface shadow-sm border border-border">
              <h3 className="font-semibold text-foreground mb-2">{t("instagram")}</h3>
              <a
                href="https://instagram.com/SCUBBA507"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark transition-colors font-medium"
              >
                @SCUBBA507
              </a>
            </div>
            <div className="text-center p-6 rounded-2xl bg-surface shadow-sm border border-border">
              <h3 className="font-semibold text-foreground mb-2">{t("location")}</h3>
              <p className="text-muted">Pixvae, Veraguas, Panama</p>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
