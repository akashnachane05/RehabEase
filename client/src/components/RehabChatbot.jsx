import React, { useState, useEffect, useRef } from "react";

const data = {
  questions: [
    {
      id: 1,
      question: "What is your affected body area?",
      options: [
        { text: "Neck", next: 2 },
        { text: "Shoulder", next: 2 },
        { text: "Elbow", next: 2 },
        { text: "Wrist", next: 2 },
        { text: "Back", next: 2 },
        { text: "Hip", next: 2 },
        { text: "Knee", next: 2 },
        { text: "Ankle", next: 2 },
      ],
    },
    {
      id: 2,
      question: "Is the pain acute (recent) or chronic (long-term)?",
      options: [
        { text: "Acute", next: 3 },
        { text: "Chronic", next: 3 },
      ],
    },
    {
      id: 3,
      question: "Are you recovering from a surgery?",
      options: [
        { text: "Yes", next: 4 },
        { text: "No", next: 4 },
      ],
    },
    {
      id: 4,
      question: "What is your current mobility level?",
      options: [
        { text: "No movement", next: 5 },
        { text: "Limited movement", next: 5 },
        { text: "Full movement with pain", next: 5 },
      ],
    },
    {
      id: 5,
      question: "Are you experiencing swelling or inflammation?",
      options: [
        { text: "Yes", next: 6 },
        { text: "No", next: 6 },
      ],
    },
    {
      id: 6,
      question: "Do you have access to any equipment?",
      options: [
        { text: "None", next: 7 },
        { text: "Resistance band", next: 7 },
        { text: "Dumbbells", next: 7 },
        { text: "Chair/Wall", next: 7 },
      ],
    },
    {
      id: 7,
      question: "Do you feel pain while doing daily activities?",
      options: [
        { text: "Yes", next: 8 },
        { text: "No", next: 8 },
      ],
    },
    {
      id: 8,
      question: "Do you prefer seated or standing exercises?",
      options: [
        { text: "Seated", next: 9 },
        { text: "Standing", next: 9 },
        { text: "Both", next: 9 },
      ],
    },
    {
      id: 9,
      question: "How many minutes can you dedicate daily?",
      options: [
        { text: "<10 mins", next: 10 },
        { text: "10–20 mins", next: 10 },
        { text: ">20 mins", next: 10 },
      ],
    },
    {
      id: 10,
      question: "How old are you?",
      options: [
        { text: "<18", next: 11 },
        { text: "18–40", next: 11 },
        { text: "40–60", next: 11 },
        { text: "60+", next: 11 },
      ],
    },
    {
      id: 11,
      question: "Do you have any known balance issues?",
      options: [
        { text: "Yes", next: 12 },
        { text: "No", next: 12 },
      ],
    },
    {
      id: 12,
      question: "Do you want to improve strength or flexibility?",
      options: [
        { text: "Strength", next: 13 },
        { text: "Flexibility", next: 13 },
        { text: "Both", next: 13 },
      ],
    },
    {
      id: 13,
      question: "Have you done rehabilitation before?",
      options: [
        { text: "Yes", next: 14 },
        { text: "No", next: 14 },
      ],
    },
    {
      id: 14,
      question: "Do you have cardiovascular issues?",
      options: [
        { text: "Yes", next: 15 },
        { text: "No", next: 15 },
      ],
    },
    {
      id: 15,
      question: "Are you experiencing numbness or tingling?",
      options: [
        { text: "Yes", next: 16 },
        { text: "No", next: 16 },
      ],
    },
    {
      id: 16,
      question: "Would you prefer guided video or step-by-step instructions?",
      options: [
        { text: "Video", next: 17 },
        { text: "Text", next: 17 },
        { text: "Both", next: 17 },
      ],
    },
    {
      id: 17,
      question: "Do you feel fatigued easily?",
      options: [
        { text: "Yes", next: 18 },
        { text: "No", next: 18 },
      ],
    },
    {
      id: 18,
      question: "How many days per week can you commit?",
      options: [
        { text: "1–2 days", next: 19 },
        { text: "3–4 days", next: 19 },
        { text: "5+ days", next: 19 },
      ],
    },
    {
      id: 19,
      question: "Would you like to receive progress tracking tips?",
      options: [
        { text: "Yes", next: 20 },
        { text: "No", next: 20 },
      ],
    },
    {
      id: 20,
      question: "Do you want to include breathing or relaxation exercises?",
      options: [
        { text: "Yes", next: "recommendation" },
        { text: "No", next: "recommendation" },
      ],
    },
  ],

  recommendations: {
    Neck: [
      "Neck tilts",
      "Chin tucks",
      "Neck stretches",
      "Shoulder rolls",
      "Isometric neck exercises",
    ],
    Shoulder: [
      "Shoulder shrugs",
      "Pendulum swings",
      "Wall climbs",
      "External rotation with resistance band",
      "Shoulder blade squeezes",
    ],
    Elbow: [
      "Elbow flexion/extension",
      "Wrist rotations",
      "Grip strengthening",
      "Towel twists",
      "Forearm pronation/supination",
    ],
    Wrist: [
      "Wrist circles",
      "Finger stretches",
      "Wrist flexion/extension",
      "Grip strengthening",
      "Nerve gliding exercises",
    ],
    Back: [
      "Cat-cow stretch",
      "Pelvic tilts",
      "Bridge exercise",
      "Bird-dog",
      "Lumbar rotations",
    ],
    Hip: [
      "Hip flexor stretch",
      "Glute bridges",
      "Hip abduction",
      "Clamshells",
      "Standing hip extension",
    ],
    Knee: [
      "Quadriceps sets",
      "Hamstring curls",
      "Straight leg raises",
      "Heel slides",
      "Step-ups",
    ],
    Ankle: [
      "Ankle pumps",
      "Toe curls",
      "Heel raises",
      "Ankle circles",
      "Resistance band dorsiflexion",
    ],
    breathing: [
      "Deep breathing exercises",
      "Progressive muscle relaxation",
      "Guided meditation",
    ],
    default: [
      "General stretching",
      "Light walking",
      "Range of motion exercises",
      "Balance exercises",
    ],
  },
};

export default function RehabChatbot() {
  const [currentId, setCurrentId] = useState(1);
  const [chat, setChat] = useState([]); // { sender: 'bot'|'user', text, timestamp }
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const chatEndRef = useRef(null);

  // Scroll to bottom on new chat message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  // On load, show first question
  useEffect(() => {
    const firstQ = data.questions.find((q) => q.id === currentId);
    if (firstQ) {
      addBotMessage(firstQ.question);
    }
  }, []);

  const addBotMessage = (text) => {
    setChat((prev) => [
      ...prev,
      { sender: "bot", text, timestamp: new Date().toLocaleTimeString() },
    ]);
  };

  const addUserMessage = (text) => {
    setChat((prev) => [
      ...prev,
      { sender: "user", text, timestamp: new Date().toLocaleTimeString() },
    ]);
  };

  const handleAnswer = (option) => {
    addUserMessage(option.text);
    setAnswers((prev) => ({ ...prev, [currentId]: option.text }));

    if (option.next === "recommendation") {
      const recs = generateRecommendations();
      const recText = [
        "🎯 Your Exercise Recommendations:",
        ...recs.map((ex) => `• ${ex}`)
      ].join('\n');
      setTimeout(() => {
        addBotMessage("Generating your personalized exercise recommendations...");
        setTimeout(() => {
          addBotMessage(recText);
          // Add a restart button as a special bot message
          setChat((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "__RESTART_BUTTON__",
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
          setCurrentId(1);
          setAnswers({});
        }, 800);
      }, 400);
    } else {
      setTimeout(() => {
        const nextQ = data.questions.find((q) => q.id === option.next);
        if (nextQ) {
          addBotMessage(nextQ.question);
          setCurrentId(nextQ.id);
        }
      }, 600);
    }
  };

  // Generate recommendations based on key answers
  const generateRecommendations = () => {
    // Get key answers
    const bodyArea = answers[1] || "default";
    const painType = answers[2] || "";
    const mobility = answers[4] || "";
    const equipment = answers[6] || "";
    const goal = answers[12] || "";
    const breathing = answers[20] || "No";

    // Base list from body area
    let recs = data.recommendations[bodyArea] || data.recommendations.default;

    // Modify based on pain type
    if (painType === "Acute") {
      recs = recs.filter((ex) => !ex.toLowerCase().includes("strengthening")); // Avoid heavy strengthening
    }

    // Modify based on mobility
    if (mobility === "No movement") {
      recs = ["Passive range of motion with assistance", ...recs];
    }

    // Modify based on equipment
    if (equipment === "Resistance band") {
      recs.push("Resistance band exercises tailored for " + bodyArea);
    } else if (equipment === "Dumbbells") {
      recs.push("Light dumbbell strengthening exercises for " + bodyArea);
    }

    // Goal based filtering
    if (goal === "Flexibility") {
      recs = recs.filter(
        (ex) => ex.toLowerCase().includes("stretch") || ex.toLowerCase().includes("flexibility") || ex.toLowerCase().includes("range of motion")
      );
    } else if (goal === "Strength") {
      recs = recs.filter(
        (ex) => ex.toLowerCase().includes("strength") || ex.toLowerCase().includes("bridge") || ex.toLowerCase().includes("raise") || ex.toLowerCase().includes("sets") || ex.toLowerCase().includes("squeeze")
      );
    }

    // Add breathing exercises if requested
    if (breathing === "Yes") {
      recs = [...recs, ...data.recommendations.breathing];
    }

    // Deduplicate and limit to 7 exercises max for clarity
    const uniqueRecs = [...new Set(recs)].slice(0, 7);

    return uniqueRecs.length > 0 ? uniqueRecs : data.recommendations.default;
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg flex flex-col h-[600px]">
      <div className="flex-grow overflow-y-auto mb-4 space-y-3 px-2">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "bot" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-lg inline-block whitespace-pre-line
                ${
                  msg.sender === "bot"
                    ? "bg-blue-100 text-blue-900 rounded-bl-none animate-fadeIn"
                    : "bg-green-200 text-green-900 rounded-br-none animate-fadeIn"
                }`}
              style={{ animationDuration: "0.4s" }}
            >
              {/* Render restart button if special message */}
              {msg.text === "__RESTART_BUTTON__" ? (
                <div className="flex flex-col gap-2">
                  <button
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
                    onClick={() => {
                      setChat([]);
                      setAnswers({});
                      setCurrentId(1);
                      setTimeout(() => {
                        addBotMessage(data.questions[0].question);
                      }, 100);
                    }}
                  >
                    🔄 Restart Chat
                  </button>
                  <button
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                    onClick={() => {
                      window.location.href = "/login";
                    }}
                  >
                    🔐 Login to Save & Track Exercises
                  </button>
                  <div className="text-xs text-gray-500 mt-1 text-center">
                    If you want to save or track these exercises, please login.
                  </div>
                </div>
              ) : (
                <>
                  <div>{msg.text}</div>
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {msg.timestamp}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Only show options if not at recommendations */}
      {chat.length > 0 &&
        !chat[chat.length - 1].text.startsWith("🎯 Your Exercise Recommendations") &&
        chat[chat.length - 1].text !== "__RESTART_BUTTON__" &&
        data.questions.find((q) => q.id === currentId)?.options && (
          <div className="flex flex-wrap gap-2 justify-center">
            {data.questions
              .find((q) => q.id === currentId)
              ?.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  {option.text}
                </button>
              ))}
          </div>
        )}

      {/* Tailwind Animations */}
      <style>{`
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(10px);}
          to {opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation-name: fadeIn;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
}
