import React, { useEffect } from 'react';
import { Form, Modal, Input, Select, Button, Space, Card } from 'antd';
import { ValidateNumberPhone } from '~/services/RegularService';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const formItemLayout = {
  labelCol: {
    sm: { span: 6 }
  },
  wrapperCol: {
    sm: { span: 18 }
  }
};

function EmployeeForm({ isOpen, onClose, formAction }) {
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
          <Form.Item
            name={'username'}
            label="Tên tài khoản"
            validateDebounce={1000}
            rules={[{ required: true, message: false }]}>
            <Input placeholder="example" id="usernameinput" />
          </Form.Item>
          <Form.Item
            name={'password'}
            label="Mật khẩu"
            rules={[{ required: true, message: false }]}>
            <Input.Password
              placeholder="Example@123"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
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

export default EmployeeForm;
