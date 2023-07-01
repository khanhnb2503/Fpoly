import { Button, Col, Collapse, List, Modal, Row, Typography } from 'antd';
import { useState } from 'react';
import { AiOutlineSafety } from 'react-icons/ai';
import ReactPlayer from 'react-player';
import { useGetCourseQuery } from '../../../services/courses/index.jsx';
import Community from '../Community/index.jsx';

function DetailCourse() {
  const [open, setOpen] = useState(false);
  const { data: course, isFetching } = useGetCourseQuery();

  const { Title, Text } = Typography
  return (
    <div className='wrapper__detail-course'>
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
            <h5>{course?.title}</h5>
            <p>{course?.description}</p>
            <Title level={5}>Các khái niệm chính được đề cập đến ở khóa học: </Title>
            <List
              dataSource={course?.lessons}
              className='item-list'
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<AiOutlineSafety size={20} />}
                    title={<p>{item.title}</p>}
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
                {course && course.lessons.map(item => (
                  <Collapse.Panel key={item.id} header={<h6>{item.title}</h6>}>
                    <List
                      dataSource={item.topics}
                      renderItem={(item, index) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<AiOutlineSafety />}
                            title={<p>{item.content}</p>}
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
            <img src={course?.image} alt='' />
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
                className='buttonFree'
                shape='round'
                size={'large'}
              >Đăng kí khóa học
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
export default DetailCourse