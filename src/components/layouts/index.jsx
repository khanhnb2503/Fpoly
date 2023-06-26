import { Col, Row } from 'antd';

import Footers from './Footers';
import Header from './Headers';
import SideNav from './SideNav';

function LayoutPublic({ children }) {
  return (
    <div className="wrapper__layout">
      <Header />
      <div className='layout__header'>
        <Row className='layout__content'>
          <Col flex='94px'><SideNav /></Col>
          <Col flex='auto' className='content-right'>{children}</Col>
        </Row>
      </div>
      <Footers />
    </div>
  );
}

export default LayoutPublic;