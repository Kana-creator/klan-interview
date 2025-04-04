import { useSelector } from "react-redux";
import { getEventById, getEvents } from "./eventsSlice";
import { eventModel } from "./eventModel";

import Event from "./Event";
import { useEffect, useState } from "react";
import ActionForm from "../actions/ActionForm";

interface Props {}

const Events: React.FC<Props> = ({}) => {
  const events = useSelector(getEvents);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Number of rows per page
  const [currentData, setCurrentData] = useState<eventModel[]>(
    events.data.slice(10)
  );

  // sate for show and hide action form
  const [isShowActionForm, setIsShowActionForm] = useState(false);

  // set state for event and event id for the event action to be performed
  const [selectedEventId, setSelectedEventId] = useState<number>(0);

  const selectedEvent = useSelector(getEventById(selectedEventId));

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;

  // Set current page data on page change
  useEffect(() => {
    setCurrentData(events.data.slice(indexOfFirstItem, indexOfLastItem));
  }, [pageSize]);

  // Total pages
  const totalPages = Math.ceil(events.data.length / pageSize);

  const pageSizeArray = [10, 15, 20, 25, 50, 100];

  // Page change handler
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // change page size
  const handleChangePageSize = (
    input: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(Number(input.target.value));
  };

  // conditional rendering for the action form
  if (isShowActionForm)
    return (
      <ActionForm
        isShowActionForm={isShowActionForm}
        setIsShowActionForm={setIsShowActionForm}
        selectedEvent={selectedEvent}
      />
    );

  // handle search event
  const handleSearchEvennt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vcode = e.target.value;
    const searchedEvents = events.data.filter((event) =>
      event.attributes.vcode.toLowerCase().includes(vcode)
    );

    if (vcode.length > 0) {
      setCurrentData(searchedEvents);
    } else {
      setCurrentData(events.data.slice(indexOfFirstItem, indexOfLastItem));
    }
  };

  return (
    <div className="text-sm font-thin px-5">
      <div className="w-full">
        <h1 className="text-3xl">Klan Logistics</h1>
      </div>

      <form className="w-full pb-2 flex justify-end items-center">
        <div className="flex w-1/4">
          <h2 className=" text-lg font-bold">Events{selectedEventId}</h2>
          <select
            name="pageSizeField"
            id="pageSizeField"
            className="w-1/4 mx-5 outline-none border-2 border-gray-200
          focus:border-gray-400"
            onChange={handleChangePageSize}
          >
            {pageSizeArray.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
          |<span className="px-10">{events.data.length}</span>
        </div>

        <input
          type="text"
          placeholder="Search for event by VCode"
          className="w-100 px-5 text-lg outline-none border-2 border-gray-200 rounded-full 
          focus:border-gray-400"
          onChange={handleSearchEvennt}
        />
      </form>

      {events.data.length > 0 ? (
        <>
          <div className="h-[calc(100vh-180px)] overflow-auto relative">
            <table className="">
              <thead className="sticky top-0 bg-white">
                <tr className="font-bold text-xs py-5 bg-gray-600 text-white">
                  <th className="px-2">#</th>
                  <th className="px-2">VCode</th>
                  <th className="px-2">Initial Location</th>
                  <th className="px-2">Final Location</th>
                  <th className="px-2">Average Speed</th>
                  <th className="px-2">Count</th>
                  <th className="px-2">CreatedAt</th>
                  <th className="px-2">Endtime</th>
                  <th className="px-2">PublishedAt</th>
                  <th className="px-2">UpdatedAt</th>
                  <th className="px-2">Value</th>
                  <th className="px-2">Violation</th>
                  <th className="px-2">Action Taken</th>
                  <th className="px-2">Action</th>
                </tr>
              </thead>
              <tbody className="text-black font-light">
                {currentData.map((event: eventModel, index: number) => (
                  <Event
                    key={index}
                    event={event}
                    eventIndex={index}
                    isShowActionForm={isShowActionForm}
                    setIsShowActionForm={setIsShowActionForm}
                    setSelectedEventId={setSelectedEventId}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full p-5 flex items-center justify-center">
            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                First
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-5"
              >
                Previous
              </button>
              <span className="px-5">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-5"
              >
                Next
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="px-5"
              >
                Last
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="w-ull h-full flex justify-center items-center">
          <div
            className="w-80 h-80"
            style={{
              background: "URL('/images/Ghost.gif')",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Events;
