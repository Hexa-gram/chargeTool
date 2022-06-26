import React, { Fragment, useState } from 'react'
import copy from 'copy-to-clipboard';
import { Form, Input, Button, TextArea, Toast, Tabs } from 'antd-mobile'
import { AddCircleOutline, MinusCircleOutline } from 'antd-mobile-icons'

import styles from './index.less';
import { formatDate } from '../utils/utils';



export default function () {
  const [preview, setPreview] = useState(`${formatDate()}`)
  const [rules, setRules] = useState([1])
  const [detail, setDetail] = useState([])

  const [form] = Form.useForm()
  const onSubmit = () => {
    const values = form.getFieldsValue()
    copy(preview)
    Toast.show({
      content: '复制成功'
    })

    let originData = localStorage.getItem('order_detial') || '[]'
    let arr = JSON.parse(originData)
    arr.push({ ...values, time: preview.slice(0, 19) })

    localStorage.setItem('order_detial', JSON.stringify(arr))
  }
  const changeValue = (name: string, value: string) => {

    form.setFieldsValue({ [name]: value })
    setTimeout(() => {
      changeText({ [name]: value }, form.getFieldsValue())
    }, 0)
  }

  const changeText = (value: any, values: any) => {
    const { region, destination, type, car, price, remark } = values
    let content = ''
    // if (!content) content += '\n'
    if (region) content += `\n${region}`
    if (destination) content += `到${destination}`
    if (type) content += `${type}`
    let total = 0
    rules.map(it => {
      if (values[`rule${it}`] && values[`num${it}`]) {
        total += Number(values[`num${it}`])
        content += `,${values[`rule${it}`]}的${values[`num${it}`]}包`
      }
    })
    if (rules.length > 1) content += `,共计${total}包`
    if (car && price) content += `,一${car}${price}`
    if (remark) content += `\n${remark}`

    setPreview(`${formatDate()}${content}`)
  }


  const merchantList = ["李权", "五姐", "高连鹏", "赵忠义", "付亮", "林清水", "王太成", "孙树霞", "马英",
    "赵岩", "美强", "刘辉", "双双", "刘维国", "李伟宏", "蔡主任", "小韩", "老管", "庄姐", "白姐", "安玉林",
    "付广有", "晟特", "伊财源"]
  const headList = ['小臣', '福君', '安子', '林子']
  const regionList = ["万鸿利通", "森联国际", "国林一期", "国林二期", "国林三期", "国林四期", "宝丰", "炜达", "隆利源", "新星",
    "东旭", "卡佳", "曲美", "山鑫", "森鑫", "冠宇", "鑫东燕", "友谊", "帝森", "鹏瑞", "江林", "松林", "森雅", "木源", "新方仓",
    "老方仓", "二道沟", "三道沟", "头道沟", "市里", "大亚"]
  const typeList = ["倒短", "入窑", "出窑", "通勤", "称重"]
  const ruleList = ["300", "600", "850", "1米", "1米3", "1米5", "2米", "3米", "4米", "5米", "6米"]
  const carList = ["大货", "小货", "大客", "小客"]
  const priceList = ['50', '60', '80', '100', '120']



  const getDayDetail = (type: string = 'day') => {
    let start = 0

    switch (type) {
      case 'day':
        start = +new Date(new Date().setHours(0, 0, 0, 0))
        break;
      case 'week':
        start = +new Date(new Date().setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000)
        break;
      case 'month':
        start = +new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        break;
      default:
        break;
    }

    const end = +new Date(new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1); //获取当天23:59:59的时间

    let map = {}

    let res = []
    let data = JSON.parse(localStorage.getItem('order_detial') || '[]')
    // data = data.sort((a, b) => { return +new Date(b.time) - +new Date(a.time) })
    data.map(it => {
      let date = formatDate(new Date(it.time), 'yyyy-MM-dd')
      if (!map[date]) {
        map[date] = {
          day: date,
          data: [it]
        }
      } else {
        map[date].data.push(it)
      }
    })
    console.log('map', map)
    Object.keys(map).map(it => {
      let ts = +new Date(`${it} 08:00:00`)
      if (ts > start && ts < end) {
        res.push(map[it])
      }
    })
    setDetail(res)
  }

  return (
    <div className={styles.page}>
      <Tabs defaultActiveKey="sum">
        <Tabs.Tab title='工单生成器' key='order'>

          <Form layout='horizontal' mode='card' form={form} onValuesChange={changeText}>
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
            <Form.Item label='出发地' name="region">
              <Input placeholder='请输入' />
            </Form.Item>
            <div style={{ display: 'flex', flexWrap: 'wrap', padding: '5px 10px' }}>
              {regionList.map(it =>
                <div
                  key={it}
                  className={styles.tabs}
                  onClick={() => {
                    changeValue('region', it)
                  }}
                >
                  {it}
                </div>
              )}
            </div>

            <Form.Item label='方式' name="type">
              <Input placeholder='请输入' />
            </Form.Item>
            <div style={{ display: 'flex', flexWrap: 'wrap', padding: '5px 10px' }}>
              {typeList.map(it =>
                <div
                  key={it}
                  className={styles.tabs}
                  onClick={() => {
                    changeValue('type', it)
                  }}
                >
                  {it}
                </div>
              )}
            </div>
            <Form.Item label='目的地' name="destination">
              <Input placeholder='出窑可不填' />
            </Form.Item>
            <div style={{ display: 'flex', flexWrap: 'wrap', padding: '5px 10px' }}>
              {regionList.map(it =>
                <div
                  key={it}
                  className={styles.tabs}
                  onClick={() => {
                    changeValue('destination', it)
                  }}
                >
                  {it}
                </div>
              )}
            </div>
            <Form.Header>规格</Form.Header>
            {
              rules.map((it, idx) => {
                const keyName = `rule${it}`
                return (
                  <Fragment key={it}>
                    <Form.Item label={
                      <div>
                        <span>{`规格${it}`}</span>
                        {
                          // (idx == rules.length - 1 && idx != 0) ?
                          //   <MinusCircleOutline
                          //     style={{ marginLeft: 15, fontSize: 20 }}
                          //     onClick={() => {
                          //       setRules(Array.from({ length: rules.length - 1 }, (v, k) => k + 1))
                          //     }}
                          //   />
                          //   :
                          <AddCircleOutline
                            style={{ marginLeft: 15, fontSize: 20 }}
                            onClick={() => {
                              setRules(Array.from({ length: rules.length + 1 }, (v, k) => k + 1))
                            }}
                          />
                        }

                      </div>
                    } name={keyName}>
                      <Input placeholder='请输入' />
                    </Form.Item>
                    <div style={{ display: 'flex', flexWrap: 'wrap', padding: '5px 10px' }}>
                      {ruleList.map(it =>
                        <div
                          key={it}
                          className={styles.tabs}
                          onClick={() => {
                            changeValue(keyName, it)
                          }}
                        >
                          {it}
                        </div>
                      )}
                    </div>
                    <Form.Item label='数量' name={`num${it}`}>
                      <Input placeholder='请输入' type="number" pattern="[0-9]*" />
                    </Form.Item>
                  </Fragment>
                )
              })
            }
            <Form.Header>报价</Form.Header>
            <Form.Item label='车辆' name="car">
              <Input placeholder='请输入' />
            </Form.Item>
            <div style={{ display: 'flex', flexWrap: 'wrap', padding: '5px 10px' }}>
              {carList.map(it =>
                <div
                  key={it}
                  className={styles.tabs}
                  onClick={() => {
                    changeValue('car', it)
                  }}
                >
                  {it}
                </div>
              )}
            </div>
            <Form.Item label='价格' name="price">
              <Input placeholder='请输入' type="number" pattern="[0-9]*" />
            </Form.Item>
            <div style={{ display: 'flex', flexWrap: 'wrap', padding: '5px 10px' }}>
              {priceList.map(it =>
                <div
                  key={it}
                  className={styles.tabs}
                  onClick={() => {
                    changeValue('price', it)
                  }}
                >
                  {it}
                </div>
              )}
            </div>
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
          <div>
            预览:
            <div>{preview}</div>
          </div>
          <div className={styles.submitBtn}>
            <Button type='submit' color='primary' size='large' onClick={() => { onSubmit() }}>
              复制
            </Button>
            {/* <Button type='submit' color='primary' size='large' onClick={() => { onSubmit() }}>
              全复制
            </Button> */}
          </div>
        </Tabs.Tab>

        <Tabs.Tab title='汇总' key='sum'>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type='submit' color='primary' size='large' onClick={() => getDayDetail('day')}>
              查看当日
            </Button>
            <Button type='submit' color='primary' size='large' onClick={() => getDayDetail('week')}>
              查看近7天
            </Button>
            <Button type='submit' color='primary' size='large' onClick={() => getDayDetail('month')}>
              查看本月
            </Button>
          </div>
          <div>
            {detail.map(it => {
              return <div key={it.day} className={styles.list}>
                <div className={styles.dayTitle}>{it.day}</div>
                <div >
                  {it.data.map((item, idx) => {
                    return <div key={idx} className={styles.detailCard}>
                      <div>
                        <div>{formatDate(new Date(item.time), 'hh:mm:ss')}</div>
                        <div>地点:{item.region}{item.destination ? ` - ${item.destination}` : ''}</div>
                        <div>类型:{item.type}</div>
                        <div>车型:{item.car}</div>
                        <div>规格:{item.rule1}{`<${item.num1 || ''}>`}</div>
                        {item.remark && <div>备注:{item.remark || ''}</div>}
                      </div>
                      <div style={{ minWidth: 150, textAlign: 'right' }}>
                        <div>{item.merchant}</div>
                        <div>{item.head}</div>
                        <div style={{ fontSize: 20, color: '#096dd9' }}>{item.price}</div>
                      </div>
                    </div>
                  })}
                </div>

              </div>
            })}
          </div>
        </Tabs.Tab>
      </Tabs>
    </div >
  )
}