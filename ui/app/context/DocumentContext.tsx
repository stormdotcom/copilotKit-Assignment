"use client";

import { useCopilotChat } from "@copilotkit/react-core";
import {
  ActionExecutionMessage,
  Message,
  ResultMessage,
  TextMessage,
} from "@copilotkit/runtime-client-gql";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// 1) Define the shape of your context
interface DocumentContextValue {
  documentText: string;
  setDocumentText: (text: string) => void;

  visibleMessages: Message[];
  appendMessage: (message: TextMessage) => void;
  setMessages: (messages: Message[]) => void;
  deleteMessage: (id: string) => void;
  reloadMessages: () => void;
  stopGeneration: () => void;
  isLoading: boolean;
}

// 2) Create the context
const DocumentContext = createContext<DocumentContextValue | null>(null);

// 3) Provider component
export function DocumentProvider({ children }: { children: ReactNode }) {
  // Pull chat methods and state from CopilotKit
  const {
    visibleMessages,
    appendMessage,
    setMessages,
    deleteMessage,
    reloadMessages,
    stopGeneration,
    isLoading,
  } = useCopilotChat();

  // Local state for your "document text" field
  const [documentText, setDocumentText] = useState("");

  // --- SAVE MESSAGES TO LOCALSTORAGE ---
  useEffect(() => {
    // Only save if we actually have messages
    if (visibleMessages && visibleMessages.length > 0) {
      localStorage.setItem(
        "copilotkit-messages",
        JSON.stringify(visibleMessages)
      );
    }
  }, [visibleMessages]);

  // --- RESTORE MESSAGES FROM LOCALSTORAGE ---
  useEffect(() => {
    const saved = localStorage.getItem("copilotkit-messages");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        // Convert plain objects back into CopilotKit message classes
        const restoredMessages: Message[] = parsed.map((msg: any) => {
          switch (msg.type) {
            case "TextMessage":
              return new TextMessage({
                id: msg.id,
                role: msg.role,
                content: msg.content,
                createdAt: msg.createdAt,
              });
            case "ActionExecutionMessage":
              return new ActionExecutionMessage({
                id: msg.id,
                name: msg.name,
                scope: msg.scope,
                arguments: msg.arguments,
                createdAt: msg.createdAt,
              });
            case "ResultMessage":
              return new ResultMessage({
                id: msg.id,
                actionExecutionId: msg.actionExecutionId,
                actionName: msg.actionName,
                result: msg.result,
                createdAt: msg.createdAt,
              });
            default:
              // If you have custom message types, handle them here
              throw new Error(`Unknown message type: ${msg.type}`);
          }
        });

        // Set the messages in CopilotKit’s context
        setMessages(restoredMessages);
      } catch (error) {
        console.error("Failed to parse stored messages:", error);
      }
    }
  }, [setMessages]);

  // 4) Provide the context value
  const value: DocumentContextValue = {
    documentText,
    setDocumentText,
    visibleMessages,
    appendMessage,
    setMessages,
    deleteMessage,
    reloadMessages,
    stopGeneration,
    isLoading,
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
}

// 5) Custom hook for consuming the context
export function useDocumentContext() {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error(
      "useDocumentContext must be used within a DocumentProvider"
    );
  }
  return context;
}
