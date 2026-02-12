"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Container, SectionHeading } from "@/components/ui";

const SERVICE_KEYS = ["buceo", "discovery", "snorkeling", "open_water", "adaptive", "proposal", "fishing", "other"] as const;

export function BookingClient() {
  const t = useTranslations("booking");
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState("");

  useEffect(() => {
    const svc = searchParams.get("service");
    if (svc && SERVICE_KEYS.includes(svc as typeof SERVICE_KEYS[number])) {
      setService(svc);
    }
  }, [searchParams]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Booking form submitted:", data);
    setSubmitted(true);
  }

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-surface text-foreground";

  return (
    <div className="pt-28 pb-20">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-2xl shadow-sm border border-border p-6 sm:p-8">
              <h2 className="text-xl font-bold text-foreground font-[family-name:var(--font-jakarta)] mb-6">
                {t("form_title")}
              </h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-primary text-5xl mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-lg text-muted">{t("success")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                      {t("name")}
                    </label>
                    <input type="text" id="name" name="name" required placeholder={t("name_placeholder")} className={inputClasses} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                        {t("email")}
                      </label>
                      <input type="email" id="email" name="email" required placeholder={t("email_placeholder")} className={inputClasses} />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                        {t("phone")}
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border bg-background text-muted text-sm">
                          +507
                        </span>
                        <input type="tel" id="phone" name="phone" placeholder={t("phone_placeholder")} className="w-full px-4 py-3 rounded-r-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-surface text-foreground" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-foreground mb-1.5">
                      {t("service")}
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className={inputClasses}
                    >
                      <option value="">{t("service_placeholder")}</option>
                      {SERVICE_KEYS.map((key) => (
                        <option key={key} value={key}>
                          {t(`service_options.${key}`)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-foreground mb-1.5">
                        {t("date")}
                      </label>
                      <input type="date" id="date" name="date" required className={inputClasses} />
                    </div>
                    <div>
                      <label htmlFor="people" className="block text-sm font-medium text-foreground mb-1.5">
                        {t("people")}
                      </label>
                      <input type="number" id="people" name="people" min="1" max="20" required placeholder={t("people_placeholder")} className={inputClasses} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                      {t("message")}
                    </label>
                    <textarea id="message" name="message" rows={4} placeholder={t("message_placeholder")} className={`${inputClasses} resize-none`} />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent-dark text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    {t("submit")}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-surface rounded-2xl shadow-sm border border-border p-6">
              <h3 className="font-bold text-foreground font-[family-name:var(--font-jakarta)] mb-4">
                {t("contact_title")}
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="https://wa.me/50765358376"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted hover:text-foreground transition-colors"
                  >
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    +507 6535-8376
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/50765358376"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {t("whatsapp")}
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/SCUBBA507"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted hover:text-foreground transition-colors"
                  >
                    <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                    @SCUBBA507
                  </a>
                </li>
                <li className="flex items-center gap-3 text-muted">
                  <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Pixvae, Veraguas, Panama
                </li>
              </ul>
            </div>

            <div className="bg-accent/5 rounded-2xl border border-accent/20 p-6">
              <h3 className="font-bold text-foreground mb-2">{t("park_fee_title")}</h3>
              <p className="text-sm text-muted">{t("park_fee_desc")}</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
