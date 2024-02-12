"use client";
import Navbar from "@/components/navbar/Navbar";
//import getCurrentUser from "@/actions/getCurrentUser";
import PageWrapper from "@/lib/framerMotion/pageWrapper";
import NextTopLoader from "nextjs-toploader";
import { getNeutralNetwork } from "@/lib/actions/getNeutralNetwork";
import { motion, AnimatePresence } from "framer-motion";
import { getCurrentUser } from "@/app/api/auth/[...nextauth]/route";
import { getFirmware } from "@/lib/actions/getFirmware";

import getUsers from "@/lib/actions/getUsers";
import NavbarUtilities from "@/components/settings/navbarUtilities/NavbarUtilities";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Search from "@/components/inputs/search";
import Image from "next/image";
import { MapIcon } from "@heroicons/react/24/outline";
import MotionPage from "@/lib/framerMotion/motionPage";
import MotionComponent from "@/lib/framerMotion/motionComponent";
import useNavbarUtilitiesModal from "@/lib/zustand/useNavbarUtilities";
import Modal from "@/components/modals/Modal";
import MapsForm from "@/components/form/navbarUtilities/mapsForm";
import axios from "axios";

export default function Maps({ maps }: any) {
  const session = useSession();
  const router = useRouter();

  const [query, setQuery] = useState("");

  const notify = (text: any) => {
    toast.error(text, {
      theme: "dark",
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });
  };
  const notifySuc = (text: string) => {
    toast.success(text, {
      theme: "dark",
      pauseOnFocusLoss: false,
      hideProgressBar: false,
    });
  };

  useEffect(() => {
    if (session?.status == "unauthenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  const isOpen = useNavbarUtilitiesModal((state) => state.isOpen);
  const onOpen: () => void = useNavbarUtilitiesModal((state) => state.onOpen);
  const onClose: () => void = useNavbarUtilitiesModal((state) => state.onClose);
  const [selected, setSelected] = useState();
  const [deleteLoading, setDeleteLoading] = useState<any>();

  const filtered =
    query === ""
      ? maps
      : maps.filter((user: any) =>
          user.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const deleteItem = async (item: any, i: number) => {
    setDeleteLoading({ state: true, index: i });

    await axios
      .post("/api/maps/delete", {
        id: item.id,
      })
      .then(async (res: any) => {
        if (res.data.error) {
          setDeleteLoading(false);

          return notify(res.data.error);
        }
        setDeleteLoading(false);

        notifySuc("Excluido com sucesso");
        router.refresh();
      });
  };

  return (
    <>
      <MotionComponent id="mapas">
        <div className="flex flex-col m-2 bg-black backdrop-blur-sm shadow-xl shadow-black rounded-md bg-opacity-80 pb-4">
          <div className="flex m-6 justify-end gap-2">
            <div className=" max-w-xs">
              <Search
                value={query}
                onChange={(e: any) => setQuery(e.target.value)}
              />
            </div>
            <button
              className="bg-gray-800 rounded-md p-2 text-gray-300 hover:bg-gray-700 min-w-min overflow-hidden overflow-ellipsis"
              onClick={() => {
                setSelected(undefined);
                onOpen();
              }}
            >
              Adicionar mapa
            </button>
          </div>
          <ul role="list" className="flex flex-col px-6 gap-2">
            {filtered.map((item: any, i: number) => (
              <li
                key={i}
                className="flex justify-between gap-x-6 p-5 bg-gray-900 bg-opacity-80 rounded-md"
              >
                <div className="flex min-w-0 gap-x-4">
                  <MapIcon className=" w-auto h-[3rem] text-gray-300" />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-extrabold leading-6 text-gray-300 whitespace-nowrap">
                      {item.name}
                    </p>
                    <p className=" text-xs  max-w-sm truncate leading-6 text-gray-300 ">
                      {item.link}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="hidden shrink-0 sm:flex items-center gap-2 w-full">
                    <button
                      className="bg-gray-800 text-gray-300 p-2 rounded-md w-full hover:bg-gray-700 transition"
                      type="button"
                      onClick={() => {
                        setSelected(item.id);
                        onOpen();
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-gray-800 text-gray-300 p-2 rounded-md w-full hover:bg-gray-700 transition"
                      onClick={() => {
                        deleteItem(item, i);
                      }}
                    >
                      {deleteLoading?.state && deleteLoading?.index == i ? (
                        <div
                          className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                          role="status"
                        >
                          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Loading...
                          </span>
                        </div>
                      ) : (
                        "Excluir"
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </MotionComponent>
      <Modal
        isOpen={isOpen}
        cancel={() => {
          onClose();
        }}
      >
        <MapsForm id={selected} />
      </Modal>
    </>
  );
}
