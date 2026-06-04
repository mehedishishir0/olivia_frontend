"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mail, Send, Sun, User, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// shadcn Dialog components
const Dialog = ({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) => {
  if (!open) return null;
  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%]">
        {children}
      </div>
    </>
  );
};

const DialogContent = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-lg shadow-xl p-6">{children}</div>
);

const DialogHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">{children}</div>
);

const DialogTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg  text-slate-900">{children}</h2>
);

const DialogDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-slate-500 mt-1">{children}</p>
);

const DialogFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="flex justify-end gap-3 mt-6">{children}</div>
);

// Reusable Card Component for the sidebar
const SidebarCard = ({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
  >
    <div className="mt-1 p-2 bg-slate-50 rounded-lg border border-slate-100">
      <Mail className="w-5 h-5 text-teal-700" />
    </div>
    <div>
      <h3 className="text-slate-800 text-[15px]">{title}</h3>
      <p className="text-sm text-slate-500 leading-snug mt-1">{description}</p>
    </div>
  </div>
);

// Typing animation component
const TypingText = ({
  text,
  onComplete,
}: {
  text: string;
  onComplete?: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 15);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return (
    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
      {displayedText}
      {currentIndex < text.length && (
        <span className="inline-block w-0.5 h-4 bg-teal-600 ml-0.5 animate-pulse" />
      )}
    </p>
  );
};

// Message component with typing animation
const Message = ({
  role,
  content,
  isTyping = false,
  onTypingComplete,
}: {
  role: "user" | "assistant";
  content: string;
  isTyping?: boolean;
  onTypingComplete?: () => void;
}) => {
  return (
    <div
      className={`flex gap-3 max-w-[85%] ${
        role === "user" ? "ml-auto flex-row-reverse" : ""
      }`}
    >
      <div className="shrink-0 h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center">
        {role === "user" ? (
          <User className="w-4 h-4 text-slate-600" />
        ) : (
          <Sun className="w-4 h-4 text-slate-600" />
        )}
      </div>
      <div
        className={`p-4 rounded-2xl ${
          role === "user"
            ? "bg-[#003D3D] rounded-tr-none text-white"
            : "bg-white rounded-tl-none border border-slate-100 shadow-sm"
        }`}
      >
        {isTyping && role === "assistant" ? (
          <TypingText text={content} onComplete={onTypingComplete} />
        ) : (
          <p
            className={`text-sm ${
              role === "user" ? "text-white" : "text-slate-700"
            } leading-relaxed whitespace-pre-wrap`}
          >
            {content}
          </p>
        )}
      </div>
    </div>
  );
};

export default function ClimateCareerGuide() {
  const { data: session } = useSession();
  const userId = session?.user?.id || "guest_user";
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<
    Array<{ role: string; content: string }>
  >([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingMessage, setCurrentTypingMessage] = useState<string>("");
  const [showClearDialog, setShowClearDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch chat history - GET request with query params
  const { isLoading: isLoadingHistory, refetch: refetchHistory } = useQuery({
    queryKey: ["chatHistory", userId],
    queryFn: async () => {
      if (!userId || userId === "guest_user") return [];
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_CHATBOT_URL}/api/chat/history/`,
          {
            params: { user_id: userId },
            headers: {
              accept: "application/json",
            },
          },
        );

        console.log("History API Response:", response.data);

        // Parse the response based on the actual API structure from your docs
        if (response.data.status && response.data.statuscode === 200) {
          let history = [];

          // Check if response_body exists (from your API docs)
          if (
            response.data.response_body &&
            Array.isArray(response.data.response_body)
          ) {
            history = response.data.response_body;
          }
          // Check if data.response_body exists
          else if (
            response.data.data &&
            response.data.data.response_body &&
            Array.isArray(response.data.data.response_body)
          ) {
            history = response.data.data.response_body;
          }
          // Check if text field contains the history
          else if (response.data.text) {
            if (typeof response.data.text === "string") {
              try {
                const parsedText = JSON.parse(response.data.text);
                if (parsedText.history && Array.isArray(parsedText.history)) {
                  history = parsedText.history;
                } else if (Array.isArray(parsedText)) {
                  history = parsedText;
                }
              } catch (e) {
                console.error("Error parsing history text:", e);
              }
            } else if (
              response.data.text.history &&
              Array.isArray(response.data.text.history)
            ) {
              history = response.data.text.history;
            }
          }
          // Check if data.history exists
          else if (
            response.data.data &&
            response.data.data.history &&
            Array.isArray(response.data.data.history)
          ) {
            history = response.data.data.history;
          }
          // Check if response itself is an array
          else if (Array.isArray(response.data)) {
            history = response.data;
          }

          console.log("Parsed history:", history);
          setMessages(history);
          return history;
        }
        return [];
      } catch (error) {
        console.error("Error fetching chat history:", error);
        return [];
      }
    },
    enabled: !!userId && userId !== "guest_user",
  });

  // Send message mutation - POST request as FORM DATA
  const sendMessageMutation = useMutation({
    mutationFn: async (queryText: string) => {
      // Create form data
      const formData = new URLSearchParams();
      formData.append("user_id", userId);
      formData.append("query", queryText);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_CHATBOT_URL}/api/chat/`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            accept: "application/json",
          },
        },
      );

      console.log("Send message response:", response.data);

      if (!response.data.status) {
        throw new Error(response.data.description || "Failed to send message");
      }
      return response.data;
    },
    onMutate: async (queryText) => {
      // Add user message immediately
      const userMessage = { role: "user", content: queryText };
      setMessages((prev) => [...prev, userMessage]);
      // Start typing animation for assistant response
      setIsTyping(true);
      setCurrentTypingMessage("");
    },
    onSuccess: (data) => {
      // Extract answer from response based on your API structure
      let assistantMessage = "";

      console.log("Processing response data:", data);

      // Try different possible response structures
      if (data.response && data.response.answer) {
        assistantMessage = data.response.answer;
      } else if (data.answer) {
        assistantMessage = data.answer;
      } else if (data.text) {
        if (typeof data.text === "string") {
          try {
            const parsedText = JSON.parse(data.text);
            assistantMessage =
              parsedText.answer || parsedText.text || data.text;
          } catch (e) {
            assistantMessage = data.text;
          }
        } else if (data.text.answer) {
          assistantMessage = data.text.answer;
        } else {
          assistantMessage = JSON.stringify(data.text);
        }
      } else {
        assistantMessage =
          "I received your message but I'm not sure how to respond. Could you please rephrase?";
      }

      setCurrentTypingMessage(assistantMessage);
    },
    onError: (error) => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an error. Please check your connection and try again.",
        },
      ]);
      console.error("Error sending message:", error);
    },
  });

  // Clear chat history mutation - DELETE request with FORM DATA in body
  const clearChatMutation = useMutation({
    mutationFn: async () => {
      // Create form data for DELETE request
      const formData = new URLSearchParams();
      formData.append("user_id", userId);

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_CHATBOT_URL}/api/chat/clear/`,
        {
          data: formData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            accept: "application/json",
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      setMessages([]);
      setShowClearDialog(false);
      queryClient.invalidateQueries({ queryKey: ["chatHistory", userId] });
    },
    onError: (error) => {
      console.error("Error clearing chat:", error);
      alert("Failed to clear chat history. Please try again.");
    },
  });

  const handleSendMessage = async () => {
    if (!query.trim() || sendMessageMutation.isPending) return;
    const currentQuery = query;
    setQuery("");
    await sendMessageMutation.mutateAsync(currentQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setShowClearDialog(true);
  };

  const handleConfirmClear = () => {
    clearChatMutation.mutate();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleTypingComplete = () => {
    setIsTyping(false);
    // Add the completed message to the messages array
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: currentTypingMessage },
    ]);
    setCurrentTypingMessage("");
    // Refetch history to sync
    if (userId && userId !== "guest_user") {
      setTimeout(() => {
        refetchHistory();
      }, 500);
    }
  };

  // Show loading state while fetching history
  if (isLoadingHistory && messages.length === 0) {
    return (
      <div className="min-h-screen bg-[#F4F9F9] p-6 md:p-20 text-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your chat history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F9F9] p-6 md:p-20 text-slate-900">
      {/* Clear Chat Confirmation Dialog */}
      <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clear Chat History</DialogTitle>
            <DialogDescription>
              Are you sure you want to clear all your chat history? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setShowClearDialog(false)}
              className="px-4 py-2 text-sm  text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              disabled={clearChatMutation.isPending}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmClear}
              disabled={clearChatMutation.isPending}
              className="px-4 py-2 text-sm  text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {clearChatMutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Clearing...
                </>
              ) : (
                "Clear Chat"
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl text-[#004D4D] tracking-tight">
          Your Personal Climate Career Guide
        </h1>
        <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg">
          Our AI-powered assistant helps you navigate the climate ecosystem with
          clarity and confidence.
        </p>
      </header>

      {/* Main Content Grid */}
      <main className="container grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Categories */}
        <div className="space-y-4">
          <SidebarCard
            title="Climate Jobs & Internships"
            description="Full-time, part-time, and internship roles across the climate sector"
            onClick={() =>
              handleSuggestionClick("Show me climate jobs and internships")
            }
          />
          <SidebarCard
            title="Fellowships & Funding"
            description="Grants, fellowships, and funding programs for climate professionals"
            onClick={() =>
              handleSuggestionClick(
                "Tell me about fellowships and funding opportunities",
              )
            }
          />
          <SidebarCard
            title="Career Transition Pathways"
            description="Guided routes for professionals moving into the climate space"
            onClick={() =>
              handleSuggestionClick(
                "How can I transition into climate careers?",
              )
            }
          />
          <SidebarCard
            title="Skill-Building Resources"
            description="Courses, certifications, and learning materials for climate skills"
            onClick={() =>
              handleSuggestionClick(
                "What skill-building resources are available?",
              )
            }
          />
          <SidebarCard
            title="Networking & Events"
            description="Conferences, meetups, and community events in the climate sector"
            onClick={() =>
              handleSuggestionClick("Tell me about climate networking events")
            }
          />
        </div>

        {/* Right Column: AI Assistant Chat Interface */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col h-[600px]">
          {/* Chat Header */}
          <div
            id="chat-header"
            className="bg-[#003D3D] p-4 flex justify-between items-center text-white"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm">Climate AI Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-[11px] text-slate-300">
                    Online · Ready to help
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={handleClearChat}
                  disabled={clearChatMutation.isPending}
                  className="text-[10px] uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1 disabled:opacity-40"
                  title="Clear chat history"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear
                </button>
              )}
              <span className="text-[10px] uppercase tracking-wider opacity-60">
                Free Access For Community
              </span>
            </div>
          </div>

          {/* Chat Messages Area - Only this area scrolls */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
            <div className="space-y-6">
              {messages.length === 0 && !isTyping && !currentTypingMessage && (
                <div className="flex flex-col items-center justify-center h-full text-center min-h-[400px]">
                  <div className="p-4 bg-white rounded-full mb-4">
                    <Sun className="w-12 h-12 text-teal-600" />
                  </div>
                  <h3 className="text-lg  text-slate-800 mb-2">
                    Welcome to Climate Career Assistant
                  </h3>
                  <p className="text-sm text-slate-500 max-w-md">
                    Ask me about climate jobs, fellowships, career transitions,
                    skill-building resources, or networking events. I&apos;m
                    here to help you navigate your climate career journey!
                  </p>
                </div>
              )}

              {/* Display all messages */}
              {messages.map((message, idx) => (
                <Message
                  key={idx}
                  role={message.role as "user" | "assistant"}
                  content={message.content}
                />
              ))}

              {/* Display typing message */}
              {isTyping && currentTypingMessage && (
                <Message
                  role="assistant"
                  content={currentTypingMessage}
                  isTyping={true}
                  onTypingComplete={handleTypingComplete}
                />
              )}

              {/* Loading indicator for mutation */}
              {sendMessageMutation.isPending && !isTyping && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="shrink-0 h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center">
                    <Sun className="w-4 h-4 text-slate-600" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about climate opportunities, career paths, or skills..."
                className="w-full bg-slate-100 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all outline-none"
                disabled={sendMessageMutation.isPending || isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={
                  !query.trim() || sendMessageMutation.isPending || isTyping
                }
                className="bg-[#004D4D] p-2.5 rounded-xl text-white hover:bg-[#003D3D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-3">
              Free access · No account required to start
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
