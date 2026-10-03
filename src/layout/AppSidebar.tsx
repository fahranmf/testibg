"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  ChevronDownIcon,
  HorizontaLDots,
} from "../icons/index";

import {
  Activity,
  Droplets,
  HeartHandshake,
  History,
  Images,
  LayoutDashboard,
  MessagesSquare,
  Newspaper,
  Users,
} from "lucide-react";

import { useSidebar } from "../context/SidebarContext";
import { useAuth } from "../features/auth/contexts/AuthContext";
import {
  PERMISSIONS,
  Permission,
} from "../features/auth/constants/permissions";

type SubNavItem = {
  name: string;
  path: string;
  permission?: Permission[];
};

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  permission?: Permission[];
  subItems?: SubNavItem[];
};

/* -------------------------------------------------------------------------- */
/*                                NAVIGATION                                  */
/* -------------------------------------------------------------------------- */

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={20} strokeWidth={1.8} />,
    path: "/dashboard",
    permission: [PERMISSIONS.DASHBOARD_VIEW],
  },
  {
    name: "News",
    icon: <Newspaper size={20} strokeWidth={1.8} />,
    path: "/news",
    permission: [PERMISSIONS.NEWS_VIEW],
  },
  {
    name: "Blood Stock",
    icon: <Droplets size={20} strokeWidth={1.8} />,
    path: "/blood-stock",
    permission: [PERMISSIONS.BLOOD_STOCK_VIEW],
  },
  {
    name: "Donor Events",
    icon: <HeartHandshake size={20} strokeWidth={1.8} />,
    path: "/donor-events",
    permission: [PERMISSIONS.DONOR_EVENT_VIEW],
  },
  {
    name: "Activities",
    icon: <Activity size={20} strokeWidth={1.8} />,
    path: "/activities",
    permission: [PERMISSIONS.ACTIVITY_VIEW],
  },
  {
    name: "Gallery",
    icon: <Images size={20} strokeWidth={1.8} />,
    path: "/gallery",
    permission: [PERMISSIONS.GALLERY_VIEW],
  },
  {
    name: "Messages",
    icon: <MessagesSquare size={20} strokeWidth={1.8} />,
    subItems: [
      {
        name: "Contact Form",
        path: "/contact-messages",
        permission: [PERMISSIONS.CONTACT_MESSAGE_VIEW],
      },
      {
        name: "Chat",
        path: "/support-chat",
        permission: [PERMISSIONS.CHAT_VIEW],
      },
    ],
  },
  {
    name: "Users",
    icon: <Users size={20} strokeWidth={1.8} />,
    path: "/users",
    permission: [PERMISSIONS.USER_VIEW],
  },
];

/* -------------------------------------------------------------------------- */
/*                              PERMISSION HELPER                              */
/* -------------------------------------------------------------------------- */

function hasAccess(
  required: Permission[] | undefined,
  userPermissions: Permission[],
) {
  if (!required || required.length === 0) {
    return true;
  }

  return required.some((permission) =>
    userPermissions.includes(permission),
  );
}

function filterNavItems(
  items: NavItem[],
  userPermissions: Permission[],
): NavItem[] {
  return items.reduce<NavItem[]>((acc, item) => {
    /**
     * Parent menu dengan submenu
     */
    if (item.subItems) {
      const visibleSubItems = item.subItems.filter((subItem) =>
        hasAccess(subItem.permission, userPermissions),
      );

      /**
       * Parent cuma ditampilkan kalau minimal
       * ada satu submenu yang bisa diakses.
       */
      if (visibleSubItems.length > 0) {
        acc.push({
          ...item,
          subItems: visibleSubItems,
        });
      }

      return acc;
    }

    /**
     * Menu biasa
     */
    if (hasAccess(item.permission, userPermissions)) {
      acc.push(item);
    }

    return acc;
  }, []);
}

/* -------------------------------------------------------------------------- */
/*                                SIDEBAR                                     */
/* -------------------------------------------------------------------------- */

const AppSidebar: React.FC = () => {
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered,
  } = useSidebar();

  const { user } = useAuth();
  const pathname = usePathname();

  const userPermissions = user?.permissions ?? [];

  const visibleNavItems = useMemo(
    () => filterNavItems(navItems, userPermissions),
    [userPermissions],
  );

  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<
    Record<number, number>
  >({});

  const subMenuRefs = useRef<
    Record<number, HTMLDivElement | null>
  >({});

  /* ------------------------------------------------------------------------ */
  /*                              ACTIVE ROUTE                                */
  /* ------------------------------------------------------------------------ */

  const isActive = useCallback(
    (path: string) => {
      /**
       * Dashboard harus exact match.
       *
       * / = aktif hanya di /
       */
      if (path === "/") {
        return pathname === "/";
      }

      /**
       * Menu lain aktif juga ketika masuk nested route.
       *
       * Contoh:
       * /news
       * /news/create
       * /news/edit/123
       *
       * semuanya akan membuat News aktif.
       */
      return (
        pathname === path ||
        pathname.startsWith(`${path}/`)
      );
    },
    [pathname],
  );

  /* ------------------------------------------------------------------------ */
  /*                         AUTO OPEN ACTIVE MENU                             */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    let matched = false;

    visibleNavItems.forEach((nav, index) => {
      if (!nav.subItems) {
        return;
      }

      nav.subItems.forEach((subItem) => {
        if (isActive(subItem.path)) {
          setOpenSubmenu(index);
          matched = true;
        }
      });
    });

    if (!matched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive, visibleNavItems]);

  /* ------------------------------------------------------------------------ */
  /*                         SUBMENU HEIGHT                                   */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (
      openSubmenu !== null &&
      subMenuRefs.current[openSubmenu]
    ) {
      setSubMenuHeight((prev) => ({
        ...prev,
        [openSubmenu]:
          subMenuRefs.current[openSubmenu]?.scrollHeight ?? 0,
      }));
    }
  }, [openSubmenu]);

  /* ------------------------------------------------------------------------ */
  /*                         SUBMENU TOGGLE                                   */
  /* ------------------------------------------------------------------------ */

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prev) =>
      prev === index ? null : index,
    );
  };

  const showExpanded =
    isExpanded ||
    isHovered ||
    isMobileOpen;

  /* ------------------------------------------------------------------------ */
  /*                                  UI                                      */
  /* ------------------------------------------------------------------------ */

  return (
    <aside
      className={`
        fixed
        top-0
        left-0
        z-50
        flex
        h-screen
        flex-col
        border-r
        border-gray-200
        bg-white
        px-5
        text-gray-900
        transition-all
        duration-300
        ease-in-out

        dark:border-gray-800
        dark:bg-gray-900

        lg:mt-0
        ${isMobileOpen ? "mt-16" : "mt-16"}

        ${
          isExpanded || isMobileOpen || isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }

        ${
          isMobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }

        lg:translate-x-0
      `}
      onMouseEnter={() => {
        if (!isExpanded) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {/* ------------------------------------------------------------------ */}
      {/*                               LOGO                                  */}
      {/* ------------------------------------------------------------------ */}

      <div
        className={`
          flex
          py-8
          ${
            !showExpanded
              ? "lg:justify-center"
              : "justify-start"
          }
        `}
      >
        <Link href="/" aria-label="PMI Depok">
          {showExpanded ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="PMI Depok"
                width={150}
                height={40}
                priority
              />

              <Image
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="PMI Depok"
                width={150}
                height={40}
                priority
              />
            </>
          ) : (
            <Image
              src="/images/logo/logo-icon.svg"
              alt="PMI Depok"
              width={32}
              height={32}
              priority
            />
          )}
        </Link>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/*                              MENU                                   */}
      {/* ------------------------------------------------------------------ */}

      <div className="flex flex-1 flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div>
            {/* Section title */}
            <h2
              className={`
                mb-4
                flex
                text-xs
                uppercase
                leading-[20px]
                text-gray-400

                ${
                  !showExpanded
                    ? "lg:justify-center"
                    : "justify-start"
                }
              `}
            >
              {showExpanded ? (
                "Menu"
              ) : (
                <HorizontaLDots className="size-6" />
              )}
            </h2>

            {/* Menu list */}
            <ul className="flex flex-col gap-4">
              {visibleNavItems.map((nav, index) => {
                const submenuActive =
                  nav.subItems?.some((subItem) =>
                    isActive(subItem.path),
                  ) ?? false;

                const submenuOpen =
                  openSubmenu === index;

                const itemActive =
                  nav.path
                    ? isActive(nav.path)
                    : submenuActive;

                return (
                  <li key={nav.name}>
                    {/* -------------------------------------------------- */}
                    {/*                      SUBMENU                        */}
                    {/* -------------------------------------------------- */}

                    {nav.subItems ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            handleSubmenuToggle(index)
                          }
                          aria-expanded={submenuOpen}
                          className={`
                            menu-item
                            group
                            cursor-pointer

                            ${
                              itemActive || submenuOpen
                                ? "menu-item-active"
                                : "menu-item-inactive"
                            }

                            ${
                              !showExpanded
                                ? "lg:justify-center"
                                : "lg:justify-start"
                            }
                          `}
                        >
                          <span
                            className={`
                              menu-item-icon-size

                              ${
                                itemActive ||
                                submenuOpen
                                  ? "menu-item-icon-active"
                                  : "menu-item-icon-inactive"
                              }
                            `}
                          >
                            {nav.icon}
                          </span>

                          {showExpanded && (
                            <>
                              <span className="menu-item-text">
                                {nav.name}
                              </span>

                              <ChevronDownIcon
                                className={`
                                  ml-auto
                                  h-5
                                  w-5
                                  transition-transform
                                  duration-200

                                  ${
                                    submenuOpen
                                      ? "rotate-180 text-brand-500"
                                      : ""
                                  }
                                `}
                              />
                            </>
                          )}
                        </button>

                        {/* Submenu */}
                        {showExpanded && (
                          <div
                            ref={(element) => {
                              subMenuRefs.current[index] =
                                element;
                            }}
                            className="overflow-hidden transition-all duration-300"
                            style={{
                              height: submenuOpen
                                ? `${subMenuHeight[index] ?? 0}px`
                                : "0px",
                            }}
                          >
                            <ul className="ml-9 mt-2 space-y-1">
                              {nav.subItems.map(
                                (subItem) => {
                                  const active =
                                    isActive(
                                      subItem.path,
                                    );

                                  return (
                                    <li
                                      key={
                                        subItem.name
                                      }
                                    >
                                      <Link
                                        href={
                                          subItem.path
                                        }
                                        className={`
                                          menu-dropdown-item

                                          ${
                                            active
                                              ? "menu-dropdown-item-active"
                                              : "menu-dropdown-item-inactive"
                                          }
                                        `}
                                      >
                                        {subItem.name}
                                      </Link>
                                    </li>
                                  );
                                },
                              )}
                            </ul>
                          </div>
                        )}
                      </>
                    ) : (
                      /* ------------------------------------------------ */
                      /*                       LINK                       */
                      /* ------------------------------------------------ */

                      nav.path && (
                        <Link
                          href={nav.path}
                          className={`
                            menu-item
                            group

                            ${
                              itemActive
                                ? "menu-item-active"
                                : "menu-item-inactive"
                            }

                            ${
                              !showExpanded
                                ? "lg:justify-center"
                                : "lg:justify-start"
                            }
                          `}
                        >
                          <span
                            className={`
                              menu-item-icon-size

                              ${
                                itemActive
                                  ? "menu-item-icon-active"
                                  : "menu-item-icon-inactive"
                              }
                            `}
                          >
                            {nav.icon}
                          </span>

                          {showExpanded && (
                            <span className="menu-item-text">
                              {nav.name}
                            </span>
                          )}
                        </Link>
                      )
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
