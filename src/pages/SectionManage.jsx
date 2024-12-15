import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import SectionForm from '../components/SectionForm.jsx'
import NotificationPopup from "../components/NotificationPopup.jsx";
import SectionEditForm from "../components/SectionEditForm.jsx";

import instance from "../utils/axiosRequest.js";
const SectionManage = () => {
  const [sections, setSections] = useState([]);
  const [message, setMessage] = useState();
  const [countRequest, setCountRequest] = useState(0);
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [section, setSection] = useState()
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')
  useEffect(() => {
    const getSection = async () => {
      try {
        const result = await instance.get(`admin/sections?courseId=${courseId}`);
        setSections(result && result.data.data.sections);
      } catch (error) {
        return error;
      }
    };
    getSection();
  }, []);
  const handleHiddenSection = async (id, index) => {
    if (countRequest === 1) return;
    setCountRequest(0);
    try {
      const result = await instance.patch(`admin/sections/${id}?deleted=true`);
      if (result) {
        sections[index].deleted = true;
        setSections([...sections]);
        setMessage(result.data.message);
        setCountRequest(0);
      }
    } catch (error) {
      setMessage(error.response.data.message);
      setCountRequest(0);
    }
  };
  const handleShowSection = async (id, index) => {
    if (countRequest === 1) return;
    setCountRequest(0);
    try {
      const result = await instance.patch(`admin/sections/${id}?deleted=false`);
      if (result) {
        sections[index].deleted = false;
        setSections([...sections]);
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
      <SectionForm isOpen={isOpen} setIsOpen={setIsOpen} setSections={setSections} courseId={courseId} />
      <SectionEditForm isEdit={isEdit} setIsEdit={setIsEdit} sections={sections} setSections={setSections} section={section} courseId={courseId} />
      <div className="container mx-auto mt-6">
      <div className="w-[98%] mb-[0.5rem] flex justify-between mx-auto">
          <ul className="flex gap-2">
            <li>
              <Link to="/course_manage" className="font-bold text-lg hover:text-blue-600">Khóa học /</Link>
            </li>
            <li>
              <p className="font-bold text-lg text-blue-600">Phần học /</p>
            </li>
          </ul>
          <button onClick={() => setIsOpen(true)} className="px-[2rem] py-[0.5rem] bg-[#5779dc] rounded-lg hover:bg-[#e0afaf] text-white font-bold">
            Thêm phần học mới
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
              {sections.length !== 0 &&
                sections.map((section, index) => (
                  <tr
                    key={section._id}
                    className="border-t hover:bg-[#d8f6c7] cursor-pointer"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{section.name}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          section.deleted 
                            ? "bg-red-600 text-white"
                            : "bg-green-400 text-white"
                        }`}
                      >
                        {section.deleted
                          ? "Đang bị xóa"
                          : "Hoạt động"}
                      </span>
                    </td>
                    <td className="px-4 py-2 flex items-center justify-center gap-[4px] mt-[0.6rem]">
                      {section.deleted ? (
                        <button
                          onClick={() => handleShowSection(section._id, index)}
                          className="w-full py-[4px] px-[4px] bg-green-500 rounded-sm hover:bg-[#aed2e9] text-white font-bold text-sm "
                        >
                          Mở lại
                        </button>
                      ) : (
                        <button
                          onClick={() => handleHiddenSection(section._id, index)}
                          className="w-full py-[4px] px-[4px] bg-red-600 rounded-sm  hover:bg-[#aed2e9] text-white font-bold text-sm "
                        >
                          Tạm xóa
                        </button>
                      ) }
                      <button
                          onClick={() => navigate(`/course_manage/milestone?courseId=${courseId}&sectionId=${section._id}`)}
                          className="w-full py-[4px] px-[4px] bg-[#6977d1] rounded-sm hover:bg-[#aed2e9] text-white font-bold text-sm "
                        >
                          Xem 
                        </button>
                        <button
                          onClick={() => {setSection(section), setIsEdit(true)}}
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

export default SectionManage;
