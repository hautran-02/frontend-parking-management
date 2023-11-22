import React, { useEffect, useMemo, useState } from 'react';
import { Image, Popover, Button, Row, Col, Flex, Typography, theme, Tag } from 'antd';
import Car from '~/assets/images/blue-car.png';
import MapA from '~/assets/images/MapA.svg?react';
import MapB from '~/assets/images/mapB.svg?react';
import MapC from '~/assets/images/mapC.svg?react';
import IMG_LISENCE from '~/assets/images/lisence.png';
import { SLOTS_A } from '../parkingA';
import { SLOTS_B } from '../parkingB';
import { SLOTS_C } from '../parkingC';
import { DetailFloorStyled, InnerDetailFloorStyled } from '../style';
import dayjs from 'dayjs';

function MapContainer({ zone, width, height, ...props }) {
  const [vehs, setVehs] = useState([]);
  const { token } = theme.useToken();
  const [vehWidth, setVehWidth] = useState();

  useEffect(() => {
    let newVehs;
    let newWidth = 50;
    switch (zone) {
      case 'A':
        newVehs = SLOTS_A;
        newWidth = 52;
        break;
      case 'B':
        newVehs = SLOTS_B;
        newWidth = 76;
        break;
      case 'C':
        newVehs = SLOTS_C;
        newWidth = 68;
        break;
    }

    newVehs = newVehs.map((e) => {
      return {
        ...e,
        width: newWidth
      };
    });

    setVehs(newVehs);
  }, [zone]);

  const callApi = () => {};

  console.log(
    SLOTS_C.map((e) => {
      return {
        ...e,
        top: e.top + 4,
        left: e.left + 4
      };
    })
  );

  return (
    <>
      <div id="mapWrappter">
        {vehs.map((veh, ix) => {
          const { width, top, left, slotId, rotate } = veh;
          return (
            <DetailFloorStyled
              title={
                <Flex justify="space-between">
                  <Typography.Title
                    id="location"
                    level={5}
                    className="detail-slot-title my-0"
                    style={{ color: token.green7 }}>
                    {`Khu ${zone} - ${slotId}`}
                  </Typography.Title>
                  <Tag color="cyan">{dayjs().format('L LTS')}</Tag>
                </Flex>
              }
              content={<DetailSlot {...veh} zone={zone} />}
              overlayInnerStyle={{
                border: '1px solid',
                borderColor: token.cyan,
                backgroundColor: token.cyan1,
                boxShadow: token.boxShadowSecondary
              }}
              getPopupContainer={() => document.querySelector('#mapWrappter')}>
              <img
                className="image-container"
                src={Car}
                style={{
                  transform: `rotate(${rotate}deg)`,
                  width,
                  top,
                  left
                }}
                y
              />
            </DetailFloorStyled>
          );
        })}
        {useMemo(() => {
          let rs;
          switch (zone) {
            case 'A':
              rs = <MapA />;
              break;
            case 'B':
              rs = <MapB />;
              break;
            case 'C':
              rs = <MapC />;
              break;
          }
          return rs;
        }, [zone])}
      </div>
    </>
  );
}

export default MapContainer;

function DetailSlot({ slotId, zone, occupied, vehicle, driver }) {
  const { token } = theme.useToken();
  const { colorTextSecondary } = token;

  driver = {
    name: 'fjgsljgs',
    adress: 'TP HCM',
    phone: '1234567890',
    email: 'minhtc1910@gmail.com',
    job: 'Giảng viên'
  };

  vehicle = {
    _id: '654a1fd36a0751a7e7c0b9ef',
    driverId: '6555eeb9e570d29a3c1f67ab',
    licenePlate: '12A-2171',
    type: 'Car',
    createdAt: 1699356625436,
    updatedAt: null,
    _destroy: false
  };

  return (
    <InnerDetailFloorStyled>
      <Row className="detail-slot" gutter={{ xs: 4, sm: 8, md: 12 }}>
        <Col span={8}>
          <Flex vertical={true} align="center" gap={4}>
            <Image id="eventLisenceImg" src={IMG_LISENCE} />
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
          </Flex>
        </Col>
      </Row>
    </InnerDetailFloorStyled>
  );
}
