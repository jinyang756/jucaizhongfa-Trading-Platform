import Swal from 'sweetalert2';

// 自定义样式配置，匹配赛博金融主题
const customSwal = Swal.mixin({
  customClass: {
    confirmButton:
      'bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors',
    cancelButton:
      'bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-md transition-colors ml-2',
    popup: 'bg-[rgba(15,23,42,0.9)] backdrop-blur-xl border border-indigo-500/30 rounded-2xl',
    title: 'text-white',
    htmlContainer: 'text-slate-200',
    icon: 'border-0',
  },
  buttonsStyling: false,
});

export const useSweetAlert = () => {
  return {
    // 确认对话框
    confirm: async (
      title: string,
      text?: string,
      icon: 'warning' | 'question' | 'info' | 'success' | 'error' = 'question',
    ) => {
      const result = await customSwal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        reverseButtons: true,
      });
      return result.isConfirmed;
    },

    // 成功提示
    success: (title: string, text?: string) => {
      return customSwal.fire({
        title,
        text,
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    },

    // 错误提示
    error: (title: string, text?: string) => {
      return customSwal.fire({
        title,
        text,
        icon: 'error',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    },

    // 警告提示
    warning: (title: string, text?: string) => {
      return customSwal.fire({
        title,
        text,
        icon: 'warning',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    },

    // 信息提示
    info: (title: string, text?: string) => {
      return customSwal.fire({
        title,
        text,
        icon: 'info',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    },

    // 加载提示
    loading: (title: string, text?: string) => {
      return customSwal.fire({
        title,
        text,
        icon: 'info',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },

    // 自定义输入框
    input: async (
      title: string,
      text?: string,
      inputType:
        | 'text'
        | 'email'
        | 'password'
        | 'number'
        | 'textarea'
        | 'select'
        | 'radio'
        | 'checkbox'
        | 'file' = 'text',
    ) => {
      const result = await customSwal.fire({
        title,
        text,
        input: inputType,
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        reverseButtons: true,
      });
      return result;
    },
  };
};
