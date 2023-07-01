import { AutoComplete, Button, Input, Row, Typography } from 'antd';

function Community() {
  const {Title, Text} = Typography

  return (
    <div style={{textAlign: 'center'}} className='community'>
      <Title level={1}>Join Our Community</Title>
      <Title level={5}>Enter your email address to register to our newsletter subscription delivered on regular basis!</Title>
      <AutoComplete
        placeholder="Tìm kiếm video,khóa học,bài viết..."
        className='community-input'
      />
      <Row justify='center' className='community__button' >
        <Button shape='round' size={'large'}>
          SUBSCRIBE
        </Button>
      </Row>
    </div>
  )
}

export default Community