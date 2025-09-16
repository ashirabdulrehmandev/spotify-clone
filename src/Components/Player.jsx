import "./Player.scss";
import { useRef, useState, useEffect } from "react";

function Player({
  playlist,
  songIndex,
  setSongIndex,
  isPlaying,
  setIsPlaying,
  onDeleteSong,
  switcher,
}) {
  const [loop, setLoop] = useState(false);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  
  // const [classValue, setClassValue] = useState("");

  // Update volume when it changes
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  useEffect(()=>{
    handlePlay();
  },[switcher])
  // useEffect(()=>{
  //   audioRef.current.play();
  // },[songIndex])
  


  // Format time from seconds to MM:SS
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
 const handlePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else if(!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  
  // Handle loop toggle
  const handleLoop = () => {
    if (loop) {
      audioRef.current.loop = false;
      setLoop(false);
    } else {
      audioRef.current.loop = true;
      setLoop(true);
    }
  };

  // Navigate to next song
  const handleNext = () => {
    if (songIndex < playlist.length - 1) {
      setSongIndex(songIndex + 1);
      if (isPlaying) {
        // Play the next song automatically if currently playing
        setTimeout(() => {
          audioRef.current.play();
        }, 0);
      }
    }
  };

  // Navigate to previous song
  const handlePrevious = () => {
    if (songIndex > 0) {
      setSongIndex(songIndex - 1);
      if (isPlaying) {
        // Play the previous song automatically if currently playing
        setTimeout(() => {
          audioRef.current.play();
        }, 0);
      }
    }
  };

  // Toggle play/pause


  // Update time display while audio is playing
  const handleTimeUpdate = () => {
    if (!seeking && audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Set duration when metadata is loaded
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Handle seek start
  const handleSeekStart = () => {
    setSeeking(true);
  };

  // Handle seek change
  const handleSeekChange = (e) => {
    setCurrentTime(parseFloat(e.target.value));
  };

  // Handle seek end
  const handleSeekEnd = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
    }
    setSeeking(false);
  };

  // Auto-play next song when current song ends
  const handleEnded = () => {
    if (songIndex < playlist.length - 1) {
      handleNext();
    } else {
      setIsPlaying(false);
    }
  };
  const handleToggleColor = (e) => {
    if (!e.classList.contains("toggleColor")) {
      e.classList.add("toggleColor");
    } else {
      e.classList.remove("toggleColor");
    }
  };

  const handleVolumeClick = () => {
    if (volume) {
      setVolume(0);
    } else {
      console.log("sd");
    }
  };

  return (
    <>
      <div id="player">
        <div id="song-info">
          <img src={playlist[songIndex].cover} alt="song pic" />
          <div id="text">
            <span id="song-name">{playlist[songIndex].title}</span>
            <span id="singer-name">{playlist[songIndex].author}</span>
          </div>
          <svg id="add-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
          </svg>
          <svg
            id="delete-icon"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{
              cursor: "pointer",
              marginLeft: "10px",
              width: "24px",
              height: "24px",
            }}
            onClick={() => onDeleteSong(songIndex)}
          >
            <path d="M6 19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" />
          </svg>
        </div>

        <div id="player-main">
          <div id="top">
            <svg id="shuffle" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 17.8832V16L23 19L18 22V19.9095C14.9224 19.4698 12.2513 17.4584 11.0029 14.5453L11 14.5386L10.9971 14.5453C9.57893 17.8544 6.32508 20 2.72483 20H2V18H2.72483C5.52503 18 8.05579 16.3312 9.15885 13.7574L9.91203 12L9.15885 10.2426C8.05579 7.66878 5.52503 6 2.72483 6H2V4H2.72483C6.32508 4 9.57893 6.14557 10.9971 9.45473L11 9.46141L11.0029 9.45473C12.2513 6.5416 14.9224 4.53022 18 4.09051V2L23 5L18 8V6.11684C15.7266 6.53763 13.7737 8.0667 12.8412 10.2426L12.088 12L12.8412 13.7574C13.7737 15.9333 15.7266 17.4624 18 17.8832Z"></path>
            </svg>
            <svg
              id="backwards"
              onClick={handlePrevious}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 11.3333L18.2227 4.51823C18.4524 4.36506 18.7628 4.42714 18.916 4.65691C18.9708 4.73904 19 4.83555 19 4.93426V19.0657C19 19.3419 18.7761 19.5657 18.5 19.5657C18.4013 19.5657 18.3048 19.5365 18.2227 19.4818L8 12.6667V19C8 19.5523 7.55228 20 7 20C6.44772 20 6 19.5523 6 19V5C6 4.44772 6.44772 4 7 4C7.55228 4 8 4.44772 8 5V11.3333Z"></path>
            </svg>
            <svg
              id="pause"
              viewBox="0 0 24 24"
              onClick={handlePlay}
              fill="currentColor"
            >
              <path
                d={
                  isPlaying
                    ? "M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9 9V15H11V9H9ZM13 9V15H15V9H13Z"
                    : "M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM10.6219 8.41459C10.5562 8.37078 10.479 8.34741 10.4 8.34741C10.1791 8.34741 10 8.52649 10 8.74741V15.2526C10 15.3316 10.0234 15.4088 10.0672 15.4745C10.1897 15.6583 10.4381 15.708 10.6219 15.5854L15.5008 12.3328C15.5447 12.3035 15.5824 12.2658 15.6117 12.2219C15.7343 12.0381 15.6846 11.7897 15.5008 11.6672L10.6219 8.41459Z"
                }
              />
            </svg>
            <svg
              id="forwards"
              onClick={handleNext}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16 12.6667L5.77735 19.4818C5.54759 19.6349 5.23715 19.5729 5.08397 19.3431C5.02922 19.261 5 19.1645 5 19.0657V4.93426C5 4.65812 5.22386 4.43426 5.5 4.43426C5.59871 4.43426 5.69522 4.46348 5.77735 4.51823L16 11.3333V5C16 4.44772 16.4477 4 17 4C17.5523 4 18 4.44772 18 5V19C18 19.5523 17.5523 20 17 20C16.4477 20 16 19.5523 16 19V12.6667Z"></path>
            </svg>
            <svg
              id="repeat"
              onClick={handleLoop}
              viewBox="0 0 24 24"
              fill={loop ? "#1db954" : "currentColor"}
            >
              <path d="M8 20V21.9324C8 22.2086 7.77614 22.4324 7.5 22.4324C7.38303 22.4324 7.26977 22.3914 7.17991 22.3165L3.06093 18.8841C2.84879 18.7073 2.82013 18.392 2.99691 18.1799C3.09191 18.0659 3.23264 18 3.38103 18L18 18C19.1046 18 20 17.1045 20 16V7.99997H22V16C22 18.2091 20.2091 20 18 20H8ZM16 3.99997V2.0675C16 1.79136 16.2239 1.5675 16.5 1.5675C16.617 1.5675 16.7302 1.60851 16.8201 1.68339L20.9391 5.11587C21.1512 5.29266 21.1799 5.60794 21.0031 5.82008C20.9081 5.93407 20.7674 5.99998 20.619 5.99998L6 5.99997C4.89543 5.99997 4 6.8954 4 7.99997V16H2V7.99997C2 5.79083 3.79086 3.99997 6 3.99997H16Z"></path>
            </svg>
          </div>
          <div id="bottom">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              className="sliderBar"
              min="0"
              max={duration || 100}
              value={currentTime}
              step="0.1"
              onMouseDown={handleSeekStart}
              onChange={handleSeekChange}
              onMouseUp={handleSeekEnd}
              onTouchEnd={handleSeekEnd}
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <div id="others">
          <svg
            id="nowPlayingIcon"
            onClick={(event) => handleToggleColor(event.currentTarget)}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M3 3.9934C3 3.44476 3.44495 3 3.9934 3H20.0066C20.5552 3 21 3.44495 21 3.9934V20.0066C21 20.5552 20.5551 21 20.0066 21H3.9934C3.44476 21 3 20.5551 3 20.0066V3.9934ZM5 5V19H19V5H5ZM10.6219 8.41459L15.5008 11.6672C15.6846 11.7897 15.7343 12.0381 15.6117 12.2219C15.5824 12.2658 15.5447 12.3035 15.5008 12.3328L10.6219 15.5854C10.4381 15.708 10.1897 15.6583 10.0672 15.4745C10.0234 15.4088 10 15.3316 10 15.2526V8.74741C10 8.52649 10.1791 8.34741 10.4 8.34741C10.479 8.34741 10.5562 8.37078 10.6219 8.41459Z"></path>
          </svg>
          <svg
            id="lyricsIcon"
            onClick={(event) => handleToggleColor(event.currentTarget)}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12.0001 1C14.7615 1 17.0001 3.23858 17.0001 6V12C17.0001 14.7614 14.7615 17 12.0001 17C9.23865 17 7.00008 14.7614 7.00008 12V6C7.00008 3.23858 9.23865 1 12.0001 1ZM2.19238 13.9615L4.15392 13.5692C4.88321 17.2361 8.11888 20 12.0001 20C15.8813 20 19.1169 17.2361 19.8462 13.5692L21.8078 13.9615C20.8961 18.5452 16.8516 22 12.0001 22C7.14858 22 3.104 18.5452 2.19238 13.9615Z"></path>
          </svg>
          <svg
            id="queueIcon"
            onClick={(event) => handleToggleColor(event.currentTarget)}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
          </svg>
          <svg
            id="connectDeviceIcon"
            onClick={(event) => handleToggleColor(event.currentTarget)}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4 16H20V5H4V16ZM13 18V20H17V22H7V20H11V18H2.9918C2.44405 18 2 17.5511 2 16.9925V4.00748C2 3.45107 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44892 22 4.00748V16.9925C22 17.5489 21.5447 18 21.0082 18H13Z"></path>
          </svg>
          <svg
            id="volumeIcon"
            onClick={handleVolumeClick}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6.60282 10.0001L10 7.22056V16.7796L6.60282 14.0001H3V10.0001H6.60282ZM2 16.0001H5.88889L11.1834 20.3319C11.2727 20.405 11.3846 20.4449 11.5 20.4449C11.7761 20.4449 12 20.2211 12 19.9449V4.05519C12 3.93977 11.9601 3.8279 11.887 3.73857C11.7121 3.52485 11.3971 3.49335 11.1834 3.66821L5.88889 8.00007H2C1.44772 8.00007 1 8.44778 1 9.00007V15.0001C1 15.5524 1.44772 16.0001 2 16.0001ZM23 12C23 15.292 21.5539 18.2463 19.2622 20.2622L17.8445 18.8444C19.7758 17.1937 21 14.7398 21 12C21 9.26016 19.7758 6.80629 17.8445 5.15557L19.2622 3.73779C21.5539 5.75368 23 8.70795 23 12ZM18 12C18 10.0883 17.106 8.38548 15.7133 7.28673L14.2842 8.71584C15.3213 9.43855 16 10.64 16 12C16 13.36 15.3213 14.5614 14.2842 15.2841L15.7133 16.7132C17.106 15.6145 18 13.9116 18 12Z"></path>
          </svg>
          <input
            id="volumeSlider"
            className="sliderBar"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
          <svg
            id="miniPlayerIcon"
            onClick={(event) => handleToggleColor(event.currentTarget)}
            viewBox="0 0 21 21"
            fill="currentColor"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g
                fill="currentColor"
                fill-rule="evenodd"
                stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
                transform="translate(3 4)"
              >
                {" "}
                <path d="m2.5.5h10c1.1045695 0 2 .8954305 2 2v8c0 1.1045695-.8954305 2-2 2h-10c-1.1045695 0-2-.8954305-2-2v-8c0-1.1045695.8954305-2 2-2z"></path>{" "}
                <path
                  d="m9.5 6.5h2c.5522847 0 1 .44771525 1 1v2c0 .5522847-.4477153 1-1 1h-2c-.55228475 0-1-.4477153-1-1v-2c0-.55228475.44771525-1 1-1z"
                  fill="#000000"
                ></path>{" "}
              </g>{" "}
            </g>
          </svg>
          <svg
            id="fullScreenIcon"
            onClick={(event) => handleToggleColor(event.currentTarget)}
            viewBox="0 0 24 24"
            width="12"
            height="12"
            fill="currentColor"
          >
            <path d="M16 3H22V9H20V5H16V3ZM2 3H8V5H4V9H2V3ZM20 19V15H22V21H16V19H20ZM4 19H8V21H2V15H4V19Z"></path>
          </svg>
        </div>
      </div>

      {/* Hidden audio element */}
      <audio
        id="audio"
        src={playlist[songIndex].link}
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        controls
        // autoPlay
        hidden
      />
      <style></style>
    </>
  );
}
export default Player;
