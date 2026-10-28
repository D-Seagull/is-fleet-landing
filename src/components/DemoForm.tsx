"use client";

import type { TFunction } from "i18next";
import { useEffect, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { rich } from "@/i18n/rich";
import { cx } from "@/lib/cx";
import { API_URL, TRIAL_OPEN, site } from "@/lib/site";
import styles from "./DemoForm.module.css";
import { ArrowRightIcon, TruckIcon } from "./icons";

type Mode = "trial" | "demo";
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done"; email: string }
  | { kind: "error"; message: string };

const modeFromHash = (): Mode | null =>
  window.location.hash === "#trial" && TRIAL_OPEN ? "trial" : window.location.hash === "#demo" ? "demo" : null;

/**
 * One form, two intents. "Start free trial" creates the company on the backend and mails the
 * visitor a link to set their password; "Book a demo" sends the request to the sales inbox.
 * The page's CTAs pick the tab through the URL hash (#trial / #demo).
 */
export function DemoForm() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<Mode>(TRIAL_OPEN ? "trial" : "demo");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  useEffect(() => {
    const sync = () => {
      const m = modeFromHash();
      if (m) {
        setMode(m);
        setStatus({ kind: "idle" });
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    const d = new FormData(form);
    const str = (k: string) => String(d.get(k) ?? "");
    const email = str("email");
    const body =
      mode === "trial"
        ? { companyName: str("company"), name: str("name"), email, trucks: str("trucks"), website: str("website") }
        : {
            name: str("name"),
            company: str("company"),
            email,
            trucks: str("trucks"),
            message: str("message"),
            website: str("website"),
          };

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(`${API_URL}/public/${mode === "trial" ? "trial-signup" : "demo-request"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setStatus({ kind: "done", email });
        return;
      }
      setStatus({ kind: "error", message: errorMessage(t, res.status, str("company")) });
    } catch {
      setStatus({ kind: "error", message: errorMessage(t, 0, "") });
    }
  }

  if (status.kind === "done") {
    return (
      <div className={cx(styles.form, styles.done)} role="status" aria-live="polite">
        {mode === "trial" ? (
          <>
            <h3>{t("form.done.trialTitle")}</h3>
            <p>{rich(t("form.done.trialText", { email: status.email }), { b: (c) => <b>{c}</b> })}</p>
            <p className={styles.hint}>{t("form.done.spam")}</p>
          </>
        ) : (
          <>
            <h3>{t("form.done.demoTitle")}</h3>
            <p>{rich(t("form.done.demoText", { email: status.email }), { b: (c) => <b>{c}</b> })}</p>
          </>
        )}
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <span className={styles.badge} aria-hidden="true">
        <span className={styles.speed}><i /><i /><i /></span>
        <TruckIcon size={30} strokeWidth={1.5} />
      </span>

      <div className={styles.tabs} role="radiogroup" aria-label={t("form.tabsLabel")}>
        {(["trial", "demo"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={mode === m}
            disabled={m === "trial" && !TRIAL_OPEN}
            className={cx(styles.tab, mode === m && styles.tabActive)}
            onClick={() => {
              setMode(m);
              setStatus({ kind: "idle" });
            }}
          >
            {m === "trial" ? t("form.tabTrial") : t("form.tabDemo")}
            {m === "trial" && !TRIAL_OPEN && <span className={styles.soonBadge}>{t("form.soon")}</span>}
          </button>
        ))}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="f-name">{t("form.name")}</label>
          <input id="f-name" name="name" type="text" autoComplete="name" placeholder={t("form.namePlaceholder")} maxLength={80} required />
        </div>
        <div className={styles.field}>
          <label htmlFor="f-company">{t("form.company")}</label>
          <input
            id="f-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder={t("form.companyPlaceholder")}
            minLength={mode === "trial" ? 2 : 1}
            maxLength={100}
            required
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="f-email">{t("form.email")}</label>
          <input id="f-email" name="email" type="email" autoComplete="email" placeholder={t("form.emailPlaceholder")} maxLength={254} required />
        </div>
        <div className={styles.field}>
          <label htmlFor="f-size">{t("form.trucks")}</label>
          <select id="f-size" name="trucks" defaultValue="1–10">
            <option>1–10</option>
            <option>11–50</option>
            <option>51–200</option>
            <option>200+</option>
          </select>
        </div>
      </div>
      {mode === "demo" && (
        <div className={styles.field}>
          <label htmlFor="f-msg">{t("form.message")}</label>
          <textarea
            id="f-msg"
            name="message"
            rows={4}
            maxLength={2000}
            placeholder={t("form.messagePlaceholder")}
          />
        </div>
      )}

      {/* Honeypot: hidden from people, filled in by bots — the backend drops those requests. */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button className={styles.submit} type="submit" disabled={sending}>
        {sending ? t("form.sending") : mode === "trial" ? t("form.submitTrial") : t("form.submitDemo")}
        {!sending && <ArrowRightIcon size={20} />}
      </button>
      {mode === "trial" && (
        <p className={styles.hint}>{t("form.trialHint")}</p>
      )}
      <p className={styles.status} role="status" aria-live="polite">
        {status.kind === "error" ? status.message : ""}
      </p>
    </form>
  );
}

function errorMessage(t: TFunction, httpStatus: number, company: string): string {
  if (httpStatus === 409) return t("form.errors.exists", { company, email: site.contactEmail });
  if (httpStatus === 429) return t("form.errors.tooMany");
  if (httpStatus === 400) return t("form.errors.invalid");
  return t("form.errors.generic", { email: site.contactEmail });
}
