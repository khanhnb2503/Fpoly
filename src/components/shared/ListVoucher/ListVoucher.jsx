import {Avatar, Badge, Button, Card, Col, Image, List, message, Popconfirm, Popover, Row, Typography} from "antd";
import {Link} from "react-router-dom";
import Logo from '../../../../public/images/logo_ong_vang.jpg';
import profile from '../../../../public/images/profile.png';
import UserMenu from '../UserMenu/index.jsx';
import {useProfileQuery} from "../../../services/users/index.jsx"
import {useConvertVoucherMutation, useListVoucherQuery} from "../../../services/payment/index.jsx";
import {useEffect, useState} from "react";
import { SyncOutlined} from "@ant-design/icons";
import {getVoucher} from "../../../services/base/baseQuery.jsx";
import moment from "moment";
function ListVoucher() {
  const {data: user, isLoading} = useProfileQuery()
  const { Text, Title, Paragraph, } = Typography
  const [listVoucher, setListVoucher] = useState([]);

  useEffect( () => {
    (async () => {
      if (user?.id) {
        const {data} = await getVoucher(user.id)
        setListVoucher(data)
      }
    })()
  },[isLoading])
  const [convertVoucher] = useConvertVoucherMutation()
  const confirmConvert = async (idVoucher) => {
    const {data} = await convertVoucher({user_id: user.id,exchange_rate: idVoucher})
    const messageResponse = data?.message
    if (!data.status) {
      message.error(messageResponse);
    } else {
      message.success(messageResponse);
    }
  };

  const dataVoucher = [
    {
      id: 1,
      percent: 10,
      point: 50
    },
    {
      id: 2,
      percent: 20,
      point: 100
    },
    {
      id: 3,
      percent: 30,
      point: 150
    }
  ]

  return (
    <div className="wrapper__profile">
      <div className="profile--header">
        <Row align="middle" className='horizontal-header'>
          <Col sm={4} md={6} lg={12} xl={12}>
            <Row justify="start" align="middle" className='navbar-logo'>
              <Link to='/'>
                <img src={Logo} alt='logo' />
              </Link>
              <h4>FptPolytechnic</h4>
            </Row>
          </Col>
          <Col sm={4} md={6} lg={12} xl={12}>
            <Row justify="end" align="middle" className='navbar-action'>
              <>
                <Col flex='60px' className='notification'>

                </Col>
                <Col flex='35px' className='avatar'>
                  <Popover
                    placement="bottomRight"
                    content={<UserMenu />}
                    trigger="click"
                  >
                    <Avatar src={user?.avatar || Logo} size={35} alt='avatar' />
                  </Popover>
                </Col>
              </>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="profile--content">
        <div className="background-profile" style={backgroundProfile}>
          <Row justify='space-between' align='bottom' className="info-my">
            <Col xl={9} className="avatar-user">
              <Avatar src={user?.avatar || Logo} size={156} alt='avatar' />
            </Col>
            <Col xl={14} className="info--text">
              <h5>{user?.name}</h5>
            </Col>
          </Row>
        </div>
        <div className="course--my">
          <Card type="inner" title="Voucher của tôi" >
            <List
              grid={{
                gutter: 16,
                column: 3,
              }}
              dataSource={listVoucher}
              renderItem={(item) => (
                <List.Item>
                  <Card title={item.unit === "Percent" ? `Giảm giá: ${item.value} %` : `Giảm giá: ${item.value} VND`}>
                    {item.code || "Bạn chưa có mã khuyến mãi loại này"}
                    <div style={{marginTop: 10, fontWeight: "bold", color: "#74ACFA"}}>Ngày hết hạn: {moment(item.expired).format('L')}</div>
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </div>
        <div>
          <Card type="inner" title="Đổi voucher" extra={`Số điểm hiện tại: ${user?.point}`}>
            <List
              grid={{
                gutter: 16,
                column: 3,
              }}
              dataSource={dataVoucher}
              renderItem={(item) => (
                <List.Item>
                  <Card title={"Giảm giá: " + item.percent + "%"} extra={
                    <Popconfirm
                      title="Đổi voucher"
                      description={`Bạn có chắc chắn muốn đổi ${item.point} điểm lấy voucher này?`}
                      onConfirm={() => confirmConvert(item.id)}
                      okText="Đổi"
                      cancelText="Hủy"
                    >
                      <Button
                        size="small"
                        type="primary"
                        icon={<SyncOutlined />}
                      >
                        Đổi Voucher
                      </Button>
                    </Popconfirm>
                  }>
                    <Title level={4}>Điểm cần để đổi : {item.point}</Title>

                  </Card>
                </List.Item>
              )}
            />

          </Card>
        </div>

      </div>
    </div>

  );
};

const backgroundProfile = {
  backgroundImage: `url(${profile})`,
  backgroundSize: 'cover',
  width: '100%',
  height: '300px',
  borderRadius: '5px'
}

export default ListVoucher;
