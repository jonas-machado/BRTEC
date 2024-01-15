"use client";

import { Fragment, useEffect, useState } from "react";
import { Popover, Transition, Menu, Disclosure } from "@headlessui/react";
import {
  BellIcon,
  Bars3Icon,
  CalendarIcon,
  XMarkIcon,
  TableCellsIcon,
  ArrowDownTrayIcon,
  MapIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

//constants
import { Session } from "next-auth";
import Modal from "../modals/Modal";
import Perfil from "../modals/Perfil";

import usePerfilModal from "@/lib/zustand/usePerfilModal";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface NavbarProps {
  currentUser?: Session | null;
  neutralNetwork: any;
  firmware: any;
  maps: any;
}

function Navbar({ currentUser, neutralNetwork, firmware, maps }: NavbarProps) {
  const isOpen = usePerfilModal((state) => state.isOpen);
  const onOpen: () => void = usePerfilModal((state) => state.onOpen);
  const onClose: () => void = usePerfilModal((state) => state.onClose);
  console.log(maps);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <header>
        <nav>
          <Popover className="relative bg-black bg-opacity-75 shadow-black shadow-lg ">
            <div className="flex items-center justify-between border-black border-b-2 py-4 mx-auto max-w-7xl px-8 ">
              <div className="flex lg:flex-1">
                <Link href={"/config/manual"}>
                  <span className="sr-only">Your Company</span>
                  {/* <Image
                  className="w-auto cursor-pointer"
                  src={`/images/pumpkin.png`}
                  alt=""
                  width={40}
                  height={40}
                  priority={true}
                  onClick={() => {
                    router.push("/config/manual");
                  }}
                /> */}
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1157.000000pt"
                    height="1280.000000pt"
                    viewBox="0 0 1157.000000 1280.000000"
                    preserveAspectRatio="xMidYMid meet"
                    className="w-12 h-12 text-purple-600 cursor-pointer"
                  >
                    <metadata>
                      Created by potrace 1.15, written by Peter Selinger
                      2001-2017
                    </metadata>
                    <g
                      transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                      fill="#8600d9"
                      stroke="none"
                    >
                      <path d="M5330 12245 c-284 -52 -593 -227 -935 -529 -44 -39 -157 -144 -252 -232 -94 -89 -292 -270 -440 -401 -557 -498 -782 -754 -928 -1058 -153 -318 -165 -537 -36 -658 82 -77 175 -116 515 -217 250 -74 326 -125 339 -230 18 -153 -227 -496 -577 -807 -148 -132 -372 -314 -615 -499 -424 -322 -641 -504 -799 -668 -259 -270 -372 -498 -360 -733 3 -74 9 -97 33 -142 64 -116 195 -181 430 -212 133 -18 537 -13 872 10 570 40 932 39 1056 -5 100 -35 157 -102 157 -183 0 -124 -109 -308 -299 -504 -254 -264 -622 -532 -1431 -1047 -827 -526 -1143 -758 -1337 -981 -129 -148 -178 -261 -171 -394 3 -67 10 -90 37 -142 77 -144 290 -304 538 -404 407 -164 1043 -238 1812 -210 180 6 451 20 602 31 624 44 711 51 805 60 55 5 148 10 207 10 89 0 115 -4 147 -20 75 -38 88 -91 120 -485 30 -366 51 -482 115 -635 62 -150 156 -258 269 -311 84 -39 207 -51 441 -40 99 4 254 5 345 1 348 -16 481 25 599 182 129 174 171 351 206 878 18 271 22 310 41 377 30 108 94 125 439 112 1421 -54 2053 -42 2575 47 505 86 837 227 1052 447 164 167 181 344 53 537 -55 82 -200 223 -327 318 -217 162 -436 292 -1148 687 -485 269 -713 400 -940 543 -578 363 -949 731 -968 957 -15 187 175 259 743 280 972 36 1245 82 1407 233 88 82 117 174 99 307 -27 192 -135 387 -327 593 -156 168 -374 339 -844 662 -554 382 -724 514 -930 720 -260 259 -369 446 -331 563 27 82 111 126 411 216 245 74 343 115 430 179 76 57 118 113 137 184 17 67 16 97 -3 199 -30 157 -121 346 -254 524 -145 195 -318 365 -715 706 -213 182 -198 168 -500 446 -291 267 -423 376 -582 482 -213 143 -397 224 -582 256 -102 18 -300 18 -401 0z m315 -266 c101 -14 266 -73 370 -131 199 -112 360 -238 700 -553 223 -206 335 -305 540 -481 285 -243 398 -349 526 -494 181 -205 289 -405 289 -534 0 -119 -79 -170 -430 -275 -327 -99 -456 -174 -529 -311 -43 -79 -53 -185 -26 -275 25 -90 109 -242 196 -358 207 -276 523 -552 1039 -907 91 -62 230 -158 310 -214 510 -352 739 -565 847 -786 31 -63 37 -86 37 -142 1 -65 0 -68 -39 -108 -65 -67 -175 -97 -460 -124 -193 -19 -269 -23 -615 -36 -427 -16 -587 -34 -767 -86 -156 -45 -269 -128 -326 -239 -27 -52 -31 -73 -35 -156 -5 -110 8 -168 64 -285 118 -245 380 -513 768 -789 270 -191 545 -358 1051 -637 565 -313 742 -413 925 -522 402 -241 596 -403 637 -533 15 -48 15 -55 -2 -100 -60 -162 -382 -323 -815 -408 -296 -58 -487 -76 -990 -96 -301 -11 -549 -7 -1395 24 -510 18 -708 17 -769 -7 -96 -37 -166 -124 -185 -231 -6 -33 -17 -172 -26 -310 -29 -477 -46 -616 -89 -745 -41 -120 -96 -191 -176 -228 -52 -23 -819 -29 -898 -6 -69 20 -121 67 -166 154 -71 134 -88 238 -136 833 -22 261 -33 316 -80 379 -90 124 -182 141 -560 109 -889 -78 -1619 -118 -1950 -107 -725 24 -1222 136 -1492 336 -83 61 -119 113 -126 180 -7 80 30 144 162 276 174 173 444 368 1006 725 440 280 450 287 675 436 278 183 526 362 684 492 159 131 419 392 493 497 200 281 254 523 156 707 -53 99 -174 185 -314 221 -157 41 -606 45 -1094 11 -685 -48 -909 -39 -1025 43 -77 54 -83 153 -15 287 103 204 332 422 895 852 728 557 1006 818 1230 1153 172 258 221 455 150 608 -66 142 -185 222 -445 302 -280 86 -332 104 -374 131 -62 39 -86 80 -86 150 0 105 54 238 169 411 135 205 327 408 701 741 124 110 338 305 475 433 409 381 575 510 790 614 214 104 371 135 550 109z" />
                    </g>
                  </svg>
                </Link>
              </div>
              <div className="-my-2 -mr-2 lg:hidden">
                <Popover.Button className="border-transparent focus:border-transparent focus:ring-offset-0 inline-flex items-center justify-center rounded-md bg-transparent p-2 text-white hover:bg-transparent hover:text-gray-500 focus:outline-none">
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="false" />
                </Popover.Button>
              </div>
              <Popover.Group className="hidden lg:gap-x-12 pr-10 lg:flex">
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? "text-white" : "text-gray-300",
                          "border-transparent focus:border-transparent focus:ring-offset-0 group inline-flex items-center rounded-md bg-transparent text-base font-medium hover:text-white focus:outline-none"
                        )}
                      >
                        <span>Mapas</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "text-white" : "text-gray-300",
                            "ml-2 h-5 w-5 group-hover:text-white"
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-50 -ml-4 mt-3 w-screen max-w-[15rem] transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative grid gap-6 bg-black opacity-90 border-gray-900 border-2 rounded-lg px-5 py-6 sm:gap-8 sm:p-8">
                              {maps.map((item: any) => (
                                <a
                                  key={item.name}
                                  href={item.link}
                                  className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-900"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <MapIcon
                                    className="h-6 w-6 flex-shrink-0 text-indigo-200"
                                    aria-hidden="true"
                                  />
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-white whitespace-nowrap">
                                      {item.name}
                                    </p>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>

                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? "text-white" : "text-gray-300",
                          "border-transparent focus:border-transparent focus:ring-offset-0 group inline-flex items-center rounded-md bg-transparent text-base font-medium hover:text-white focus:outline-none"
                        )}
                      >
                        <span>Empresas</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "text-white" : "text-gray-300",
                            "ml-2 h-5 w-5 group-hover:text-white"
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute w-[450px] z-50 -ml-4 mt-3 transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                          <div className="overflow-hidden inline-block w-full rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative grid grid-cols-2 auto-cols-min gap-6 bg-black opacity-90 border-gray-900 border-2 rounded-lg px-5 py-6 sm:gap-8 sm:p-8  ">
                              {neutralNetwork.map((item: any) => (
                                <a
                                  key={item.id}
                                  href={item.link}
                                  className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-900 overflow-hidden "
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <TableCellsIcon
                                    className="h-6 w-6 flex-shrink-0 text-indigo-200"
                                    aria-hidden="true"
                                  />
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-200 whitespace-nowrap">
                                      {item.company}
                                    </p>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? "text-white" : "text-gray-300",
                          "border-transparent focus:border-transparent focus:ring-offset-0 group inline-flex items-center rounded-md bg-transparent text-base font-medium hover:text-white focus:outline-none"
                        )}
                      >
                        <span>Firmware</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "text-white" : "text-gray-300",
                            "ml-2 h-5 w-5 group-hover:text-white"
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-50 -ml-4 mt-3 transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative grid gap-6 bg-black opacity-90 border-gray-900 border-2 rounded-lg px-5 py-6 sm:gap-8 sm:p-8">
                              {firmware.map((item: any) => (
                                <a
                                  key={item.id}
                                  href={item.link}
                                  className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-900"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <ArrowDownTrayIcon
                                    className="h-6 w-6 flex-shrink-0 text-indigo-200"
                                    aria-hidden="true"
                                  />
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-white whitespace-nowrap">
                                      {item.company +
                                        " " +
                                        item.model +
                                        " " +
                                        item.version}
                                    </p>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </Popover.Group>
              <div className="hidden items-center justify-end lg:flex md:flex-1 lg:w-0">
                <button
                  type="button"
                  data-dropdown-toggle="notification-dropdown"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <div
                  className="hidden overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700"
                  id="notification-dropdown"
                >
                  <div className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    Notifications
                  </div>
                  <div>
                    <a
                      href="#"
                      className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                    >
                      <div className="flex-shrink-0">
                        <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 dark:border-gray-700">
                          <svg
                            className="w-2 h-2 text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 18"
                          >
                            <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z" />
                            <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                          </svg>
                        </div>
                      </div>
                      <div className="pl-3 w-full">
                        <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                          New message from{" "}
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Bonnie Green
                          </span>
                          : "Hey, what's up? All set for the presentation?"
                        </div>
                        <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
                          a few moments ago
                        </div>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                    >
                      <div className="flex-shrink-0">
                        <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white dark:border-gray-700">
                          <svg
                            className="w-2 h-2 text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                          >
                            <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                          </svg>
                        </div>
                      </div>
                      <div className="pl-3 w-full">
                        <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Jese leos
                          </span>{" "}
                          and{" "}
                          <span className="font-medium text-gray-900 dark:text-white">
                            5 others
                          </span>{" "}
                          started following you.
                        </div>
                        <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
                          10 minutes ago
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-lg bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-lg bg-cover"
                        src={
                          currentUser?.user.image
                            ? currentUser?.user.image!
                            : `/images/defaultUser.png`
                        }
                        height={30}
                        width={30}
                        alt="user picture"
                        blurDataURL={
                          currentUser?.user.image
                            ? currentUser?.user.image!
                            : `/images/defaultUser.png`
                        }
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-black border-gray-900 border-2 opacity-90 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => onOpen()}
                            className={classNames(
                              active ? "bg-gray-900" : "",
                              "block px-4 py-2 text-sm text-gray-200 w-full text-left"
                            )}
                          >
                            Meu Perfil
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            target="_blank"
                            href="/settings/dashboard"
                            className={classNames(
                              active ? "bg-gray-900 " : "",
                              "block px-4 py-2 text-sm text-gray-200"
                            )}
                          >
                            Configurações
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              signOut({ callbackUrl: "/" });
                            }}
                            className={classNames(
                              active ? "bg-gray-900 w-full" : "",
                              "block px-4 py-2 text-sm text-gray-200 w-full text-start"
                            )}
                          >
                            Sair
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>

            <Transition
              as={Fragment}
              enter="duration-200 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute z-50 inset-x-0 top-0 origin-top-right transform p-2 transition lg:hidden"
              >
                <div className=" rounded-lg bg-black shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="px-5 pt-5 pb-4 ">
                    <div className="flex items-center justify-between border-b-2 border-gray-900 w-auto pb-4">
                      <div className="flex items-center ">
                        <Image
                          className="h-10 w-auto rounded-lg border-2 border-gray-800"
                          src={
                            currentUser?.user.image
                              ? currentUser?.user.image!
                              : `/images/Default-user-picture.webp`
                          }
                          height={30}
                          width={50}
                          alt="user picture"
                          blurDataURL={
                            currentUser?.user.image
                              ? currentUser?.user.image!
                              : `/images/Default-user-picture.webp`
                          }
                        />
                        <span className="pl-3 text-xl font-bold text-white">
                          {currentUser?.user.name}
                        </span>
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="border-transparent focus:border-transparent focus:ring-0 inline-flex items-center justify-center rounded-md bg-transparent p-2 text-gray-400 hover:bg-gray-900 hover:text-gray-500 focus:outline-none">
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="mt-6">
                      <nav className="grid gap-y-8 border-b-2 border-gray-900 pb-6">
                        <Link
                          href="/solutionBank"
                          className="px-2 text-base font-medium text-gray-300 hover:text-white"
                        >
                          Banco de soluções
                        </Link>
                        <Link
                          href="/script"
                          className="px-2 text-base font-medium text-gray-300 hover:text-white"
                        >
                          Scripts
                        </Link>
                        <Link
                          href="/ponVerification"
                          className="px-2 text-base font-medium text-gray-300 hover:text-white"
                        >
                          Aferir pon
                        </Link>
                        <Link
                          href="https://docs.google.com/spreadsheets/d/1aiSO7e_fERVePE9VhMXfA4sHHpbLwxpdAr__ei7k0y4/edit#gid=0"
                          className="px-2 text-base font-medium text-gray-300 hover:text-white"
                        >
                          CNPJ/COND
                        </Link>
                        <Link
                          href="http://131.255.132.6:8887/doku.php"
                          className="px-2 text-base font-medium text-gray-300 hover:text-white"
                        >
                          Wiki
                        </Link>

                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full items-center justify-between px-2 text-left font-medium text-gray-200 focus:outline-none">
                                Mapas
                                <ChevronRightIcon
                                  className={
                                    open
                                      ? "rotate-90 transform h-8 w-auto"
                                      : "h-8 w-auto"
                                  }
                                />
                              </Disclosure.Button>
                              <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                              >
                                <Disclosure.Panel className="text-gray-200 bg-gray-900 px-2 rounded-md mr-2 ">
                                  {maps.map((item: any) => (
                                    <a
                                      key={item.name}
                                      href={item.link}
                                      className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-700"
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <item.icon
                                        className="h-6 w-6 flex-shrink-0 text-white"
                                        aria-hidden="true"
                                      />
                                      <span className="ml-3 text-base font-medium text-gray-200">
                                        {item.name}
                                      </span>
                                    </a>
                                  ))}
                                </Disclosure.Panel>
                              </Transition>
                            </>
                          )}
                        </Disclosure>

                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full items-center justify-between px-2 text-left font-medium text-gray-200 focus:outline-none">
                                Empresas
                                <ChevronRightIcon
                                  className={
                                    open
                                      ? "rotate-90 transform h-8 w-auto"
                                      : "h-8 w-auto"
                                  }
                                />
                              </Disclosure.Button>
                              <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                              >
                                <Disclosure.Panel className="text-gray-200 bg-gray-900 px-2 rounded-md mr-2 ">
                                  {neutralNetwork.map((item: any) => (
                                    <a
                                      key={item.id}
                                      href={item.link}
                                      className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-900 overflow-hidden "
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <TableCellsIcon
                                        className="h-6 w-6 flex-shrink-0 text-indigo-200"
                                        aria-hidden="true"
                                      />
                                      <div className="ml-4">
                                        <p className="text-base font-medium text-gray-200 whitespace-nowrap">
                                          {item.company}
                                        </p>
                                      </div>
                                    </a>
                                  ))}
                                </Disclosure.Panel>
                              </Transition>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full items-center justify-between px-2 text-left font-medium text-gray-200 focus:outline-none">
                                Firmware
                                <ChevronRightIcon
                                  className={
                                    open
                                      ? "rotate-90 transform h-8 w-auto"
                                      : "h-8 w-auto"
                                  }
                                />
                              </Disclosure.Button>
                              <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                              >
                                <Disclosure.Panel className="text-gray-200 bg-gray-900 px-2 rounded-md mr-2 ">
                                  {firmware.map((item: any) => (
                                    <a
                                      key={item.id}
                                      href={item.link}
                                      className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-900"
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <ArrowDownTrayIcon
                                        className="h-6 w-6 flex-shrink-0 text-indigo-200"
                                        aria-hidden="true"
                                      />
                                      <div className="ml-4">
                                        <p className="text-base font-medium text-white whitespace-nowrap">
                                          {item.company +
                                            " " +
                                            item.model +
                                            " " +
                                            item.version}
                                        </p>
                                      </div>
                                    </a>
                                  ))}
                                </Disclosure.Panel>
                              </Transition>
                            </>
                          )}
                        </Disclosure>
                      </nav>
                    </div>
                  </div>
                  <div className="pb-6 px-5">
                    <div>
                      <button
                        onClick={() => onOpen()}
                        className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-600"
                      >
                        Meu perfil
                      </button>
                      <Link
                        target="_blank"
                        href="/settings/dashboard"
                        className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-600"
                      >
                        Configurações
                      </Link>
                      <button
                        onClick={() => {
                          signOut({ callbackUrl: "/" });
                        }}
                        className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-600"
                      >
                        Sair
                      </button>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </nav>
      </header>
      <Modal isOpen={isOpen} cancel={() => onClose()}>
        <Perfil currentUser={currentUser} />
      </Modal>
    </>
  );
}

export default Navbar;
