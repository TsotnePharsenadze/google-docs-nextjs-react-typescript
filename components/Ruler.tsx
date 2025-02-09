"use client";

import { ArrowBigDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const markers = Array.from({ length: 83 }, (_, i) => i);

const Ruler = () => {
  const [leftMargin, setLeftMargin] = useState(56);
  const [rightMargin, setRightMargin] = useState(56);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const rulerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!rulerRef.current) return;
      const rulerRect = rulerRef.current.getBoundingClientRect();
      const x = event.clientX - rulerRect.left;
      const minDistance = 150;

      if (isDraggingLeft) {
        const newLeftMargin = Math.max(
          0,
          Math.min(x, 816 - rightMargin - minDistance)
        );
        setLeftMargin(newLeftMargin);
      }

      if (isDraggingRight) {
        const newRightMargin = Math.max(
          0,
          Math.min(816 - x, 816 - leftMargin - minDistance)
        );
        setRightMargin(newRightMargin);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingLeft(false);
      setIsDraggingRight(false);
    };

    if (isDraggingLeft || isDraggingRight) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingLeft, isDraggingRight, leftMargin, rightMargin]);

  return (
    <div className="max-w-[816px] mx-auto h-6 border-b border-gray-300 flex items-end relative select-none print:hidden">
      <div
        id="ruler-container"
        ref={rulerRef}
        className="w-full h-full relative"
      >
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={() => setIsDraggingLeft(true)}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={() => setIsDraggingRight(true)}
        />
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-[816px]">
            {markers.map((marker) => {
              const pos = (marker * 816) / 82;
              return (
                <div
                  key={marker}
                  className="absolute bottom-0"
                  style={{ left: `${pos}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 w-[2px] h-2 bg-neutral-400" />
                      <span className="text-[10px] absolute bottom-2 transform -translate-x-1/3 text-neutral-400">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className="absolute bottom-0 w-[2px] h-[6px] bg-neutral-400" />
                  )}
                  {marker % 5 !== 0 && (
                    <div className="absolute bottom-0 w-[2px] h-[4px] bg-neutral-400" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
}

const Marker = ({ position, isLeft, onMouseDown, isDragging }: MarkerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/laser.mp3");
  }, []);

  const handleMouseDownAug = () => {
    onMouseDown();
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <div
      className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
      style={{ [isLeft ? "left" : "right"]: `${position}px` }}
      onMouseDown={handleMouseDownAug}
    >
      <ArrowBigDown className="absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2" />
      <div
        className="absolute left-1/2 top-4 transform -translate-x-1/2 duration-150"
        style={{
          height: "100vh",
          width: "1px",
          transform: "scaleX(0.5)",
          backgroundColor: "#3b72f6",
          display: isDragging ? "block" : "none",
        }}
      />
    </div>
  );
};

export default Ruler;
