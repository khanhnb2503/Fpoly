import { Button, Form, Input, Space } from 'antd';
import { MdSend } from 'react-icons/md';

function InputComment() {
  return (
    <>
      <div className="wrapper__input--comment">
        <Form>
          <Space.Compact
            style={{
              width: '100%',
            }}
          >
            <Input size="large" placeholder='Nhập bình luận...' />
            <Button type="primary" htmlType='submit'>
              <MdSend size={25} />
            </Button>
          </Space.Compact>
        </Form>
      </div>
    </>
  );
}

export default InputComment;