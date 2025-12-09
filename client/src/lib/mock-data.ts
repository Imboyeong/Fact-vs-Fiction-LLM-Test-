export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

export const MOCK_SESSIONS = [
  {
    id: "1",
    title: "Quantum Physics Help",
    date: "Today",
  },
  {
    id: "2",
    title: "Linear Algebra Exam Prep",
    date: "Yesterday",
  },
  {
    id: "3",
    title: "History Essay Outline",
    date: "Previous 7 Days",
  },
];

export const INITIAL_GREETING: Message = {
  id: "init-1",
  role: "assistant",
  content: "Hello! I'm your AI study assistant. I can help you with math, science, literature, or any other subject. What are you working on today?",
  timestamp: new Date(),
};

export async function simulateAIResponse(question: string): Promise<string> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const responses = [
    "That's an interesting question about " + question + ". Let me break it down for you. \n\nFirst, we need to consider the fundamental principles involved...",
    "To solve this, we can apply the following formula. \n\n1. Step one is to identify your variables.\n2. Step two is to set up the equation.\n\nDoes that make sense?",
    "Here is a summary of what you asked: " + question + ". \n\nThis is a common topic in this field. The key concept to understand here is...",
    "I can certainly help with that! " + question + " involves several key components. Let's look at them one by one.",
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}
