import { useState } from "react";
import UseFetch from "./hooks/UseFetch";
import "./App.css";

function App() {
  const [index, setIndex] = useState(1);
  const url =   `https://picsum.photos/v2/list?page=${index}&limit=30`
  const {data , loading , error} = UseFetch(url )

  if(loading){
    return <h1>Loading...</h1>
  }
  let printUserData = [];

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
              
              setIndex(index + 1);
            }}
            className="px-6 py-3 active:scale-95 font-bold text-sm bg-amber-400 text-black rounded"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
