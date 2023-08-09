import {Avatar, Breadcrumb, Button, Card, Col, Pagination, Popover, Row, Typography, Modal } from "antd";
import {useState} from "react";
import {HomeOutlined} from '@ant-design/icons';
import {useGetBlogsQuery} from "../../../services/blogs";
import {CardForum} from "../CardForum/index.jsx";
import SkeletonPage from "../SkeletonPage/index.jsx";
import {FaEdit, FaRocketchat} from "react-icons/fa";
import UserMenu from "../UserMenu/index.jsx";
import Logo from "../../../../public/images/logo_ong_vang.jpg";
import {Link} from "react-router-dom";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function BlogsPage() {
  const {Title, Text} = Typography;
  const [pageNumber, setPageNumber] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataCKEditor, setDataCKEditor] = useState('');

  const gridStyle = {
    width: "100%",
  }
  const {data: blogs, isLoading} = useGetBlogsQuery(pageNumber)

  const dataFake = [
    {
      id: 1,
      title: "Backend",
      post: [
        {
          id: 1,
          user: {
            name: "dangthais"
          },
          title: "Tổng hợp những thread, nội dung hay box Phần mềm",
          content: "loremIpsum is function version of the component LoremIpsum which generates plain text instead of HTML. They both get the same props/inputs as a single object",
          view: 150,
          star: 4.0,
          comment: [
            {
              id: 1,
              content: "loremIpsum is function version of the component LoremIpsum which generates plain text instead of HTML. They both get the same props/inputs as a single object"
            },
            {
              id: 2,
              content: "loremIpsum is function version of the component LoremIpsum which generates plain text instead of HTML. They both get the same props/inputs as a single object"
            },
          ],
          date: "04/02/2023"
        },
        {
          id: 2,
          user: {
            name: "dangthais"
          },
          title: "Tổng hợp những thread, nội dung hay box Phần mềm",
          content: "loremIpsum is function version of the component LoremIpsum which generates plain text instead of HTML. They both get the same props/inputs as a single object",
          view: 150,
          star: 4.0,
          comment: [
            {
              id: 1,
              content: "loremIpsum is function version of the component LoremIpsum which generates plain text instead of HTML. They both get the same props/inputs as a single object"
            },
            {
              id: 2,
              content: "loremIpsum is function version of the component LoremIpsum which generates plain text instead of HTML. They both get the same props/inputs as a single object"
            },
          ],
          date: "04/02/2023"
        }
      ]
    },
    {
      id: 2,
      title: "Frontend",
      post: [
        {
          id: 2,
          user: {
            name: "nguyennam"
          },
          title: "Cách dùng công cụ tạo kí tự đặc biệt cho người mới sử dụng",
          content: "loremIpsum is function version of the component LoremIpsum which generates plain text instead of HTML. They both get the same props/inputs as a single object",
          view: 200,
          star: 4.3,
          comment: [
            {
              id: 1,
              content: "loremIpsum is function version of the component LoremIpsum which generates plain text instead of HTML. They both get the same props/inputs as a single object"
            },
            {
              id: 2,
              content: "loremIpsum is function version of the component LoremIpsum which generates plain text instead of HTML. They both get the same props/inputs as a single object"
            }
          ],
          date: "04/04/2023"
        }
      ],

    }
  ]
  const items = [
    {
      path: '/',
      title: 'home',
    },
    {
      path: '/forum',
      title: 'forum',
    },
  ]
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleDataCkEditor = () => {
    console.log(dataCKEditor)
    setIsModalOpen(false)
    alert("Thêm bài post thành công")
    setDataCKEditor('')
  }

  function itemRender(route, params, items, paths) {
    const last = items.indexOf(items) === items.length - 1
    return last ? <span>{items.title}</span> : <Link to={paths.join('/')}>{items.title}</Link>;
  }

  return (
    <div className="wrapper__blog--page">
      <Row gutter={20}>
        <Col span={16}>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <Breadcrumb itemRender={itemRender} items={items}/>
            <Button
              type="primary"
              color="#FFF"
              icon={<FaEdit />}
              onClick={() => showModal()}
            >Thêm bài viết</Button>
          </div>

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
          <div className="card_title">
            <Card title="Nơi sinh hoạt chung" className="background">
              <Row>
                <Col span={8}>
                  <div className="content_left">
                    <FaRocketchat color="#EC9073" size={30}/>
                    <Text className="text">
                      Thông báo
                    </Text>
                  </div>
                  <div className="content_left">
                    <FaRocketchat color="#EC9073" size={30}/>
                    <Text className="text">
                      Góp ý
                    </Text>
                  </div>
                </Col>
                <Col span={16}>
                  <Row style={{marginTop: 10}}>
                    <Col span={6} style={{textAlign: "center"}}>
                      <div style={{opacity: "60%"}}>
                        Posts
                      </div>
                      <Text>
                        15
                      </Text>
                    </Col>
                    <Col span={6} style={{textAlign: "center"}}>
                      <div style={{opacity: "60%"}}>
                        Comment
                      </div>
                      <Text>
                        100
                      </Text>
                    </Col>
                    <Col span={12}>
                      <Row>
                        <Col span={5}>
                          <Avatar src={Logo} size={35} alt='avatar'/>
                        </Col>
                        <Col span={19}>
                          <Text ellipsis={true} className="title">Tổng hợp những thread, nội dung hay box Phần mềm</Text>
                          <div>
                            <span className="dateTime">06/08/2023</span>
                            <span>Dangthais</span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row style={{marginTop: 10}}>
                    <Col span={6} style={{textAlign: "center"}}>
                      <div style={{opacity: "60%"}}>
                        Posts
                      </div>
                      <Text>
                        15
                      </Text>
                    </Col>
                    <Col span={6} style={{textAlign: "center"}}>
                      <div style={{opacity: "60%"}}>
                        Comment
                      </div>
                      <Text>
                        100
                      </Text>
                    </Col>
                    <Col span={12}>
                      <Row>
                        <Col span={5}>
                          <Avatar src={Logo} size={35} alt='avatar'/>
                        </Col>
                        <Col span={19}>
                          <Text ellipsis={{rows: 1}} className="title">tong hop nhung gop y moi nhat</Text>
                          <div>
                            <span className="dateTime">06/08/2023</span>
                            <span>Dangthais</span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </div>
          <div>
            {dataFake.map((item,index) => {
              return (
                <div key={index}>
                  <CardForum data={item} />
                </div>

              )
            })}
          </div>
        </Col>
        <Col span={8} style={{marginTop: 10}}>
          <Row gutter={[0, 20]} style={{marginBottom: 20}}>
            <Col span={24}>
              <Card title="Bai viet moi nhat" className="background">
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
                <Card.Grid style={gridStyle} >
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
                <Card.Grid style={gridStyle} >
                  <Row >
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
            <Col span={24}>
              <Card title="Bai viet noi bat" className="background">
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
                <Card.Grid style={gridStyle} >
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
                <Card.Grid style={gridStyle} >
                  <Row >
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

export default BlogsPage;
