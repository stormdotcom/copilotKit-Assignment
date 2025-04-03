"use client";

import { useDocumentContext } from "@/app/context/DocumentContext";
import { Role } from "@copilotkit/runtime-client-gql";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";

const Content: React.FC = () => {
  const { visibleMessages } = useDocumentContext();

  const nonUserMessages = visibleMessages.filter(
    (msg) => msg.role !== Role.User
  );

  return (
    <div className="border rounded p-2 w-full h-full text-lg">
      {nonUserMessages.map((msg, index) => (
        <Transition
          as={Fragment}
          key={index}
          appear={true}
          show={true}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <div className={"p-2 rounded-md max-w-[80%] break-words"}>
            {msg.content}
          </div>
        </Transition>
      ))}
    </div>
  );
};

export default Content;
