import {graphql, useStaticQuery} from 'gatsby';
import React, {useEffect, useRef} from 'react';

export function Audio({url, title, children}) {
  const {audioFiles} = useStaticQuery(graphql`
    {
      audioFiles: allFile(filter: {sourceInstanceName: {eq: "audio"}}) {
        nodes {
          relativePath
          publicURL
        }
      }
    }
  `);

  const file = audioFiles.nodes.find(a => a.relativePath === url);

  const audioRef = useRef();
  const playButton = useRef();
  const circleRef = useRef();

  function setProgress(_p = 1) {
    const p = _p;
    const l = circleRef.current.getTotalLength().toFixed(3);

    const progress = (p * l).toFixed(3);

    circleRef.current.style.strokeDasharray = `${l - progress}, ${progress}`;
  }

  function togglePlay() {
    if (audioRef.current.paused) {
      audioRef.current.play();

      playButton.current.querySelector('.from_pause_to_play').beginElement();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setProgress(1);
      playButton.current.querySelector('.from_play_to_pause').beginElementAt(0);
    }
  }

  useEffect(() => {
    setProgress(0);
  }, []);

  function handleProgress({target: {currentTime, duration}}) {
    setProgress(currentTime / duration);
  }

  function handleEnd() {
    playButton.current.querySelector('.from_play_to_pause').beginElementAt(0);

    setProgress(0);
  }

  return (
    <div className="not-prose">
      <hr className="border-t-gray-200 w-12 my-8 md:hidden" />
      <div className="border-x px-10">
        <h3 className="font-semibold text-xl block h-20 text-black">{title}</h3>
        <div className="block">
          <audio
            className="hidden"
            ref={audioRef}
            onTimeUpdate={handleProgress}
            onEnded={handleEnd}
          >
            <source src={file?.publicURL} type="audio/mpeg" />
          </audio>
          <div className="relative w-16 h-16 text-2xl ">
            <svg className="h-full w-full relative fill-none" viewBox="0 0 64 64">
              <circle
                className="stroke-gray-200 "
                cx="32"
                cy="32"
                r="31"
                fill="none"
                style={{
                  strokeWidth: '1.5px',
                }}
              />
            </svg>
            <svg
              className="absolute top-0 left-0 w-full h-full -scale-y-100 -rotate-90"
              viewBox="0 0 64 64"
              fill="none"
            >
              <circle
                className="stroke-primary "
                cx="32"
                cy="32"
                r="31"
                fill="none"
                ref={circleRef}
                style={{
                  strokeWidth: '1.5px',
                  transition: 'stroke-dasharray 10ms linear',
                }}
              />
            </svg>
            <button
              onClick={togglePlay}
              aria-label="Play/Stop Button"
              className="absolute left-1/2 top-1/2 w-8 h-8 -translate-y-1/2 -translate-x-1/2"
            >
              <div className=" w-8 h-8 flex justify-center items-center rounded-[50%] transition-[background-color]">
                <i className="fill-black w-4 h-4 inline-block align-middle">
                  <svg viewBox="0 0 16 16" id="pause" ref={playButton}>
                    <polygon points="1,0 1,16 15,8 15,8">
                      <animate
                        attributeName="points"
                        dur="100ms"
                        to="0,0 0,16 16,16 16,0"
                        from="1,0 1,16 15,8 15,8"
                        begin="indefinite"
                        fill="freeze"
                        className="from_pause_to_play"
                      />
                      <animate
                        attributeName="points"
                        dur="100ms"
                        from="0,0 0,16 16,16 16,0"
                        to="1,0 1,16 15,8 15,8"
                        begin="indefinite"
                        fill="freeze"
                        className="from_play_to_pause"
                      />
                    </polygon>
                  </svg>
                </i>
              </div>
            </button>
          </div>
        </div>
      </div>
      {children && <p className="pt-6 text-dark text-base">{children}</p>}
    </div>
  );
}
