"use client";
import Content from "@/components/Content";
import { CopilotPopup } from "@copilotkit/react-ui";

export default function Home(): JSX.Element {
  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 overflow-auto">
        <h1 className="text-xl font-semibold mb-2">AI Document Editor</h1>
        <Content />
      </div>

      <div className="w-full max-w-md border-l border-gray-300 p-4 bg-white">
        {/* <CustomChatInterface /> */}
        <CopilotPopup defaultOpen />
      </div>
    </div>
  );
}
