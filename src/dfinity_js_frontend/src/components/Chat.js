import React, { useState } from "react";
import Loading from "./Loading";
import { useEffect } from "react";
import { login, logout } from "../utils/auth";
import toast from "react-hot-toast";
import SaveAssistant from "./SaveAssistant";
import { useAssistant } from "../context/assistantProvider";
import {
  analyseRunsStepsDone,
  createMessage,
  getAllThreadMessages,
  runTheAssistantOnTheThread,
} from "../utils/chat";
import { useUser } from "../context/userProvider";
import "./Chat.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Chat() {
  const [question, setQuestion] = useState("");
  const { username } = useUser();
  const [chatMessage, setChatMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [assistantModalOpened, setAssistantIdModalOpened] = useState(false);
  const { assistant, thread } = useAssistant();
  const [selectedValue, setSelectedValue] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    const params = new URLSearchParams(location.search);
    const canisterId = params.get("canisterId");
    if (canisterId) {
      console.log("i got the canister id " + canisterId);
      console.log(`/chat?canisterId=${canisterId}#${event.target.value}`);
      window.location.href = `/chat?canisterId=${canisterId}#${event.target.value}`;
      console.log("error here");
    } else {
      console.log("i did not get the canister id");
      window.location.href = `/chat#${event.target.value}`;
    }
  };

  const updateChatMessage = async () => {
    if (
      window.auth.principalText &&
      window.auth.isAuthenticated &&
      thread?.id
    ) {
      const messages = await getAllThreadMessages(thread.id);
      setChatMessage(messages);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!window.auth.isAuthenticated) {
      toast.error("You are not authenticated");
      return;
    }

    if (!assistant?.id) {
      toast.error("You need to add an assistant first");
      return;
    }

    if (!thread?.id || !assistant?.id) {
      console.log("Cannot create a message without a thread or an assistant");
      return;
    }

    if (!question) return;

    const messageToSend = { content: question, role: "user" };
    setChatMessage((prev) => [messageToSend, ...prev]);
    setLoading(true);
    await createMessage(thread.id, messageToSend);
    setQuestion("");
    const runId = await runTheAssistantOnTheThread(thread.id, assistant.id);
    const done = await analyseRunsStepsDone(thread.id, runId);
    if (done) {
      await updateChatMessage();
      setLoading(false);
    }
  };

  const handleSpecialSubmit = async (message) => {
    if (!window.auth.isAuthenticated) {
      toast.error("You are not authenticated");
      return;
    }

    if (!assistant?.id) {
      toast.error("You need to add an assistant first");
      return;
    }

    if (!thread?.id || !assistant?.id) {
      console.log("Cannot create a message without a thread or an assistant");
      return;
    }
    const messageToSend = { content: message, role: "user" };
    setChatMessage((prev) => ["Update Context", ...prev]);
    setLoading(true);
    await createMessage(thread.id, messageToSend);
    setQuestion("");
    const runId = await runTheAssistantOnTheThread(thread.id, assistant.id);
    const done = await analyseRunsStepsDone(thread.id, runId);
    if (done) {
      await updateChatMessage();
      setLoading(false);
    }
  };

  useEffect(() => {
    updateChatMessage();
  }, [window.auth.principalText, window.auth.isAuthenticated, thread?.id]);

  useEffect(() => {
    const href = window.location.href;
    const lastSlashIndex = href.lastIndexOf("#");
    const stringAfterLastSlash = href.substring(lastSlashIndex + 1);
    setSelectedValue(stringAfterLastSlash);
    let msg = "";
    if (window.auth.isAuthenticated) {
      if (stringAfterLastSlash == "beginner") {
        msg = `From now on explain everything to me like I am a beginner.
      I have no idea about blockchain.
      Always explain to me in short sentences and very simple.
      I also have no idea about the technical terms.
      I never programmed a thing on a computer. So explain to me like i am a beginner (toddler).
      Answer with "Understood" if you understood the explanation.
      `;
        console.log(msg);
      } else if (stringAfterLastSlash == "intermediate") {
        msg = `From now on explain everything to me like I am an Intermediate.
        I know a little bit about blockchain.
        Explain everything to me normally.
        I know some technical terms.
        I programmed a little bit on a computer and am familiar with the basics.
        Explain to me like I am an intermediate (student).
        Answer with "Understood" if you understood the explanation.
        `;
        console.log(msg);
      } else if (stringAfterLastSlash == "expert") {
        msg = `
      From now on explain everything to me like I am an expert, I know everything about blockchain.
      Always explain to me in long sentences and very complicated. I need as many details as there can be for the topic that i ask for.
      I know all the technical terms.
      I programmed a lot on a computer and am familiar with a lot of programming languages and technical terms. 
      Provide me with scientific papers and articles about the topic that i ask for and cite them if possible.
      Explain to me like I am an expert (professor).
      Answer with "Understood" if you understood the explanation.
      `;
        console.log(msg);
      }
      handleSpecialSubmit(msg);
    }
  }, [
    window.auth.principalText,
    window.auth.isAuthenticated,
    thread?.id,
    window.location.href,
  ]);

  return (
    <div className="wrapper">
      {assistantModalOpened && (
        <SaveAssistant onClose={() => setAssistantIdModalOpened(false)} />
      )}
      <div className="wrapper-header">
        <div>
          <select
            id="dropdown"
            className="custom-dropdown"
            value={selectedValue}
            onChange={handleSelectChange}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <button
            className="auth-button auth-button__hover"
            onClick={() => (window.auth.isAuthenticated ? logout() : login())}
          >
            {window.auth.isAuthenticated
              ? `Log out from ${assistant?.name ?? ""}`
              : "Login"}
          </button>
          {window.auth.isAuthenticated && (
            <button
              onClick={() => setAssistantIdModalOpened(true)}
              className="auth-button auth-button__hover"
            >
              {username ?? "Update username"}
            </button>
          )}
        </div>
      </div>
      <div className="container">
        <div className="right">
          <div className="chat active-chat">
            <div className="conversation-start"></div>
            {chatMessage
              .map((message, index) => (
                <div
                  key={index}
                  className={`bubble ${
                    message.role === "user" ? "me" : "assistant"
                  } ${
                    chatMessage.length - 1 === index && !loading
                      ? "last-message"
                      : ""
                  }
                  `}
                >
                  {message.content}
                </div>
              ))
              .reverse()}

            {loading && (
              <div className={`bubble assistant`}>
                <Loading />
              </div>
            )}
          </div>
          <div className="write">
            <input
              placeholder="Ask me anything about Blockchchain..."
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            {loading && <Loading />}
            {!loading && (
              <a
                onClick={(e) => {
                  handleSubmit(e);
                }}
                className="write-link send"
              ></a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
