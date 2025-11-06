import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../store/useAuth';
import { supabase, supabaseEnabled } from '../utils/supabase';
import TopNavigationBar from '../components/TopNavigationBar';
import { useSweetAlert } from '../hooks/useSweetAlert';
import useAppSound from '../hooks/useSound';
import { UserPlusIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { SearchOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Input as ShadcnInput } from '../components/ui/input';
import {
  Card,
  Row,
  Col,
  Button,
  Table,
  Tag,
  Modal,
  Form,
  Select,
  InputNumber,
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

// 定义用户类型
interface UserType {
  id: number;
  username: string;
  email?: string;
  phone?: string;
  related_admin: string;
  current_balance: number;
  status: string;
  member_level: string;
  created_at: string;
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
  const { success, error, info } = useSweetAlert();
  const { playTradeSuccess, playTradeFailed, playNotification, playAlert, playDataLoad } = useAppSound();
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
    playDataLoad();
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
        const { data, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('related_admin', currentUser?.username || '')
          .order('id');

        if (fetchError) throw fetchError;

        // 修复类型问题
        const formattedMembers: Member[] = (data || []).map((user: UserType) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          related_admin: user.related_admin,
          current_balance: user.current_balance || 0,
          status: (user.status as 'active' | 'inactive' | 'frozen') || 'active',
          member_level: (user.member_level as 'bronze' | 'silver' | 'gold' | 'platinum') || 'bronze',
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
        playNotification();
      }
    } catch (e) {
      console.error(e);
      playAlert();
      error('加载失败', '加载会员数据失败');
    } finally {
      setLoading(false);
    }
  }, [currentUser?.username, error, playDataLoad]);

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
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '当前余额',
      dataIndex: 'current_balance',
      key: 'current_balance',
      render: (balance: number) => `¥${balance.toLocaleString()}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          active: { color: 'green', text: '活跃' },
          inactive: { color: 'gray', text: '非活跃' },
          frozen: { color: 'red', text: '冻结' },
        };
        const statusInfo = statusMap[status as keyof typeof statusMap] || {
          color: 'default',
          text: status,
        };
        return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
      },
    },
    {
      title: '会员等级',
      dataIndex: 'member_level',
      key: 'member_level',
      render: (level: string) => {
        const levelMap = {
          bronze: { color: 'volcano', text: '青铜' },
          silver: { color: 'silver', text: '白银' },
          gold: { color: 'gold', text: '黄金' },
          platinum: { color: 'cyan', text: '铂金' },
        };
        const levelInfo = levelMap[level as keyof typeof levelMap] || {
          color: 'default',
          text: level,
        };
        return <Tag color={levelInfo.color}>{levelInfo.text}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => {
              setSelectedMember(record);
            }}
          >
            查看
          </Button>
          <Button
            type="default"
            icon={<EditOutlined />}
            size="small"
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

  // 处理会员信息更新
  const handleUpdateMember = async (values: Member) => {
    try {
      if (!supabaseEnabled) {
        // 模拟更新
        const updatedMembers = members.map((member) =>
          member.id === editingMember?.id ? { ...member, ...values } : member,
        );
        setMembers(updatedMembers);
        setFilteredMembers(updatedMembers);
        playTradeSuccess();
        success('更新成功', '会员信息更新成功');
      } else {
        // 实际更新数据库
        const { error: updateError } = await supabase
          .from('users')
          .update({
            username: values.username,
            email: values.email,
            phone: values.phone,
            current_balance: values.current_balance,
            status: values.status,
            member_level: values.member_level,
            fund_permission: values.fund_permission,
            option_permission: values.option_permission,
            contract_permission: values.contract_permission,
          })
          .eq('id', editingMember?.id);

        if (updateError) throw updateError;

        // 重新加载数据
        await loadMembers();
        playTradeSuccess();
        success('更新成功', '会员信息更新成功');
      }
      setIsModalVisible(false);
    } catch (e) {
      console.error(e);
      playTradeFailed();
      error('操作失败', '更新会员信息时出现错误');
    }
  };

  // 处理会员注册
  const handleRegisterMember = async (values: Member) => {
    try {
      if (!supabaseEnabled) {
        // 模拟注册
        const newMember: Member = {
          id: members.length + 1,
          username: values.username,
          email: values.email,
          phone: values.phone,
          related_admin: currentUser?.username || '',
          current_balance: values.current_balance,
          status: values.status,
          member_level: values.member_level,
          register_date: new Date().toISOString().split('T')[0],
          fund_permission: values.fund_permission,
          option_permission: values.option_permission,
          contract_permission: values.contract_permission,
          total_trades: 0,
          total_investment: 0,
          risk_score: 0,
        };
        const updatedMembers = [...members, newMember];
        setMembers(updatedMembers);
        setFilteredMembers(updatedMembers);
        playTradeSuccess();
        success('注册成功', '会员注册成功');
      } else {
        // 实际注册到数据库
        const { error: insertError } = await supabase.from('users').insert([
          {
            username: values.username,
            email: values.email,
            phone: values.phone,
            related_admin: currentUser?.username,
            current_balance: values.current_balance,
            status: values.status,
            member_level: values.member_level,
            fund_permission: values.fund_permission,
            option_permission: values.option_permission,
            contract_permission: values.contract_permission,
          },
        ]);

        if (insertError) throw insertError;

        // 重新加载数据
        await loadMembers();
        playTradeSuccess();
        success('注册成功', '会员注册成功');
      }
      setIsRegisterModalVisible(false);
      registerForm.resetFields();
    } catch (e) {
      console.error(e);
      playTradeFailed();
      error('注册失败', '注册会员时出现错误');
    }
  };

  // 导出数据
  const handleExport = async () => {
    info('提示', '导出功能待实现');
  };

  return (
    <div className="p-6 pt-20">
      <TopNavigationBar title="会员管理" />
      <Card className="shadow-lg">
        <Row gutter={[16, 16]} className="mb-4">
          <Col xs={24} md={8}>
            <div className="relative">
              <ShadcnInput
                placeholder="搜索用户名、邮箱或手机号"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-10"
              />
              <div className="absolute left-3 top-3 text-gray-400">
                <SearchOutlined />
              </div>
            </div>
          </Col>
          <Col xs={24} md={16} className="text-right">
            <Space>
              <Button
                type="primary"
                icon={<UserPlusIcon className="h-5 w-5" />}
                onClick={() => setIsRegisterModalVisible(true)}
              >
                注册会员
              </Button>
              <Button icon={<DocumentArrowDownIcon className="h-5 w-5" />} onClick={handleExport}>
                导出数据
              </Button>
            </Space>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredMembers}
          loading={loading}
          pagination={{ pageSize: 10 }}
          rowKey="id"
        />

        {/* 会员详情模态框 */}
        <Modal
          title="会员详情"
          open={!!selectedMember}
          onCancel={() => setSelectedMember(null)}
          footer={null}
          width={600}
        >
          {selectedMember && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">会员ID</p>
                <p className="font-semibold">{selectedMember.id}</p>
              </div>
              <div>
                <p className="text-gray-500">用户名</p>
                <p className="font-semibold">{selectedMember.username}</p>
              </div>
              <div>
                <p className="text-gray-500">邮箱</p>
                <p className="font-semibold">{selectedMember.email || '-'}</p>
              </div>
              <div>
                <p className="text-gray-500">手机号</p>
                <p className="font-semibold">{selectedMember.phone || '-'}</p>
              </div>
              <div>
                <p className="text-gray-500">当前余额</p>
                <p className="font-semibold">¥{selectedMember.current_balance.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500">状态</p>
                <p className="font-semibold">
                  <Tag
                    color={
                      selectedMember.status === 'active'
                        ? 'green'
                        : selectedMember.status === 'frozen'
                          ? 'red'
                          : 'gray'
                    }
                  >
                    {selectedMember.status === 'active'
                      ? '活跃'
                      : selectedMember.status === 'frozen'
                        ? '冻结'
                        : '非活跃'}
                  </Tag>
                </p>
              </div>
              <div>
                <p className="text-gray-500">会员等级</p>
                <p className="font-semibold">
                  <Tag
                    color={
                      selectedMember.member_level === 'gold'
                        ? 'gold'
                        : selectedMember.member_level === 'silver'
                          ? 'silver'
                          : selectedMember.member_level === 'platinum'
                            ? 'cyan'
                            : 'volcano'
                    }
                  >
                    {selectedMember.member_level === 'gold'
                      ? '黄金'
                      : selectedMember.member_level === 'silver'
                        ? '白银'
                        : selectedMember.member_level === 'platinum'
                          ? '铂金'
                          : '青铜'}
                  </Tag>
                </p>
              </div>
              <div>
                <p className="text-gray-500">注册日期</p>
                <p className="font-semibold">{selectedMember.register_date}</p>
              </div>
              <div>
                <p className="text-gray-500">最后登录</p>
                <p className="font-semibold">{selectedMember.last_login || '-'}</p>
              </div>
              <div>
                <p className="text-gray-500">总交易数</p>
                <p className="font-semibold">{selectedMember.total_trades}</p>
              </div>
              <div>
                <p className="text-gray-500">总投资额</p>
                <p className="font-semibold">¥{selectedMember.total_investment.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500">风险评分</p>
                <p className="font-semibold">{selectedMember.risk_score}</p>
              </div>
            </div>
          )}
        </Modal>

        {/* 编辑会员模态框 */}
        <Modal
          title="编辑会员信息"
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setEditingMember(null);
          }}
          onOk={() => form.submit()}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdateMember}
            initialValues={editingMember || {}}
          >
            <Form.Item name="id" label="会员ID" hidden>
              <ShadcnInput />
            </Form.Item>
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <ShadcnInput />
            </Form.Item>
            <Form.Item name="email" label="邮箱">
              <ShadcnInput type="email" />
            </Form.Item>
            <Form.Item name="phone" label="手机号">
              <ShadcnInput />
            </Form.Item>
            <Form.Item
              name="current_balance"
              label="当前余额"
              rules={[{ required: true, message: '请输入当前余额' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                formatter={(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: string | undefined) => {
                  if (!value) return 0;
                  const parsed = parseFloat(value.replace(/¥\s?|(,*)/g, ''));
                  return isNaN(parsed) ? 0 : parsed;
                }}
                defaultValue={0}
              />
            </Form.Item>
            <Form.Item name="status" label="状态">
              <Select>
                <Select.Option value="active">活跃</Select.Option>
                <Select.Option value="inactive">非活跃</Select.Option>
                <Select.Option value="frozen">冻结</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="member_level" label="会员等级">
              <Select>
                <Select.Option value="bronze">青铜</Select.Option>
                <Select.Option value="silver">白银</Select.Option>
                <Select.Option value="gold">黄金</Select.Option>
                <Select.Option value="platinum">铂金</Select.Option>
              </Select>
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

        {/* 注册会员模态框 */}
        <Modal
          title="注册新会员"
          open={isRegisterModalVisible}
          onCancel={() => {
            setIsRegisterModalVisible(false);
            registerForm.resetFields();
          }}
          onOk={() => registerForm.submit()}
          width={600}
        >
          <Form form={registerForm} layout="vertical" onFinish={handleRegisterMember}>
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <ShadcnInput />
            </Form.Item>
            <Form.Item name="email" label="邮箱">
              <ShadcnInput type="email" />
            </Form.Item>
            <Form.Item name="phone" label="手机号">
              <ShadcnInput />
            </Form.Item>
            <Form.Item
              name="current_balance"
              label="初始余额"
              rules={[{ required: true, message: '请输入初始余额' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                formatter={(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: string | undefined) => {
                  if (!value) return 0;
                  const parsed = parseFloat(value.replace(/¥\s?|(,*)/g, ''));
                  return isNaN(parsed) ? 0 : parsed;
                }}
                defaultValue={0}
              />
            </Form.Item>
            <Form.Item name="status" label="状态" initialValue="active">
              <Select>
                <Select.Option value="active">活跃</Select.Option>
                <Select.Option value="inactive">非活跃</Select.Option>
                <Select.Option value="frozen">冻结</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="member_level" label="会员等级" initialValue="bronze">
              <Select>
                <Select.Option value="bronze">青铜</Select.Option>
                <Select.Option value="silver">白银</Select.Option>
                <Select.Option value="gold">黄金</Select.Option>
                <Select.Option value="platinum">铂金</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="fund_permission" valuePropName="checked" initialValue={true}>
              <Checkbox>基金交易权限</Checkbox>
            </Form.Item>
            <Form.Item name="option_permission" valuePropName="checked" initialValue={false}>
              <Checkbox>期权交易权限</Checkbox>
            </Form.Item>
            <Form.Item name="contract_permission" valuePropName="checked" initialValue={true}>
              <Checkbox>合约交易权限</Checkbox>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default MemberManagement;