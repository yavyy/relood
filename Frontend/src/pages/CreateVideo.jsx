import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { useReel } from "../context/ReelContext";
import Modal from "../components/Modal";
import { FiLoader } from "react-icons/fi";

export default function CreateReel() {

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const { user } = useAuth()

  const { createReel } = useReel()

  // useEffect(() => {
  //   if (!user || user.role !== "creator") {
  //     return alert('Only creators can access')
  //   }
  // }, [user, navigate])

  async function handleFormSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    setLoading(true)
    const result = await createReel(formData)

    if (result.success) {
      navigate('/')
    } else {
      setError(result.message)
    }
  }


  return (
    <div className="min-h-screen w-full bg-white dark:bg-black flex items-center justify-center px-4 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:opacity-80 flex items-center gap-0.5"
      >
        <IoIosArrowRoundBack size={25} /> Back
      </button>
      {
        user.role === "creator" ?
          <div className="w-full max-w-md">
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 shadow-lg rounded-2xl p-6 sm:p-8">
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white text-center mb-2">
                Upload Reel
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
                Share your reel with the world
              </p>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <form className="space-y-5" onSubmit={handleFormSubmit}>
                {/* Caption Input */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Caption
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Write a caption for your reel..."
                    className="w-full rounded-xl dark:text-white border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    name="caption"
                    disabled={loading}
                  />
                </div>

                {/* Video Input */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Video
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    className="w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-black file:text-white dark:file:bg-white dark:file:text-black hover:file:opacity-90 cursor-pointer"
                    name="video"
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Supported: MP4, MOV, WEBM
                  </p>
                </div>

                {/* Upload Button */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-black dark:bg-white text-white dark:text-black py-2.5 text-sm font-medium hover:opacity-90 transition disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
                  disabled={false}
                >
                  {loading ? <FiLoader className="animate-spin text-lg mx-auto" /> : "Upload Reel"}
                </button>
              </form>
            </div>
          </div> :
          <Modal message={"Only creators can access this page"} />
      }
    </div>
  );
}
