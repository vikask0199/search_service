import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchResult from "../searchPage/SearchResult";

const HomeHeader = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const navigate = useNavigate()

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };


  const handleGetSearchResult = async () => {
    console.log(selectedOption);
    // navigate("/get-search-results")
  }

  return (
    <>
      <div className="min-h-[91vh] flex items-center justify-center flex-col bg-gray-200">
        <div className="flex-grow p-4 bg-white bg-opacity-60 rounded-md m-4 w-[95%] md:w-[70%]">
          <div className="flex-grow p-4 bg-white rounded-md flex flex-wrap gap-5">
            <input type="text" className="flex-grow h-10 outline-none focus:border-cyan-500 border-2 indent-1" placeholder="Enter City Name" />
            <select onChange={handleChange} className="h-10 bg-white flex-grow p-1 cursor-pointer outline-none focus:border-cyan-500 border-2">
              <option value="" >Select an option</option>
              <option value="fruit">Education</option>
              <option value="vegetable">Job</option>
              <option value="meat">Rent</option>
              <option value="meat">Travel</option>
              <option value="meat">Repairs & Services</option>
              <option value="meat">Real Estate</option>
            </select>
            <button onClick={() => handleGetSearchResult()} className="flex-grow px-10 h-10 bg-cyan-500 cursor-pointer text-white hover:bg-white hover:text-cyan-500 duration-300 border border-cyan-500">Search</button>
          </div>
        </div>
        <SearchResult />
      </div>
    </>
  );
};

export default HomeHeader;
