"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import styles from "./DemoForm.module.css";
import { ArrowRightIcon, TruckIcon } from "./icons";

// No backend endpoint yet: submitting opens the visitor's mail client with the request pre-filled.
export function DemoForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    const d = new FormData(form);
    const company = String(d.get("company"));
    const body = [
      `Name: ${d.get("name")}`,
      `Company: ${company}`,
      `Email: ${d.get("email")}`,
      `Trucks: ${d.get("trucks")}`,
      "",
      String(d.get("message") ?? ""),
    ].join("\n");

    window.location.href =
      `mailto:${site.contactEmail}?subject=${encodeURIComponent(`IS Fleet demo request — ${company}`)}` +
      `&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <span className={styles.badge} aria-hidden="true">
        <span className={styles.speed}><i /><i /><i /></span>
        <TruckIcon size={30} strokeWidth={1.5} />
      </span>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="f-name">Your name</label>
          <input id="f-name" name="name" type="text" autoComplete="name" placeholder="John Doe" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="f-company">Company</label>
          <input id="f-company" name="company" type="text" autoComplete="organization" placeholder="Your company name" required />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="f-email">Work email</label>
          <input id="f-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
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
      <div className={styles.field}>
        <label htmlFor="f-msg">Anything we should know?</label>
        <textarea
          id="f-msg"
          name="message"
          rows={4}
          placeholder="Tell us about your fleet, routes or special requirements…"
        />
      </div>
      <button className={styles.submit} type="submit">
        Book a Demo
        <ArrowRightIcon size={20} />
      </button>
      <p className={styles.status} role="status" aria-live="polite">
        {sent ? "Thanks! Your email app should open with the request ready to send." : ""}
      </p>
    </form>
  );
}
