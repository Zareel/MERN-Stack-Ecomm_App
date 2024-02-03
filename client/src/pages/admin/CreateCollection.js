import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import axios from "axios";
import CollectionForm from "../../Components/Form/CollectionForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CreateCollection = () => {
  const [collection, setCollection] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/v1/collection/create-collection",
        { name }
      );
      if (data?.success) {
        alert(
          `New collection ${name} has been created successfully`,
          data.message
        );
        getAllCollection();
        setName("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong in Collection form");
    }
  };

  const getAllCollection = async () => {
    try {
      const { data } = await axios.get("/api/v1/collection/get-allcollection");
      if (data.success) {
        setCollection(data.collections);
      }
    } catch (error) {
      console.log(error);
      alert("Somethig went wrong in getting collection");
    }
  };
  useEffect(() => {
    getAllCollection();
  }, []);

  return (
    <Layout>
      <div className="w-full h-full py-6">
        <div className="max-w-7xl mx-auto flex gap-10">
          <div>
            <AdminMenu />
          </div>
          <div className="w-full flex flex-col items-center justify-center ">
            <h1 className="text-4xl font-semibold py-6 text-cyan-500 ">
              Collection
            </h1>
            <div>
              <CollectionForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div>
              <table className="border-collapse border border-green-800 ...">
                <thead>
                  <tr className="">
                    <th className="border border-green-600 px-6 py-2 text-lg text-gray-400 hover:text-gray-200 cursor-pointer ...">
                      Collection
                    </th>
                    <th className="border border-green-600 px-6 py-2 text-lg text-gray-400 hover:text-gray-200 cursor-pointer ...">
                      Modify
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {collection &&
                    collection.map((item) => {
                      return (
                        <tr key={item._id} className=" border-green-600 ">
                          <td className="border border-green-600 px-8 py-2 text-lg text-gray-400 hover:text-gray-200 cursor-pointer">
                            {item.name}
                          </td>
                          <td className="border border-green-600 px-8 py-2 text-lg text-gray-400 hover:text-gray-200 cursor-pointer">
                            <div className="flex gap-4">
                              <EditIcon className="text-yellow-500" />
                              <DeleteIcon className="text-red-500" />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCollection;
