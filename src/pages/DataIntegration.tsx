import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../store/useAuth';
import { supabase, supabaseEnabled } from '../utils/supabase';
import TopNavigationBar from '../components/TopNavigationBar';
import ManagerNavigationBar from '../components/ManagerNavigationBar';
import {
  DownloadOutlined,
  SearchOutlined,
  FilterOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Table,
  Tag,
  Form,
  Select,
  DatePicker,
  message,
  Tabs,
  Dropdown,
  Statistic,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Dayjs } from 'dayjs';
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  LineChart as ReLineChart,
  Line,
} from 'recharts';
import { exportToExcel } from '../utils/exportExcel';

const { TabPane } = Tabs;

interface MemberData {
  id: number;
  username: string;
  email?: string;
  phone?: string;
  related_admin: string;
  register_date: string;
  last_login?: string;
  member_level: 'bronze' | 'silver' | 'gold' | 'platinum';
  risk_level: 'low' | 'medium' | 'high';
  total_investment: number;
  total_trades: number;
  risk_score?: number;
}

interface DataReport {
  date: string;
  total_members: number;
  active_members: number;
  total_trades: number;
  total_volume: number;
}

const DataIntegration: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [members, setMembers] = useState<MemberData[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<MemberData[]>([]);
  const [loading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [memberLevel, setMemberLevel] = useState<string | undefined>(undefined);
  const [riskLevel, setRiskLevel] = useState<string | undefined>(undefined);
  const [reports] = useState<DataReport[]>([
    {
      date: '2024-01-01',
      total_members: 100,
      active_members: 60,
      total_trades: 200,
      total_volume: 1000000,
    },
    {
      date: '2024-02-01',
      total_members: 120,
      active_members: 75,
      total_trades: 250,
      total_volume: 1250000,
    },
    {
      date: '2024-03-01',
      total_members: 140,
      active_members: 90,
      total_trades: 300,
      total_volume: 1500000,
    },
    {
      date: '2024-04-01',
      total_members: 160,
      active_members: 100,
      total_trades: 350,
      total_volume: 1750000,
    },
    {
      date: '2024-05-01',
      total_members: 180,
      active_members: 120,
      total_trades: 400,
      total_volume: 2000000,
    },
    {
      date: '2024-06-01',
      total_members: 200,
      active_members: 140,
      total_trades: 450,
      total_volume: 2250000,
    },
  ]);
  const [activeTab, setActiveTab] = useState('1');

  // 加载数据
  const loadMembers = useCallback(async () => {
    try {
      if (!supabaseEnabled) {
        // 模拟数据
        const mockMembers: MemberData[] = [
          {
            id: 1,
            username: 'testuser01',
            email: 'test01@example.com',
            phone: '13800138001',
            related_admin: 'admin001',
            register_date: '2024-01-15',
            last_login: '2024-11-05',
            member_level: 'gold',
            risk_level: 'medium',
            total_investment: 250000.0,
            total_trades: 128,
          },
          {
            id: 2,
            username: 'testuser02',
            email: 'test02@example.com',
            phone: '13800138002',
            related_admin: 'admin001',
            register_date: '2024-03-22',
            last_login: '2024-11-04',
            member_level: 'silver',
            risk_level: 'low',
            total_investment: 80000.0,
            total_trades: 45,
          },
          {
            id: 3,
            username: 'testuser03',
            email: 'test03@example.com',
            phone: '13800138003',
            related_admin: 'admin001',
            register_date: '2024-05-10',
            last_login: '2024-10-28',
            member_level: 'bronze',
            risk_level: 'high',
            total_investment: 25000.0,
            total_trades: 12,
          },
        ];
        setMembers(mockMembers);
        setFilteredMembers(mockMembers);
      } else {
        // 从数据库获取数据
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('related_admin', currentUser?.username || '')
          .order('id');

        if (error) throw error;

        const formattedMembers: MemberData[] = (data || []).map((user) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          related_admin: user.related_admin,
          register_date: user.created_at
            ? new Date(user.created_at).toISOString().split('T')[0]
            : '',
          last_login: user.last_login,
          member_level: user.member_level || 'bronze',
          risk_level: user.risk_level || 'low',
          total_investment: user.total_investment || 0,
          total_trades: user.total_trades || 0,
          risk_score: user.risk_score || 0,
        }));

        setMembers(formattedMembers);
        setFilteredMembers(formattedMembers);
      }
    } catch (e) {
      console.error(e);
      message.error('加载会员数据失败');
    }
  }, [currentUser?.username]);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  // 筛选功能
  useEffect(() => {
    let filtered = members;

    // 文本搜索
    if (searchText) {
      filtered = filtered.filter((member) =>
        member.username.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    // 会员等级筛选
    if (memberLevel) {
      filtered = filtered.filter((member) => member.member_level === memberLevel);
    }

    // 风险等级筛选
    if (riskLevel) {
      filtered = filtered.filter((member) => member.risk_level === riskLevel);
    }

    // 日期范围筛选
    if (dateRange[0] && dateRange[1]) {
      const startDate = dateRange[0].toDate().getTime();
      const endDate = dateRange[1].toDate().getTime();
      filtered = filtered.filter((member) => {
        const registerDate = new Date(member.register_date).getTime();
        return registerDate >= startDate && registerDate <= endDate;
      });
    }

    setFilteredMembers(filtered);
  }, [searchText, memberLevel, riskLevel, dateRange, members]);

  // 表格列定义
  const columns: ColumnsType<MemberData> = [
    {
      title: '会员ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: '注册日期',
      dataIndex: 'register_date',
      key: 'register_date',
    },
    {
      title: '总交易次数',
      dataIndex: 'total_trades',
      key: 'total_trades',
      sorter: (a, b) => a.total_trades - b.total_trades,
    },
    {
      title: '总投资额',
      dataIndex: 'total_investment',
      key: 'total_investment',
      render: (amount) => `¥${amount.toLocaleString()}`,
      sorter: (a, b) => a.total_investment - b.total_investment,
    },
    {
      title: '会员等级',
      dataIndex: 'member_level',
      key: 'member_level',
      width: 120,
      render: (level: MemberData['member_level']) => {
        const levelMap: Record<MemberData['member_level'], { color: string; text: string }> = {
          bronze: { color: 'gray', text: '青铜' },
          silver: { color: 'silver', text: '白银' },
          gold: { color: 'gold', text: '黄金' },
          platinum: { color: 'purple', text: '铂金' },
        };
        const levelInfo = levelMap[level] || levelMap.bronze;
        return <Tag color={levelInfo.color}>{levelInfo.text}</Tag>;
      },
    },
    {
      title: '风险等级',
      dataIndex: 'risk_level',
      key: 'risk_level',
      width: 100,
      render: (level: MemberData['risk_level']) => {
        const levelMap: Record<MemberData['risk_level'], { color: string; text: string }> = {
          low: { color: 'green', text: '低风险' },
          medium: { color: 'orange', text: '中风险' },
          high: { color: 'red', text: '高风险' },
        };
        const levelInfo = levelMap[level] || levelMap.low;
        return <Tag color={levelInfo.color}>{levelInfo.text}</Tag>;
      },
    },
  ];

  // 导出数据
  const exportData = (format: string) => {
    if (filteredMembers.length === 0) {
      message.warning('没有可导出的数据');
      return;
    }

    // 定义导出列
    const exportColumns = [
      { key: 'username', header: '用户名' },
      { key: 'email', header: '邮箱' },
      { key: 'phone', header: '手机号' },
      { key: 'register_date', header: '注册日期' },
      { key: 'member_level', header: '会员等级' },
      { key: 'risk_level', header: '风险等级' },
      { key: 'total_investment', header: '总投资额' },
      { key: 'total_trades', header: '总交易数' },
    ];

    exportToExcel(filteredMembers, exportColumns, {
      filename: `会员数据_${new Date().toISOString().slice(0, 10)}.${format}`,
    });
  };

  // 图表数据
  const memberLevelData = [
    { name: '青铜会员', value: members.filter((m) => m.member_level === 'bronze').length },
    { name: '白银会员', value: members.filter((m) => m.member_level === 'silver').length },
    { name: '黄金会员', value: members.filter((m) => m.member_level === 'gold').length },
    { name: '铂金会员', value: members.filter((m) => m.member_level === 'platinum').length },
  ];

  const COLORS = ['#9CA3AF', '#C0C0C0', '#FBBF24', '#8B5CF6'];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部导航栏 */}
      <TopNavigationBar title="数据集成" showBackButton={true} showHomeButton={true} />
      <ManagerNavigationBar />

      <div className="pt-16 px-4">
        <Tabs defaultActiveKey="1" activeKey={activeTab} onChange={setActiveTab}>
          {/* 账号数据筛选 */}
          <TabPane
            tab={
              <span>
                <FilterOutlined />
                账号数据筛选
              </span>
            }
            key="1"
          >
            <Card className="mb-6 shadow-sm">
              <Form layout="vertical">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item label="搜索会员">
                      <Input
                        placeholder="搜索用户名"
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item label="注册日期范围">
                      <DatePicker.RangePicker
                        onChange={(dates) => setDateRange(dates || [null, null])}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item label="会员等级">
                      <Select
                        placeholder="请选择会员等级"
                        value={memberLevel}
                        onChange={setMemberLevel}
                        allowClear
                      >
                        <Select.Option value="bronze">青铜会员</Select.Option>
                        <Select.Option value="silver">白银会员</Select.Option>
                        <Select.Option value="gold">黄金会员</Select.Option>
                        <Select.Option value="platinum">铂金会员</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item label="风险等级">
                      <Select
                        placeholder="请选择风险等级"
                        value={riskLevel}
                        onChange={setRiskLevel}
                        allowClear
                      >
                        <Select.Option value="low">低风险</Select.Option>
                        <Select.Option value="medium">中风险</Select.Option>
                        <Select.Option value="high">高风险</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>

            <Card className="shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">会员数据列表</h3>
                <Dropdown
                  trigger={['click']}
                  menu={{
                    items: [
                      { key: '1', label: '导出为Excel', onClick: () => exportData('Excel') },
                      { key: '2', label: '导出为CSV', onClick: () => exportData('CSV') },
                      { key: '3', label: '导出为PDF', onClick: () => exportData('PDF') },
                    ],
                  }}
                >
                  <Button icon={<DownloadOutlined />}>导出数据</Button>
                </Dropdown>
              </div>
              <Table
                dataSource={filteredMembers}
                columns={columns}
                loading={loading}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                }}
                scroll={{ x: 1200 }}
              />
            </Card>
          </TabPane>

          {/* 数据报表生成 */}
          <TabPane
            tab={
              <span>
                <DownloadOutlined />
                数据报表
              </span>
            }
            key="2"
          >
            <Card className="mb-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">数据统计</h3>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title="总会员数"
                      value={members.length}
                      valueStyle={{ color: '#3f83f8' }}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title="活跃会员"
                      value={members.filter((m) => m.total_trades > 0).length}
                      valueStyle={{ color: '#10b981' }}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title="总交易次数"
                      value={members.reduce((sum, m) => sum + m.total_trades, 0)}
                      valueStyle={{ color: '#f59e0b' }}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title="总投资额"
                      value={members.reduce((sum, m) => sum + m.total_investment, 0)}
                      precision={2}
                      formatter={(value) => `¥${Number(value).toLocaleString()}`}
                      valueStyle={{ color: '#ef4444' }}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card className="shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">会员等级分布</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RePieChart>
                      <Pie
                        data={memberLevelData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={(props) => {
                          const percent = typeof props.percent === 'number' ? props.percent : 0;
                          return `${props.name}: ${(percent * 100).toFixed(0)}%`;
                        }}
                      >
                        {memberLevelData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, '会员数']} />
                      <Legend />
                    </RePieChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
              <Col span={12}>
                <Card className="shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">风险评分分布</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={members.map((m) => ({
                        username: m.username,
                        risk_score: m.risk_score,
                      }))}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="username" />
                      <YAxis domain={[0, 1]} />
                      <Tooltip
                        formatter={(value) => [`${(Number(value) * 100).toFixed(0)}%`, '风险评分']}
                      />
                      <Legend />
                      <Bar dataKey="risk_score" name="风险评分" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
            </Row>

            <Card className="shadow-sm mt-4">
              <h3 className="text-lg font-semibold mb-4">交易趋势</h3>
              <ResponsiveContainer width="100%" height={400}>
                <ReLineChart data={reports} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === 'total_volume') {
                        return [`¥${Number(value).toLocaleString()}`, '交易额'];
                      }
                      return [
                        value,
                        name === 'total_members'
                          ? '总会员数'
                          : name === 'active_members'
                            ? '活跃会员'
                            : '总交易次数',
                      ];
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="total_members"
                    name="总会员数"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="active_members"
                    name="活跃会员"
                    stroke="#82ca9d"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="total_trades"
                    name="总交易次数"
                    stroke="#ffc658"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="total_volume"
                    name="交易额"
                    stroke="#ff7300"
                  />
                </ReLineChart>
              </ResponsiveContainer>
            </Card>
          </TabPane>

          {/* 数据可视化展示 */}
          <TabPane
            tab={
              <span>
                <BarChartOutlined />
                数据可视化
              </span>
            }
            key="3"
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card className="shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">投资金额分布</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={members.map((m) => ({
                        username: m.username,
                        investment: m.total_investment,
                      }))}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="username" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`¥${Number(value).toLocaleString()}`, '投资金额']}
                      />
                      <Legend />
                      <Bar dataKey="investment" name="投资金额" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
              <Col span={12}>
                <Card className="shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">交易次数分布</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={members.map((m) => ({ username: m.username, trades: m.total_trades }))}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="username" />
                      <YAxis />
                      <Tooltip formatter={(value) => [value, '交易次数']} />
                      <Legend />
                      <Bar dataKey="trades" name="交易次数" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
            </Row>

            <Card className="shadow-sm mt-4">
              <h3 className="text-lg font-semibold mb-4">综合交易指标雷达图</h3>
              <div className="text-center text-gray-500">
                <p>综合交易指标雷达图功能待实现</p>
                <p className="mt-2">将展示不同会员的活跃度、风险偏好、资产规模等综合指标</p>
              </div>
            </Card>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default DataIntegration;
