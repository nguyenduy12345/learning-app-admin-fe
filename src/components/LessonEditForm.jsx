import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import instance from "../utils/axiosRequest.js";
import NotificationPopup from "./NotificationPopup.jsx";

const LessonEditForm = ({
  isEditLesson,
  setIsEditLesson,
  lessons,
  setLessons,
  lesson,
}) => {
  const [countRequest, setCountRequest] = useState(0);
  const [message, setMessage] = useState();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  useEffect(() => {
    if (lesson) {
      setValue("name", lesson.name);
      setValue("experiences", lesson.experiences);
      setValue("gems", lesson.gems);
    }
  }, [lesson, setValue]);
  const onSubmit = async (data) => {
    if (countRequest === 1) return;
    setCountRequest(1);
    if (data) {
      try {
        const result = await instance.patch(`admin/lessons/${lesson._id}`,{
            name: data.name,
            experiences: data.experiences,
            gems: data.gems
        });
        const index = lessons.findIndex(item => item._id === lesson._id)
        if(index > -1 ){
            lessons[index].name = data.name
            lessons[index].experiences = data.experiences
            lessons[index].gems = data.gems
            setLessons([...lessons]);
        }
        setMessage(result.data.message)
        setTimeout(() => setIsEditLesson(false), 1000)
        setCountRequest(0);
      } catch (error) {
        setMessage(error.response.data.message);
        setCountRequest(0);
      }
    }
  };
  return (
    isEditLesson && (
      <div className="fixed z-20 inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <NotificationPopup message={message} setMessage={setMessage} />
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
          <h2 className="text-xl font-semibold mb-4">Thay đổi cột mốc</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Tên */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nhập tên muốn thay đổi
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Không được bỏ trống",
                  pattern: {
                    value:
                      /^[A-Za-zÀ-ÿáàảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờở̃ỡợùúủũụưứừửữựỳýỷỹỵđĐ0-9]+(?: [A-Za-zÀ-ÿáàảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờở̃ỡợùúủũụưứừửữựỳýỷỹỵđĐ0-9]+)*$/,
                    message:
                      "Tên không được phép có dấu cách đầu tiên và mỗi từ phải cách nhau bằng một dấu cách.",
                  },
                  maxLength: {
                    value: 255,
                    message: "Tên không thể dài quá 255 ký tự",
                  },
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
              <label className="block text-sm font-medium text-gray-700">
                Nhập điểm kinh nghiệm
              </label>
              <input
                type="number"
                {...register("experiences", {
                  required: "Không được bỏ trống",
                  pattern: {
                    value: /^[1-9]\d*$/,
                    message: "Chỉ được nhập số nguyên dương",
                  },
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.experiences && (
                <p className="text-red-500 text-sm">
                  {errors.experiences.message}
                </p>
              )}
              <label className="block text-sm font-medium text-gray-700">
                Nhập số tiền thưởng
              </label>
              <input
                type="number"
                {...register("gems", {
                  required: "Không được bỏ trống",
                  pattern: {
                    value: /^[1-9]\d*$/,
                    message: "Chỉ được nhập số nguyên dương",
                  },
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.gems && (
                <p className="text-red-500 text-sm">{errors.gems.message}</p>
              )}
            </div>
            {/* Nút lưu */}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsEditLesson(false);
                }}
                className="mr-3 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
              >
                {isSubmitting ? "Đang lưu" : "Lưu lại"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default LessonEditForm;
