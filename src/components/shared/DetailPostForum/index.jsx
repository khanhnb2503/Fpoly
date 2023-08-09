import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Image,
  message,
  Modal,
  Popconfirm,
  Rate,
  Row,
  Typography,
  notification
} from "antd";
import {FaEdit, FaRocketchat, FaUserCheck} from "react-icons/fa";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Logo from "../../../../public/images/logo_ong_vang.jpg";
import {CardForum} from "../CardForum/index.jsx";
import {Link} from "react-router-dom";
import {useState} from "react";

const DetailPostForum = () => {
  const {Title, Text, Paragraph} = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataCKEditor, setDataCKEditor] = useState('');
  const [disable, setDisable] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const gridStyle = {
    width: "100%",
  }

  const openNotificationWithIcon = (star, type) => {
    api[type]({
      message: 'Đánh giá bài viết',
      description: `Bạn đã đánh giá ${star} sao cho bài viết này!`,
    });
  };
  function itemRender(route, params, items, paths) {
    const last = items.indexOf(items) === items.length - 1
    return last ? <span>{items.title}</span> : <Link to={paths.join('/')}>{items.title}</Link>;
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleDataCkEditor = () => {
    setIsModalOpen(false)
    setDataCKEditor('')
  }

  const handleCountStar = (star) => {
    openNotificationWithIcon(star,'success')
    // setDisable(true)
  }

  const CommentBox = (data) => {
    const confirm = (e) => {
      console.log(e);
      message.success('Xóa thành công');
    };
    return(
      <div style={{marginTop: 30}}>
        <Card className="background">
          <Row gutter={10} style={{alignItems: "center", justifyContent: "space-between"}}>
            <Col span={3}>
              <div style={{textAlign: "center"}}>
                <Avatar src={Logo} size={35} alt='avatar'/>
                <div>Dangthais</div>
              </div>
            </Col>
            <Col span={16}>
              <Title level={4}>cảm ơn bạn đã chia sẻ, bài viết rất hay</Title>
            </Col>
            <Col span={5}>
              <Button
                size="middle"
                type="primary"
                icon={<FaRocketchat/>}
                onClick={() => showModal()}
              >
                Reply
              </Button>
            </Col>
          </Row>
        </Card>
        <Card style={{marginTop: 20, marginBottom: 20}} className="background">
          <Row gutter={10} style={{alignItems: "center", justifyContent: "space-between"}}>
            <Col span={3}>
              <div style={{textAlign: "center"}}>
                <Avatar src={Logo} size={35} alt='avatar'/>
                <div>Dangthais</div>
              </div>
            </Col>
            <Col span={14}>
              <Title level={4}>cảm ơn bạn đã chia sẻ, bài viết rất hay</Title>
            </Col>
            <Col span={7} style={{display: "flex"}}>
              <Row>
                <Col span={14}>
                  <Button
                    size="middle"
                    type="primary"
                    icon={<FaEdit/>}
                    onClick={() => showModal()}
                  >
                    Chỉnh sửa
                  </Button>
                </Col>
                {contextHolder}
                <Col span={5}>
                  <Popconfirm
                    title="Xóa bình luận"
                    description="Bạn có chắc chắn muốn xóa bình luận này?"
                    onConfirm={confirm}
                    okText="Xóa"
                    cancelText="Hủy"
                  >
                    <Button
                      size="middle"
                      type="primary"
                      danger
                      icon={<FaEdit/>}
                    >
                      Delete
                    </Button>
                  </Popconfirm>
                </Col>
              </Row>


            </Col>
          </Row>
        </Card>

      </div>
    )
  }

  return (
    <div className="wrapper__blog--page">
      <Row gutter={20}>
        <Col span={16}>
          <div className="card_title">
            <Title level={3}>Xin hướng làm 1 trang single post </Title>
            <div>
              <span className="dateTime">06/08/2023</span>
              <span>Dangthais</span>
            </div>
            <Card className="background">
              <Row gutter={15}>
                <Col span={3}>
                  <div style={{textAlign: "center"}}>
                    <Avatar src={Logo} size={35} alt='avatar'/>
                    <div>Dangthais</div>
                  </div>
                </Col>

                <Col span={21}>
                  <div>
                    <Paragraph>
                      1. Named Export: (export)

                      Trong JavaScript ES6, named export được sử dụng để xuất nhiều thứ từ một module bằng cách thêm
                      keyword export vào khai báo của chúng. Những thứ được export sẽ được phân biệt bằng tên. Sau đó
                      import những thứ chúng ta cần sử dụng bằng cách bao quanh chúng cặp dấu ngoặc nhọn {}. Tên của
                      module đã nhập phải giống với tên của module đã xuất.
                      Ví dụ 1: Tôi đã tạo các hàm được đặt tên trong một tệp JavaScript có tên là functionsFile.js

                      Named exports hữu dụng trong việc xuất một số giá trị. Trong quá trình import, chúng ta sẽ có thể
                      sử dụng tên tương tự để chỉ giá trị tương ứng.
                      Liên quan đến Export default, chỉ có một default export duy nhất cho mỗi một module. Export
                      default có thể là một function, một class, một object hoặc bất cứ thứ gì khác. Giá trị này được
                      coi là giá trị export chính vì nó là đơn giản nhất để import.

                      Named exports hữu dụng trong việc xuất một số giá trị. Trong quá trình import, chúng ta sẽ có thể
                      sử dụng tên tương tự để chỉ giá trị tương ứng.
                      Liên quan đến Export default, chỉ có một default export duy nhất cho mỗi một module. Export
                      default có thể là một function, một class, một object hoặc bất cứ thứ gì khác. Giá trị này được
                      coi là giá trị export chính vì nó là đơn giản nhất để import.

                      Tổng kết

                      Named exports hữu dụng trong việc xuất một số giá trị. Trong quá trình import, chúng ta sẽ có thể
                      sử dụng tên tương tự để chỉ giá trị tương ứng.
                      Liên quan đến Export default, chỉ có một default export duy nhất cho mỗi một module. Export
                      default có thể là một function, một class, một object hoặc bất cứ thứ gì khác. Giá trị này được
                      coi là giá trị export chính vì nó là đơn giản nhất để import.

                      Named exports hữu dụng trong việc xuất một số giá trị. Trong quá trình import, chúng ta sẽ có thể
                      sử dụng tên tương tự để chỉ giá trị tương ứng.
                      Liên quan đến Export default, chỉ có một default export duy nhất cho mỗi một module. Export
                      default có thể là một function, một class, một object hoặc bất cứ thứ gì khác. Giá trị này được
                      coi là giá trị export chính vì nó là đơn giản nhất để import.
                    </Paragraph>
                  </div>
                  <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Title level={3}>
                      Đánh giá bài viết
                    </Title>
                    <div style={{marginTop: 10}}>
                      <Button
                        size="large"
                        type="primary"
                        icon={<FaRocketchat/>}
                        onClick={() => showModal()}
                      >
                        Reply
                      </Button>
                      <Modal width={"50%"} title="Thêm bài viết" onOk={() => handleDataCkEditor()} onCancel={() => setIsModalOpen(false)} open={isModalOpen}>
                        <CKEditor
                          editor={ ClassicEditor }
                          data={dataCKEditor}
                          onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            setDataCKEditor(data)
                          }}
                        />
                      </Modal>
                    </div>
                  </div>
                  <div>
                    <Rate disabled={disable} onChange={(item) => handleCountStar(item)} allowHalf defaultValue={2.5} />
                  </div>
                </Col>
              </Row>
              <Divider>Lượt xem</Divider>
              <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                  <FaUserCheck size={20} color="#009DA6" />
                  <span style={{marginLeft: 10}}>Có dangthais, khanhnb và 20 người khác đã xem</span>
                </div>
                <div style={{alignItems: "center"}}>
                  <Text>Trung bình đánh giá</Text>
                  <div>
                    <Rate disabled allowHalf defaultValue={4.5} />
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <CommentBox />
        </Col>
        <Col span={8} style={{marginTop: 75}}>
          <Row gutter={[0, 20]} style={{marginBottom: 20}}>
            <Col span={24}>
              <Card title="Bai viet lien quan" className="background">
                <Card.Grid style={gridStyle}>
                  <Row>
                    <Col span={5}>
                      <Avatar src={Logo} size={35} alt='avatar'/>
                    </Col>
                    <Col span={19}>
                      <Text className="title">bai viet moi nhat</Text>
                      <div>
                        <span className="dateTime">06/08/2023</span>
                        <span>Dangthais</span>
                      </div>
                    </Col>
                  </Row>
                </Card.Grid>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

    </div>
  )
}

export default DetailPostForum
