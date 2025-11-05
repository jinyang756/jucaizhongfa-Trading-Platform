import React, { useState, useMemo } from 'react';
import TopNavigationBar from '../components/TopNavigationBar';
import ManagerNavigationBar from '../components/ManagerNavigationBar';
import {
  LockOutlined,
  SettingOutlined,
  FileSearchOutlined,
  DownloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Switch,
  Button,
  Tabs,
  Select,
  DatePicker,
  Table,
  Space,
  Tag,
  Modal,
  message,
  Collapse,
} from 'antd';

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface LogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  target: string;
  result: string;
  ip: string;
}

const SystemSettings: React.FC = () => {
  // 移除未使用的变量
  // const navigate = useNavigate();
  // const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('1');
  const [passwordForm] = Form.useForm();
  const [ipForm] = Form.useForm();
  const [tradeForm] = Form.useForm();
  const [notificationForm] = Form.useForm();
  const [logSearchForm] = Form.useForm();
  const [operationLogs, setOperationLogs] = useState<LogEntry[]>([]);
  const [systemLogs, setSystemLogs] = useState<LogEntry[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // 模拟日志数据
  const mockOperationLogs = useMemo(
    () => [
      {
        id: '1',
        timestamp: '2023-05-15 14:30:22',
        user: 'admin001',
        action: '密码策略调整',
        target: '系统参数',
        result: '成功',
        ip: '192.168.1.100',
      },
      {
        id: '2',
        timestamp: '2023-05-14 09:15:47',
        user: 'admin001',
        action: 'IP访问限制设置',
        target: '安全设置',
        result: '成功',
        ip: '192.168.1.100',
      },
      {
        id: '3',
        timestamp: '2023-05-13 16:22:18',
        user: 'admin001',
        action: '交易参数调整',
        target: '基金交易模块',
        result: '成功',
        ip: '192.168.1.100',
      },
    ],
    [],
  );

  const mockSystemLogs = useMemo(
    () => [
      {
        id: '1',
        timestamp: '2023-05-15 14:30:25',
        user: '系统',
        action: '参数更新',
        target: '交易模块',
        result: '成功',
        ip: '127.0.0.1',
      },
      {
        id: '2',
        timestamp: '2023-05-15 14:30:20',
        user: '系统',
        action: '配置保存',
        target: '安全模块',
        result: '成功',
        ip: '127.0.0.1',
      },
      {
        id: '3',
        timestamp: '2023-05-14 09:15:50',
        user: '系统',
        action: '权限更新',
        target: '访问控制',
        result: '成功',
        ip: '127.0.0.1',
      },
    ],
    [],
  );

  // 初始化日志数据
  React.useEffect(() => {
    setOperationLogs(mockOperationLogs);
    setSystemLogs(mockSystemLogs);
  }, [mockOperationLogs, mockSystemLogs]);

  // 安全设置 - 密码策略表单提交
  const onFinishPassword = (values: Record<string, unknown>) => {
    console.log('密码策略设置:', values);
    message.success('密码策略设置已保存');
  };

  // 安全设置 - IP访问限制表单提交
  const onFinishIP = (values: Record<string, unknown>) => {
    console.log('IP访问限制设置:', values);
    message.success('IP访问限制设置已保存');
  };

  // 系统参数配置 - 交易参数表单提交
  const onFinishTrade = (values: Record<string, unknown>) => {
    console.log('交易参数设置:', values);
    message.success('交易参数设置已保存');
  };

  // 系统参数配置 - 通知参数表单提交
  const onFinishNotification = (values: Record<string, unknown>) => {
    console.log('通知参数设置:', values);
    message.success('通知参数设置已保存');
  };

  // 日志管理 - 搜索操作日志
  const onSearchOperationLogs = (values: Record<string, unknown>) => {
    console.log('搜索操作日志:', values);
    message.success('日志搜索完成');
  };

  // 日志管理 - 搜索系统日志
  const onSearchSystemLogs = (values: Record<string, unknown>) => {
    console.log('搜索系统日志:', values);
    message.success('日志搜索完成');
  };

  // 导出日志
  const exportLogs = (type: string) => {
    message.success(`正在导出${type}日志...`);
    // 模拟导出操作
    setTimeout(() => {
      message.success(`${type}日志导出成功`);
    }, 1000);
  };

  // 查看日志详情
  const viewLogDetail = (record: LogEntry) => {
    setModalContent(`日志详情：
ID: ${record.id}
时间: ${record.timestamp}
操作人: ${record.user}
操作: ${record.action}
对象: ${record.target}
结果: ${record.result}
IP地址: ${record.ip}`);
    setIsModalVisible(true);
  };

  // 操作日志列定义
  const operationLogColumns = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 180,
    },
    {
      title: '操作人',
      dataIndex: 'user',
      key: 'user',
      width: 120,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 150,
    },
    {
      title: '对象',
      dataIndex: 'target',
      key: 'target',
      width: 150,
    },
    {
      title: '结果',
      dataIndex: 'result',
      key: 'result',
      width: 100,
      render: (text: string) => <Tag color={text === '成功' ? 'green' : 'red'}>{text}</Tag>,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_: unknown, record: LogEntry) => (
        <Space size="middle">
          <a onClick={() => viewLogDetail(record)}>详情</a>
        </Space>
      ),
    },
  ];

  // 系统日志列定义
  const systemLogColumns = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 180,
    },
    {
      title: '模块',
      dataIndex: 'user',
      key: 'user',
      width: 120,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 150,
    },
    {
      title: '对象',
      dataIndex: 'target',
      key: 'target',
      width: 150,
    },
    {
      title: '结果',
      dataIndex: 'result',
      key: 'result',
      width: 100,
      render: (text: string) => <Tag color={text === '成功' ? 'green' : 'red'}>{text}</Tag>,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_: unknown, record: LogEntry) => (
        <Space size="middle">
          <a onClick={() => viewLogDetail(record)}>详情</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部导航栏 */}
      <TopNavigationBar title="系统设置" showBackButton={true} showHomeButton={true} />

      <div className="pt-16 px-4">
        <Tabs activeKey={activeTab} onChange={setActiveTab} type="card">
          {/* 安全设置 */}
          <TabPane
            tab={
              <span>
                <LockOutlined />
                安全设置
              </span>
            }
            key="1"
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card title="密码策略设置" className="shadow-sm">
                  <Form
                    form={passwordForm}
                    layout="vertical"
                    onFinish={onFinishPassword}
                    initialValues={{
                      minLength: 8,
                      requireNumbers: true,
                      requireLetters: true,
                      requireSpecialChars: true,
                      updateInterval: 90,
                      maxFailedAttempts: 5,
                      lockoutDuration: 30,
                    }}
                  >
                    <Form.Item
                      name="minLength"
                      label="最小密码长度"
                      rules={[{ required: true, message: '请输入最小密码长度' }]}
                    >
                      <InputNumber min={6} max={20} addonAfter="位" />
                    </Form.Item>

                    <Form.Item name="requireNumbers" valuePropName="checked">
                      <Switch /> 必须包含数字
                    </Form.Item>

                    <Form.Item name="requireLetters" valuePropName="checked">
                      <Switch /> 必须包含字母
                    </Form.Item>

                    <Form.Item name="requireSpecialChars" valuePropName="checked">
                      <Switch /> 必须包含特殊字符
                    </Form.Item>

                    <Form.Item
                      name="updateInterval"
                      label="密码更新间隔"
                      rules={[{ required: true, message: '请输入密码更新间隔' }]}
                    >
                      <InputNumber min={30} max={365} addonAfter="天" />
                    </Form.Item>

                    <Form.Item
                      name="maxFailedAttempts"
                      label="最大密码错误次数"
                      rules={[{ required: true, message: '请输入最大密码错误次数' }]}
                    >
                      <InputNumber min={1} max={10} addonAfter="次" />
                    </Form.Item>

                    <Form.Item
                      name="lockoutDuration"
                      label="账号锁定时长"
                      rules={[{ required: true, message: '请输入账号锁定时长' }]}
                    >
                      <InputNumber min={1} max={1440} addonAfter="分钟" />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        保存设置
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>

              <Col span={24}>
                <Card title="IP访问限制" className="shadow-sm">
                  <Form
                    form={ipForm}
                    layout="vertical"
                    onFinish={onFinishIP}
                    initialValues={{
                      enableIPRestriction: true,
                      allowedIPs: ['192.168.1.0/24', '10.0.0.0/8'],
                    }}
                  >
                    <Form.Item name="enableIPRestriction" valuePropName="checked">
                      <Switch /> 启用IP访问限制
                    </Form.Item>

                    <Form.Item
                      name="allowedIPs"
                      label="允许访问的IP地址段"
                      rules={[{ required: true, message: '请输入允许访问的IP地址段' }]}
                    >
                      <Select mode="tags" placeholder="请输入IP地址段，如192.168.1.0/24">
                        <Option value="192.168.1.0/24">192.168.1.0/24</Option>
                        <Option value="10.0.0.0/8">10.0.0.0/8</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        保存设置
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
            </Row>
          </TabPane>

          {/* 系统参数配置 */}
          <TabPane
            tab={
              <span>
                <SettingOutlined />
                系统参数配置
              </span>
            }
            key="2"
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card title="交易参数调整" className="shadow-sm">
                  <Form
                    form={tradeForm}
                    layout="vertical"
                    onFinish={onFinishTrade}
                    initialValues={{
                      fundCalculationMethod: 'method1',
                      optionPricingModel: 'model1',
                      ipoAllocationAlgorithm: 'algorithm1',
                    }}
                  >
                    <Form.Item
                      name="fundCalculationMethod"
                      label="基金收益计算方法"
                      rules={[{ required: true, message: '请选择基金收益计算方法' }]}
                    >
                      <Select>
                        <Option value="method1">标准收益率计算法</Option>
                        <Option value="method2">年化复合收益率法</Option>
                        <Option value="method3">风险调整收益率法</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="optionPricingModel"
                      label="期权定价模型"
                      rules={[{ required: true, message: '请选择期权定价模型' }]}
                    >
                      <Select>
                        <Option value="model1">Black-Scholes模型</Option>
                        <Option value="model2">二叉树模型</Option>
                        <Option value="model3">蒙特卡洛模拟</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="ipoAllocationAlgorithm"
                      label="新股申购中签算法"
                      rules={[{ required: true, message: '请选择新股申购中签算法' }]}
                    >
                      <Select>
                        <Option value="algorithm1">抽签算法</Option>
                        <Option value="algorithm2">按资金比例分配</Option>
                        <Option value="algorithm3">综合评分算法</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        保存设置
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>

              <Col span={24}>
                <Card title="通知参数设置" className="shadow-sm">
                  <Form
                    form={notificationForm}
                    layout="vertical"
                    onFinish={onFinishNotification}
                    initialValues={{
                      notificationChannels: ['sms', 'email'],
                      dailyLimit: 10,
                      priorityChannel: 'sms',
                    }}
                  >
                    <Form.Item
                      name="notificationChannels"
                      label="通知渠道"
                      rules={[{ required: true, message: '请选择通知渠道' }]}
                    >
                      <Select mode="multiple" placeholder="请选择通知渠道">
                        <Option value="sms">短信</Option>
                        <Option value="email">邮件</Option>
                        <Option value="inapp">站内信</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="dailyLimit"
                      label="每日通知次数上限"
                      rules={[{ required: true, message: '请输入每日通知次数上限' }]}
                    >
                      <InputNumber min={1} max={100} addonAfter="次" />
                    </Form.Item>

                    <Form.Item
                      name="priorityChannel"
                      label="重要通知优先渠道"
                      rules={[{ required: true, message: '请选择重要通知优先渠道' }]}
                    >
                      <Select>
                        <Option value="sms">短信</Option>
                        <Option value="email">邮件</Option>
                        <Option value="inapp">站内信</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        保存设置
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
            </Row>
          </TabPane>

          {/* 日志管理 */}
          <TabPane
            tab={
              <span>
                <FileSearchOutlined />
                日志管理
              </span>
            }
            key="3"
          >
            <Collapse defaultActiveKey={['1', '2']} expandIconPosition="end">
              <Panel header="操作日志查看" key="1">
                <Form
                  form={logSearchForm}
                  layout="inline"
                  onFinish={onSearchOperationLogs}
                  className="mb-4"
                >
                  <Form.Item name="operationUser" label="操作人">
                    <Input placeholder="请输入操作人" />
                  </Form.Item>

                  <Form.Item name="operationType" label="操作类型">
                    <Select placeholder="请选择操作类型" style={{ width: 150 }}>
                      <Option value="register">账号注册</Option>
                      <Option value="password">密码重置</Option>
                      <Option value="permission">权限调整</Option>
                      <Option value="trade">交易设置</Option>
                      <Option value="system">系统配置</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name="operationTime" label="操作时间">
                    <RangePicker />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                      搜索
                    </Button>
                    <Button
                      className="ml-2"
                      onClick={() => exportLogs('操作')}
                      icon={<DownloadOutlined />}
                    >
                      导出日志
                    </Button>
                  </Form.Item>
                </Form>

                <Table
                  dataSource={operationLogs}
                  columns={operationLogColumns}
                  pagination={{ pageSize: 5 }}
                  scroll={{ x: 900 }}
                  rowKey="id"
                />
              </Panel>

              <Panel header="系统日志查看" key="2">
                <Form
                  form={logSearchForm}
                  layout="inline"
                  onFinish={onSearchSystemLogs}
                  className="mb-4"
                >
                  <Form.Item name="systemModule" label="系统模块">
                    <Select placeholder="请选择系统模块" style={{ width: 150 }}>
                      <Option value="trade">交易模块</Option>
                      <Option value="user">用户模块</Option>
                      <Option value="security">安全模块</Option>
                      <Option value="database">数据库模块</Option>
                      <Option value="network">网络模块</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name="logLevel" label="日志级别">
                    <Select placeholder="请选择日志级别" style={{ width: 120 }}>
                      <Option value="info">信息</Option>
                      <Option value="warning">警告</Option>
                      <Option value="error">错误</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name="systemTime" label="时间范围">
                    <RangePicker />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                      搜索
                    </Button>
                    <Button
                      className="ml-2"
                      onClick={() => exportLogs('系统')}
                      icon={<DownloadOutlined />}
                    >
                      导出日志
                    </Button>
                  </Form.Item>
                </Form>

                <Table
                  dataSource={systemLogs}
                  columns={systemLogColumns}
                  pagination={{ pageSize: 5 }}
                  scroll={{ x: 900 }}
                  rowKey="id"
                />
              </Panel>
            </Collapse>
          </TabPane>
        </Tabs>
      </div>

      {/* 底部导航栏 */}
      <ManagerNavigationBar />

      {/* 日志详情模态框 */}
      <Modal
        title="日志详情"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            关闭
          </Button>,
        ]}
      >
        <pre>{modalContent}</pre>
      </Modal>
    </div>
  );
};

export default SystemSettings;
