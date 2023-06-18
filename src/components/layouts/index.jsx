import { Col, Row } from 'antd';

import Header from './Headers';
import SideNav from './SideNav'
import Footers from './Footers'

function LayoutPublic({ children }) {
  return (
    <div className="wrapper__layout">
      <Header />
      <div className='layout__header'>
        <Row className='layout__content'>
          <Col><SideNav /></Col>
          <Col>{children}</Col>
        </Row>
      </div>
      <Footers />
    </div>
  );
}

export default LayoutPublic;