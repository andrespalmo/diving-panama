"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale as (typeof routing.locales)[number] });
  }

  const flags: Record<string, string> = { en: "\u{1F1FA}\u{1F1F8}", es: "\u{1F1F2}\u{1F1FD}" };

  return (
    <div className="flex items-center bg-border/50 rounded-xl p-1 text-2xl">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
            locale === loc
              ? "bg-white shadow-sm scale-110"
              : "hover:bg-white/50"
          }`}
        >
          {flags[loc] ?? loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
