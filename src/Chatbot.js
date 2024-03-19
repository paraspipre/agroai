import React, { useState, useRef, useEffect } from 'react';
import { BiSend } from 'react-icons/bi';
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import { BsRobot } from "react-icons/bs";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import OpenAI from 'openai';
import { useNavigate } from 'react-router-dom';
require("dotenv").config()

const openai = new OpenAI({
  organization: process.env.ORG,
  apiKey: process.env.OPENAI,
  dangerouslyAllowBrowser: true
});


const Chatbot = () => {
  const navigate = useNavigate()
  const [userQuery, setUserQuery] = useState('');
  const [botResponse, setBotResponse] = useState([]);
  const chatRef = useRef(null);
  const [typing, setIsTyping] = useState(false)
  const [chats, setChats] = useState([])
  const [theme, setTheme] = useState("dark")

  var chatbot = [{ role: "user", content: "what is pesticide" }, { role: "assistant", content: "Pesticides are substances that are used to control, repel, or kill pests such as insects, weeds, fungi, and rodents that can harm crops, livestock, and humans. They are commonly used in agriculture to protect crops from pests and diseases, thereby increasing crop yields and quality. Pesticides can come in various forms including sprays, powders, and baits. It is important to use pesticides responsibly and follow safety guidelines to minimize any negative impact on the environment and human health." }, { role: "user", content: "what is your name" }, { role: "assistant", content: "My name is AgroAi. I am here to assist you with any agricultural-related questions or information you may need. Feel free to ask me anything related to farming, gardening, livestock, or any other agriculture-related topic." }]
  const [chathist, setChathist] = useState([{ title: "chat A" }, { title: "chat A" }, { title: "chat A" }, { title: "chat A" }, { title: "chat A" }])

  const th = localStorage.getItem("theme")
  useEffect(() => {
    if (th) {
      setTheme(th)
    } else {
      localStorage.setItem("theme", "dark")
    }
  }, [th])



  const handletheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
    localStorage.setItem("theme", theme)
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userQuery)
    if (!userQuery) return;
    setUserQuery("")
    setIsTyping(true);
    let msgs = chats;
    msgs.push({ role: "user", content: userQuery });
    console.log(msgs)
    setChats(msgs);

    // setMessage("");


    // openai.chat.completions
    //   .create({
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //       { role: "system", content: "You are AgroAi a helpful and kind AI Agriculture Assistant" },
    //       ...chats,
    //     ],
    //   }).withResponse()
    //   .then((res) => {
    //     msgs.push(res.data.choices[0].message);
    //     setChats(msgs);
    //     setIsTyping(false);

    //     console.log(res.data.choices[0].message.content);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     setIsTyping(false);
    //   });

    // Scroll to the bottom to show the latest message
    // scrollToBottom();
  };

  // const scrollToBottom = () => {
  //   chatRef.current.scrollTop = chatRef.current.scrollHeight;
  // };

  // useEffect(() => {
  //   // Scroll to the bottom when component first loads
  //   scrollToBottom();
  // }, []);

  // useEffect(() => {
  //   // Scroll to the bottom when new messages are added
  //   scrollToBottom();
  // }, [botResponse]);


  // node --version # Should be >= 18
  // npm install @google/generative-ai





  return (
    <div className={`${theme === "dark" ? "bg-[#1F222A] text-white" : "bg-[#FFF]"} flex w-full h-[100vh] py-4 px-4`}>
      <div className='w-[20%]  flex-col justify-between hidden sm:flex backdrop-blur-xl rounded-[12px]'>
        <div>
          <div onClick={() => setChathist((prev) => prev, chats)} className='flex justify-between p-2 px-4 items-center bg-[#17CE92] rounded-[12px] '>
            New Chat
            <div className='text-white'>
              <FaPlus />
            </div>
          </div>
          <div className='flex flex-col gap-3 my-4'>
            {chathist?.map((hist, index) => (
              <div key={index} className={`flex items-center justify-between px-4 p-2 ${theme === "dark" ? "bg-[#35383F]" : "bg-[#F5F5F5]"}  rounded-[12px] shadow-2xl`}>
                <div>
                  {hist.title}
                </div>
                <div className='text-[#17CE92] flex gap-4'>
                  <FaEdit />
                  <FaTrash />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`flex items-center flex-col justify-between px-4 p-2 mb-4 ${theme === "dark" ? "bg-[#35383F]" : "bg-[#F5F5F5]"} border-[2px]  text-[#17CE92] border-[#17CE92] rounded-[12px] shadow-2xl`}>logout</div>
      </div>
      <div className=" md:w-[80%] flex items-center justify-center h-full ">
        <div className=' md:w-[80%] self-center flex flex-col h-full justify-between backdrop-blur-xl pb-4 rounded-[12px]'>
          <div className='flex items-center justify-between'>

            <div className=' w-full rounded-[12px] text-[#17CE92] text-[24px] font-bold'>Hii Paras 🙋‍♂️</div>
            <div onClick={handletheme} className='text-[#17CE92] text-[34px] font-bold cursor-pointer'>
              {theme === "dark" ? <MdOutlineWbSunny /> : <FaMoon />}
            </div>
          </div>
          <div className="flex flex-col gap-3 overflow-y-scroll no-scrollbar h-full mt-4">

            {chatbot?.map((message, index) => (
              <div
                key={index}
                className={`w-full  self-start received rounded-[12px]  ${theme === "dark" ? "bg-[#35383F]" : "bg-[#F5F5F5]"}`}
              >
                <div className={`${message.role === "user" ? "flex" : "hidden"} w-full  sent self-end rounded-[12px] p-4 bg-[#17CE92] text-[20px]`}>{message.content}</div>
                <div className={`${message.role === "assistant" ? "flex" : "hidden"} p-4   `}><span className=' text-[24px] mr-4'>🤖</span> {message.content}</div>
              </div>
            ))}
            {typing && <div
              className={`w-full  self-start received rounded-[12px] p-4 ${theme === "dark" ? "bg-[#35383F]" : "bg-[#F5F5F5]"}`}
            >
              {/* <div className=' w-full  sent self-end rounded-[12px] p-4 bg-[#17CE92] text-[20px]'>{userQuery}</div> */}
              <div className='p-4 flex  '>🤖 typing...</div>
            </div>}
          </div>

          <form onSubmit={(e) => handleSubmit(e)} className={`flex justify-between items-center self-center w-full mt-3 p-2 ${theme === "dark" ? "bg-[#35383F]" : "bg-[#F5F5F5]"} rounded-[12px]`}>
            <input
              className={`w-full p-2 ${theme === "dark" ? "bg-[#35383F]" : "bg-[#F5F5F5]"} rounded-[12px] focus:outline-none`}
              placeholder="Type your question..."
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
            />
            <button type='submit' className="send-button text-[#17CE92] text-[28px]" disabled={typing}  ><BiSend /></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
