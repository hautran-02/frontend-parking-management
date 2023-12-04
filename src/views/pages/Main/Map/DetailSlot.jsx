import React from 'react';
import { Image, Row, Col, Flex, Typography, theme } from 'antd';
import IMG_LISENCE from '~/assets/images/lisence.png';
import { InnerDetailFloorStyled } from './style';

function DetailSlot({ position, zone, occupied, vehicle, driver }) {
  const { token } = theme.useToken();
  const { colorTextSecondary } = token;

  // driver = {
  //   name: 'fjgsljgs',
  //   adress: 'TP HCM',
  //   phone: '1234567890',
  //   email: 'minhtc1910@gmail.com',
  //   job: 'Giảng viên'
  // };

  // vehicle = {
  //   _id: '654a1fd36a0751a7e7c0b9ef',
  //   driverId: '6555eeb9e570d29a3c1f67ab',
  //   licenePlate: '12A-2171',
  //   type: 'Car',
  //   createdAt: 1699356625436,
  //   updatedAt: null,
  //   _destroy: false
  // };

  return (
    <InnerDetailFloorStyled>
      <Row className="detail-slot" gutter={{ xs: 4, sm: 8, md: 12 }}>
        <Col span={8}>
          <Flex vertical={true} align="center" gap={4}>
            <Image id="eventLisenceImg" src={IMG_LISENCE} preview={false} />
            <Typography.Text id="eventLisencePlate" strong>
              {vehicle.licenePlate}
            </Typography.Text>
          </Flex>
        </Col>
        <Col span={16}>
          <Flex justify="space-evenly" vertical={true} align="start">
            <Typography.Text id="eventDriverName" strong>
              <span className="label">Chủ xe: </span>
              <span className="value">{driver.name}</span>
            </Typography.Text>
            <Typography.Text id="eventDriverJob" strong>
              <span className="label">Nghề nghiệp: </span>
              <span className="value">{driver.job}</span>
            </Typography.Text>
            <Typography.Text id="eventDriverDepartment" strong>
              <span className="label">Đơn vị: </span>
              <span className="value">{driver.department}</span>
            </Typography.Text>
            <Typography.Text id="eventDriverPhone" strong>
              <span className="label">SĐT: </span>
              <span className="value">{driver.phone}</span>
            </Typography.Text>
            <Typography.Text id="eventDriverEmail" strong>
              <span className="label">Email: </span>
              <span className="value">{driver.email}</span>
            </Typography.Text>
          </Flex>
        </Col>
      </Row>
    </InnerDetailFloorStyled>
  );
}

export default DetailSlot;
