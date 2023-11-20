import React, { useEffect } from 'react';
import { Form, Modal, Input, Select, Button, Space } from 'antd';
import { ValidateNumberPhone } from '~/services/RegularService';

const formItemLayout = {
  labelCol: {
    sm: { span: 6 }
  },
  wrapperCol: {
    sm: { span: 18 }
  }
};

function DriverForm({ isOpen, onClose, formAction }) {
  const handleOk = () => {
    onClose();
  };

  useEffect(() => {
    if (formAction.action === 'edit') {
      // set Form
    }
  }, [formAction]);

  return (
    <Modal
      title={formAction.title || 'Thêm chủ xe'}
      open={isOpen}
      destroyOnClose
      classNames={{ footer: 'd-none' }}>
      <div className="container-fluid pt-3">
        <Form {...formItemLayout} style={{ maxWidth: 4000 }}>
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
          <Form.Item
            wrapperCol={{
              span: 12,
              offset: 6
            }}>
            <Space>
              <Button onClick={onClose}>Hủy</Button>
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
