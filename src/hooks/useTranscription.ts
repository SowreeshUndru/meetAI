'use client';

import { useEffect, useRef } from 'react';

export const useTranscription = (onTranscribed: (text: string) => void) => {
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognitionConstructor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      console.warn('Web Speech API is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognitionConstructor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => (result[0]?.transcript || '').trim())
        .join(' ');

      if (transcript) {
        onTranscribed(transcript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.start();
    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, [onTranscribed]);
};
