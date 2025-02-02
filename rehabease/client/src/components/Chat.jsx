import { useState, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Send, Smile, Paperclip } from "lucide-react";

// Initialize Socket Connection
const socket = io("http://localhost:5000", {
  auth: { token: localStorage.getItem("authToken") },
  reconnection: true,
  reconnectionAttempts: 5
});

const Chat = ({ patient, therapist }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const senderId = currentUser?._id;
  const senderType = currentUser?.role;
  const recipientId = patient?._id || therapist?._id;
  const recipientType = patient ? "Patient" : "Therapist";

  // Scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Fetch Chat History
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/chat/${recipientId}/${recipientType}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
        );
        console.log("Chat History:", response.data.messages);
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    if (recipientId) {
      fetchChatHistory();
    }

    // Socket Event Listeners
    socket.on("receiveMessage", (message) => {
      console.log("Received message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("userTyping", (data) => {
      if (data.sender === recipientId) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userTyping");
    };
  }, [recipientId, recipientType]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      sender: senderId,
      senderType: senderType,
      recipient: recipientId,
      recipientType: recipientType,
      text: newMessage,
      timestamp: new Date().toISOString()
    };

    console.log("Sending message:", messageData);
    socket.emit("sendMessage", messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setNewMessage("");
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    socket.emit("typing", { sender: senderId, recipient: recipientId });
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-lg shadow-xl">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600">
        <h3 className="text-lg font-semibold text-white">
          Chat with {patient?.name || therapist?.name}
        </h3>
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={msg._id || index}
            className={`flex ${msg.sender === senderId ? "justify-end" : "justify-start"} mb-4`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                msg.sender === senderId
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              <p className="text-sm break-words">{msg.text}</p>
              <span className="text-xs opacity-75 mt-1 block">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center text-gray-500 text-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
            </div>
            <span className="ml-2">typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <Smile className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={handleTyping}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`p-2 rounded-full ${
              newMessage.trim()
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
