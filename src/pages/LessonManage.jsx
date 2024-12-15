import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import LessonForm from "../components/LessonForm.jsx";
import LessonEditForm from "../components/LessonEditForm.jsx";

import NotificationPopup from "../components/NotificationPopup.jsx";

import instance from "../utils/axiosRequest.js";
const LessonManage = () => {
  const [lessons, setLessons] = useState([]);
  const [message, setMessage] = useState();
  const [countRequest, setCountRequest] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditLesson, setIsEditLesson] = useState(false);
  const [lesson, setLesson] = useState();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const sectionId = searchParams.get("sectionId");
  const milestoneId = searchParams.get("milestoneId");
  useEffect(() => {
    const getLesson = async () => {
      try {
        const result = await instance.get(
          `admin/lessons?sectionId=${sectionId}&milestoneId=${milestoneId}`
        );
        setLessons(result && result.data.data.lessons);
      } catch (error) {
        return error;
      }
    };
    getLesson();
  }, []);
  useEffect(() => {
    setLessons((prevLessons) =>
      prevLessons.map((item) => ({
        ...item, // tạo bản sao của mỗi đối tượng
        show: false // cập nhật giá trị show thành false
      }))
    );
  }, []);
  const handleShowMoreLesson = useCallback((index) =>{
    setLessons((prevLessons) => {
      const updatedLessons = prevLessons.map((item, i) => {
        if (i === index) {
          return { ...item, show: !item.show }
        }
        return item;
      });
  
      return updatedLessons;
    });
  },[])
  const convertAnswerTypeChoose = (index) => {
    switch (index) {
      case 0:
        return "A.";
      case 1:
        return "B.";
      case 2:
        return "C.";
      default:
        return "D.";
    }
  };
  //   const handleHiddenSection = async (id, index) => {
  //     if (countRequest === 1) return;
  //     setCountRequest(0);
  //     try {
  //       const result = await instance.patch(`admin/sections/${id}?deleted=true`);
  //       if (result) {
  //         sections[index].deleted = true;
  //         setSections([...sections]);
  //         setMessage(result.data.message);
  //         setCountRequest(0);
  //       }
  //     } catch (error) {
  //       setMessage(error.response.data.message);
  //       setCountRequest(0);
  //     }
  //   };
  //   const handleShowSection = async (id, index) => {
  //     if (countRequest === 1) return;
  //     setCountRequest(0);
  //     try {
  //       const result = await instance.patch(`admin/sections/${id}?deleted=false`);
  //       if (result) {
  //         sections[index].deleted = false;
  //         setSections([...sections]);
  //         setMessage(result.data.message);
  //         setCountRequest(0);
  //       }
  //     } catch (error) {
  //       setMessage(error.response.data.message);
  //       setCountRequest(0);
  //     }
  //   };
  return (
    <>
      <NotificationPopup message={message} setMessage={setMessage} />
      <LessonForm isOpen={isOpen} setIsOpen={setIsOpen} />
      <LessonEditForm isEditLesson={isEditLesson} setIsEditLesson={setIsEditLesson} lessons={lessons} setLessons={setLessons} lesson={lesson} />
      {/* <SectionForm  setSections={setSections} /> */}
      <div className="container mx-auto mt-6">
        <div className="w-[98%] mb-[0.5rem] flex justify-between mx-auto">
          <ul className="flex gap-2">
            <li>
              <Link
                to="/course_manage"
                className="font-bold text-lg hover:text-blue-600"
              >
                Khóa học /
              </Link>
            </li>
            <li>
              <Link
                to={`/course_manage/section?courseId=${courseId}`}
                className="font-bold text-lg hover:text-blue-600"
              >
                Phần học /
              </Link>
            </li>
            <li>
              <Link
                to={`/course_manage/milestone?courseId=${courseId}&sectionId=${sectionId}`}
                className="font-bold text-lg hover:text-blue-600"
              >
                Cột mốc /
              </Link>
            </li>
            <li>
              <p className="font-bold text-lg text-blue-600">Bài học</p>
            </li>
          </ul>
          <button
            onClick={() => setIsOpen(true)}
            className="px-[2rem] py-[0.5rem] bg-[#5779dc] rounded-lg hover:bg-[#e0afaf] text-white font-bold"
          >
            Thêm bài học mới
          </button>
        </div>
        <div className="container mx-auto px-6">
          <div className="space-y-6">
            {lessons.length !== 0 &&
              lessons.map((lesson, index) => (
                <div
                  key={lesson._id}
                  className={`bg-white shadow-lg rounded-lg p-4 space-y-4 transition-all relative pb-[2rem] ${lesson.show ? '' : 'h-[8.5rem] overflow-hidden'} `}
                >
                  <button 
                    onClick={() => handleShowMoreLesson(index)}
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 hover:text-blue-600 font-semibold">
                      {lesson.show ? 'Thu gọn' : 'Xem chi tiết'}
                    </button> 
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold">
                        Bài học: {lesson.name || index + 1}
                      </h2>
                      <h4 className="font-semibold text-lg">Phần thưởng :</h4>
                      <p className="text-gray-600">
                        Kinh nghiệm: {lesson.experiences}
                      </p>
                      <p className="text-gray-600">Tiền xu: {lesson.gems}</p>
                    </div>
                    <div className="space-x-2">
                      <button 
                        onClick={() => {setIsEditLesson(true), setLesson(lesson)}}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                        Sửa
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                        Xóa
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-xl">Các câu hỏi:</h3>
                    <ul className="space-y-2 mt-2">
                      {lesson?.questions?.map((question, index) => (
                        <li
                          key={lesson.questions[index].question._id}
                          className="bg-white p-4 rounded-lg shadow mb-4"
                        >
                          {/* Hiển thị loại câu hỏi */}
                          <div className="mb-2">
                            <strong className="text-sm text-gray-700">
                              Loại câu hỏi:{" "}
                            </strong>
                            <span className="text-sm text-gray-500 font-bold uppercase">
                              {lesson.questions[index].question.type}
                            </span>
                          </div>
                          {lesson.questions[index].question.type === 'choose' ? (
                            <div>
                              <span className="mr-2">Câu hỏi:</span><span className="font-semibold">{lesson.questions[index].question.question}</span>
                              <p>Các câu trả lời:</p>
                              <ul className="ml-2">
                                {lesson.questions[index].question.answers.map((answer, index) => (
                                  <li className="font-semibold" key={index}>{convertAnswerTypeChoose(index)} : {answer}</li>
                                ))}
                              </ul>
                              <p className="font-semibold">Câu trả lời đúng : {lesson.questions[index].question.answers[+lesson.questions[index].question.correctChoose]}</p>
                            </div>
                          ) : lesson.questions[index].question.type === 'fill' ? (
                            <div>
                              <span className="mr-2">Đoạn văn:</span><span className="font-semibold">{lesson.questions[index].question.document}</span>
                              <ul className="flex gap-[3px]">
                                <li>Các từ để chọn: </li>
                                {lesson.questions[index].question.words.map((word, i) => (
                                  <li className="font-semibold" key={i}>{word},</li>
                                ))}
                              </ul>
                              <ul className="flex gap-[3px]">
                                <li>Các từ khi sắp xếp đúng: </li>
                                {lesson.questions[index].question.correctDocument.map((word, i) => (
                                  <li className="font-semibold" key={i}>{word},</li>
                                ))}
                              </ul>
                            </div>
                          ) : lesson.questions[index].question.type === 'match' ? (
                            <div>
                              <ul className="flex gap-[3px]">
                                <li>Các từ cột trái: </li>
                                {lesson.questions[index].question.leftOptions.map((word, i) => (
                                  <li className="font-semibold" key={i}>{word},</li>
                                ))}
                              </ul>
                              <ul className="flex gap-[3px]">
                                <li>Các từ cột phải: </li>
                                {lesson.questions[index].question.rightOptions.map((word, i) => (
                                  <li className="font-semibold" key={i}>{word},</li>
                                ))}
                              </ul>
                              <ul className="flex gap-[3px] font-semibold">
                                <li>Các từ sau khi ghép đúng: </li>
                                {lesson.questions[index].question.correctMatches.map((word, i) => (
                                  <li className="font-semibold" key={i}>
                                    <p>{word.left} - {word.right} | </p>
                                  </li>
                                ))}
                              </ul>
                            </div> 
                            )
                            : <div>
                            <span className="mr-2">Câu văn:</span><span className="font-semibold">{lesson.questions[index].question.document}</span>
                            <ul className="flex gap-[3px]">
                              <li>Các từ để chọn: </li>
                              {lesson.questions[index].question.words.map((word, i) => (
                                <li className="font-semibold" key={i}>{word},</li>
                              ))}
                            </ul>
                              <span className="font-semibold">Câu sau khi sắp xếp đúng: {lesson.questions[index].question.correctDocument}</span>
                          </div>
                          }
                          {/* Hiển thị mô tả câu hỏi */}

                          {/* Các nút chức năng: Sửa và Xóa */}
                          <div className="space-x-2 mt-[0.7rem]">
                            <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg">
                              Sửa
                            </button>
                            <button className="bg-red-500 text-white px-3 py-1 rounded-lg">
                              Xóa
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonManage;
