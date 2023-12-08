import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Input, Layout, Radio, Row, Select, Switch } from 'antd';
import { Content, Footer, Header } from '~/views/layouts';
import AppContext from '~/context';
import { ParkingApi, UserApi } from '~/api';
import { ErrorService, ValidateService } from '~/services';
import { SLOTS_A } from '../Map/parkingA';
import { SLOTS_B } from '../Map/parkingB';
import { SLOTS_C } from '../Map/parkingC';

const formItemLayout = {
  labelCol: {
    sm: { span: 6 }
  },
  wrapperCol: {
    sm: { span: 24 }
  }
};

const zones = ['A', 'B', 'C'];

function Event({}) {
  const { state, actions } = useContext(AppContext);
  const [drivers, setDrivers] = useState([]);
  const [parkings, setParkings] = useState([]);
  const [importForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isSelect, setIsSelect] = useState(true);

  const callApi = async () => {
    try {
      const api = await Promise.all([
        UserApi.getDrivers({}),
        ParkingApi.getStatus({ zone: 'A' }),
        ParkingApi.getStatus({ zone: 'B' }),
        ParkingApi.getStatus({ zone: 'C' })
      ]);

      const [newDrivers, parkingA, parkingB, parkingC] = api;
      setDrivers(newDrivers.data);
      setParkings({
        A: parkingA[0],
        B: parkingB[0],
        C: parkingC[0]
      });
    } catch (error) {
      ErrorService.hanldeError(error, actions.onNoti);
    }
  };
  const hanldeImport = async (values) => {
    try {
      console.log(values);
      await ParkingApi.importVehicle(values);
      actions.onNoti({
        type: 'success',
        message: 'Nhập xe thành công',
        description: values.licenePlate
      });
    } catch (error) {
      ErrorService.hanldeError(error, actions.onNoti);
    }
  };

  useEffect(() => {
    callApi();
  }, [state.parkingEvent]);

  return (
    <Layout className="px-4">
      <Header className="border-1" title={'Nhập xuất xe'} />
      <Content className="w-100 py-3">
        <Row gutter={16}>
          <Col span={12}>
            <Form
              name="importVehicleForm"
              form={importForm}
              onFinish={hanldeImport}
              disabled={loading}
              layout="vertical"
              {...formItemLayout}
              style={{ maxWidth: 4000 }}>
              <Card
                title="Nhập xe"
                extra={
                  <Form.Item className="mb-0">
                    <Button htmlType="submit" type="primary">
                      Nhập
                    </Button>
                  </Form.Item>
                }>
                <Form.Item>
                  <Switch
                    checkedChildren="Chọn"
                    unCheckedChildren="Nhập"
                    value={isSelect}
                    onChange={(checked) => {
                      setIsSelect(checked);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="licenePlate"
                  label="Biển số xe"
                  rules={[
                    { required: true, message: false },
                    ({}) => ({
                      validator(_, value) {
                        if (ValidateService.licensePlate(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject({ message: 'Sai định dạng (VD: 12A-2184)' });
                      }
                    })
                  ]}>
                  {isSelect ? (
                    <Select>
                      {drivers.map((el) => (
                        <Select.Option value={el.driver.vehicle[0].licenePlate}>
                          {el.driver.vehicle[0].licenePlate}
                        </Select.Option>
                      ))}
                    </Select>
                  ) : (
                    <Input placeholder="A1-013" />
                  )}
                </Form.Item>
                <Form.Item name="zone" label="Khu vực">
                  <Radio.Group>
                    {zones.map((el) => (
                      <Radio.Button value={el}>{'Khu ' + el}</Radio.Button>
                    ))}
                  </Radio.Group>
                </Form.Item>
                <Form.Item shouldUpdate={(pre, curr) => pre.zone !== curr.zone}>
                  {({ getFieldValue }) => {
                    let posList = [];
                    const currZone = getFieldValue('zone');
                    const slots = parkings[currZone]?.slots || [];
                    switch (currZone) {
                      case 'A':
                        posList = SLOTS_A;
                        break;
                      case 'B':
                        posList = SLOTS_B;
                        break;
                      case 'C':
                        posList = SLOTS_C;
                        break;
                    }

                    const rs = posList.map((el) => {
                      const { position } = el;
                      const isOccupied = slots.findIndex((e) => e.position === position);
                      return (
                        <Radio value={el.position} disabled={isOccupied !== -1}>
                          {el.position}
                        </Radio>
                      );
                    });

                    return (
                      <Form.Item name="position" label="Vị trí">
                        <Radio.Group>{rs}</Radio.Group>
                      </Form.Item>
                    );
                  }}
                </Form.Item>
              </Card>
            </Form>
          </Col>
          <Col span={12}>
            <Card title="Xuất xe">asdfasd</Card>
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout>
  );
}

export default Event;
