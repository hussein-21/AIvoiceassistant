# AI Voice Assistant 🎙️🧠

A fast, web-based AI voice assistant that listens to your voice, transcribes it in real time using Deepgram, understands your intent using Groq's LLaMA 3, and responds naturally with voice output using Cartesia Sonic. Built with Next.js, this project delivers fast and human-like interactions through voice.

---

## ✨ Features

- 🎙️ **Real-Time Speech-to-Text** with [Deepgram](https://deepgram.com)
- 🧠 **LLM-Powered Responses** using [LLaMA 3 via Groq](https://groq.com)
- 🔊 **Text-to-Speech (TTS)** using [Cartesia Sonic](https://cartesia.ai)
- 🗣️ **Voice Activity Detection (VAD)** to detect when the user is speaking
- 🧠 Multi-intent support (e.g., request + follow-up in one conversation)
- 📁 Built for future features like RAG and memory

---

## 🛠️ Tech Stack

| Layer           | Tech/Service                                 |
|----------------|-----------------------------------------------|
| Frontend       | Next.js, React, TypeScript, Tailwind CSS      |
| Transcription   | Deepgram SDK (client-side)                   |
| LLM Response    | Groq API (LLaMA 3 model)                     |
| Text-to-Speech  | Cartesia Sonic (fast voice generation)       |
| Voice Detection | VAD from [vad-react](https://vad-ricky0123.com) |
| Hosting         | Vercel / Localhost                           |

