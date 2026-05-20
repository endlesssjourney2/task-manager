import { App } from "antd";

type NotifyOptions = {
  duration?: number;
  key?: string;
};

const useNotify = () => {
  const { message, notification } = App.useApp();

  return {
    success: (text: string, option?: NotifyOptions) =>
      message.success({ content: text, ...option }),
    error: (text: string, option?: NotifyOptions) =>
      message.error({ content: text, ...option }),
    info: (text: string, option?: NotifyOptions) =>
      message.info({ content: text, ...option }),
    notification: {
      error: (title: string, description?: string, key?: string) =>
        notification.error({
          message: title,
          duration: 0,
          description,
          key,
        }),
      close: (key: string) => notification.destroy(key),
    },
  };
};

export default useNotify;
