import React from 'react';
import TopNavigationBar from '../components/TopNavigationBar';
import {
  DollarCircleOutlined,
  SettingOutlined,
  AlertOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
} from '@ant-design/icons';
import {
  Card,
  Row,
  Col,
  Tabs,
  Form,
  InputNumber,
  Switch,
  Button,
  message,
  Collapse,
  Divider,
  List,
} from 'antd';

const { TabPane } = Tabs;
const { Panel } = Collapse;

// 定义表单值类型
interface PermissionFormValues {
  fundPermission: boolean;
  optionPermission: boolean;
  contractPermission: boolean;
  shContractPermission: boolean;
  hkContractPermission: boolean;
}

interface LimitFormValues {
  dailyLimit: number;
  singleLimit: number;
  monthlyLimit: number;
}

interface FeeFormValues {
  fundFee: number;
  optionFee: number;
  contractFee: number;
}

interface TimeFormValues {
  fundTrading: boolean;
  optionTrading: boolean;
  contractTrading: boolean;
}

const TradeManagement: React.FC = () => {
  const [permissionForm] = Form.useForm();
  const [limitForm] = Form.useForm();
  const [feeForm] = Form.useForm();
  const [timeForm] = Form.useForm();

  // 权限设置初始值
  const permissionInitialValues: PermissionFormValues = {
    fundPermission: true,
    optionPermission: true,
    contractPermission: true,
    shContractPermission: true,
    hkContractPermission: true,
  };

  // 交易额度限制初始值
  const limitInitialValues: LimitFormValues = {
    dailyLimit: 50000,
    singleLimit: 10000,
    monthlyLimit: 1000000,
  };

  // 手续费设置初始值
  const feeInitialValues: FeeFormValues = {
    fundFee: 0.001,
    optionFee: 0.002,
    contractFee: 0.0005,
  };

  // 交易时间设置初始值
  const timeInitialValues: TimeFormValues = {
    fundTrading: true,
    optionTrading: true,
    contractTrading: true,
  };

  // 处理权限设置提交
  const handlePermissionSubmit = (values: PermissionFormValues) => {
    console.log('权限设置:', values);
    message.success('权限设置已保存');
  };

  // 处理交易额度限制提交
  const handleLimitSubmit = (values: LimitFormValues) => {
    console.log('交易额度限制:', values);
    message.success('交易额度限制已保存');
  };

  // 处理手续费设置提交
  const handleFeeSubmit = (values: FeeFormValues) => {
    console.log('手续费设置:', values);
    message.success('手续费设置已保存');
  };

  // 处理交易时间设置提交
  const handleTimeSubmit = (values: TimeFormValues) => {
    console.log('交易时间设置:', values);
    message.success('交易时间设置已保存');
  };

  // 暂停交易
  const pauseTrading = (type: string) => {
    message.info(`${type}交易已暂停`);
  };

  // 恢复交易
  const resumeTrading = (type: string) => {
    message.info(`${type}交易已恢复`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部导航栏 */}
      <TopNavigationBar title="交易管理" showBackButton={true} showHomeButton={true} />

      <div className="pt-16 px-4">
        <Tabs defaultActiveKey="1">
          {/* 权限设置 */}
          <TabPane
            tab={
              <span>
                <SettingOutlined />
                权限设置
              </span>
            }
            key="1"
          >
            <Card className="shadow-sm mb-6">
              <h3 className="text-lg font-semibold mb-4">交易功能权限</h3>
              <Form
                form={permissionForm}
                layout="vertical"
                initialValues={permissionInitialValues}
                onFinish={handlePermissionSubmit}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Form.Item name="fundPermission" label="基金交易权限" valuePropName="checked">
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="optionPermission" label="期权交易权限" valuePropName="checked">
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="contractPermission"
                      label="合约交易权限"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="shContractPermission"
                      label="沪深合约权限"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="hkContractPermission"
                      label="港股合约权限"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    保存权限设置
                  </Button>
                </Form.Item>
              </Form>
            </Card>

            <Card className="shadow-sm">
              <h3 className="text-lg font-semibold mb-4">批量权限操作</h3>
              <p className="text-gray-600 mb-4">为不同会员组设置交易功能权限</p>
              <Button type="primary" className="mr-2">
                为高净值会员开放更多权限
              </Button>
              <Button>为普通会员限制复杂交易功能</Button>
            </Card>
          </TabPane>

          {/* 交易额度限制 */}
          <TabPane
            tab={
              <span>
                <DollarCircleOutlined />
                额度限制
              </span>
            }
            key="2"
          >
            <Card className="shadow-sm">
              <h3 className="text-lg font-semibold mb-4">交易额度限制</h3>
              <Form
                form={limitForm}
                layout="vertical"
                initialValues={limitInitialValues}
                onFinish={handleLimitSubmit}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Form.Item name="dailyLimit" label="每日交易额度上限（元）">
                      <InputNumber
                        formatter={(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value!.replace(/¥\s?|(,*)/g, '') as string}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="singleLimit" label="单笔交易额度上限（元）">
                      <InputNumber
                        formatter={(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value!.replace(/¥\s?|(,*)/g, '') as string}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="monthlyLimit" label="每月交易额度上限（元）">
                      <InputNumber
                        formatter={(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value!.replace(/¥\s?|(,*)/g, '') as string}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    保存额度限制
                  </Button>
                </Form.Item>
              </Form>

              <Divider />

              <h4 className="text-md font-semibold mb-3">会员等级额度设置</h4>
              <Collapse>
                <Panel header="青铜会员额度" key="1">
                  <p>每日交易额度：¥10,000</p>
                  <p>单笔交易额度：¥2,000</p>
                </Panel>
                <Panel header="白银会员额度" key="2">
                  <p>每日交易额度：¥50,000</p>
                  <p>单笔交易额度：¥10,000</p>
                </Panel>
                <Panel header="黄金会员额度" key="3">
                  <p>每日交易额度：¥200,000</p>
                  <p>单笔交易额度：¥50,000</p>
                </Panel>
                <Panel header="铂金会员额度" key="4">
                  <p>每日交易额度：¥1,000,000</p>
                  <p>单笔交易额度：¥200,000</p>
                </Panel>
              </Collapse>
            </Card>
          </TabPane>

          {/* 交易规则调整 */}
          <TabPane
            tab={
              <span>
                <SettingOutlined />
                规则调整
              </span>
            }
            key="3"
          >
            <Card className="shadow-sm mb-6">
              <h3 className="text-lg font-semibold mb-4">手续费设置</h3>
              <Form
                form={feeForm}
                layout="vertical"
                initialValues={feeInitialValues}
                onFinish={handleFeeSubmit}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Form.Item name="fundFee" label="基金交易手续费率">
                      <InputNumber
                        formatter={(value) => `${value}%`}
                        parser={(value) => value!.replace('%', '') as string}
                        style={{ width: '100%' }}
                        step={0.001}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="optionFee" label="期权交易手续费率">
                      <InputNumber
                        formatter={(value) => `${value}%`}
                        parser={(value) => value!.replace('%', '') as string}
                        style={{ width: '100%' }}
                        step={0.001}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="contractFee" label="合约交易手续费率">
                      <InputNumber
                        formatter={(value) => `${value}%`}
                        parser={(value) => value!.replace('%', '') as string}
                        style={{ width: '100%' }}
                        step={0.001}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    保存手续费设置
                  </Button>
                </Form.Item>
              </Form>
            </Card>

            <Card className="shadow-sm">
              <h3 className="text-lg font-semibold mb-4">交易时间调整</h3>
              <Form
                form={timeForm}
                layout="vertical"
                initialValues={timeInitialValues}
                onFinish={handleTimeSubmit}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Form.Item name="fundTrading" label="基金交易时间" valuePropName="checked">
                      <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="optionTrading" label="期权交易时间" valuePropName="checked">
                      <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="contractTrading" label="合约交易时间" valuePropName="checked">
                      <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    保存时间设置
                  </Button>
                </Form.Item>
              </Form>

              <Divider />

              <h4 className="text-md font-semibold mb-3">特殊时段设置</h4>
              <p className="text-gray-600 mb-3">设置特定交易功能的交易时段</p>
              <Button type="primary" className="mr-2">
                延长二元期权交易时段
              </Button>
              <Button>设置机构席位优先交易时段</Button>
            </Card>
          </TabPane>

          {/* 交易监控与干预 */}
          <TabPane
            tab={
              <span>
                <AlertOutlined />
                交易监控
              </span>
            }
            key="4"
          >
            <Card className="shadow-sm mb-6">
              <h3 className="text-lg font-semibold mb-4">实时交易监控</h3>
              <p className="text-gray-600 mb-4">通过智能预警系统对异常交易进行实时报警</p>

              <Row gutter={[16, 16]} className="mb-4">
                <Col span={8}>
                  <Card className="bg-blue-50">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">24</div>
                      <div className="text-gray-600">今日交易笔数</div>
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card className="bg-green-50">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">¥1,250,000</div>
                      <div className="text-gray-600">今日交易总额</div>
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card className="bg-red-50">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">3</div>
                      <div className="text-gray-600">异常交易数</div>
                    </div>
                  </Card>
                </Col>
              </Row>

              <h4 className="text-md font-semibold mb-3">异常交易列表</h4>
              <List
                dataSource={[
                  {
                    id: 1,
                    type: '大额交易',
                    amount: '¥500,000',
                    user: 'testuser01',
                    time: '14:30:25',
                  },
                  {
                    id: 2,
                    type: '频繁撤单',
                    amount: '¥50,000',
                    user: 'testuser02',
                    time: '11:15:42',
                  },
                  {
                    id: 3,
                    type: '价格异常',
                    amount: '¥120,000',
                    user: 'testuser03',
                    time: '09:45:18',
                  },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={`${item.type} - ${item.user}`}
                      description={`金额: ${item.amount} | 时间: ${item.time}`}
                    />
                    <div>
                      <Button type="primary" size="small" className="mr-2">
                        查看详情
                      </Button>
                      <Button size="small">干预处理</Button>
                    </div>
                  </List.Item>
                )}
              />
            </Card>

            <Card className="shadow-sm">
              <h3 className="text-lg font-semibold mb-4">交易暂停与恢复</h3>
              <p className="text-gray-600 mb-4">
                在遇到重大市场波动、系统维护或其他特殊情况时，可暂停部分或全部交易区域的交易活动
              </p>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">基金交易</h4>
                        <p className="text-gray-500 text-sm">状态: 运行中</p>
                      </div>
                      <div>
                        <Button
                          type="primary"
                          danger
                          icon={<PauseCircleOutlined />}
                          onClick={() => pauseTrading('基金')}
                        >
                          暂停
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">期权交易</h4>
                        <p className="text-gray-500 text-sm">状态: 运行中</p>
                      </div>
                      <div>
                        <Button
                          type="primary"
                          danger
                          icon={<PauseCircleOutlined />}
                          onClick={() => pauseTrading('期权')}
                        >
                          暂停
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">合约交易</h4>
                        <p className="text-gray-500 text-sm">状态: 运行中</p>
                      </div>
                      <div>
                        <Button
                          type="primary"
                          danger
                          icon={<PauseCircleOutlined />}
                          onClick={() => pauseTrading('合约')}
                        >
                          暂停
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">全部交易</h4>
                        <p className="text-gray-500 text-sm">状态: 运行中</p>
                      </div>
                      <div>
                        <Button
                          type="primary"
                          danger
                          icon={<PauseCircleOutlined />}
                          onClick={() => pauseTrading('全部')}
                        >
                          全部暂停
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>

              <Divider />

              <div className="text-center">
                <Button
                  type="primary"
                  icon={<PlayCircleOutlined />}
                  size="large"
                  onClick={() => resumeTrading('所有')}
                >
                  恢复所有交易
                </Button>
              </div>
            </Card>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default TradeManagement;
