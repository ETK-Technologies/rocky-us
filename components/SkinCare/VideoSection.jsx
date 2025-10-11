"use client";
import { useRef, useState } from "react";

export default function VideoSection() {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleVideoClick = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    return (
        <section className="w-full flex justify-center items-center px-4 md:px-0 py-14">
            <div className="relative w-full max-w-6xl rounded-md overflow-hidden">
                <video
                    ref={videoRef}
                    onClick={handleVideoClick}
                    poster="/skin-care/thumbnail.png"
                    className="w-full h-[335px] md:h-auto object-cover cursor-pointer "
                />

                {!isPlaying && (
                    <button
                        onClick={handleVideoClick}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-white/70 rounded-full flex items-center justify-center backdrop-blur">
                            <svg
                                className="w-5 h-5 md:w-6 md:h-6 text-black"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </button>
                )}


            </div>
        </section>
    );
}
