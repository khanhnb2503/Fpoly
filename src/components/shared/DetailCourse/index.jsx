import { Collapse , Button, Col, Divider, List, Row, Typography } from 'antd';
import { useGetCourseQuery } from '../../../services/courses/index.jsx';
import { AiOutlineSafety } from 'react-icons/ai';
import Community from '../Community/index.jsx';

function DetailCourse() {
  const {data: course, isFetching} = useGetCourseQuery()

  const {Title, Text} = Typography
  return (
    <div className='wrapper__detail-course'>
      <Row justify='center' className='banner'>
          <img src={course?.image} alt='' />
      </Row>
      <Row justify='center' className='content' gutter={10}>
        <Col>
          <Button className='button' shape='round' size={'large'}>Mua khóa học</Button>
        </Col>
        <Col>
          <Button className='buttonFree' shape='round' size={'large'}>Học miễn phí</Button>
        </Col>
      </Row>
      <div>
        <Title>{course?.title}</Title>
        <Title level={2}>Thông tin khóa học</Title>
        <Text>{course?.description}</Text>
        <Title level={3}>Các khái niệm chính được đề cập đến ở khóa học: </Title>
        <List
          className='keyword'
          itemLayout="horizontal"
          dataSource={course?.lessons}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<AiOutlineSafety />}
                title={<a href="https://ant.design">{item.title}</a>}
              />
            </List.Item>
          )} />
        <Divider />
        <Row justify='space-between'>
          <Col>
            <Title level={3}>Nội dung khóa học : </Title>
          </Col>
        </Row>
        <Row className='content'>
          <Collapse accordion size={'large'} style={{width: '100%'}} expandIconPosition={'end'}>
            {course && course.lessons.map(item => (
              <Collapse.Panel key={item.id} header={item.title}>
                <List
                  className='keyword'
                  itemLayout="horizontal"
                  dataSource={item.topics}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<AiOutlineSafety />}
                        title={<a href="https://ant.design">{item.content}</a>}
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
    </div>
  )
}
export default DetailCourse