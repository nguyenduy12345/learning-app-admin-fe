import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const LessonForm = ({isOpen, setIsOpen}) => {
  const { control, handleSubmit, register, reset, formState: { errors } } = useForm();
  const [questions, setQuestions] = useState([]);

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        type: "Choose",
        questionText: "",
      },
    ]);
  };

  const handleQuestionChange = (id, field, value) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)));
  };

  return (
    isOpen && <div className="w-[70vw] absolute left-1/2 -translate-x-1/2 z-10 mx-auto flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full">
      <i onClick={() => setIsOpen(false)} className="fa-sharp fa-solid fa-xmark absolute right-[2rem] top-[2rem] text-3xl cursor-pointer"></i>
        <h2 className="text-2xl font-bold text-center mb-6">Tạo Bài Học Mới</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Lesson Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="lessonTitle">
              Tên Bài Học
            </label>
            <input
              id="lessonTitle"
              name="lessonTitle"
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("lessonTitle", { required: "Tên bài học là bắt buộc" })}
            />
            {errors.lessonTitle && <p className="text-red-500 text-xs mt-1">{errors.lessonTitle.message}</p>}
          </div>

          {/* Experiences */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="experiences">
              Phần thưởng - Experiences
            </label>
            <input
              id="experiences"
              name="experiences"
              type="number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("experiences", { required: "Số lượng Experiences là bắt buộc" })}
            />
            {errors.experiences && <p className="text-red-500 text-xs mt-1">{errors.experiences.message}</p>}
          </div>

          {/* Gems */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="gems">
              Phần thưởng - Gems
            </label>
            <input
              id="gems"
              name="gems"
              type="number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("gems", { required: "Số lượng Gems là bắt buộc" })}
            />
            {errors.gems && <p className="text-red-500 text-xs mt-1">{errors.gems.message}</p>}
          </div>

          {/* Add Questions Section */}
          <h3 className="text-xl font-semibold mb-4">Tạo câu hỏi</h3>
          <div className="mb-6 flex flex-wrap gap-[2rem]">
            {questions.map((question, index) => (
              <div key={question.id} className="mb-4 border p-4 rounded-md bg-gray-50">
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700" htmlFor={`questionText-${question.id}`}>
                    Câu Hỏi {index + 1}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={question.questionText}
                    onChange={(e) => handleQuestionChange(question.id, "questionText", e.target.value)}
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700" htmlFor={`questionType-${question.id}`}>
                    Loại Câu Hỏi
                  </label>
                  <Controller
                    name={`questionType-${question.id}`}
                    control={control}
                    defaultValue={question.type}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => handleQuestionChange(question.id, "type", e.target.value)}
                      >
                        <option value="Choose">Choose</option>
                        <option value="Fill">Fill</option>
                        <option value="Match">Match</option>
                        <option value="Rearrange">Rearrange</option>
                      </select>
                    )}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addQuestion}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Thêm Câu Hỏi
            </button>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Tạo Bài Học
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LessonForm;
