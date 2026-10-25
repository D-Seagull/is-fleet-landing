"use client";

import { useEffect, useState, type FormEvent } from "react";
import { cx } from "@/lib/cx";
import { API_URL, site } from "@/lib/site";
import styles from "./DemoForm.module.css";
import { ArrowRightIcon, TruckIcon } from "./icons";

type Mode = "trial" | "demo";
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done"; email: string }
  | { kind: "error"; message: string };

const modeFromHash = (): Mode | null =>
  window.location.hash === "#trial" ? "trial" : window.location.hash === "#demo" ? "demo" : null;

/**
 * One form, two intents. "Start free trial" creates the company on the backend and mails the
 * visitor a link to set their password; "Book a demo" sends the request to the sales inbox.
 * The page's CTAs pick the tab through the URL hash (#trial / #demo).
 */
export function DemoForm() {
  const [mode, setMode] = useState<Mode>("trial");
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
      setStatus({ kind: "error", message: errorMessage(res.status, str("company")) });
    } catch {
      setStatus({ kind: "error", message: errorMessage(0, "") });
    }
  }

  if (status.kind === "done") {
    return (
      <div className={cx(styles.form, styles.done)} role="status" aria-live="polite">
        {mode === "trial" ? (
          <>
            <h3>Check your inbox</h3>
            <p>
              We&apos;ve sent a link to <b>{status.email}</b>. Open it to set your password and sign in to your
              new workspace — then add your trucks, managers and drivers.
            </p>
            <p className={styles.hint}>No email in a few minutes? Check the spam folder.</p>
          </>
        ) : (
          <>
            <h3>Thanks — we got your request</h3>
            <p>
              We&apos;ll get back to you at <b>{status.email}</b> shortly to set up a demo on your own routes.
            </p>
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

      <div className={styles.tabs} role="radiogroup" aria-label="What would you like to do?">
        {(["trial", "demo"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={mode === m}
            className={cx(styles.tab, mode === m && styles.tabActive)}
            onClick={() => {
              setMode(m);
              setStatus({ kind: "idle" });
            }}
          >
            {m === "trial" ? "Start free trial" : "Book a demo"}
          </button>
        ))}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="f-name">Your name</label>
          <input id="f-name" name="name" type="text" autoComplete="name" placeholder="John Doe" maxLength={80} required />
        </div>
        <div className={styles.field}>
          <label htmlFor="f-company">Company</label>
          <input
            id="f-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Your company name"
            minLength={mode === "trial" ? 2 : 1}
            maxLength={100}
            required
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="f-email">Work email</label>
          <input id="f-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" maxLength={254} required />
        </div>
        <div className={styles.field}>
          <label htmlFor="f-size">Number of trucks</label>
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
          <label htmlFor="f-msg">Anything we should know?</label>
          <textarea
            id="f-msg"
            name="message"
            rows={4}
            maxLength={2000}
            placeholder="Tell us about your fleet, routes or special requirements…"
          />
        </div>
      )}

      {/* Honeypot: hidden from people, filled in by bots — the backend drops those requests. */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button className={styles.submit} type="submit" disabled={sending}>
        {sending ? "Sending…" : mode === "trial" ? "Start free trial" : "Book a Demo"}
        {!sending && <ArrowRightIcon size={20} />}
      </button>
      {mode === "trial" && (
        <p className={styles.hint}>We&apos;ll email you a link to set your password. No card needed.</p>
      )}
      <p className={styles.status} role="status" aria-live="polite">
        {status.kind === "error" ? status.message : ""}
      </p>
    </form>
  );
}

function errorMessage(httpStatus: number, company: string): string {
  if (httpStatus === 409)
    return `“${company}” is already on IS Fleet. Ask your team lead for an invite, or write to ${site.contactEmail}.`;
  if (httpStatus === 429) return "Too many attempts. Please try again in an hour.";
  if (httpStatus === 400) return "Please check the fields and try again.";
  return `Something went wrong. Please try again, or write to us at ${site.contactEmail}.`;
}
