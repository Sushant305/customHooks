import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [index, setIndex] = useState(1);

  const [data, setData] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    dislayData();
  }, [index]);

  const dislayData = async () => {
    try {
      let response = await axios.get(
        `https://picsum.photos/v2/list?page=${index}&limit=30`,
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      setError(
        "❌ unable to fetch the data . please chceck your Internet connection.",
      );
    }
  };

  let printUserData = (
    <h4 className=" font-bold text-6xl text-gray-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y -1/2 ">
      Loading...
    </h4>
  );

  if (data.length > 0) {
    printUserData = data.map((elem, idx) => {
      return (
        <div key={elem.id} className="border-2 rounded-2xl p-2">
          <a href={elem.url} target="_blank">
            <img
              className="w-60 h-60 rounded-2xl"
              src={elem.download_url}
              alt=""
            />
            <p className="text-center">{elem.author}</p>
          </a>
        </div>
      );
    });
  }

  return (
    <>
      <div className="bg-black text-white  h-screen p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-4 p-4 h-[89%] overflow-y-auto">
          {error ? (
            <h2 className="text-red-500 text-3xl font-bold col-span-full text-center mt-20">
              {error}
            </h2>
          ) : (
            printUserData
          )}
        </div>

        <div className="flex justify-center items-center gap-6 p-4">
          <button
            style={{ opacity: index == 1 ? 0.5 : 1 }}
            onClick={() => {
              if (index > 1) {
                setIndex([]);
                setIndex(index - 1);
              }
            }}
            className="px-6 py-3 active:scale-95 font-bold text-sm bg-amber-400 text-black rounded"
          >
            Prev
          </button>
          <span>Page : {index} </span>
          <button
            onClick={() => {
              setIndex([]);
              setIndex(index + 1);
            }}
            className="px-6 py-3 active:scale-95 font-bold text-sm bg-amber-400 text-black rounded"
          >
            Mext
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
