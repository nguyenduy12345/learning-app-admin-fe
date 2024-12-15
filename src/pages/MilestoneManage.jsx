import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

import MilestoneForm from "../components/MilestoneForm.jsx";
import MilestoneEditForm from "../components/MilestoneEditForm.jsx";
import NotificationPopup from "../components/NotificationPopup.jsx";

import instance from "../utils/axiosRequest.js";
const MilestoneManage = () => {
  const [milestones, setMilestones] = useState([]);
  const [message, setMessage] = useState();
  const [countRequest, setCountRequest] = useState(0);
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [milestone, setMilestone] = useState()
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams()
  const sectionId = searchParams.get('sectionId')
  const courseId = searchParams.get('courseId')
  useEffect(() => {
    const getMilestone = async () => {
      try {
        const result = await instance.get(`admin/milestones?sectionId=${sectionId}`);
        setMilestones(result && result.data.data.milestones);
      } catch (error) {
        return error;
      }
    };
    getMilestone();
  }, []);
  const handleHiddenMilestone = async (id, index) => {
    if (countRequest === 1) return;
    setCountRequest(0);
    try {
      const result = await instance.patch(`admin/milestones/${id}?deleted=true`);
      if (result) {
        milestones[index].deleted = true;
        setMilestones([...milestones]);
        setMessage(result.data.message);
        setCountRequest(0);
      }
    } catch (error) {
      setMessage(error.response.data.message);
      setCountRequest(0);
    }
  };
  const handleShowMilestone = async (id, index) => {
    if (countRequest === 1) return;
    setCountRequest(0);
    try {
      const result = await instance.patch(`admin/milestones/${id}?deleted=false`);
      if (result) {
        milestones[index].deleted = false;
        setMilestones([...milestones]);
        setMessage(result.data.message);
        setCountRequest(0);
      }
    } catch (error) {
      setMessage(error.response.data.message);
      setCountRequest(0);
    }
  };
  return (
    <>
      <NotificationPopup message={message} setMessage={setMessage} />
      <NotificationPopup message={message} setMessage={setMessage} />
      <MilestoneForm isOpen={isOpen} setIsOpen={setIsOpen} setMilestones={setMilestones} sectionId={sectionId} />
      <MilestoneEditForm isEdit={isEdit} setIsEdit={setIsEdit} milestones={milestones} setMilestones={setMilestones} milestone={milestone} sectionId={sectionId} />
      <div className="container mx-auto mt-6">
      <div className="w-[98%] mb-[0.5rem] flex justify-between mx-auto">
          <ul className="flex gap-2">
            <li>
              <Link to="/course_manage" className="font-bold text-lg hover:text-blue-600">Khóa học /</Link>
            </li>
            <li>
              <Link to={`/course_manage/section?courseId=${courseId}`} className="font-bold text-lg hover:text-blue-600">Phần học /</Link>
            </li>
            <li>
              <p className="font-bold text-lg text-blue-600">Cột mốc /</p>
            </li>
          </ul>
          <button onClick={() => setIsOpen(true)} className="px-[2rem] py-[0.5rem] bg-[#5779dc] rounded-lg hover:bg-[#e0afaf] text-white font-bold">
            Thêm cột mốc mới
          </button>
        </div>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="px-4 py-2 text-left">STT</th>
                <th className="px-4 py-2 text-left">Tên</th>
                <th className="px-4 py-2 text-left">Trạng thái</th>
                <th className="px-4 py-2 text-left flex items-center justify-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {milestones.length !== 0 &&
                milestones.map((milestone, index) => (
                  <tr
                    key={milestone._id}
                    className="border-t hover:bg-[#d8f6c7] cursor-pointer"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{milestone.name}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          milestone.deleted 
                            ? "bg-red-600 text-white"
                            : "bg-green-400 text-white"
                        }`}
                      >
                        {milestone.deleted
                          ? "Đang bị xóa"
                          : "Hoạt động"}
                      </span>
                    </td>
                    <td className="px-4 py-2 flex items-center justify-center gap-[4px] mt-[0.6rem]">
                      {milestone.deleted ? (
                        <button
                          onClick={() => handleShowMilestone(milestone._id, index)}
                          className="w-full py-[4px] px-[4px] bg-green-500 rounded-sm hover:bg-[#aed2e9] text-white font-bold text-sm "
                        >
                          Mở lại
                        </button>
                      ) : (
                        <button
                          onClick={() => handleHiddenMilestone(milestone._id, index)}
                          className="w-full py-[4px] px-[4px] bg-red-600 rounded-sm  hover:bg-[#aed2e9] text-white font-bold text-sm "
                        >
                          Tạm xóa
                        </button>
                      ) }
                      <button
                          onClick={() => navigate(`/course_manage/lesson?courseId=${courseId}&sectionId=${sectionId}&milestoneId=${milestone._id}`)}
                          className="w-full py-[4px] px-[4px] bg-[#6977d1] rounded-sm hover:bg-[#aed2e9] text-white font-bold text-sm "
                        >
                          Xem 
                        </button>
                        <button
                          onClick={() => {setMilestone(milestone), setIsEdit(true)}}
                          className="w-full py-[4px] px-[4px] bg-green-500 rounded-sm hover:bg-[#aed2e9] text-white font-bold text-sm "
                        >
                          Sửa
                        </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MilestoneManage;
