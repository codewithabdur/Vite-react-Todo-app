import React, { useEffect, useState } from "react";
import {FaTimes} from "react-icons/fa"
import { TbExclamationCircle } from "react-icons/tb";
import "./HeroSection.css";

const HeroSection = () => {
  const [todoText, setTodoText] = useState("")
  const [existingValue, setExistingValue] = useState([])
  const [checkedItems, setCheckedItems] = useState([]);
  const [alertBaneer, setAlertBanner] = useState(false)

  useEffect(() => {
    const value = JSON.parse(localStorage.getItem("todoItems"));
    setExistingValue(value);
    if(value){
    const initialCheckedItems = value.map((item) => item.checked);
    setCheckedItems(initialCheckedItems);
    }
  },[])
;
 const saveText = () => {
  if(todoText === ""){
    setAlertBanner(true)
    setTimeout(() =>{
      setAlertBanner(false);
    },4000)
  }
  else{
   const existingItems = JSON.parse(localStorage.getItem("todoItems")) || [];
    const newItem = { text: todoText, checked: false };
   existingItems.push(newItem);

   localStorage.setItem("todoItems", JSON.stringify(existingItems));
   setExistingValue(existingItems); // Update state
   setTodoText(""); // Clear input field after saving
  }
 };

 const deleteItem = (index) =>{
  const existingItems = JSON.parse(localStorage.getItem("todoItems")) || [];
  // console.log(existingItems[index]);
  existingItems.splice(index,1); // Remove item at index
  localStorage.setItem("todoItems", JSON.stringify(existingItems));
  setExistingValue(existingItems);
 }

 const editItem = (index, newText) => {
  const existingItems = JSON.parse(localStorage.getItem("todoItems")) || [];
  const editItem = existingItems[index]
  setTodoText(editItem.text);
  existingItems.splice(index, 1); // Remove item at index
  localStorage.setItem("todoItems", JSON.stringify(existingItems));
  setExistingValue(existingItems);
 };

 const handleCheckboxChange = (index) => {
  const updatedCheckedItems = [...checkedItems];
  updatedCheckedItems[index] = !updatedCheckedItems[index];
  setCheckedItems(updatedCheckedItems);
   // Toggle the checked value of the item at the given index
   const updatedItems = existingValue.map((item, i) => {
     if (i === index) {
       return { ...item, checked: !item.checked };
     }
     return item;
   });
   // Update localStorage with the updated items
   localStorage.setItem("todoItems", JSON.stringify(updatedItems));
   // Update state with the updated items
   setExistingValue(updatedItems);
 };

  return (
    <>
      {alertBaneer && (
        <div
          class="bg-indigo-200 border-t-4 w-[80%] mx-auto border-indigo-500 rounded-b text-indigo-900 px-4 py-3 shadow-md relative"
          role="alert"
        >
          <div class="flex">
            <div class="py-1">
              <TbExclamationCircle className="text-[30px] mr-2" />
            </div>
            <div>
              <p class="font-bold">Fill The Value</p>
              <p class="text-sm">Enter Your Task to Save!</p>
            </div>
          </div>
          <FaTimes
            className="absolute right-4 top-4 cursor-pointer text-[20px]"
            onClick={() => {
              setAlertBanner(false);
            }}
          />
        </div>
      )}
      <section className="bg-[#184375] dark:bg-gray-900 w-[80%] mx-auto rounded">
        <h1 className="text-center text-[#be45ff] text-[50px] font-mono font-black mt-4">
          TODO LIST
        </h1>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="max-w-screen-lg  sm:text-lg dark:text-gray-400">
            <div className="todoText flex items-center">
              <input
                placeholder="Enter task here..."
                className="w-full"
                id="input"
                type="text"
                value={todoText}
                onChange={(e) => {
                  setTodoText(e.target.value);
                }}
              />
              <button id="btn" className="mx-4" onClick={saveText}>
                Save
              </button>
            </div>
            <div className="text-[#be45ff] text-[30px] font-mono font-black mt-4 mb-8">
              <h2 className="uppercase">Todo-Items</h2>
            </div>
            {existingValue && existingValue?.length !== 0 ? (
              <>
                {existingValue.map((item, index) => (
                  <div
                    className="flex todoSaveText mt-4 mb-10 md:mb-5"
                    key={index}
                  >
                    <input
                      type="checkbox"
                      className="h-[20px] w-[20px] mt-2 mr-3"
                      checked={checkedItems[index] || false}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    <p
                      className={`font-medium mt-1 text-[#ffffff] w-[40vw] ${
                        checkedItems[index] ? "line-through text-[#7b7b7b]" : ""
                      }`}
                    >
                      {item.text}
                    </p>
                    <div
                      className="del ml-2 cursor-pointer"
                      onClick={() => deleteItem(index)}
                    >
                      <div
                      // className={`${
                      //   checkedItems[index] ? "line-through" : ""
                      // }`}
                      >
                        Delete
                      </div>
                    </div>
                    <button
                      className={`Btn ml-2 mt-2 ${
                        checkedItems[index] ? "line-through bg-purple-400" : ""
                      }`}
                      onClick={() => editItem(index, item)}
                      disabled={checkedItems[index]}
                    >
                      Edit
                      <svg className="svg" viewBox="0 0 512 512">
                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <p className="font-medium mt-1 text-[#ffffff] md:w-[40vw]">
                No Item to Show 🤔
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
