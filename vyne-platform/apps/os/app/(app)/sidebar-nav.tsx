"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Left-nav items (§4.2, grouped by verb). Only the surfaces that exist are
 * shown — sections outside the current build simply don't render, per the
 * "sections outside a role don't render" principle (calm over comprehensive).
 */
const GROUPS = [
  {
    label: "Operate",
    items: [
      { href: "/", label: "Dashboard" },
      { href: "/advisors", label: "Advisors" },
    ],
  },
] as const;

export function SidebarNav() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav className="sidebar-nav">
      {GROUPS.map((group) => (
        <div className="sidebar-group" key={group.label}>
          <div className="sidebar-group-label">{group.label}</div>
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-item${isActive(item.href) ? " is-active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
