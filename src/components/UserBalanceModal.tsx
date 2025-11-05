import React, { useState, useEffect } from 'react';
import { isNumber, min, required, validateForm } from '../utils/validation';
import { useToast } from '../hooks/useToast';

// 定义用户接口
interface User {
  id: number;
  username: string;
  current_balance: number;
  // 可以根据实际情况添加更多字段
}

interface UserBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User; // 用户的类型，可以根据实际情况定义更具体的接口
  type: 'deposit' | 'withdraw';
  onConfirm: (user: User, type: 'deposit' | 'withdraw', amount: number) => void;
}

const UserBalanceModal: React.FC<UserBalanceModalProps> = ({
  isOpen,
  onClose,
  user,
  type,
  onConfirm,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [amountError, setAmountError] = useState<string>('');
  const { showToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setAmount(0);
      setAmountError('');
    }
  }, [isOpen]);

  const handleConfirm = () => {
    const { isValid, errors } = validateForm(
      { amount },
      {
        amount: { rules: [required, isNumber, min(0.01)], label: '金额' },
      },
    );

    if (!isValid) {
      setAmountError(errors.amount || '');
      showToast(errors.amount, 'error');
      return;
    }

    onConfirm(user, type, amount);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-semibold mb-4">
          {type === 'deposit' ? '上分' : '下分'}操作 - {user.username}
        </h2>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            金额
          </label>
          <input
            type="number"
            id="amount"
            value={amount || ''}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className={`mt-1 block w-full px-3 py-2 border ${amountError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            placeholder="输入金额"
          />
          {amountError && <p className="mt-1 text-sm text-red-600">{amountError}</p>}
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-md text-white ${type === 'deposit' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            确认{type === 'deposit' ? '上分' : '下分'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserBalanceModal;
