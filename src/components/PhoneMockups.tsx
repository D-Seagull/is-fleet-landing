import type { ReactNode } from "react";
import type { TFunction } from "i18next";
import { clock } from "@/i18n/clock";
import type { Locale } from "@/i18n/config";
import { getT } from "@/i18n/server";
import { cx } from "@/lib/cx";
import {
  AlarmIcon,
  BellIcon,
  BookmarkIcon,
  BugIcon,
  CameraIcon,
  CheckCheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CircleIcon,
  CopyIcon,
  FolderIcon,
  ListIcon,
  MapIcon,
  MapPinIcon,
  MenuIcon,
  MessageIcon,
  NavigationIcon,
  PaperclipIcon,
  PhoneCallIcon,
  SendIcon,
  SettingsIcon,
  SmileIcon,
  SunIcon,
  TruckIcon,
  UsersIcon,
} from "./icons";
import styles from "./PhoneMockups.module.css";

// Static copies of the two phone apps, showing the same trip as the desktop mockup:
// IS Manager's home screen (is-manager) and IS Driver's trip screen (is-driver app/(driver)/trip.tsx).
// People's names, truck numbers and addresses stay the same in every language.

function Phone({ label, children, overlay }: { label: string; children: ReactNode; overlay?: ReactNode }) {
  return (
    <div className={styles.phone} role="img" aria-label={label} data-story-phone>
      <div className={styles.screen} aria-hidden="true">
        <div className={styles.statusBar}>
          <span>9:41</span>
          <span className={styles.notch} />
          <span className={styles.sysIcons}><i /><i /><b /></span>
        </div>
        <div className={styles.body}>
          {children}
          {overlay}
        </div>
      </div>
    </div>
  );
}

function Composer({ placeholder, camera }: { placeholder: string; camera?: boolean }) {
  return (
    <div className={styles.composer}>
      <PaperclipIcon size={13} />
      {camera && <CameraIcon size={13} />}
      <SmileIcon size={13} />
      <span className={styles.input}>{placeholder}</span>
      <span className={styles.send}><SendIcon size={11} /></span>
    </div>
  );
}

// is-manager src/app/(manager)/index.tsx — the home hub: My Trucks hero, section tiles, manager card.
const tiles = [
  { key: "chat", icon: MessageIcon, color: "#3b6ee0", badge: 3 },
  { key: "trips", icon: MapIcon, color: "#1f9e6b" },
  { key: "trucks", icon: TruckIcon, color: "#c7791c" },
  { key: "drivers", icon: UsersIcon, color: "#1f93a4" },
] as const;

export function ManagerPhone({ lng }: { lng: Locale }) {
  const t = getT(lng);
  return (
    <Phone label={t("mock.manager.aria")}>
      <div className={styles.hTop}>
        {/* eslint-disable-next-line @next/next/no-img-element -- static wordmark in a decorative mockup */}
        <img src="/logo.svg" alt="" className={styles.hLogo} />
        <span className={styles.grow} />
        <BugIcon size={13} className={styles.bug} />
        <BellIcon size={13} />
        <SunIcon size={13} />
      </div>
      <div className={styles.hBody}>
        <div className={styles.hHero}>
          <span className={styles.hHeroChip}><BookmarkIcon size={15} /></span>
          <span className={styles.hHeroText}>
            <b>{t("mock.myTrucks")}</b>
            <span>{t("mock.manager.fleetTrips")}</span>
          </span>
          <span className={styles.hBadge}>2</span>
          <ChevronRightIcon size={13} />
        </div>
        <div className={styles.hGrid}>
          {tiles.map(({ key, icon: TileIcon, color, ...tile }) => (
            <div key={key} className={styles.hTile}>
              <span className={styles.hChip} style={{ color, background: `${color}22` }}><TileIcon size={14} /></span>
              <span className={styles.hTileLabel}>{t(`mock.${key}`)}</span>
              {"badge" in tile ? <span className={cx(styles.hBadge, styles.hTileBadge)}>{tile.badge}</span> : null}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.hManager}>
        <span className={styles.hAvatar}>AK<i /></span>
        <span className={styles.hManagerText}>
          <b>Anna Kowalczyk</b>
          <span>{t("mock.manager.role")}</span>
        </span>
        <SettingsIcon size={15} />
      </div>
    </Phone>
  );
}

// is-driver drawer (app/(driver)/_layout.tsx), shown pulled out over the trip screen.
const drawerItems = [
  { key: "driver.trip", icon: NavigationIcon, active: true },
  { key: "driver.myTrips", icon: ListIcon },
  { key: "driver.myTruck", icon: TruckIcon },
  { key: "documents", icon: FolderIcon },
  { key: "chat", icon: MessageIcon },
  { key: "alarm", icon: AlarmIcon },
] as const;

function DriverDrawer({ t }: { t: TFunction }) {
  return (
    <>
      <span className={styles.scrim} />
      <div className={styles.drawer}>
        <div className={styles.drTop}>
          {/* The driver app's brand: the IS mark + "Driver" in place of "Fleet" */}
          <span className={styles.drBrand}>
            {/* eslint-disable-next-line @next/next/no-img-element -- static mark in a decorative mockup */}
            <img src="/logo-mark.svg" alt="" />
            {t("mock.driver.brand")}
          </span>
          <span className={styles.grow} />
          <BugIcon size={12} className={styles.bug} />
          <span className={styles.drIconBtn}><BellIcon size={12} /></span>
          <span className={styles.drIconBtn}><SunIcon size={12} /></span>
        </div>
        <span className={styles.drUnread}>{t("mock.driver.noUnread")}</span>
        <nav className={styles.drNav}>
          {drawerItems.map(({ key, icon: ItemIcon, ...item }) => (
            <span key={key} className={cx(styles.drItem, "active" in item && styles.drActive)}>
              <ItemIcon size={14} />
              {t(`mock.${key}`)}
            </span>
          ))}
        </nav>
        <span className={styles.grow} />
        <div className={styles.drMe}>
          <span className={styles.hAvatar}>TN<i /></span>
          <span className={styles.hManagerText}>
            <b>Tomasz Nowak</b>
            <span>Truck 104 · {t("mock.online")}</span>
          </span>
          <SettingsIcon size={14} />
        </div>
        <div className={styles.drManager}>
          <span className={cx(styles.hAvatar, styles.drMgrAvatar)}>AK<i /></span>
          <span className={styles.hManagerText}>
            <em>{t("mock.driver.manager")}</em>
            <b>Anna Kowalczyk</b>
            <span>{t("mock.onlineCap")}</span>
          </span>
          <PhoneCallIcon size={13} />
          <MessageIcon size={13} />
        </div>
      </div>
    </>
  );
}

export function DriverPhone({ lng }: { lng: Locale }) {
  const t = getT(lng);
  return (
    <Phone label={t("mock.driver.aria")} overlay={<DriverDrawer t={t} />}>
      <div className={styles.dHeader}>
        <MenuIcon size={15} />
        <TruckIcon size={14} />
        <b>Truck 104</b>
        <BellIcon size={13} />
        <span className={styles.grow} />
        <span className={styles.pill}>{t("mock.status.LOADED")}<ChevronDownIcon size={9} /></span>
      </div>
      <div className={styles.tripCard}>
        <div className={styles.tripCardHead}>
          <div>
            <b>Poznań → Lyon</b>
            <span>#FT26093549</span>
          </div>
          <span className={styles.grow} />
          <FolderIcon size={13} />16
          <span className={styles.collapse}><ChevronDownIcon size={13} /></span>
        </div>
        <div className={cx(styles.stop, styles.loading)}>
          <span className={styles.stopLabel}><CircleIcon size={10} />{t("mock.driver.loadingStop")}</span>
          <span className={styles.stopAddr}>Poznań, ul. Głogowska 432 <CopyIcon size={11} /></span>
        </div>
        <div className={cx(styles.stop, styles.unloading)}>
          <span className={styles.stopLabel}><MapPinIcon size={10} />{t("mock.driver.unloadingStop")}</span>
          <span className={styles.stopAddr}>Lyon, Rue de Gerland 61 <CopyIcon size={11} /></span>
        </div>
      </div>
      <div className={styles.chatBar}>
        <MessageIcon size={11} />{t("mock.driver.tripChat")}<i className={styles.onlineDot} /><em>{t("mock.online")}</em>
      </div>
      <div className={styles.chat}>
        <div className={styles.outLine}>
          <span className={styles.bubbleOut}>{t("mock.msg.loaded")}</span>
        </div>
        <span className={cx(styles.time, styles.right)}>{clock(lng, "15:55")} <CheckCheckIcon size={10} className={styles.read} /></span>
        <span className={styles.author}>Anna Kowalczyk</span>
        <div className={styles.inLine}>
          <span className={styles.bubbleIn}>{t("mock.msg.slotShort")}</span>
          <span className={styles.react}>😮</span>
        </div>
        <span className={styles.time}>{clock(lng, "16:03")}</span>
      </div>
      <Composer placeholder={t("mock.driver.message")} camera />
    </Phone>
  );
}
