import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Container, SectionHeading } from "@/components/ui";

const SERVICES: {
  id: string;
  image: string;
  minGroup?: number;
  maxGroup?: number;
  pricing: string;
}[] = [
  { id: "buceo", image: "/images/services/buceo.jpg", minGroup: 3, pricing: "per_person" },
  { id: "discovery", image: "/images/services/discovery.jpg", minGroup: 2, pricing: "per_person" },
  { id: "snorkeling", image: "/images/services/snorkeling.jpg", minGroup: 5, pricing: "per_person" },
  { id: "open_water", image: "/images/services/open-water.jpg", pricing: "per_person" },
  { id: "adaptive", image: "/images/services/adaptive.jpg", maxGroup: 2, pricing: "per_person" },
  { id: "proposal", image: "/images/services/proposal.jpg", minGroup: 2, pricing: "couple" },
];

export default function ServicesPage() {
  const t = useTranslations();

  return (
    <div className="pt-28 pb-20">
      <Container>
        <SectionHeading title={t("services.title")} subtitle={t("services.subtitle")} />

        {/* Park Fee Notice */}
        <div className="mb-14 p-6 rounded-2xl bg-accent/5 border border-accent/20 text-center">
          <h3 className="font-bold text-foreground text-lg mb-2">{t("services.park_fee_title")}</h3>
          <p className="text-muted">{t("services.park_fee_desc")}</p>
        </div>

        {/* Service Cards */}
        <div className="space-y-20">
          {SERVICES.map(({ id, image, minGroup, maxGroup, pricing }, idx) => {
            const includes: string[] = t.raw(`services.items.${id}.includes`);
            const isEven = idx % 2 === 0;

            return (
              <section
                key={id}
                id={id}
                className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
              >
                <div className={`relative h-80 lg:h-[28rem] rounded-2xl overflow-hidden shadow-lg ${!isEven ? "lg:order-2" : ""}`}>
                  <Image
                    src={image}
                    alt={t(`services.items.${id}.name`)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className={!isEven ? "lg:order-1" : ""}>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-[family-name:var(--font-jakarta)]">
                      {t(`services.items.${id}.name`)}
                    </h2>
                    <span className="bg-primary text-white px-4 py-1.5 rounded-full text-lg font-bold">
                      {t(`services.items.${id}.price`)}
                    </span>
                  </div>
                  <p className="text-sm text-muted mb-1">
                    {t(`services.items.${id}.subtitle`)} &middot;{" "}
                    {pricing === "couple" ? t("services.couple") : t("services.per_person")}
                  </p>
                  {minGroup ? (
                    <p className="text-sm text-muted mb-4">
                      {t("services.min_group", { count: minGroup })}
                    </p>
                  ) : maxGroup ? (
                    <p className="text-sm text-muted mb-4">
                      {t("services.max_group", { count: maxGroup })}
                    </p>
                  ) : (
                    <div className="mb-4" />
                  )}
                  <p className="text-foreground/80 mb-6 leading-relaxed">{t(`services.items.${id}.description`)}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">{t("services.includes")}</h4>
                    <ul className="space-y-2">
                      {includes.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-foreground/80">
                          <svg className="w-5 h-5 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {id !== "proposal" && (
                    <p className="text-sm text-muted bg-accent/5 px-4 py-3 rounded-xl mb-6 border border-accent/10">
                      <strong className="text-foreground">{t("services.not_includes")}:</strong>{" "}
                      {t("services.park_fee_desc")}
                    </p>
                  )}

                  <p className="text-sm text-muted mb-5">
                    <span className="font-medium text-foreground/70">{t(`services.items.${id}.audience`)}</span>
                  </p>

                  <Link
                    href={`/booking?service=${id}`}
                    className="inline-block bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                  >
                    {t("services.book_service")}
                  </Link>
                </div>
              </section>
            );
          })}
        </div>

        {/* Additional Services */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl bg-surface border border-border text-center shadow-sm">
            <h3 className="font-bold text-foreground text-lg mb-2">{t("services.fishing_title")}</h3>
            <p className="text-muted">{t("services.fishing_desc")}</p>
          </div>
          <div className="p-8 rounded-2xl bg-surface border border-border text-center shadow-sm">
            <h3 className="font-bold text-foreground text-lg mb-2">{t("services.accommodation_title")}</h3>
            <p className="text-muted">{t("services.accommodation_desc")}</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
