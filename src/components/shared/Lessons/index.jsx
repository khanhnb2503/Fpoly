import { Button, Card, Col, Collapse, List, Progress, Radio, Row, Space, Tag, message, notification } from 'antd';
import { useEffect, useState } from 'react';
import {
  AiFillCheckSquare,
  AiOutlineComment,
  AiOutlineLeft, AiOutlineLock
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { formatTime } from '../../../common/formatTime';
import { onOpen } from '../../../redux/features/comment/commentSlice';
import { videoInfo } from '../../../redux/features/video/videoSlice';
import { getHistoryCourse, getVideoByTime, queryVideo } from '../../../services/base/baseQuery.jsx';
import {
  useGetLessonsQuery,
  useSaveHistoryCourseMutation,
  useSendQuizMutation
} from '../../../services/courses/index.jsx';
import { useProfileQuery } from '../../../services/users/index.jsx';
import DrawerComment from '../DrawerComment/index.jsx';

function Lessons() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [api, context] = notification.useNotification();
  const [messageApi, contextHolder] = message.useMessage();
  const { iframe, course_id, document } = useSelector((state) => state.videoState);
  const { data: lessons, isSuccess } = useGetLessonsQuery(id);
  const [saveHistoryCourse] = useSaveHistoryCourseMutation();
  const [sendQuiz] = useSendQuizMutation();
  const { data: users, isFetching } = useProfileQuery();

  const [completeCourse, setCompleteCourse] = useState([]);
  const [quizs, setQuizs] = useState([]);
  const [progress, setProgress] = useState(false);
  const [checked, setChecked] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorQuiz, setErrorQuiz] = useState([]);
  const [results, setResults] = useState([]);
  const [lastTime, setLastTime] = useState();
  const [currentTimeVideo, setCurrentTimeVideo] = useState();
  const [showQuiz, setShowQuiz] = useState(false)
  const [completeRate, setCompleteRate] = useState();

  if (!isFetching) {
    if (!users?.id) return navigate('/login');
  };

  window.addEventListener('message', async (e) => {
    if (!e.data?.source) {
      const listener = JSON.parse(e.data);
      let currentTime = 0;
      if (listener.type === 'progress') {
        let time = formatTime(listener.data.time)
        if ((id == lastTime) && (currentTimeVideo === time)) {
          setShowQuiz(true)
        }
        currentTime = (listener?.data?.percent).toFixed(1);
      };

      if (currentTime >= 0.9) {
        setProgress(true);
      }
    }
  });

  useEffect(() => {
    (async () => {
      try {
        if (lessons) {
          const { data } = await queryVideo(lessons?.data?.video_id);
          let quizs = lessons?.data?.course?.quiz[0];
          !quizs ? setQuizs([]) : setQuizs(quizs);

          dispatch(videoInfo({
            video_id: data.id,
            time: data?.duration,
            iframe: data.embed_code,
            course_id: lessons?.data?.course_id,
            document: lessons?.data.document
          }));
          setLoading(true);
        }
      } catch (error) {
        navigate('/login')
      }
    })()
  }, [lessons]);

  useEffect(() => {
    (async () => {
      if (lastTime) {
        const { data: lessonId } = await getVideoByTime(lastTime);
        const { data } = await queryVideo(lessonId?.data?.video_id);
        setCurrentTimeVideo(formatTime(data.duration));
      }
    })()
  }, [checked]);

  useEffect(() => {
    (async () => {
      if (course_id) {
        let lessonIds = [];
        let endLessonIds = [];
        lessons?.data?.course?.modules.map((item) => {
          item.lessons.map((lesson) => lessonIds.push(lesson.id))
          item.lessons.map((lesson) => endLessonIds.push(lesson.id))
        });

        setLastTime(endLessonIds.pop());
        const { data } = await getHistoryCourse(course_id);
        setCompleteRate(data.complete_rate)
        let status = 0;
        let ids = [];
        let nextLesson = [];
        if (data?.history[0]?.lesson_id) {
          data.history.map((item) => {
            if ((ids.indexOf(item.lesson_id) == -1) && (item.status == 1)) {
              ids.push(item.lesson_id)
            }
          });
          status = ids.includes(Number(id)) ? 1 : 0
          nextLesson = ids
          setCompleteCourse(ids)
          setChecked(ids)
          if (ids.length == 0) setChecked([Number(id)]);

        } else {
          setChecked([Number(id)])
        };

        if (progress) {
          if (!nextLesson.includes(Number(id))) nextLesson.push(Number(id))
        };

        if (!progress) {
          if (status == 1) {
            let index = lessonIds[nextLesson.length];
            setChecked((state) => state.includes(Number(id)) ? [...state, index] : [...state])
          }
          // const resHistory = await saveHistoryCourse({ course_id: course_id, lesson_id: id, status: status });
          // setCompleteRate(resHistory.data.complete_rate)
          return
        };

        setCompleteCourse((state) => !state.includes(Number(id)) ? [...state, Number(id)] : [...state]);
        let index = lessonIds[nextLesson.length];
        setChecked((state) => state.includes(Number(id)) ? [...state, index] : [...state]);
        // const historyNew = await saveHistoryCourse({ course_id: course_id, lesson_id: id, status: 1 });
        // setCompleteRate(historyNew.data.complete_rate)
        return;
      }
    })()
  }, [progress, iframe]);

  let arr = results?.length > 0 ? results : [];
  let arrAnswers = [];
  const handleAddQuiz = (question, answers) => {
    const data = { question_id: question, answer_choose: answers };
    arr.push(data);

    const filteredObjects = Object.values(arr.reduce((result, obj) => {
      result[obj.question_id] = obj;
      return result;
    }, {}));
    arrAnswers = filteredObjects
  };

  const handleQuiz = async () => {
    if (arrAnswers.length < quizs?.questions.length) {
      api.error({ message: "Bạn phải chọn đầy đủ đáp án!" });
      return
    };

    setResults(arrAnswers)
    const response = await sendQuiz({ answer_chooses: arrAnswers, course_id: course_id });
    if (response?.data?.data?.length == 0) {
      setErrorQuiz([])
      setResults(arrAnswers)
      messageApi.success(
        <div style={{ width: 300, height: 70 }}>
          <h4 style={{ fontSize: 25, marginTop: 10, textTransform: 'capitalize' }}>
            Chúc mừng bạn hoàn thành khóa học
          </h4>
        </div>, 5
      ),
        confetti()
      return
    };

    let errors = [];
    arrAnswers.map((item) => {
      const { question_id, answer_choose } = item;
      if (response?.data?.data?.includes(question_id)) {
        errors.push(answer_choose)
      }
    });
    setErrorQuiz(errors)
  };

  return (
    <>
      {contextHolder}
      {context}
      {isSuccess && loading && (
        <>
          <DrawerComment courseId={course_id} />
          <div className="wrapper__lessons">
            <div className="header">
              <Row justify='space-between' align='middle'>
                <Col xl={12}>
                  <Button type='link' onClick={() => navigate('/')} className='btn-come-back'>
                    <AiOutlineLeft size={20} /><span>Quay lại</span>
                  </Button>
                </Col>
                <Col xl={12}>
                  <Row justify='end' align='middle' gutter={10} className='progress-learn'>
                    <Col><span>Tiến độ</span></Col>
                    <Col>
                      <Progress size={40} type="circle" percent={completeRate} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div>
              <Row>
                <Col xl={18}>
                  {showQuiz
                    ? (
                      <div className='quiz-content'>
                        <div className='box-large'>
                          <h4>{quizs.name}</h4>
                          {quizs?.questions.map((item, index) => (
                            <Card
                              title={`${index + 1}.${item.name}`}
                              key={item.id}
                              type='inner'
                              className='card-list-quiz'
                            >
                              <Radio.Group>
                                <Space direction="vertical">
                                  {item.answers.map((quiz) => (
                                    <Radio
                                      key={quiz.id}
                                      className={`content-quiz ${errorQuiz.includes(quiz.id) ? 'hight-light-error' : ''}`}
                                      value={quiz.id}
                                      onClick={() => handleAddQuiz(item.id, quiz.id)}
                                    >{quiz.name}
                                    </Radio>
                                  ))}
                                </Space>
                              </Radio.Group>
                            </Card>
                          ))}
                          <div className='message-quiz'>
                            {errorQuiz.length !== 0 && (
                              <h5>{errorQuiz.length} Câu trả lời sai !</h5>
                            )}
                          </div>
                          <Button htmlType='submit' type='primary' onClick={handleQuiz}>
                            Gửi
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className='side-left-video'>
                        <div className='video-scroll'>
                          <Row justify='center'>
                            <div
                              dangerouslySetInnerHTML={{ __html: iframe }}
                              className='video-player'
                            ></div>
                          </Row>
                        </div>
                        <div className='video-info-bio'>
                          <Row justify='space-between' align='middle'>
                            <Col xl={20}>
                              <h3>{lessons?.data?.name}</h3>
                            </Col>
                            <Col xl={3}>
                              <Button
                                shape="round"
                                className='btn-action-comment'
                                onClick={() => dispatch(onOpen(true))}
                              >
                                <AiOutlineComment size={20} />
                                <span>Thêm bình luận</span>
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    )
                  }
                </Col>
                <Col xl={6} className='side-right-box'>
                  <div className='carousel-theory'>
                    <h4>Lý thuyết</h4>
                    {/* <SlideViewer pdfUrl={filePdf} /> */}
                  </div>
                  <div className='content-lesson'>
                    <h4>Nội dung bài học</h4>
                    <Collapse
                      accordion
                      defaultActiveKey={[lessons.data?.module_id]}
                      expandIconPosition={'end'}
                      className='list-items-module'
                    >
                      {lessons?.data?.course?.modules?.length > 0 &&
                        lessons?.data?.course?.modules?.map((item) => (
                          <Collapse.Panel key={item.id} className='topic-items'
                            header={
                              <div className='details-course'>
                                <h6>{`${item.id}.${item.name}`}</h6>
                                <Tag color="green" className='tag-title'>
                                  {formatTime(item.lessons.reduce((acc, cul) => acc.time + cul.time) - 2)}
                                </Tag>
                              </div>
                            }>
                            <List
                              dataSource={item.lessons}
                              renderItem={(item, index) => (
                                <div className={`${checked.includes(item.id) ? 'has-next' : ''}`}>
                                  <Row
                                    key={index}
                                    justify='space-between'
                                    align='middle'
                                    className={`items-list ${id == item.id ? 'active-info' : ''} `}
                                    onClick={() => {
                                      setProgress(false)
                                      setShowQuiz(false)
                                      checked.includes(item.id) ? navigate(`/lessons/${item.id}`) : null
                                    }}
                                  >
                                    <Col>
                                      <h6 className='topic-link'>{item.id}.{item.name}</h6>
                                      <Row justify='start' align='middle' gutter={3} className='hours-group'>
                                        <Col>
                                          <Tag color="cyan" className='tag-title' style={{ marginTop: 5 }}>
                                            {formatTime(item.time - 1)}
                                          </Tag>
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col>
                                      {(completeCourse.includes(item.id))
                                        ? <AiFillCheckSquare style={{ color: '#06ac33' }} size={20} />
                                        : <AiOutlineLock
                                          className={`
                                          ${id == item.id ? 'hide-lock' : ''} ${checked.includes(item.id) ? 'checked-hand' : ''}
                                        `}
                                          size={20}
                                        />
                                      }
                                    </Col>
                                  </Row>
                                </div>
                              )} />
                          </Collapse.Panel>
                        ))}
                    </Collapse>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          {/* <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal> */}
        </>
      )}
    </>
  );
}

export default Lessons;
