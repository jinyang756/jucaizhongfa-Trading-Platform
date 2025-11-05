// 表单校验工具函数

// 校验结果接口
export interface ValidationResult {
  isValid: boolean;
  message: string;
}

// 校验规则类型
export type ValidationRule = (value: unknown, label?: string) => ValidationResult;

// 创建校验结果
const createResult = (isValid: boolean, message: string = ''): ValidationResult => ({
  isValid,
  message,
});

// 必填项校验
export const required = (value: unknown, label: string = '该字段'): ValidationResult => {
  const isEmpty = value === undefined || value === null || value === '';
  return createResult(!isEmpty, `${label}不能为空`);
};

// 最小长度校验
export const minLength =
  (min: number) =>
  (value: string, label: string = '该字段'): ValidationResult => {
    if (value === undefined || value === null || value === '') {
      return createResult(true);
    }
    return createResult(value.length >= min, `${label}长度不能少于${min}个字符`);
  };

// 最大长度校验
export const maxLength =
  (max: number) =>
  (value: string, label: string = '该字段'): ValidationResult => {
    if (value === undefined || value === null || value === '') {
      return createResult(true);
    }
    return createResult(value.length <= max, `${label}长度不能超过${max}个字符`);
  };

// 数字校验
export const isNumber = (value: unknown, label: string = '该字段'): ValidationResult => {
  if (value === undefined || value === null || value === '') {
    return createResult(true);
  }
  const isValid = !isNaN(Number(value));
  return createResult(isValid, `${label}必须是数字`);
};

// 最小值校验
export const min =
  (minValue: number) =>
  (value: unknown, label: string = '该字段'): ValidationResult => {
    if (value === undefined || value === null || value === '') {
      return createResult(true);
    }
    const numValue = Number(value);
    return createResult(numValue >= minValue, `${label}不能小于${minValue}`);
  };

// 最大值校验
export const max =
  (maxValue: number) =>
  (value: unknown, label: string = '该字段'): ValidationResult => {
    if (value === undefined || value === null || value === '') {
      return createResult(true);
    }
    const numValue = Number(value);
    return createResult(numValue <= maxValue, `${label}不能大于${maxValue}`);
  };

// 邮箱格式校验
export const isEmail = (value: string, label: string = '邮箱'): ValidationResult => {
  if (value === undefined || value === null || value === '') {
    return createResult(true);
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return createResult(emailRegex.test(value), `${label}格式不正确`);
};

// 手机号格式校验
export const isPhone = (value: string, label: string = '手机号'): ValidationResult => {
  if (value === undefined || value === null || value === '') {
    return createResult(true);
  }
  const phoneRegex = /^1[3-9]\d{9}$/;
  return createResult(phoneRegex.test(value), `${label}格式不正确`);
};

// 密码强度校验
export const isStrongPassword = (value: string, label: string = '密码'): ValidationResult => {
  if (value === undefined || value === null || value === '') {
    return createResult(true);
  }
  // 至少8位，包含字母和数字
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  return createResult(passwordRegex.test(value), `${label}至少需要8位，且包含字母和数字`);
};

// 自定义正则校验
export const pattern =
  (regex: RegExp, errorMessage: string) =>
  (value: string): ValidationResult => {
    if (value === undefined || value === null || value === '') {
      return createResult(true);
    }
    return createResult(regex.test(value), errorMessage);
  };

// 组合多个校验规则
export const validate = (
  value: unknown,
  rules: ValidationRule[],
  label?: string,
): ValidationResult => {
  for (const rule of rules) {
    const result = rule(value, label);
    if (!result.isValid) {
      return result;
    }
  }
  return createResult(true);
};

// 校验表单对象
export const validateForm = (
  formData: Record<string, unknown>,
  validationRules: Record<string, { rules: ValidationRule[]; label?: string }>,
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  let isValid = true;

  for (const field in validationRules) {
    if (Object.prototype.hasOwnProperty.call(validationRules, field)) {
      const { rules, label } = validationRules[field];
      const result = validate(formData[field], rules, label);

      if (!result.isValid) {
        errors[field] = result.message;
        isValid = false;
      }
    }
  }

  return { isValid, errors };
};
