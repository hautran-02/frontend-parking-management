import React, { useEffect } from 'react';
import { Form, Modal, Input, Select, Button, Space, Card } from 'antd';
import { ValidateNumberPhone } from '~/services/RegularService';
import { MinusCircleOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: {
    sm: { span: 6 }
  },
  wrapperCol: {
    sm: { span: 18 }
  }
};

function DriverForm({ isOpen, onClose, formAction }) {
  const [form] = Form.useForm();

  const hanldeClose = () => {
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (formAction.action === 'edit') {
      form.setFieldsValue({ ...formAction.payload });
    }
  }, [formAction]);

  const onFinish = (values) => {
    console.log('onFinish', values);
  };

  return (
    <Modal
      title={formAction.title || 'Thêm chủ xe'}
      open={isOpen}
      onCancel={hanldeClose}
      destroyOnClose={true}
      classNames={{ footer: 'd-none' }}>
      <div className="container-fluid pt-3">
        <Form form={form} onFinish={onFinish} {...formItemLayout} style={{ maxWidth: 4000 }}>
          <Form.Item name={'name'} label="Họ và tên" rules={[{ required: true }]}>
            <Input placeholder="Nguyễn Văn A" id="nameInput" />
          </Form.Item>

          <Form.Item
            name={'email'}
            label="Email"
            rules={[{ required: true, message: false }, { type: 'email' }]}>
            <Input placeholder="example@gmail.com" id="emailInput" />
          </Form.Item>

          <Form.Item
            name={'phone'}
            label="Số điện thoại"
            validateDebounce={1000}
            rules={[
              { required: true, message: false },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (ValidateNumberPhone(value)) {
                    return Promise.resolve();
                  }

                  return Promise.reject();
                }
              })
            ]}>
            <Input placeholder="0357647771" id="phoneInput" addonBefore={'+87'} />
          </Form.Item>
          <Form.Item name={'address'} label="Địa chỉ">
            <Input placeholder="Số 1 Võ Văn Ngân, Linh Chiểu" id="addressInput" />
          </Form.Item>
          <Form.Item label="Danh sách xe"></Form.Item>

          <Form.List name="vehicle">
            {(fields, { add, remove }) => (
              <div
                style={{
                  display: 'flex',
                  rowGap: 16,
                  flexDirection: 'column'
                }}>
                {fields.map((field) => (
                  <Card
                    size="small"
                    title={`Xe ${field.name + 1}`}
                    key={field.key}
                    extra={
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }>
                    <Form.Item label="Biển số xe" name={[field.name, 'licenePlate']}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Loại xe" name={[field.name, 'type']}>
                      <Input />
                    </Form.Item>
                  </Card>
                ))}

                <Form.Item
                  shouldUpdate={(pre, curr) => pre.vehicle !== curr.vehicle}
                  wrapperCol={{ span: 24 }}>
                  {({ getFieldValue }) => {
                    const currVeh = getFieldValue('vehicle');
                    const disabled = (currVeh?.length || 0) >= 2;
                    return (
                      <Button disabled={disabled} type="dashed" onClick={() => add()} block>
                        + Thêm một xe
                      </Button>
                    );
                  }}
                </Form.Item>
              </div>
            )}
          </Form.List>

          <Form.Item
            wrapperCol={{
              span: 8,
              offset: 16
            }}
            className="mt-4">
            <Space>
              <Button onClick={hanldeClose}>Hủy</Button>
              <Button htmlType="submit" type="primary">
                Thêm
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default DriverForm;
