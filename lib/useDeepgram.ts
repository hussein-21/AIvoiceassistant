'use client';
import { useEffect } from 'react';

export function useDeepgram(setTranscript: (text: string) => void) {
  useEffect(() => {
    const connect = async () => {
      const deepgramKey = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY as string;
      if (!deepgramKey) {
        console.error('Missing Deepgram API key');
        return;
      }

      const socket = new WebSocket(
        `wss://api.deepgram.com/v1/listen?access_token=${deepgramKey}`
      );

      socket.onopen = () => {
        console.log('✅ Deepgram WebSocket connected');
      };

      socket.onmessage = async (message) => {
        const data = JSON.parse(message.data);
        const transcript = data.channel?.alternatives?.[0]?.transcript;
        if (transcript && data.is_final) {
          console.log('📝 Final Transcript:', transcript);
          setTranscript(transcript);

          // 🔁 Send to /api/respond for reply + voice
          const res = await fetch('/api/respond', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ transcript }),
          });

          const blob = await res.blob();
          const audio = new Audio(URL.createObjectURL(blob));
          audio.play();
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia({
  audio: { deviceId: 'default' },
});

      console.log('🎙️ Microphone access granted');

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });

      mediaRecorder.ondataavailable = (e) => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(e.data);
        }
      };

      mediaRecorder.start(250); // Send audio chunks every 250ms
    };

    connect();
  }, [setTranscript]);
}
