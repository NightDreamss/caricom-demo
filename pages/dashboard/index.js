import { useState } from "react";
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Drawer, Navbar, Tabs } from "@mantine/core";
import DisplayDashboardData from "../../components/DisplayDashboardData";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { connect } from "../../libs/mysqlDB";
import User from "../../components/User";
import Layout from "../../components/Layout";
import { DefaultButton } from "../../components/modules/Button";
import { NextSeo } from "next-seo";

// Side bar navigation routes
const navigation = [
  { name: "Dashboard", icon: HomeIcon },
  { name: "Team", icon: UsersIcon },
  { name: "Projects", icon: FolderIcon },
  { name: "Documents", icon: InboxIcon },
  { name: "Reports", icon: ChartBarIcon },
];

// Join style classes for conditional statements
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard({ results }) {
  const [opened, setOpened] = useState(false); // State management for open mobile sidebar
  const [activeTab, setActiveTab] = useState("Dashboard"); // State management for tab selected
  const router = useRouter(); // Route management
  const { data: session, status } = useSession(); // Session management

  // Handle session routing
  if (typeof window === "undefined") return null;

  if (status === "unauthenticated") {
    router.replace("/");
  }

  if (status === "authenticated")
    return (
      <section>
        <NextSeo
          title="Caricom - Dashboard"
          description="Show users data etc"
          canonical="https://www.caricomimpacs.org/dashboard"
          openGraph={{
            title: "Caricom - Dashboard",
            description: "Show users data etc",
            url: "https://www.caricomimpacs.org/dashboard",
          }}
        />
        {/* Sidebar for mobile */}
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          aria-labelledby="Menu"
          aria-describedby="Menu"
          closeButtonLabel="Close Menu"
          title="Menu"
          padding="xl"
          position="left"
          size="xl"
          zIndex={2000}
          classNames={{
            drawer: "overflow-y-auto bg-gray-100 shadow-lg",
            title:
              "text-sm md:text-base text-gray-900 font-Merriweather text-lg",
            closeButton: "rounded-full mx-2 text-gray-900 hover:bg-gray-200",
          }}
        >
          <div className="relative flex w-full flex-1 flex-col">
            <div className="mt-3 h-0 flex-1  overflow-y-auto pb-4">
              <nav className="space-y-1 px-2">
                <div className="mb-2 flex flex-shrink-0 border-b border-blue-800 pb-2">
                  <div
                    className={classNames(
                      activeTab === "User"
                        ? "bg-blue-800"
                        : "hover:bg-blue-600 hover:bg-opacity-75",
                      "group w-full rounded-md px-2 py-2"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("User");
                        setOpened(false);
                      }}
                      className="group block w-full flex-shrink-0"
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Image
                            src={session?.user?.image}
                            alt={session?.user?.name}
                            quality="100"
                            width={36}
                            height={36}
                            priority
                            className="inline-block h-9 w-9 rounded-full"
                          />
                        </div>
                        <div className="mx-3 max-w-xs">
                          <p
                            className={classNames(
                              activeTab === "User"
                                ? "text-white"
                                : "text-black group-hover:text-white",
                              "my-auto truncate text-sm font-medium capitalize"
                            )}
                          >
                            {session?.user?.name}
                          </p>
                          <p
                            className={classNames(
                              activeTab === "User"
                                ? "text-white"
                                : "text-black group-hover:text-white",
                              "truncate font-Poppin text-xs font-medium capitalize"
                            )}
                          >
                            View profile
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
                {navigation.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => {
                      setActiveTab(item.name);
                      setOpened(false);
                    }}
                    className={classNames(
                      item.name === activeTab
                        ? "bg-blue-800 text-white"
                        : "text-black hover:bg-blue-600 hover:bg-opacity-75",
                      "group flex cursor-pointer items-center rounded-md px-2 py-2 font-Merriweather text-sm font-medium hover:text-white"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.name === activeTab
                          ? "text-white"
                          : "text-blue-500",
                        "mr-4 h-6 w-6 flex-shrink-0 group-hover:text-white"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </div>
                ))}
                <div className="flex w-full flex-shrink-0">
                  <DefaultButton
                    type="button"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    buttonStyle="group flex w-full cursor-pointer items-center rounded-md px-2 py-2 font-Merriweather text-sm font-medium text-black hover:bg-blue-600 hover:bg-opacity-75 hover:text-white"
                    icon={
                      <ArrowRightOnRectangleIcon
                        className="mr-4 h-6 w-6 flex-shrink-0 text-blue-500 group-hover:text-white"
                        aria-hidden="true"
                      />
                    }
                    title="Sign out"
                  />
                </div>
              </nav>
            </div>
          </div>
        </Drawer>
        {/* Static sidebar for desktop */}
        <Navbar.Section grow>
          <Tabs
            value={activeTab}
            onTabChange={setActiveTab}
            orientation="vertical"
            unstyled
            classNames={{
              root: "md:flex my-auto w-full h-full min-h-0 bg-white ring-2 ring-white/20",
              tabsList:
                "hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col",
              tab: "w-full",
              panel: "w-full h-full mx-auto",
            }}
          >
            <Tabs.List>
              <div className="flex min-h-0 flex-1 flex-col bg-gray-300">
                <div className="flex flex-1 flex-col overflow-y-auto px-4">
                  <div className="flex flex-shrink-0 items-center pt-6">
                    <Image
                      priority
                      height={60}
                      width={200}
                      quality="100"
                      className="mb-2 h-auto w-auto"
                      src="/Impacs.png"
                      alt="Caricom Impacs"
                    />
                  </div>
                  <nav className="my-5 flex flex-1 flex-shrink-0 flex-col space-y-2">
                    {navigation.map((item, index) => (
                      <Tabs.Tab
                        key={index}
                        value={item.name}
                        icon={
                          <div
                            className={classNames(
                              item.name === activeTab
                                ? "bg-blue-800 text-white"
                                : "text-black hover:bg-blue-600 hover:bg-opacity-75",
                              "group flex items-center rounded-md px-2 py-2 font-Merriweather text-sm font-medium hover:text-white"
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.name === activeTab
                                  ? "text-white"
                                  : "text-blue-500",
                                "mr-4 h-6 w-6 flex-shrink-0 group-hover:text-white"
                              )}
                              aria-hidden="true"
                            />

                            <p className="my-auto hidden flex-shrink-0 sm:block">
                              {item.name}
                            </p>
                          </div>
                        }
                      ></Tabs.Tab>
                    ))}
                    <div className="w-full">
                      <DefaultButton
                        type="button"
                        onClick={() => signOut({ callbackUrl: "/" })}
                        buttonStyle="group flex w-full items-center rounded-md px-2 py-2 font-Merriweather text-sm font-medium text-black hover:bg-blue-600 hover:bg-opacity-75 hover:text-white"
                        icon={
                          <ArrowRightOnRectangleIcon
                            className="mr-4 h-6 w-6 flex-shrink-0 text-blue-500 group-hover:text-white"
                            aria-hidden="true"
                          />
                        }
                        title="Sign out"
                      />
                    </div>
                  </nav>
                  <div className="mb-2 w-full flex-shrink-0 border-t border-blue-800 pt-2">
                    <Tabs.Tab value="User">
                      <div
                        className={classNames(
                          activeTab === "User"
                            ? "bg-blue-800"
                            : "hover:bg-blue-600 hover:bg-opacity-75",
                          "group w-full rounded-md px-2 py-2"
                        )}
                      >
                        <div className="group block w-full flex-shrink-0 cursor-pointer">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <Image
                                src={session?.user?.image}
                                alt={session?.user?.name}
                                quality="100"
                                width={36}
                                height={36}
                                priority
                                className="inline-block h-9 w-9 rounded-full"
                              />
                            </div>
                            <div className="w-48 px-3">
                              <p
                                className={classNames(
                                  activeTab === "User"
                                    ? "text-white"
                                    : "text-black group-hover:text-white",
                                  "truncate font-Merriweather text-sm font-medium capitalize"
                                )}
                              >
                                {session?.user?.name}
                              </p>
                              <p
                                className={classNames(
                                  activeTab === "User"
                                    ? "text-white"
                                    : "text-black group-hover:text-white",
                                  "truncate font-Poppin text-xs font-medium capitalize"
                                )}
                              >
                                View profile
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tabs.Tab>
                  </div>
                </div>
              </div>
            </Tabs.List>
            {/* Mobile header navbar */}
            <div className="sticky top-0 z-10 bg-gray-200 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
              <button
                type="button"
                className="my-auto inline-flex h-12 w-20 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                onClick={() => setOpened(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon
                  className="mr-1 h-6 w-6 flex-shrink-0"
                  aria-hidden="true"
                />
                <p className="my-auto font-Poppin text-sm">Menu</p>
              </button>
            </div>
            {/* Main panel for tab */}
            {navigation.map((item, index) => (
              <Tabs.Panel value={item.name} key={index}>
                <Layout dashboard>
                  <div className="my-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6">
                      <DisplayDashboardData DashboardData={item.name} />
                    </div>
                  </div>
                </Layout>
              </Tabs.Panel>
            ))}
            <Tabs.Panel value="User">
              <Layout dashboard>
                <div className="my-6">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <User userData={results} />
                  </div>
                </div>
              </Layout>
            </Tabs.Panel>
          </Tabs>
        </Navbar.Section>
      </section>
    );
}

export const getServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const query = `SELECT otherNames, created_at, country, phone FROM user WHERE email = ?`;
  const values = [session?.user?.email];

  const [results] = await connect({ query, values });
  return {
    props: {
      results: JSON.parse(JSON.stringify(results)),
    },
  };
};
