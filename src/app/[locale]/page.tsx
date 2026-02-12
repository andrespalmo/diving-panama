import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Container, SectionHeading } from "@/components/ui";

const SERVICE_PREVIEW = [
  { id: "buceo", image: "/images/services/buceo.jpg" },
  { id: "discovery", image: "/images/services/discovery.jpg" },
  { id: "snorkeling", image: "/images/services/snorkeling.jpg" },
  { id: "open_water", image: "/images/services/open-water.jpg" },
  { id: "adaptive", image: "/images/services/adaptive.jpg" },
  { id: "proposal", image: "/images/services/proposal.jpg" },
] as const;

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/gallery/vibes/underwater.jpg"
            className="w-full h-full object-cover"
          >
            <source src="/videos/swiming-with-turtle.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight font-[family-name:var(--font-jakarta)] mb-6 drop-shadow-lg">
            {t("hero.headline")}
          </h1>
          <p className="text-xl sm:text-2xl text-white/80 mb-10 font-light">
            {t("hero.subtitle")}
          </p>
          <Link
            href="/services"
            className="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
          >
            {t("hero.cta")}
          </Link>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-surface">
        <Container>
          <SectionHeading
            title={t("services_preview.title")}
            subtitle={t("services_preview.subtitle")}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_PREVIEW.map(({ id, image }) => (
              <Link
                key={id}
                href={`/services#${id}`}
                className="group rounded-2xl overflow-hidden bg-surface border border-border hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-sm"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={image}
                    alt={t(`services.items.${id}.name`)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground font-[family-name:var(--font-jakarta)]">
                    {t(`services.items.${id}.name`)}
                  </h3>
                  <p className="text-sm text-muted mt-1">{t(`services.items.${id}.subtitle`)}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-primary font-bold text-lg">
                      {t(`services.items.${id}.price`)}
                    </span>
                    <span className="text-accent text-sm font-medium group-hover:translate-x-1 transition-transform">
                      {t("services_preview.learn_more")} &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Dive With Us */}
      <section className="py-24 bg-background">
        <Container>
          <SectionHeading title={t("why_us.title")} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { key: "coiba", image: "/images/gallery/landscapes/sea-landscape-2.jpg" },
              { key: "marine", image: "/images/gallery/marine/shark.jpg" },
              { key: "exclusive", image: "/images/gallery/marine/turtle.jpg" },
            ].map(({ key, image }) => (
              <div key={key} className="text-center group">
                <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-6 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={image}
                    alt={t(`why_us.${key}_title`)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground font-[family-name:var(--font-jakarta)] mb-2">
                  {t(`why_us.${key}_title`)}
                </h3>
                <p className="text-muted leading-relaxed">{t(`why_us.${key}_desc`)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Banner */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/gallery/marine/coral.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary-dark/70" />
        </div>
        <Container className="relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-[family-name:var(--font-jakarta)] mb-4">
            {t("cta_banner.title")}
          </h2>
          <p className="text-xl text-white/70 mb-10 font-light">{t("cta_banner.subtitle")}</p>
          <Link
            href="/booking"
            className="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
          >
            {t("cta_banner.button")}
          </Link>
        </Container>
      </section>
    </>
  );
}
