/* eslint-disable @next/next/no-img-element -- static SVG wordmark inside a decorative mockup */
import { cx } from "@/lib/cx";
import styles from "./DashboardMockup.module.css";
import {
  BellIcon,
  BookmarkIcon,
  CheckCheckIcon,
  ChevronDownIcon,
  FileIcon,
  FolderIcon,
  HeadsetIcon,
  MegaphoneIcon,
  MessageIcon,
  PanelLeftIcon,
  PaperclipIcon,
  PencilIcon,
  PlusIcon,
  RouteIcon,
  SendIcon,
  SettingsIcon,
  SmileIcon,
  SunIcon,
  SwapIcon,
  TrashIcon,
  TruckIcon,
  UsersIcon,
} from "./icons";

// A static copy of the web app's "My Trucks" screen (is-fleet-frontend /my-trucks): truck list on the
// left, the selected truck's current trip and its trip chat on the right. Names and truck numbers are made up.
type Status = "ON_WAY" | "ON_SITE" | "LOADED";

const statusLabel: Record<Status, string> = { ON_WAY: "On Way", ON_SITE: "On Site", LOADED: "Loaded" };

// Driver presence dot, as in the app: green = online, amber = away.
const trucks: Array<{ unit: string; driver: string; status: Status; online: boolean; active?: boolean }> = [
  { unit: "Truck 104", driver: "Tomasz Nowak", status: "LOADED", online: true, active: true },
  { unit: "Truck 117", driver: "Oleksandr Melnyk", status: "ON_SITE", online: false },
  { unit: "Truck 122", driver: "Andrii Kovalenko", status: "ON_WAY", online: true },
];

const rail = [
  { icon: BookmarkIcon, label: "My Trucks", active: true },
  { icon: TruckIcon, label: "Trucks" },
  { icon: RouteIcon, label: "Trips" },
  { icon: UsersIcon, label: "Drivers" },
  { icon: HeadsetIcon, label: "Managers" },
  { icon: MessageIcon, label: "Chat" },
  { icon: SettingsIcon, label: "Settings" },
];


// Message reactions as the app draws them (message-reactions.tsx): a set emoji next to the bubble,
// or the idle 👍 trigger, faded and greyed out. The app's set is 👍 😮 😢.
function Reaction({ emoji }: { emoji?: string }) {
  return <span className={emoji ? styles.reaction : styles.reactionIdle}>{emoji ?? "👍"}</span>;
}

/** `intro`: tag the window and its rows for the hero's load-in animation (Motion.tsx). */
export function DashboardMockup({ intro = false }: { intro?: boolean }) {
  const item = intro ? { "data-mock-item": "" } : {};
  return (
    <div
      className={styles.frame}
      data-hero-dash={intro ? "" : undefined}
      role="img"
      aria-label="The IS Fleet web app: a manager's trucks with their trip status, and the selected truck's current trip — route, documents and the trip conversation with the driver"
    >
      <div className={styles.app} aria-hidden="true">
        <header className={styles.topbar}>
          <img src="/logo.svg" alt="" className={styles.logo} />
          <PanelLeftIcon size={14} />
          <span className={styles.grow} />
          <BellIcon size={14} />
          <SunIcon size={14} />
        </header>

        <div className={styles.body}>
          <aside className={styles.rail}>
            {rail.map(({ icon: RailIcon, label, active }) => (
              <span key={label} className={cx(styles.railItem, active && styles.railActive)}>
                <RailIcon size={14} />
              </span>
            ))}
            <span className={styles.grow} />
            <span className={styles.me}>AK<i /></span>
          </aside>

          <section className={styles.list}>
            <div className={styles.listHead}>
              <TruckIcon size={13} />
              <b>My Trucks</b>
              <span className={styles.grow} />
              <MegaphoneIcon size={13} />
            </div>
            {trucks.map((t) => (
              <div key={t.unit} className={cx(styles.truck, t.active && styles.truckActive)} {...item}>
                <div className={styles.truckTop}>
                  <span className={styles.unit}>{t.unit}</span>
                  <span className={cx(styles.pill, styles[t.status])}>{statusLabel[t.status]}</span>
                </div>
                <span className={styles.driver}>{t.driver}<i className={t.online ? styles.dotOnline : styles.dotAway} /></span>
              </div>
            ))}
          </section>

          <section className={styles.main}>
            <div className={styles.mainHead}>
              <b className={styles.truckTitle}>Truck 104</b>
              <span className={styles.lastSeen}><i className={styles.dotOnline} />Driver: Tomasz Nowak · online</span>
            </div>
            <div className={styles.tabsRow}>
              <span className={styles.tabs}>
                <span className={styles.tabActive}>Chat</span>
                <span>Trips</span>
                <span>Documents</span>
                <span className={styles.tabExtra}>Alarm</span>
                <span className={styles.tabExtra}>Info</span>
              </span>
              <span className={styles.grow} />
              <span className={styles.newTrip}><PlusIcon size={12} />New Trip</span>
            </div>

            <div className={styles.tripBar}>
              <span className={styles.tripRoute}>PL 61-131 Poznań → FR 69007 Lyon</span>
              <span className={styles.tripMeta}>· #FT26093549</span>
              <span className={styles.docCount}><FolderIcon size={11} />16</span>
              <span className={styles.grow} />
              <span className={cx(styles.pill, styles.LOADED)}>Loaded<ChevronDownIcon size={10} /></span>
              <span className={styles.tripActions}>
                <SwapIcon size={12} />
                <PencilIcon size={12} />
                <TrashIcon size={12} className={styles.danger} />
              </span>
            </div>

            <div className={styles.chat}>
              <div className={styles.outRow} {...item}>
                <span className={styles.line}>
                  <Reaction emoji="👍" />
                  <span className={styles.bubbleOut}>Loading in Poznań today 08:00–10:00, dock 4.</span>
                </span>
                <span className={styles.time}>07:12 AM <CheckCheckIcon size={11} className={styles.read} /></span>
              </div>
              <div className={styles.inRow} {...item}>
                <span className={styles.avatar}>TN</span>
                <div className={styles.inCol}>
                  <span className={styles.author}>Tomasz Nowak</span>
                  <span className={styles.line}>
                    <span className={styles.bubbleIn}>On site, waiting for the dock.</span>
                    <Reaction emoji="😢" />
                  </span>
                  <span className={styles.time}>09:41 AM</span>
                </div>
              </div>
              <div className={styles.inRow} {...item}>
                <span className={styles.avatar}>TN</span>
                <div className={styles.inCol}>
                  <span className={styles.line}>
                    <span className={styles.bubbleIn}>Loaded, 33 pallets. Leaving Poznań now.</span>
                    <Reaction emoji="👍" />
                  </span>
                  <span className={styles.time}>03:55 PM</span>
                </div>
              </div>
              <div className={styles.inRow} {...item}>
                <span className={styles.avatar}>TN</span>
                <div className={styles.inCol}>
                  <span className={styles.line}>
                    <span className={cx(styles.bubbleIn, styles.file)}><FileIcon size={13} />CMR_signed.jpg</span>
                    <Reaction />
                  </span>
                  <span className={styles.time}>03:56 PM</span>
                </div>
              </div>
              <div className={styles.outRow} {...item}>
                <span className={styles.line}>
                  <Reaction emoji="😮" />
                  <span className={styles.bubbleOut}>Unloading slot moved to Wed 06:00 — earlier than planned.</span>
                </span>
                <span className={styles.time}>04:03 PM <CheckCheckIcon size={11} className={styles.read} /></span>
              </div>
            </div>

            <div className={styles.composer}>
              <PaperclipIcon size={13} />
              <SmileIcon size={13} />
              <span className={styles.input}>Type a message…</span>
              <span className={styles.send}><SendIcon size={12} /></span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
