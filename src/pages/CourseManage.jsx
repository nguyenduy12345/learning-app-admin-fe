import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import CourseForm from "../components/courseForm.jsx";
import CourseEditForm from "../components/CourseEditForm.jsx";

import NotificationPopup from "../components/NotificationPopup.jsx";

import instance from "../utils/axiosRequest.js";
const CourseManage = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState();
  const [countRequest, setCountRequest] = useState(0);
  const [course, setCourse] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    const getCourse = async () => {
      try {
        const result = await instance.get(`admin/courses`);
        setCourses(result && result.data.data.courses);
      } catch (error) {
        return error;
      }
    };
    getCourse();
  }, []);
  const handleHiddenCoure = async (id, index) => {
    if (countRequest === 1) return;
    setCountRequest(0);
    try {
      const result = await instance.patch(`admin/courses/${id}?hidden=true`);
      if (result) {
        courses[index].status = 1;
        setCourses([...courses]);
        setMessage(result.data.message);
        setCountRequest(0);
      }
    } catch (error) {
        console.log(error)
      setMessage(error.response.data.message);
      setCountRequest(0);
    }
  };
  const handleShowCoure = async (id, index) => {
    if (countRequest === 1) return;
    setCountRequest(0);
    try {
      const result = await instance.patch(`admin/courses/${id}?hidden=false`);
      if (result) {
        courses[index].status = 2;
        setCourses([...courses]);
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
      <CourseForm isOpen={isOpen} setIsOpen={setIsOpen} setCourses={setCourses} />
      <CourseEditForm isEdit={isEdit} setIsEdit={setIsEdit} courses={courses} setCourses={setCourses} course={course}/>
      <div className="container mx-auto mt-6">
        <div className="w-[98%] mb-[0.5rem] flex justify-between mx-auto">
          <ul className="flex">
            <li>
              <p className="font-bold text-lg text-blue-600">Khóa học /</p>
            </li>
          </ul>
          <button onClick={() => setIsOpen(true)} className="px-[2rem] py-[0.5rem] bg-[#5779dc] rounded-lg hover:bg-[#e0afaf] text-white font-bold">
            Thêm khóa học
          </button>
        </div>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="px-4 py-2 text-left">STT</th>
                <th className="px-4 py-2 text-left">Tên</th>
                <th className="px-4 py-2 text-left">Ảnh</th>
                <th className="px-4 py-2 text-left">Số người học</th>
                <th className="px-4 py-2 text-left">Trạng thái</th>
                <th className="px-4 py-2 text-left flex items-center justify-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.length !== 0 &&
                courses.map((course, index) => (
                  <tr
                    key={course._id}
                    className="border-t hover:bg-[#d8f6c7] cursor-pointer"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{course.name}</td>
                    <td className="px-4 py-2">
                      <img src={course.image} className="h-[3rem] w-[4rem]" />
                    </td>
                    <td className="px-4 py-2 pl-[4rem]">
                      {course.numOfLearner}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          course.status === 2
                            ? "bg-green-300 text-white"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {course.status === 2
                          ? "Hoạt động"
                          : course.status === 1
                          ? "Đang ẩn"
                          : "Đang bị xóa"}
                      </span>
                    </td>
                    <td className="px-4 py-2 flex items-center justify-center gap-[4px] mt-[0.6rem]">
                      {course.status === 1 ? (
                        <button
                          onClick={() => handleShowCoure(course._id, index)}
                          className="w-full py-[4px] px-[6px] bg-green-500 rounded-sm hover:bg-[#aed2e9] text-white font-bold text-sm "
                        >
                          Mở khóa
                        </button>
                      ) : course.status === 2 ? (
                        <button
                          onClick={() => handleHiddenCoure(course._id, index)}
                          className="w-full py-[4px] px-[6px] bg-red-600 rounded-sm  hover:bg-[#aed2e9] text-white font-bold text-sm "
                        >
                          Tạm ẩn
                        </button>
                      ) : (
                        ""
                      )}
                      <button
                          onClick={() => navigate(`section?courseId=${course._id}`)}
                          className="w-full py-[4px] px-[6px] bg-green-500 rounded-sm hover:bg-[#aed2e9] text-white font-bold text-sm "
                        >
                          Xem 
                        </button>
                        <button
                          onClick={() => {setCourse(course), setIsEdit(true)}}
                          className="w-full py-[4px] px-[6px] bg-green-500 rounded-sm hover:bg-[#aed2e9] text-white font-bold text-sm "
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

export default CourseManage;
