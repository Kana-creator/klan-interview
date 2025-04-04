import React from "react";
import { eventModel } from "./eventModel";
import { useSelector } from "react-redux";
import { getActionByEventId } from "../actions/actionSlice";

interface Props {
  event: eventModel;
  eventIndex: number;
  isShowActionForm: boolean;
  setIsShowActionForm: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedEventId: React.Dispatch<React.SetStateAction<number>>;
}

const Event: React.FC<Props> = ({
  event,
  isShowActionForm,
  setIsShowActionForm,
  setSelectedEventId,
}) => {
  const action = useSelector(getActionByEventId(Number(event.id)));

  return (
    <tr className="p-5 border-y-2 border-gray-300 hover:bg-gray-200 text-xs">
      <td className="text-center">{event.id}</td>
      <td className="px-2">{event.attributes.vcode}</td>
      <td className="px-2">{event.attributes.initiallocation}</td>
      <td className="px-2">{event.attributes.finallocation}</td>
      <td className="px-2">{event.attributes.averagespeed}</td>
      <td className="px-2 text-center">{event.attributes.count}</td>
      <td className="px-2">{event.attributes.createdAt}</td>
      <td className="px-2">{event.attributes.endtime}</td>
      <td className="px-2">{event.attributes.publishedAt}</td>
      <td className="px-2">{event.attributes.updatedAt}</td>
      <td className="px-2">{event.attributes.value}</td>
      <td className="px-2">{event.attributes.violation}</td>
      <td className="px-2">{action?.actionTaken}</td>
      <td
        className="px-2 text-xl font-bold cursor-pointer hover:text-blue-500"
        onClick={() => {
          if (action) return;
          setIsShowActionForm(!isShowActionForm);
          setSelectedEventId(Number(event.id));
        }}
      >
        ...
      </td>
    </tr>
  );
};

export default Event;
