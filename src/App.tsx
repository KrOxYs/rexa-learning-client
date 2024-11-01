import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { Mic, MicOff } from "lucide-react";
import CardPage from "./page/CardPage";
import SkeletonPage from "./components/page/SkeletonPage";
import DestinationsPage from "./components/page/DestinationPage";
import { enhanceWithNLP } from "./utils/nlp";
import { ProcessedText } from "./types/processedText";
import { socket } from "./utils/socketUtils";

/**
 * A React component that displays a speech-to-text interface and displays
 * the recognized text. It also sends the recognized text to the API and
 * displays the response.
 */
const SpeechToText: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [_, setAllTexts] = useState<ProcessedText[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  let inActivityTimeout: ReturnType<typeof setTimeout>;

  const SpeechRecognition: typeof window.SpeechRecognition | undefined =
    window.SpeechRecognition || (window as any).webkitSpeechRecognition;

  const recognitionRef = useRef<InstanceType<typeof SpeechRecognition> | null>(
    null
  );

  const updateText = useCallback(
    debounce((transcript: string) => {
      const enhancedTranscript = enhanceWithNLP(transcript);
      setText(enhancedTranscript);
      const confidence = 0.9;
      socket.emit("speechData", { text: enhancedTranscript, confidence });
    }, 250),
    []
  );
  useEffect(() => {
    if (!SpeechRecognition) {
      setErrorMsg("Speech recognition is not supported in this browser.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;

    if (recognition) {
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "id-ID";

      /**
       * Callback function that is called when speech recognition starts.
       */
      recognition.onstart = () => {
        console.log("Speech recognition started");
        setErrorMsg("");
        setIsListening(true);
      };

      /**
       * Handles speech recognition error events.
       * Logs the error, displays an error message to the user, and stops
       * listening.
       * @param {SpeechRecognitionErrorEvent} event - The error event.
       */
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error);
        setErrorMsg(`Error: ${event.error}`);
        setIsListening(false);
      };

      /**
       * Callback function that is called when speech recognition ends.
       */
      recognition.onend = () => {
        console.log("Speech recognition ended");
        setIsListening(false);
      };

      /**
       * Handles the speech recognition result event.
       * Extracts the transcript from the event, logs it, and updates the text.
       * Also manages inactivity timeout to send the transcript to an API for processing.
       * If the API call is successful, it updates the data with the response.
       * Handles and logs any errors from the API call.
       *
       * @param {SpeechRecognitionEvent} event - The event object containing recognition results.
       */
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        console.log("Transcript:", transcript);

        updateText(transcript);

        clearTimeout(inActivityTimeout);
        inActivityTimeout = setTimeout(async () => {
          console.log("Sending transcript to API:", transcript);
          stopListening();
          setLoading(true);
          try {
            const response = await axios.post(
              "http://localhost:3000/api/recommend",
              {
                input: transcript,
              }
            );
            console.log("API response:", response.data);
            setData(response.data);
          } catch (error) {
            console.error("API call error:", error);
          } finally {
            setLoading(false);
          }
        }, 2000);
      };
    }

    return () => {
      clearTimeout(inActivityTimeout);
      updateText.cancel();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [updateText]);

  useEffect(() => {
    socket.on("processedText", (data: ProcessedText) => {
      console.log("Received processed text:", data);
      setAllTexts((prevTexts) => [...prevTexts, data]);
    });

    return () => {
      socket.off("processedText");
    };
  }, []);

  const startListening = useCallback(() => {
    setText("");
    setData([]);
    setErrorMsg("");
    if (recognitionRef.current) {
      console.log("Starting speech recognition");
      recognitionRef.current.start();
    } else {
      console.error("Speech recognition is not initialized");
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      console.log("Stopping speech recognition");
      recognitionRef.current.stop();
    }
  }, []);

  return (
    <div className="bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover min-h-screen">
      <section className="pt-8 lg:pt-32 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-gray-900 mb-5 md:text-5xl leading-[50px]">
            Try Your Travel AI Assistant
            <span className="text-indigo-600"> Rexa</span>
          </h1>
          <p className="max-w-sm mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9">
            Invest intelligently and discover a better way to manage your entire
            wealth easily.
          </p>
          <div className="border border-indigo-600 p-1 w-80 h-10 mx-auto rounded-md flex items-center justify-between mb-4">
            <div>
              <span className="font-inter text-xs font-medium text-gray-900 ml-3">
                {text
                  ? text
                  : isListening
                  ? "Listening..."
                  : "Press mic to start"}
              </span>
            </div>
            <div>
              <button
                onClick={isListening ? stopListening : startListening}
                className={`${
                  isListening
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white p-2 rounded-full transition duration-300`}
              >
                {isListening ? <MicOff size={24} /> : <Mic size={24} />}
              </button>
            </div>
          </div>

          {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
        </div>
      </section>
      {loading && <SkeletonPage />}
      {data.message && (
        <h3 className="text-2xl font-bold text-primary mt-10 md:ml-8 md:mt-20">
          {data.message}
        </h3>
      )}
      {data.hotels && <CardPage data={data.hotels} message={data.message} />}
      {data.destinations && <DestinationsPage data={data.destinations} />}
    </div>
  );
};

export default SpeechToText;
