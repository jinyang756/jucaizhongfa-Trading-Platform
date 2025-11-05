import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../store/useAuth';
import { supabase, supabaseEnabled } from '../utils/supabase';
import TopNavigationBar from '../components/TopNavigationBar';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DownloadOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Table,
  Tag,
  Modal,
  Form,
  Select,
  InputNumber,
  message,
  Space,
  Checkbox,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Member {
  id: number;
  username: string;
  email?: string;
  phone?: string;
  related_admin: string;
  current_balance: number;
  status: 'active' | 'inactive' | 'frozen';
  member_level: 'bronze' | 'silver' | 'gold' | 'platinum';
  register_date: string;
  last_login?: string;
  fund_permission: boolean;
  option_permission: boolean;
  contract_permission: boolean;
  total_trades: number;
  total_investment: number;
  risk_score: number;
}

const MemberManagement: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [form] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // 加载会员数据
  const loadMembers = useCallback(async () => {
    setLoading(true);
    try {
      if (!supabaseEnabled) {
        // 模拟数据
        const mockMembers: Member[] = [
          {
            id: 1,
            username: 'testuser01',
            email: 'test01@example.com',
            phone: '13800138001',
            related_admin: 'admin001',
            current_balance: 50000.0,
            status: 'active',
            member_level: 'gold',
            register_date: '2024-01-15',
            last_login: '2024-11-05',
            fund_permission: true,
            option_permission: true,
            contract_permission: true,
            total_trades: 128,
            total_investment: 250000.0,
            risk_score: 0.65,
          },
          {
            id: 2,
            username: 'testuser02',
            email: 'test02@example.com',
            phone: '13800138002',
            related_admin: 'admin001',
            current_balance: 30000.0,
            status: 'active',
            member_level: 'silver',
            register_date: '2024-03-22',
            last_login: '2024-11-04',
            fund_permission: true,
            option_permission: false,
            contract_permission: true,
            total_trades: 45,
            total_investment: 80000.0,
            risk_score: 0.42,
          },
          {
            id: 3,
            username: 'testuser03',
            email: 'test03@example.com',
            phone: '13800138003',
            related_admin: 'admin001',
            current_balance: 15000.0,
            status: 'frozen',
            member_level: 'bronze',
            register_date: '2024-05-10',
            last_login: '2024-10-28',
            fund_permission: true,
            option_permission: false,
            contract_permission: false,
            total_trades: 12,
            total_investment: 25000.0,
            risk_score: 0.28,
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

        // 修复类型问题
        const formattedMembers: Member[] = (data || []).map((user) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          related_admin: user.related_admin,
          current_balance: user.current_balance || 0,
          status: user.status || 'active',
          member_level: user.member_level || 'bronze',
          register_date: user.created_at
            ? new Date(user.created_at).toISOString().split('T')[0]
            : '',
          last_login: user.last_login,
          fund_permission: user.fund_permission || false,
          option_permission: user.option_permission || false,
          contract_permission: user.contract_permission || false,
          total_trades: user.total_trades || 0,
          total_investment: user.total_investment || 0,
          risk_score: user.risk_score || 0,
        }));

        setMembers(formattedMembers);
        setFilteredMembers(formattedMembers);
      }
    } catch (e) {
      console.error(e);
      message.error('加载会员数据失败');
    } finally {
      setLoading(false);
    }
  }, [currentUser?.username]);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  // 搜索功能
  useEffect(() => {
    if (!searchText) {
      setFilteredMembers(members);
    } else {
      const filtered = members.filter(
        (member) =>
          member.username.toLowerCase().includes(searchText.toLowerCase()) ||
          (member.email && member.email.toLowerCase().includes(searchText.toLowerCase())) ||
          (member.phone && member.phone.includes(searchText)),
      );
      setFilteredMembers(filtered);
    }
  }, [searchText, members]);

  // 表格列定义
  const columns: ColumnsType<Member> = [
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
      title: '当前余额',
      dataIndex: 'current_balance',
      key: 'current_balance',
      render: (balance) => `¥${balance.toLocaleString()}`,
    },
    {
      title: '会员等级',
      dataIndex: 'member_level',
      key: 'member_level',
      width: 120,
      render: (level: Member['member_level']) => {
        const levelMap: Record<Member['member_level'], { color: string; text: string }> = {
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
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: Member['status']) => {
        const statusMap: Record<Member['status'], { color: string; text: string }> = {
          active: { color: 'green', text: '正常' },
          inactive: { color: 'gray', text: '未激活' },
          frozen: { color: 'red', text: '冻结' },
        };
        const statusInfo = statusMap[status] || statusMap.active;
        return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
      },
    },
    {
      title: '注册日期',
      dataIndex: 'register_date',
      key: 'register_date',
    },
    {
      title: '权限',
      key: 'permissions',
      render: (_, record) => (
        <Space size="small">
          {record.fund_permission && <Tag color="blue">基金</Tag>}
          {record.option_permission && <Tag color="green">期权</Tag>}
          {record.contract_permission && <Tag color="orange">合约</Tag>}
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedMember(record);
              setIsModalVisible(true);
            }}
          >
            查看
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingMember(record);
              form.setFieldsValue(record);
              setIsModalVisible(true);
            }}
          >
            编辑
          </Button>
        </Space>
      ),
    },
  ];

  // 处理表单提交
  const handleFormSubmit = async (values: Record<string, unknown>) => {
    try {
      if (editingMember) {
        // 更新会员信息
        if (supabaseEnabled) {
          const { error } = await supabase
            .from('users')
            .update({
              username: values.username,
              current_balance: values.current_balance,
              status: values.status,
              fund_permission: values.fund_permission,
              option_permission: values.option_permission,
              contract_permission: values.contract_permission,
            })
            .eq('id', editingMember.id);

          if (error) throw error;
        }

        message.success('会员信息更新成功');
        setIsModalVisible(false);
        setEditingMember(null);
        form.resetFields();
        loadMembers();
      }
    } catch (e) {
      console.error(e);
      message.error('操作失败');
    }
  };

  // 处理注册表单提交
  const handleRegisterSubmit = async (values: Record<string, unknown>) => {
    try {
      if (supabaseEnabled) {
        const { error } = await supabase.from('users').insert({
          username: values.username,
          password_hash: 'hashed_password', // 实际应该加密密码
          related_admin: currentUser?.username || '',
          current_balance: values.initial_balance || 0,
          status: 'active',
          fund_permission: values.fund_permission || false,
          option_permission: values.option_permission || false,
          contract_permission: values.contract_permission || false,
        });

        if (error) throw error;
      }

      message.success('会员注册成功');
      setIsRegisterModalVisible(false);
      registerForm.resetFields();
      loadMembers();
    } catch (e) {
      console.error(e);
      message.error('注册失败');
    }
  };

  // 导出数据
  const exportData = () => {
    // 实现导出功能
    message.info('导出功能待实现');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部导航栏 */}
      <TopNavigationBar title="会员管理" showBackButton={true} showHomeButton={true} />

      <div className="pt-16 px-4">
        {/* 筛选和操作区域 */}
        <Card className="mb-6 shadow-sm">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Input
                placeholder="搜索会员名、邮箱或手机号"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  registerForm.resetFields();
                  setIsRegisterModalVisible(true);
                }}
              >
                注册新会员
              </Button>
            </Col>
            <Col xs={24} sm={24} md={8} className="text-right">
              <Space>
                <Button icon={<DownloadOutlined />} onClick={exportData}>
                  导出数据
                </Button>
                <Button icon={<FilterOutlined />}>筛选</Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* 会员数据统计 */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col span={6}>
            <Card className="shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{members.length}</div>
                <div className="text-gray-500">总会员数</div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {members.filter((m) => m.status === 'active').length}
                </div>
                <div className="text-gray-500">活跃会员</div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">
                  {members.filter((m) => m.status === 'frozen').length}
                </div>
                <div className="text-gray-500">冻结会员</div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">
                  {members.reduce((sum, m) => sum + m.current_balance, 0).toLocaleString()}
                </div>
                <div className="text-gray-500">总资金</div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* 会员列表 */}
        <Card className="shadow-sm">
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
      </div>

      {/* 查看/编辑会员信息模态框 */}
      <Modal
        title={editingMember ? '编辑会员信息' : '会员详情'}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingMember(null);
          form.resetFields();
        }}
        footer={
          editingMember
            ? [
                <Button
                  key="back"
                  onClick={() => {
                    setIsModalVisible(false);
                    setEditingMember(null);
                    form.resetFields();
                  }}
                >
                  取消
                </Button>,
                <Button key="submit" type="primary" onClick={() => form.submit()}>
                  保存
                </Button>,
              ]
            : [
                <Button
                  key="close"
                  onClick={() => {
                    setIsModalVisible(false);
                    setEditingMember(null);
                    form.resetFields();
                  }}
                >
                  关闭
                </Button>,
              ]
        }
      >
        {selectedMember && (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
            initialValues={editingMember || selectedMember}
          >
            <Form.Item name="id" label="会员ID">
              <Input disabled />
            </Form.Item>
            <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
              <Input disabled={!editingMember} />
            </Form.Item>
            <Form.Item name="current_balance" label="当前余额">
              <InputNumber
                formatter={(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value!.replace(/¥\s?|(,*)/g, '') as string}
                style={{ width: '100%' }}
                disabled={!editingMember}
              />
            </Form.Item>
            <Form.Item name="status" label="状态">
              <Select disabled={!editingMember}>
                <Select.Option value="active">正常</Select.Option>
                <Select.Option value="inactive">未激活</Select.Option>
                <Select.Option value="frozen">冻结</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="fund_permission" valuePropName="checked">
              <Checkbox disabled={!editingMember}>基金交易权限</Checkbox>
            </Form.Item>
            <Form.Item name="option_permission" valuePropName="checked">
              <Checkbox disabled={!editingMember}>期权交易权限</Checkbox>
            </Form.Item>
            <Form.Item name="contract_permission" valuePropName="checked">
              <Checkbox disabled={!editingMember}>合约交易权限</Checkbox>
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* 注册新会员模态框 */}
      <Modal
        title="注册新会员"
        visible={isRegisterModalVisible}
        onCancel={() => {
          setIsRegisterModalVisible(false);
          registerForm.resetFields();
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setIsRegisterModalVisible(false);
              registerForm.resetFields();
            }}
          >
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={() => registerForm.submit()}>
            注册
          </Button>,
        ]}
      >
        <Form form={registerForm} layout="vertical" onFinish={handleRegisterSubmit}>
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            name="confirm_password"
            label="确认密码"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="请再次输入密码" />
          </Form.Item>
          <Form.Item name="initial_balance" label="初始余额">
            <InputNumber
              formatter={(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/¥\s?|(,*)/g, '') as unknown as 0}
              style={{ width: '100%' }}
              defaultValue={0}
            />
          </Form.Item>
          <Form.Item name="fund_permission" valuePropName="checked">
            <Checkbox>基金交易权限</Checkbox>
          </Form.Item>
          <Form.Item name="option_permission" valuePropName="checked">
            <Checkbox>期权交易权限</Checkbox>
          </Form.Item>
          <Form.Item name="contract_permission" valuePropName="checked">
            <Checkbox>合约交易权限</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MemberManagement;
