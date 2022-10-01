import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState, useRef } from "react";
import Picker from "@emoji-mart/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "../firebase.config";

const Input = () => {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const filePickerRef = useRef();

  const handleFileChange = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      setIsImageUploading(true);
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
      setIsImageUploading(false);
    };
  };

  const addEmoji = (e) => {
    const sym = e.unified.split("-");
    const codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    setInput((prev) => prev + emoji);
  };

  const addPost = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        text: input,
        timestamp: serverTimestamp(),
      });

      const imageRef = ref(storage, `posts/${docRef.id}/image`);

      if (selectedFile) {
        await uploadString(imageRef, selectedFile, "data_url").then(
          async () => {
            const downloadUrl = await getDownloadURL(imageRef);
            await updateDoc(doc(db, "posts", docRef.id), {
              image: downloadUrl,
            });
          }
        );
      }

      setInput("");
      setSelectedFile(null);
      setShowEmojis(false);
    } catch (err) {
      console.log("err", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-auto ${
        isLoading ? "opacity-60" : ""
      }`}
    >
      <img
        src="https://yt3.ggpht.com/yti/AJo0G0n-X5tRn9gt9sAgZ9iIU1yly6GrEA5DXgTfEJSsqA=s88-c-k-c0x00ffffff-no-rj-mo"
        alt="user"
        className="h-11 w-11 rounded-full cursor-pointer"
      />

      <section className="w-full divide-y divide-gray-700">
        <article
          className={`${selectedFile ? "pb-7" : ""} ${
            input ? "space-y-2.5" : ""
          }`}
        >
          <textarea
            rows="2"
            placeholder="What's happening?"
            className="w-full min-h-[52px] bg-transparent outline-none text-gray-200 text-lg placeholder-gray-500 tracking-wide"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {selectedFile && (
            <>
              {isImageUploading ? (
                <div>
                  <p>Loading...</p>
                </div>
              ) : (
                <div className="relative">
                  <div
                    className="absolute w-8 h-8 bg-neutral-800 hover:bg-stone-800 bg-opacity-75 rounded-full flex justify-center items-center top-1 left-1 cursor-pointer"
                    onClick={() => setSelectedFile(null)}
                  >
                    <XMarkIcon className="text-white h-5" />
                  </div>

                  <img
                    src={selectedFile}
                    alt="file"
                    className="rounded-2xl max-h-80 object-contain"
                  />
                </div>
              )}
            </>
          )}
        </article>

        {isLoading ? (
          <div className="flex items-center justify-between pt-2.5">
            <p>Loading</p>
          </div>
        ) : (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              <div
                className="icon"
                onClick={() => filePickerRef.current.click()}
              >
                <PhotoIcon className="h-6 text-blue-500" />
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  ref={filePickerRef}
                />
              </div>

              <div className="icon rotate-90">
                <ChartBarIcon className="text-blue-500 h-6" />
              </div>

              <div
                className="icon"
                onClick={() => setShowEmojis((prev) => !prev)}
              >
                <FaceSmileIcon className="text-blue-500 h-6" />
              </div>

              <div className="icon">
                <CalendarIcon className="text-blue-500 h-6" />
              </div>

              {showEmojis && <Picker onEmojiSelect={addEmoji} theme="dark" />}
            </div>

            <button
              className="bg-blue-400 text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-blue-500 disabled:hover:bg-blue-400 disabled:opacity-50 disabled:cursor-default"
              disabled={!input.trim() && !selectedFile}
              onClick={addPost}
            >
              Tweet
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
export default Input;
