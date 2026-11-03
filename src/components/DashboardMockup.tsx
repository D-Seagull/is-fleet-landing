/* eslint-disable @next/next/no-img-element -- static SVG wordmark inside a decorative mockup */
import { clock } from "@/i18n/clock";
import type { Locale } from "@/i18n/config";
import { getT } from "@/i18n/server";
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
  SearchIcon,
  SendIcon,
  SettingsIcon,
  SmileIcon,
  SunIcon,
  SwapIcon,
  TrashIcon,
  TruckIcon,
  UsersIcon,
  WrenchIcon,
} from "./icons";

// A static copy of the web app's "My Trucks" screen (is-fleet-frontend /my-trucks, 2026 redesign): the dark
// rail with the wordmark, the header search, the truck list on the left and the selected truck's current trip
// and trip chat on the right. Plates and names are made up and stay the same in every language; the app's own
// labels and the chat are translated (the labels are the app's own translations).
type Status = "ON_WAY" | "ON_SITE" | "LOADED";

// Status colours, as in the app (lib/status-tone): moving → green, waiting at a stop → blue.
const TONE: Record<Status, string> = { ON_WAY: styles.go, LOADED: styles.go, ON_SITE: styles.load };

const trucks: Array<{
  plate: string;
  driver: string;
  status: Status;
  /** In the app now (green dot) — otherwise "last in the app" with this time. */
  seen?: string;
  unread?: number;
  note?: boolean;
  active?: boolean;
}> = [
  { plate: "WGM4821", driver: "Piotr Zieliński", status: "ON_WAY", seen: "18:06", note: true },
  { plate: "DW52190", driver: "Oleksandr Melnyk", status: "ON_SITE", seen: "14:39", unread: 2 },
  { plate: "PO7315K", driver: "Andrii Kovalenko", status: "ON_WAY" },
  { plate: "KR1042T", driver: "Tomasz Nowak", status: "LOADED", active: true },
];

const rail = [
  { icon: BookmarkIcon, key: "mock.myTrucks", active: true },
  { icon: TruckIcon, key: "mock.trucks" },
  { icon: RouteIcon, key: "mock.trips" },
  { icon: UsersIcon, key: "mock.drivers" },
  { icon: HeadsetIcon, key: "mock.managers" },
  { icon: MessageIcon, key: "mock.chat", dot: true },
  { icon: SettingsIcon, key: "mock.settings" },
] as const;

/** EU number plate: white, dark rim, blue band on the left (components/license-plate.tsx). */
function Plate({ children, large = false }: { children: string; large?: boolean }) {
  return (
    <span className={cx(styles.plate, large && styles.plateLarge)}>
      <i />
      {children}
    </span>
  );
}

// Message reactions as the app draws them: a set emoji next to the bubble, or the idle 👍 trigger, greyed out.
function Reaction({ emoji }: { emoji?: string }) {
  return <span className={emoji ? styles.reaction : styles.reactionIdle}>{emoji ?? "👍"}</span>;
}

/** `intro`: tag the window and its rows for the hero's load-in animation (Motion.tsx). */
export function DashboardMockup({ lng, intro = false }: { lng: Locale; intro?: boolean }) {
  const t = getT(lng);
  const item = intro ? { "data-mock-item": "" } : {};
  return (
    <div
      className={styles.frame}
      data-hero-dash={intro ? "" : undefined}
      role="img"
      aria-label={t("mock.desk.aria")}
    >
      <div className={styles.app} aria-hidden="true">
        <aside className={styles.rail}>
          <div className={styles.brand}>
            <img src="/logo-on-dark.svg" alt="" />
          </div>
          <nav className={styles.nav}>
            {rail.map(({ icon: RailIcon, key, ...rest }) => (
              <span key={key} className={cx(styles.navItem, "active" in rest && styles.navActive)}>
                <span className={styles.navIcon}>
                  <RailIcon size={15} />
                  {"dot" in rest && <i className={styles.navDot} />}
                </span>
                {t(key)}
              </span>
            ))}
          </nav>
          <div className={styles.me}>
            <span className={styles.meAvatar}>AK<i /></span>
            <span className={styles.meText}>
              <b>Anna Kowalczyk</b>
              <span>{t("mock.desk.role")}</span>
            </span>
            <ChevronDownIcon size={12} className={styles.meChevron} />
          </div>
        </aside>

        <div className={styles.inset}>
          <header className={styles.topbar}>
            <PanelLeftIcon size={15} />
            <span className={styles.search}>
              <SearchIcon size={13} />
              {t("mock.desk.search")}
            </span>
            <span className={styles.topIcons}>
              <span className={styles.bell}>
                <BellIcon size={15} />
                <i>2</i>
              </span>
              <SunIcon size={15} />
            </span>
          </header>

          <div className={styles.body}>
            <section className={styles.list}>
              <div className={styles.listHead}>
                <TruckIcon size={14} />
                <b>{t("mock.myTrucks")}</b>
                <span className={styles.grow} />
                <MegaphoneIcon size={14} />
              </div>
              <div className={styles.cards}>
                {trucks.map((truck) => (
                  <div key={truck.plate} className={cx(styles.card, truck.active && styles.cardActive)} {...item}>
                    <div className={styles.cardTop}>
                      <Plate>{truck.plate}</Plate>
                      <span className={styles.grow} />
                      {truck.unread && <span className={styles.unread}>{truck.unread}</span>}
                      <span className={cx(styles.badge, TONE[truck.status])}>{t(`mock.status.${truck.status}`)}</span>
                    </div>
                    <span className={styles.driver}>
                      {truck.driver}
                      {!truck.seen && <i className={styles.online} />}
                    </span>
                    {truck.seen && (
                      <span className={styles.seen}>{t("mock.desk.lastSeen", { when: clock(lng, truck.seen) })}</span>
                    )}
                    {truck.note && (
                      <span className={styles.note}>
                        <WrenchIcon size={11} />
                        {t("mock.desk.note")}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.main}>
              <div className={styles.mainHead}>
                <b className={styles.title}>KR1042T</b>
                <span className={styles.headDriver}>
                  <i className={styles.online} />
                  {t("mock.desk.driverLabel", { name: "Tomasz Nowak" })}
                </span>
              </div>

              <div className={styles.tabsRow}>
                <span className={styles.tabs}>
                  <span className={styles.tabActive}>{t("mock.chat")}</span>
                  <span>{t("mock.trips")}</span>
                  <span>{t("mock.documents")}</span>
                  <span>{t("mock.alarm")}</span>
                  <span>{t("mock.info")}</span>
                </span>
                <span className={styles.grow} />
                <span className={styles.newTrip}>
                  <PlusIcon size={13} />
                  {t("mock.desk.newTrip")}
                </span>
              </div>

              <div className={styles.trip}>
                <span className={styles.tripRoute}>PL 61-131 Poznań → FR 69007 Lyon</span>
                <span className={styles.tripMeta}>· #FT26093549</span>
                <span className={styles.docCount}>
                  <FolderIcon size={12} />
                  16
                </span>
                <span className={styles.grow} />
                <span className={cx(styles.badge, styles.go)}>
                  {t("mock.status.LOADED")}
                  <ChevronDownIcon size={11} />
                </span>
                <span className={styles.tripActions}>
                  <SwapIcon size={13} />
                  <PencilIcon size={13} />
                  <TrashIcon size={13} />
                  <ChevronDownIcon size={13} />
                </span>
              </div>

              <div className={styles.chat}>
                <div className={styles.outRow} {...item}>
                  <span className={styles.line}>
                    <Reaction emoji="👍" />
                    <span className={styles.bubbleOut}>{t("mock.msg.loading")}</span>
                  </span>
                  <span className={styles.time}>
                    {clock(lng, "07:12")} <CheckCheckIcon size={11} className={styles.read} />
                  </span>
                </div>
                <div className={styles.inRow} {...item}>
                  <span className={styles.author}>Tomasz Nowak</span>
                  <span className={styles.line}>
                    <span className={styles.avatar}>TN</span>
                    <span className={styles.bubbleIn}>{t("mock.msg.onSite")}</span>
                    <Reaction emoji="😢" />
                  </span>
                  <span className={cx(styles.time, styles.timeIn)}>{clock(lng, "09:41")}</span>
                </div>
                <div className={styles.inRow} {...item}>
                  <span className={styles.author}>Tomasz Nowak</span>
                  <span className={styles.line}>
                    <span className={styles.avatar}>TN</span>
                    <span className={styles.bubbleIn}>{t("mock.msg.loaded")}</span>
                    <Reaction emoji="👍" />
                  </span>
                  <span className={cx(styles.time, styles.timeIn)}>{clock(lng, "15:55")}</span>
                </div>
                <div className={styles.inRow} {...item}>
                  <span className={styles.line}>
                    <span className={styles.avatar}>TN</span>
                    <span className={cx(styles.bubbleIn, styles.file)}>
                      <FileIcon size={13} />
                      CMR_signed.jpg
                    </span>
                    <Reaction />
                  </span>
                  <span className={cx(styles.time, styles.timeIn)}>{clock(lng, "15:56")}</span>
                </div>
                <div className={styles.outRow} {...item}>
                  <span className={styles.line}>
                    <Reaction emoji="😮" />
                    <span className={styles.bubbleOut}>{t("mock.msg.slot")}</span>
                  </span>
                  <span className={styles.time}>
                    {clock(lng, "16:03")} <CheckCheckIcon size={11} className={styles.read} />
                  </span>
                </div>
              </div>

              <div className={styles.composer}>
                <PaperclipIcon size={15} />
                <SmileIcon size={15} />
                <span className={styles.input}>{t("mock.desk.typeMessage")}</span>
                <span className={styles.send}>
                  <SendIcon size={14} />
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
