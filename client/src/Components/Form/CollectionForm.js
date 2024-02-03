import React from "react";

const CollectionForm = ({ handleSubmit, value, setValue }) => {
  return (
    <div className="w-full py-6">
      <form onSubmit={handleSubmit} className="w-full ">
        <input
          type="text"
          placeholder="Add new collection"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-gray-700 text-white text-lg tracking-wider px-6 py-2 rounded-md margin-none outline-none cursor-pointer"
        />
        <div className="py-4 w-full flex justify-center">
          <button
            className="bg-cyan-800 text-lg px-6 py-2 text-white flex rounded-md"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CollectionForm;
