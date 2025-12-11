import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal, Paperclip, Mic } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  initialValue?: string;
}

export function ChatInput({ onSend, isLoading, initialValue = "" }: ChatInputProps) {
  const [input, setInput] = useState(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update input when initialValue changes
  useEffect(() => {
    setInput(initialValue);
  }, [initialValue]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput("");
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  return (
    <div className="relative w-full max-w-3xl mx-auto p-4">
      <div className="relative flex flex-col gap-2 p-2 bg-card border rounded-3xl shadow-sm focus-within:ring-2 focus-within:ring-ring/20 transition-all">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="공부하다 궁금한 점을 물어보세요..."
          className="min-h-[50px] max-h-[200px] w-full resize-none border-0 bg-transparent px-4 py-3 focus-visible:ring-0 shadow-none text-base"
          disabled={isLoading}
        />

        <div className="flex items-center justify-between px-2 pb-1">
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full h-8 w-8">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full h-8 w-8">
              <Mic className="h-4 w-4" />
            </Button>
          </div>

          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="rounded-full h-9 w-9 shrink-0 transition-all"
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="text-center mt-2">
        <p className="text-xs text-red-600 font-medium">
          AI는 실수할 수 있습니다. 중요한 정보는 꼭 확인하세요.
        </p>
      </div>
    </div>
  );
}
