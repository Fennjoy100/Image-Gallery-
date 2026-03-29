import { Fragment, useEffect, useRef, useState } from "react";
import ImageGallery from "./components/ImageGallery";
import { images } from "./data/images";

const languageOptions = [
  { value: "english", label: "English" },
  { value: "tamil", label: "Tamil" },
  { value: "malayalam", label: "Malayalam" },
  { value: "hindi", label: "Hindi" },
  { value: "spanish", label: "Spanish" },
];

const speechLanguageMap = {
  english: "en-US",
  tamil: "ta-IN",
  malayalam: "ml-IN",
  hindi: "hi-IN",
  spanish: "es-ES",
};

const speechVoiceHints = {
  english: ["en-us", "en-in", "english"],
  tamil: ["ta-in", "ta", "tamil"],
  malayalam: ["ml-in", "ml", "malayalam"],
  hindi: ["hi-in", "hi", "hindi"],
  spanish: ["es-es", "es-us", "es", "spanish"],
};

const normalizeText = (value) =>
  value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

const getMatchScore = (image, searchText) => {
  if (!searchText) {
    return 0;
  }

  const normalizedTitle = normalizeText(image.title);
  const normalizedDescription = normalizeText(image.description);

  if (searchText.includes(normalizedTitle)) {
    return 100 + normalizedTitle.length;
  }

  const spokenWords = searchText.split(" ").filter(Boolean);
  const titleWords = normalizedTitle.split(" ");
  const descriptionWords = normalizedDescription.split(" ");

  let score = 0;

  spokenWords.forEach((word) => {
    if (titleWords.includes(word)) {
      score += 12;
    } else if (descriptionWords.includes(word)) {
      score += 4;
    }
  });

  return score;
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [spokenQuery, setSpokenQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState("");
  const [availableVoices, setAvailableVoices] = useState([]);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      return undefined;
    }

    const loadVoices = () => {
      setAvailableVoices(window.speechSynthesis.getVoices());
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      recognitionRef.current?.stop();
      window.speechSynthesis?.cancel();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError("Speech recognition is not supported in this browser.");
      return;
    }

    setSpeechError("");

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSpokenQuery(transcript);
    };

    recognition.onerror = () => {
      setSpeechError("I couldn't catch that clearly. Please try again.");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const normalizedQuery = normalizeText(spokenQuery);
  const visibleImages = normalizedQuery
    ? images
        .map((image) => ({
          image,
          score: getMatchScore(image, normalizedQuery),
        }))
        .filter(({ score }) => score > 0)
        .sort((first, second) => second.score - first.score)
        .map(({ image }) => image)
    : images;

  const visibleTitles = visibleImages.map(
    (image) => image.titles?.[selectedLanguage] || image.title
  );

  const getPreferredVoice = () => {
    const targetLanguage = speechLanguageMap[selectedLanguage] || "en-US";
    const voiceHints = speechVoiceHints[selectedLanguage] || [];
    const normalizedVoices = availableVoices.map((voice) => ({
      voice,
      lang: voice.lang.toLowerCase(),
      name: voice.name.toLowerCase(),
    }));

    const exactMatch = normalizedVoices.find(
      ({ lang }) => lang === targetLanguage.toLowerCase()
    );

    if (exactMatch) {
      return exactMatch.voice;
    }

    const hintedMatch = normalizedVoices.find(({ lang, name }) =>
      voiceHints.some((hint) => lang.includes(hint) || name.includes(hint))
    );

    if (hintedMatch) {
      return hintedMatch.voice;
    }

    const baseLanguage = targetLanguage.slice(0, 2).toLowerCase();
    const fallbackMatch = normalizedVoices.find(({ lang }) =>
      lang.startsWith(baseLanguage)
    );

    return fallbackMatch?.voice || null;
  };

  const handleSpeakProducts = () => {
    if (!("speechSynthesis" in window)) {
      setSpeechError("Voice playback is not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (visibleTitles.length === 0) {
      setSpeechError("There are no matching products to read aloud.");
      return;
    }

    setSpeechError("");

    const utterance = new SpeechSynthesisUtterance(visibleTitles.join(". "));
    utterance.lang = speechLanguageMap[selectedLanguage] || "en-US";
    const preferredVoice = getPreferredVoice();

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    } else if (selectedLanguage === "tamil" || selectedLanguage === "malayalam") {
      setSpeechError(
        `No ${selectedLanguage} voice is installed in this browser, so playback may fall back to another language.`
      );
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeechError("Voice playback could not be completed.");
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Fragment>
      <main className={`app-shell ${isDarkMode ? "theme-dark" : "theme-light"}`}>
        <section className="hero">
          <div className="hero-topbar">
            <p className="eyebrow">FENNJOY WORLD GALLERY</p>
            <div className="nav-actions">
              <button
                type="button"
                className={`mic-button ${isListening ? "is-listening" : ""}`}
                onClick={handleVoiceSearch}
                aria-label="Search gallery by voice"
                title="Search gallery by voice"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 15.5a3.5 3.5 0 0 0 3.5-3.5V7a3.5 3.5 0 1 0-7 0v5a3.5 3.5 0 0 0 3.5 3.5Zm6-3.5a1 1 0 1 1 2 0 8 8 0 0 1-7 7.94V22h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-2.06A8 8 0 0 1 4 12a1 1 0 1 1 2 0 6 6 0 1 0 12 0Z" />
                </svg>
              </button>
              <button
                type="button"
                className={`speaker-button ${isSpeaking ? "is-speaking" : ""}`}
                onClick={handleSpeakProducts}
                aria-label="Speak product names"
                title="Speak product names"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14 3.23v17.54a1 1 0 0 1-1.64.77L6.7 17H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3.7l5.66-4.54A1 1 0 0 1 14 3.23ZM16.5 8.5a1 1 0 0 1 1.41 0 5 5 0 0 1 0 7.07 1 1 0 1 1-1.41-1.41 3 3 0 0 0 0-4.25 1 1 0 0 1 0-1.41Zm3.54-3.04a1 1 0 0 1 1.42 0 9.25 9.25 0 0 1 0 13.08 1 1 0 0 1-1.42-1.42 7.25 7.25 0 0 0 0-10.24 1 1 0 0 1 0-1.42Z" />
                </svg>
              </button>
              <label className="translator-control" aria-label="Choose product title language">
                <span className="translator-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M12.87 15.07l-2.54-2.59.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2h-2v2H1v2h11.17A15.5 15.5 0 0 1 9.5 10.9c-.74-.82-1.36-1.72-1.86-2.7H5.64c.62 1.38 1.48 2.65 2.53 3.76l-5.09 5.04L4.5 18.5l5-5 3.11 3.11.26-.54ZM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12Zm-2.63 7 1.75-4.67L19.38 17h-3.5Z" />
                  </svg>
                </span>
                <select
                  value={selectedLanguage}
                  onChange={(event) => setSelectedLanguage(event.target.value)}
                >
                  {languageOptions.map((language) => (
                    <option key={language.value} value={language.value}>
                      {language.label}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                className="theme-toggle"
                onClick={() => setIsDarkMode((currentMode) => !currentMode)}
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>
          <h1>Dynamic moments, rendered from data.</h1>
          <p className="intro">
            Each card is created from an image object, so adding a new entry to
            the data array updates the gallery automatically.
          </p>
          <div className="voice-feedback" aria-live="polite">
            {spokenQuery ? (
              <p>
                Voice search: <strong>{spokenQuery}</strong>
              </p>
            ) : (
              <p>Tap the microphone and say a product name to filter the gallery.</p>
            )}
            {speechError ? <p className="voice-error">{speechError}</p> : null}
            {spokenQuery && visibleImages.length === 0 ? (
              <p className="voice-error">No matching products were found.</p>
            ) : null}
          </div>
        </section>
        <ImageGallery images={visibleImages} selectedLanguage={selectedLanguage} />
      </main>
    </Fragment>
  );
}

export default App;
