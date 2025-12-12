import React, { useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
  const videoRef = useRef(null);
  const sessionStartRef = useRef(new Date());

  const [count, setCount] = useState(0);
  const [log, setLog] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");

  const formatTime = (seconds) => {
    if (typeof seconds !== "number" || Number.isNaN(seconds)) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };


  const increment = (source) => {
    if (!isPlaying) return;

    setCount((prev) => {
      const newCount = prev + 1;

      const v = videoRef.current;
      const videoAt = v ? formatTime(v.currentTime) : "00:00";

      setLog((prevLog) => [
        {
          id: newCount,
          time: new Date().toLocaleTimeString(),
          source,
          videoAt,
        },
        ...prevLog,
      ]);

      return newCount;
    });
  };

  const undo = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
    setLog((prev) => prev.slice(1));
  };

  const reset = () => {
    setCount(0);
    setLog([]);
    sessionStartRef.current = new Date();
  };

  const exportCSV = () => {
    const rows = [
      ["Vehicle#", "Counted At", "Triggered By", "Video Time"],
      ...log
        .slice()
        .reverse()
        .map((x) => [x.id, x.time, x.source, x.videoAt]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "vehicle_log.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  // Spacebar shortcut (only when video is playing)
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        increment("spacebar");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // depend only on isPlaying so it stays stable
  }, [isPlaying]);

  // Video listeners
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onLoaded = () => setDuration(formatTime(v.duration));
    const onTime = () => setCurrentTime(formatTime(v.currentTime));

    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("timeupdate", onTime);

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("timeupdate", onTime);
    };
  }, []);

  return (
    <div className="app-container">
      {/* LEFT COLUMN */}
      <div className="left-column">
        <h2>Drive-through CCTV</h2>

        <div className="video-wrapper">
          <video
            ref={videoRef}
            src="/drive-through.mp4"
            controls
            autoPlay
            loop
            className="video-player"
          />
          <div className="pickup-zone">
            <span>Pickup Zone</span>
          </div>
        </div>

        <div className="video-meta">
          <span className={`badge ${isPlaying ? "ok" : "warn"}`}>
            {isPlaying ? "Playing" : "Paused"}
          </span>
          <span className="timer">
            {currentTime} / {duration}
          </span>
        </div>


        <p className="hint">
          Rule: Count only when a vehicle <b>stops</b> at the pickup zone.
          Press <b>Spacebar</b> (while playing) or click <b>+ Count Vehicle</b>.
        </p>
      </div>

      {/* RIGHT COLUMN */}
      <div className="right-column">
        <h2>Vehicle Pickup Counter</h2>

        <div className="counter-box">
          <div className="counter-label">Total Cars Served</div>
          <div className="counter-value">{count}</div>
        </div>

        <div className="button-row">
          <button
            onClick={() => increment("button")}
            className="primary-btn"
            title={!isPlaying ? "Play the video to start counting" : ""}
          >
            + Count Vehicle
          </button>
          <button onClick={undo} className="secondary-btn">
            Undo
          </button>
          <button onClick={reset} className="secondary-btn">
            Reset
          </button>
        </div>

        <div className="button-row">
          <button onClick={exportCSV} className="secondary-btn">
            Export CSV
          </button>
        </div>

        <div className="log-section">
          <h3>Recent Vehicle Log</h3>
          {log.length === 0 ? (
            <p className="log-empty">No vehicles counted yet.</p>
          ) : (
            <ul className="log-list">
              {log.map((item) => (
                <li key={item.id}>
                  <b>#{item.id}</b> – {item.time} • {item.videoAt} • {item.source}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="info-box">
          <h4>Design Notes</h4>
          <p>
            Manual/semi-manual counting UI for pickup counter. Can later be connected
            to AI vehicle detection to auto-trigger the counter for the pickup zone.
          </p>
          <p>
            Session started at: <b>{sessionStartRef.current.toLocaleTimeString()}</b>
          </p>
        </div>
      </div>
    </div>
  );}