import { Button, Col, Collapse, List, Modal, Row, Typography } from 'antd';
import { useState } from 'react';
import { AiOutlineSafety } from 'react-icons/ai';
import ReactPlayer from 'react-player';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { imageUrl } from "../../../common/imageUrl";
import { useGetCourseQuery, useSubcribeCourseMutation } from '../../../services/courses/index.jsx';
import Community from '../Community/index.jsx';

function DetailCourse() {
  const { id } = useParams();
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [subcribeCourse, { isSuccess }] = useSubcribeCourseMutation();
  const { data: course, isLoading } = useGetCourseQuery(id);


  const handleSubcribeCourse = async () => {
    if (id) {
      // dispatch(setIdCourse(id));
      const response = await subcribeCourse(id);
      console.log(response);
    }
  };

  return (
    <div className='wrapper__detail-course'>
      {!isLoading && course && (
        <>
          <Modal
            title={<h4>Học ReactJs với 8 chuyên đề</h4>}
            centered
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            open={open}
            footer={null}
            width='50%'
          >
            <ReactPlayer
              url='https://www.youtube.com/watch?v=5MTSQspPjXQ'
              className='review-first-video'
              playing={true}
              controls
            />
          </Modal>
          <Row justify='space-between' align='top' gutter={50}>
            <Col xl={15}>
              <div className='details'>
                <h5>{course.data?.name}</h5>
                <p>{course.data?.description}</p>
                <Title level={5}>Các khái niệm chính được đề cập đến ở khóa học: </Title>
                <List
                  dataSource={course.data?.modules}
                  className='item-list'
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<AiOutlineSafety size={20} />}
                        title={<p>{item.name}</p>}
                      />
                    </List.Item>
                  )} />
                <Row justify='space-between'>
                  <Col>
                    <Title level={3}>Nội dung khóa học : </Title>
                  </Col>
                </Row>
                <Row className='content'>
                  <Collapse accordion size={'large'} style={{ width: '100%' }} expandIconPosition={'end'}>
                    {course.data.modules.length > 0 && course.data.modules.map(item => (
                      <Collapse.Panel key={item.id} header={<h6>{item.name}</h6>}>
                        <List
                          dataSource={item.lessons}
                          renderItem={(item, index) => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={<AiOutlineSafety />}
                                title={<p>{item.name}</p>}
                              />
                            </List.Item>
                          )} />
                      </Collapse.Panel>
                    ))}
                  </Collapse>
                </Row>
                <Row justify='center'>
                  <Community />
                </Row>
              </div>
            </Col>
            <Col xl={9} className='thumbnail'>
              <div className='reviewer-course'>
                <img src={`${imageUrl}${course.data?.image}`} alt='' />
              </div>
              <Row justify='space-evenly' className='content'>
                <Col >
                  <Button
                    className='button'
                    shape='round'
                    size={'large'}
                    onClick={() => setOpen(true)}
                  >Học thử bài đầu
                  </Button>
                </Col>
                <Col >
                  <Button
                    className='button-free'
                    shape='round'
                    size={'large'}
                    onClick={handleSubcribeCourse}
                  >Đăng kí khóa học
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </div>
  )
}
export default DetailCourse