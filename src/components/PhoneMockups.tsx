import type { ReactNode } from "react";
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

function Composer({ camera }: { camera?: boolean }) {
  return (
    <div className={styles.composer}>
      <PaperclipIcon size={13} />
      {camera && <CameraIcon size={13} />}
      <SmileIcon size={13} />
      <span className={styles.input}>Message…</span>
      <span className={styles.send}><SendIcon size={11} /></span>
    </div>
  );
}

// is-manager src/app/(manager)/index.tsx — the home hub: My Trucks hero, section tiles, manager card.
const tiles = [
  { label: "Chat", icon: MessageIcon, color: "#3b6ee0", badge: 3 },
  { label: "Trips", icon: MapIcon, color: "#1f9e6b" },
  { label: "Trucks", icon: TruckIcon, color: "#c7791c" },
  { label: "Drivers", icon: UsersIcon, color: "#1f93a4" },
];

export function ManagerPhone() {
  return (
    <Phone label="IS Manager on iPhone and Android: the home screen with My Trucks, chat, trips, trucks and drivers">
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
            <b>My Trucks</b>
            <span>Your fleet &amp; trips</span>
          </span>
          <span className={styles.hBadge}>2</span>
          <ChevronRightIcon size={13} />
        </div>
        <div className={styles.hGrid}>
          {tiles.map(({ label, icon: TileIcon, color, badge }) => (
            <div key={label} className={styles.hTile}>
              <span className={styles.hChip} style={{ color, background: `${color}22` }}><TileIcon size={14} /></span>
              <span className={styles.hTileLabel}>{label}</span>
              {badge ? <span className={cx(styles.hBadge, styles.hTileBadge)}>{badge}</span> : null}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.hManager}>
        <span className={styles.hAvatar}>AK<i /></span>
        <span className={styles.hManagerText}>
          <b>Anna Kowalczyk</b>
          <span>Manager · online</span>
        </span>
        <SettingsIcon size={15} />
      </div>
    </Phone>
  );
}

// is-driver drawer (app/(driver)/_layout.tsx), shown pulled out over the trip screen.
const drawerItems = [
  { label: "Trip", icon: NavigationIcon, active: true },
  { label: "My Trips", icon: ListIcon },
  { label: "My Truck", icon: TruckIcon },
  { label: "Documents", icon: FolderIcon },
  { label: "Chat", icon: MessageIcon },
  { label: "Alarm", icon: AlarmIcon },
];

function DriverDrawer() {
  return (
    <>
      <span className={styles.scrim} />
      <div className={styles.drawer}>
        <div className={styles.drTop}>
          {/* The driver app's brand: the IS mark + "Driver" in place of "Fleet" */}
          <span className={styles.drBrand}>
            {/* eslint-disable-next-line @next/next/no-img-element -- static mark in a decorative mockup */}
            <img src="/logo-mark.svg" alt="" />
            Driver
          </span>
          <span className={styles.grow} />
          <BugIcon size={12} className={styles.bug} />
          <span className={styles.drIconBtn}><BellIcon size={12} /></span>
          <span className={styles.drIconBtn}><SunIcon size={12} /></span>
        </div>
        <span className={styles.drUnread}>No unread messages</span>
        <nav className={styles.drNav}>
          {drawerItems.map(({ label, icon: ItemIcon, active }) => (
            <span key={label} className={cx(styles.drItem, active && styles.drActive)}>
              <ItemIcon size={14} />
              {label}
            </span>
          ))}
        </nav>
        <span className={styles.grow} />
        <div className={styles.drMe}>
          <span className={styles.hAvatar}>TN<i /></span>
          <span className={styles.hManagerText}>
            <b>Tomasz Nowak</b>
            <span>Truck 104 · online</span>
          </span>
          <SettingsIcon size={14} />
        </div>
        <div className={styles.drManager}>
          <span className={cx(styles.hAvatar, styles.drMgrAvatar)}>AK<i /></span>
          <span className={styles.hManagerText}>
            <em>MANAGER</em>
            <b>Anna Kowalczyk</b>
            <span>Online</span>
          </span>
          <PhoneCallIcon size={13} />
          <MessageIcon size={13} />
        </div>
      </div>
    </>
  );
}

export function DriverPhone() {
  return (
    <Phone
      label="IS Driver: the side menu open over the current trip — trip, my trips, my truck, documents, chat, alarm and the assigned manager"
      overlay={<DriverDrawer />}
    >
      <div className={styles.dHeader}>
        <MenuIcon size={15} />
        <TruckIcon size={14} />
        <b>Truck 104</b>
        <BellIcon size={13} />
        <span className={styles.grow} />
        <span className={styles.pill}>Loaded<ChevronDownIcon size={9} /></span>
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
          <span className={styles.stopLabel}><CircleIcon size={10} />1. Loading · Mon 08:00–10:00</span>
          <span className={styles.stopAddr}>Poznań, ul. Głogowska 432 <CopyIcon size={11} /></span>
        </div>
        <div className={cx(styles.stop, styles.unloading)}>
          <span className={styles.stopLabel}><MapPinIcon size={10} />2. Unloading · Wed 06:00–09:00</span>
          <span className={styles.stopAddr}>Lyon, Rue de Gerland 61 <CopyIcon size={11} /></span>
        </div>
      </div>
      <div className={styles.chatBar}>
        <MessageIcon size={11} />Trip chat<i className={styles.onlineDot} /><em>online</em>
      </div>
      <div className={styles.chat}>
        <div className={styles.outLine}>
          <span className={styles.bubbleOut}>Loaded, 33 pallets. Leaving Poznań now.</span>
        </div>
        <span className={cx(styles.time, styles.right)}>03:55 PM <CheckCheckIcon size={10} className={styles.read} /></span>
        <span className={styles.author}>Anna Kowalczyk</span>
        <div className={styles.inLine}>
          <span className={styles.bubbleIn}>Unloading slot moved to Wed 06:00.</span>
          <span className={styles.react}>😮</span>
        </div>
        <span className={styles.time}>04:03 PM</span>
      </div>
      <Composer camera />
    </Phone>
  );
}
