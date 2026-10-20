"use client";

import { useEffect, useState } from "react";

/**
 * A live clock for the studio's own time zone.
 *
 * A small, honest detail — the studio's address is real, so the time shown is
 * the time in New Delhi, not the visitor's.
 */
export default function StudioClock({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const format = () => {
      try {
        return new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(new Date());
      } catch {
        return "";
      }
    };
    setTime(format());
    const id = window.setInterval(() => setTime(format()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={className}>
      {time ? (
        <>
          {time}
          <span className={tone === "dark" ? "ml-2 text-ivory/35" : "ml-2 text-ink/30"}>
            IST
          </span>
        </>
      ) : (
        "—"
      )}
    </span>
  );
}
