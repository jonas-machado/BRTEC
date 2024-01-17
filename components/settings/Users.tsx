"use client";

import React, { useState, useEffect, Fragment } from "react";
//import io from "socket.io-client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterForm from "../form/RegisterForm";
import Image from "next/image";
import Search from "../inputs/search";
import useRegisterModal from "@/lib/zustand/useRegisterModal";
import Modal from "../modals/Modal";

//Constants
import useEditUserModal from "@/lib/zustand/useEditUser";
import EditUserForm from "../form/EditUserForm";
import axios from "axios";
import MotionComponent from "@/lib/framerMotion/motionComponent";

export default function Users({ users }: any) {
  const { data: session, update, status } = useSession();
  const router = useRouter();

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
    if (status == "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const isOpen = useRegisterModal((state) => state.isOpen);
  const onOpen: () => void = useRegisterModal((state) => state.onOpen);
  const onClose: () => void = useRegisterModal((state) => state.onClose);

  const editIsOpen = useEditUserModal((state) => state.isOpen);
  const editOnOpen: () => void = useEditUserModal((state) => state.onOpen);
  const editOnClose: () => void = useEditUserModal((state) => state.onClose);

  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(["Selecione o setor"]);

  const [deleteLoading, setDeleteLoading] = useState<any>();

  const filtered =
    query === ""
      ? users
      : users.filter((user: any) =>
          user.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const editUser = (user: any) => {
    setSelectedUser(user);
    editOnOpen();
  };
  const deleteUser = async (user: any, index: number) => {
    setDeleteLoading({ state: true, index: index });

    await axios
      .post("/api/user/delete", {
        email: user.email,
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
      <MotionComponent
        id="users"
        className="w-full overflow-y-scroll overflow-x-hidden"
      >
        <div className="flex flex-col m-2 w-full pt-4 bg-black backdrop-blur-sm shadow-xl shadow-black rounded-md bg-opacity-80">
          <div className="flex m-6 justify-end gap-2">
            <div className=" max-w-xs">
              <Search
                value={query}
                onChange={(e: any) => setQuery(e.target.value)}
              />
            </div>
            <button
              className="bg-gray-800 rounded-md p-2 text-gray-300"
              onClick={() => onOpen()}
            >
              Adicionar usuário
            </button>
          </div>
          <ul role="list" className="flex flex-col px-6 gap-2">
            {filtered.map((person: any, i: number) => (
              <li
                key={person.email}
                className={`flex justify-between gap-x-6 p-5 bg-gray-900 opacity-80 rounded-md shadow-black shadow-[inset_0_0px_100px_0px] border-2 border-gray-900`}
                style={{
                  backgroundImage: `url(${person.backgroundImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <div className="flex min-w-0 gap-x-4">
                  <Image
                    width={50}
                    height={40}
                    className="rounded-full w-auto h-[6rem] bg-gray-800"
                    src={
                      person?.image ? person.image : "/images/defaultUser.png"
                    }
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-300 whitespace-nowrap">
                      {person.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-300">
                      {person.email}
                    </p>
                    <p className="text-sm leading-6 text-gray-300">
                      {person.role}
                    </p>
                    <p className="text-sm leading-6 text-gray-300 ">
                      {person.sector}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="hidden shrink-0 sm:flex flex-col items-center  "></div>
                  <div className="hidden shrink-0 sm:flex flex-col items-center gap-2 w-20">
                    <button
                      className="bg-gray-800 text-gray-300 p-2 rounded-md w-full hover:bg-gray-700 transition"
                      onClick={() => editUser(person)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-gray-800 text-gray-300 p-2 rounded-md w-full hover:bg-gray-700 transition"
                      onClick={() => deleteUser(person, i)}
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
        <div className="">
          <RegisterForm />
        </div>
      </Modal>
      <Modal
        isOpen={editIsOpen}
        cancel={() => {
          editOnClose();
        }}
      >
        <div className="mt-8">
          <EditUserForm selectedUser={selectedUser} />
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
}
