import { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useReel } from "../context/ReelContext";

export default function CreatorProfile() {

  const { creatorId } = useParams()
  const { getCreator, creator } = useReel()

  useEffect(() => {
    if (!creatorId) return
    getCreator(creatorId)
  }, [creatorId, getCreator])

  const navigate = useNavigate();

  const location = useLocation()

  const totalReels = creator.creatorReels?.length;
  const totalLikes = creator.creatorReels?.reduce((total, item) => total + item.likes, 0);
  const reels = creator.creatorReels;

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black text-gray-900 dark:text-white px-4 py-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:opacity-80"
      >
        ← Back
      </button>

      {/* Profile Card Container */}
      <div className="max-w-md mx-auto">
        {/* Header Section */}
        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Profile Avatar */}
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 border-gray-300 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-lg font-semibold">
              {creator.creator?.fullName.slice(0, 1).toUpperCase()}
            </div>

            {/* Name & Role */}
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
                {creator.creator?.fullName}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                creator
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex justify-between mt-6 text-center">
            <div className="flex flex-col flex-1">
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Total reels
              </span>
              <span className="text-lg sm:text-xl font-semibold mt-1">
                {totalReels}
              </span>
            </div>

            <div className="flex flex-col flex-1">
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Total likes
              </span>
              <span className="text-lg sm:text-xl font-semibold mt-1">
                {totalLikes}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-neutral-800 my-5" />

        {/* Reels Grid */}
        <div className="grid grid-cols-3 gap-3">
          {reels?.map((reel) => (
            <div
              key={reel._id}
              className="aspect-square rounded-xl border border-gray-300 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-xs text-gray-400 overflow-hidden"
            >
              <video
                src={reel.video}
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-cover cursor-pointer"
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => {
                  e.currentTarget.pause()
                  e.currentTarget.currentTime = 0
                }}
                onClick={() => {
                  navigate(`/creator/reel/${reel._id}`, {
                    state: {backgroundLocation: location}
                  })
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
