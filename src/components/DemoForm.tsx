"use client";

import { useState, type FormEvent } from "react";
import { cx } from "@/lib/cx";
import { site } from "@/lib/site";
import ui from "@/styles/ui.module.css";
import styles from "./DemoForm.module.css";

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
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="f-name">Your name</label>
          <input id="f-name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="f-company">Company</label>
          <input id="f-company" name="company" type="text" autoComplete="organization" required />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="f-email">Work email</label>
          <input id="f-email" name="email" type="email" autoComplete="email" required />
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
        <textarea id="f-msg" name="message" rows={4} />
      </div>
      <button className={cx(ui.btn, ui.primary, ui.block, styles.submit)} type="submit">Book a Demo</button>
      <p className={styles.status} role="status" aria-live="polite">
        {sent ? "Thanks! Your email app should open with the request ready to send." : ""}
      </p>
    </form>
  );
}
