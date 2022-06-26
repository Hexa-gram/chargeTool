import type React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


const { TextArea } = Input;

const App: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 12 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="发起人"
        name="merchant"
      // rules={[{ required: true, message: '' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="司机"
        name="head"
      // rules={[{ required: true, message: '' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="数量"
        name="num"
      // rules={[{ required: true, message: '' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="规格"
        name="rule"
      // rules={[{ required: true, message: '' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="备注">
        <TextArea rows={3} />
      </Form.Item>
      {/* <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
    </Form>
  );
};

export default App;
