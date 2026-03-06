import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoIosArrowRoundBack } from "react-icons/io";
import Loader from "../components/Loader";
import { useReel } from "../context/ReelContext";
import { useState } from "react";
import { GoHeartFill, GoHome } from "react-icons/go";
import { IoBookmarkOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";


export default function Explore() {

  const [mute, setMute] = useState(true)

  const videoRefs = useRef([]);

  const { videos, loading, likeReel, saveReel } = useReel()

  function handleReelLike(video) {
    likeReel(video._id)
  }

  function handleReelSave(video) {
    saveReel(video._id)
  }

  const navigate = useNavigate();

  const { logout } = useAuth()

  useEffect(() => {
    if (!videos.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting) {
            video.play().catch(() => { });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.75 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [videos]);


  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center w-full md:w-1/4 bg-black justify-center">
  //       <Loader size={100} />
  //     </div>
  //   )
  // }

  // if (!videos.length) {
  //   return (
  //     <div className="min-h-screen flex items-center bg-black/90 w-1/4 justify-center">
  //       <p className="text-lg text-white font-bold">No reels found</p>
  //     </div>
  //   )
  // }

  return (
    <div className="relative h-screen w-full max-w-md overflow-y-scroll snap-y snap-mandatory bg-black no-scrollbar">
      {/* Back Button */}
      <div className="px-3 w-full py-1 z-50 sticky top-0 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1.5 rounded-lg text-white text-sm font-medium backdrop-blur"
        >
          <IoIosArrowRoundBack size={25} />
        </button>
        <button
          onClick={logout}
          className="px-3 py-1.5 rounded-lg text-white text-sm font-medium backdrop-blur"
        >
          Logout
        </button>
      </div>

      {
        loading || videos.length < 0 ?
          (<div className="relative min-h-screen flex items-center w-full bg-black justify-center">
            <Loader size={100} />
          </div>) :
          videos.map((video, index) => {
            // console.log(video)
            return <div
              key={video._id}
              className="relative h-screen w-full snap-start flex items-center justify-center"
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={video.video}
                className="h-full w-full object-cover"
                loop
                muted={mute}
                onClick={() => setMute(!mute)}
                playsInline
              />

              {/* Overlay */}
              <div className="absolute bottom-10 left-0 right-0 p-4 ">
                <div className="text-white">
                  <Link to={`/creator/${video.uploadedBy?._id}`}>
                    <h2 className="text-sm sm:text-base font-semibold text-wrap">
                      @creator_{video.uploadedBy?.fullName}
                    </h2></Link>
                  <p className="text-xs sm:text-sm opacity-90 mt-1">
                    {video.caption ? video.caption : ""}
                  </p>
                </div>

              </div>

              {/* Right Actions */}
              <div className="absolute right-3 bottom-30 flex flex-col items-center gap-2 text-white">
                <button onClick={() => handleReelLike(video)} className="flex flex-col items-center gap-1 text-xs">
                  <span className="border border-gray-100/10 text-center p-1.5 bg-transparent backdrop-blur-sm shadow rounded-full">
                    {!video.isLiked ? <GoHeart size={16} /> : <GoHeartFill size={16} color="red" />}
                  </span>
                  {video.likes}
                </button>
                <button className="flex flex-col items-center text-xs">
                  <span className="text-lg">💬</span>
                  1.2K
                </button>
                <button onClick={() => handleReelSave(video)} className="flex flex-col items-center text-xs">
                  <span className="border border-gray-100/10 text-center p-1.5 bg-transparent backdrop-blur-sm shadow rounded-full">
                    {!video.saved ? <FaRegBookmark size={16} /> : <FaBookmark size={16} />}
                  </span>
                </button>
              </div>
            </div>

          })
      }
      <div div className="fixed bottom-0 right-1/2 translate-x-1/2 w-full max-w-md z-50 px-4 py-2 flex justify-between items-center bg-transparent backdrop-blur-xs">
        <button onClick={() => navigate('/')} className="text-white">
          <GoHome size={24} />
        </button>
        <button onClick={() => navigate('/saved')} className="text-white">
          <IoBookmarkOutline size={24} />
        </button>
      </div>
    </div >
  );
}
