import React, { useState } from "react";
import { eventModel } from "../events/eventModel";
import { actionModel } from "./actionModel";
import { postData } from "../../global/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { addNewAction } from "./actionSlice";

interface Props {
  isShowActionForm: boolean;
  setIsShowActionForm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEvent: eventModel | undefined;
}

const ActionForm: React.FC<Props> = ({
  isShowActionForm,
  setIsShowActionForm,
  selectedEvent,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // set state for the action data
  const [actionData, setActionData] = useState<actionModel>({
    eventId: String(selectedEvent?.id),
    recordDate: "",
    actionDate: "",
    actionTaken: "",
    otherRemarks: "",
  });

  // set the saving required fields to be checked
  const canSave =
    actionData.recordDate && actionData.actionDate && actionData.actionTaken;

  // handle change action data values
  const handleChangeActionValues = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const id = e.target.id;
    setActionData((previous) => ({ ...previous, [id]: e.target.value }));
  };

  // handle save action
  const handleSaveAction = () => {
    // check if all the required fields are filled
    if (!canSave) {
      window.alert("Please fill all the required fields.");
      return;
    }

    // proceed to saving the action if all the required fields are filled
    try {
      const response = postData("http://127.0.0.1:8000/actions", actionData);

      if (!response) {
        console.log("Error occurred");
        return;
      }

      dispatch(addNewAction(actionData));

      setIsShowActionForm(!isShowActionForm);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative w-svw h-svh flex justify-center items-center text-sm bg-gray-200">
      <div
        className={`relative bg-white w-1/3 max-h-svh overflow-auto rounded-lg`}
      >
        <span
          className="absolute text-2xl right-0 px-3 cursor-pointer hover:bg-red-500 hover:text-white"
          onClick={() => setIsShowActionForm(!isShowActionForm)}
        >
          x
        </span>
        <p className="w-full p-5 text-center font-bold text-xl">
          Add action for event {selectedEvent?.id} (
          {selectedEvent?.attributes.vcode},{" "}
          {selectedEvent?.attributes.violation})
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="px-20 w-full">
          <div className="form-group py-5">
            <label htmlFor="">Record date </label>
            <input
              type="date"
              id="recordDate"
              className="w-full outline-none border-2 border-gray-200 p-2 focus:border-gray-400 rounded-lg"
              onChange={handleChangeActionValues}
            />
            <small></small>
          </div>
          <div className="form-group py-5">
            <label htmlFor="">Action date</label>
            <input
              type="date"
              id="actionDate"
              className="w-full outline-none border-2 border-gray-200 p-2 focus:border-gray-400 rounded-20"
              onChange={handleChangeActionValues}
            />
            <small></small>
          </div>
          <div className="form-group py-5">
            <label htmlFor="">Action taken</label>
            <input
              type="text"
              id="actionTaken"
              placeholder="Add action"
              className="w-full outline-none border-2 border-gray-200 p-2 focus:border-gray-400 rounded-20"
              onChange={handleChangeActionValues}
            />
            <small></small>
          </div>
          <div className="form-group">
            <label htmlFor="">Other remarks</label>
            <textarea
              id="otherRemarks"
              placeholder="Add remarks"
              className="w-full resize-none outline-none border-2 border-gray-200 p-2 focus:border-gray-400 rounded-lg"
              rows={5}
              onChange={handleChangeActionValues}
            />
            <small></small>
          </div>

          <div className="form-group w-full flex justify-center py-10">
            <button
              onClick={handleSaveAction}
              className=" bg-blue-400 py-2 px-10 text-xl active:scale-95 hover:bg-blue-300 cursor-pointer transition-all-150"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActionForm;
