import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NavBar from "../components/NavBar.jsx";
import MissonForm from "../components/MissonForm.jsx";
const MissonManage = () => {
  const [missons, setMissons] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // Hàm xóa nhiệm vụ
  const deleteTask = (index) => {
    const newmissons = missons.filter((_, taskIndex) => taskIndex !== index);
    setMissons(newmissons);
  };

  // Hàm chỉnh sửa nhiệm vụ
  const editTask = (index) => {
    const taskToEdit = missons[index];
    reset(taskToEdit); // Điền lại thông tin vào form để chỉnh sửa
    deleteTask(index); // Xóa nhiệm vụ cũ trước khi chỉnh sửa
  };

  return (
    <div className="flex">
      <NavBar />
      <div className="min-h-screen w-full p-8">
        <MissonForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setMissons={setMissons}
        />
        {/* Header */}
        <div className="mb-2 flex justify-end">
          <select
            onChange={(e) => handleFilterChange(e.target.value)} // Xử lý sự kiện thay đổi
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
          >
            <option value="">Tất cả nhiệm vụ</option>
            <option value="gems">Gems</option>
            <option value="questions">Questions</option>
            <option value="days">Days</option>
            <option value="lessons">Lessons</option>
            <option value="experiences">Experiences</option>
          </select>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Tạo nhiệm vụ mới
          </button>
        </div>
        {/* Task List */}
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Các nhiệm vụ</h2>
          <ul>
            {missons?.length !== 0 &&
              missons.map((task, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b border-gray-200 py-3"
                >
                  {/* Task details */}
                  <div className="flex-1">
                    <p className="font-semibold text-lg">
                      Loại nhiệm vụ: {task.taskType}
                    </p>
                    <p className="font-semibold text-lg mt-2">
                      Mô tả nhiệm vụ: {task.taskDescription}
                    </p>
                    <div className="text-gray-600 mt-2">
                      <span>Tiền xu - Gems: {task.gems} | </span>
                      <span>
                        Điểm kinh nghiệm - Experience: {task.experiences} |{" "}
                      </span>
                      <span>Số lượt chơi - Hearts: {task.hearts} | </span>
                      <span>Gifts: {task.gifts}</span>
                    </div>

                    {/* Status div (Active/Deleted) */}
                    <div className="mt-3">
                      <span
                        className={`inline-flex items-center py-1 px-4 text-sm font-semibold rounded-full bg-green-500 text-white`}
                      >
                        {/* Hình tròn nhỏ */}
                        <span className="w-2.5 h-2.5 rounded-full bg-white mr-2"></span>
                        Đang hoạt động
                      </span>
                    </div>
                  </div>

                  {/* Edit and Delete buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => editTask(index)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Sửa lại
                    </button>
                    <button
                      onClick={() => deleteTask(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Xóa nhiệm vụ
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MissonManage;
