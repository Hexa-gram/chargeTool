import React from 'react'
import copy from 'copy-to-clipboard';
import { Form, Input, Button, TextArea, Toast } from 'antd-mobile'
import styles from './index.less';
import { formatDate } from '../utils/utils';

export default function () {

  const [form] = Form.useForm()
  const onSubmit = () => {
    const values = form.getFieldsValue()
    copy(JSON.stringify({
      values,
      date: formatDate()
    }))
    Toast.show({
      content: '复制成功'
    })
    // Dialog.alert({
    //   content: <pre>{JSON.stringify(values, null, 2)}</pre>,
    // })
  }
  const changeValue = (name: string, value: string) => {
    form.setFieldsValue({ [name]: value })
  }
  const merchantList = ['白姐', '王哥']
  const headList = ['福君', '小臣']
  const ruleList = ['1m3', '800', '大货']



  return (
    <div className={styles.page}>
      <Form layout='horizontal' mode='card' form={form}>
        {/* <Form.Header>工单生成器</Form.Header> */}
        <Form.Item label='发起人' name="merchant">
          <Input placeholder='请输入' />
        </Form.Item>
        <div style={{ display: 'flex', flexWrap: 'wrap', padding: '5px 10px' }}>
          {merchantList.map(it =>
            <div
              key={it}
              className={styles.tabs}
              onClick={() => {
                changeValue('merchant', it)
              }}
            >
              {it}
            </div>
          )}
        </div>
        <Form.Item label='司机' name="head">
          <Input placeholder='请输入' />
        </Form.Item>
        <div style={{ display: 'flex', flexWrap: 'wrap', padding: '5px 10px' }}>
          {headList.map(it =>
            <div
              key={it}
              className={styles.tabs}
              onClick={() => {
                changeValue('head', it)
              }}
            >
              {it}
            </div>
          )}
        </div>
        {/* <Form.Header /> */}
        <Form.Item label='规格' name="rule">
          <Input placeholder='请输入' />
        </Form.Item>
        <div style={{ display: 'flex', flexWrap: 'wrap', padding: '5px 10px' }}>
          {ruleList.map(it =>
            <div
              key={it}
              className={styles.tabs}
              onClick={() => {
                changeValue('rule', it)
              }}
            >
              {it}
            </div>
          )}
        </div>
        <Form.Item label='数量' name="num">
          <Input placeholder='请输入' type="number" />
        </Form.Item>
        {/* <Form.Item label='所在城市'>
          <Input placeholder='请输入' />
        </Form.Item> */}
        <Form.Header />
        <Form.Item name='remark' label='备注'>
          <TextArea
            placeholder='输入备注信息'
            maxLength={100}
            rows={2}
            showCount
          />
        </Form.Item>
      </Form>

      {/* <Form layout='horizontal' mode='card'>
        <Form.Header>带辅助操作</Form.Header>
        <Form.Item label='短信验证码' extra={<a>发送验证码</a>}>
          <Input placeholder='请输入' />
        </Form.Item>
      </Form> */}
      <div className={styles.submitBtn}>
        <Button block type='submit' color='primary' size='large' onClick={() => { onSubmit() }}>
          提交并复制
        </Button>
      </div>
    </div>
  )
}