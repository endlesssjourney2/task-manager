import { App } from "antd";

type NotifyOptions = {
  duration?: number;
  key?: string;
};

const useNotify = () => {
  const { message, notification, modal } = App.useApp();

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
          title,
          duration: 0,
          description,
          key,
        }),
      close: (key: string) => notification.destroy(key),
    },
    modal: {
      confirm: (
        title: string,
        content?: string,
        onOk?: () => void,
        width?: number | string,
      ) =>
        modal.confirm({
          title,
          content,
          onOk,
          okText: "Yes",
          okButtonProps: { danger: true, type: "primary" },
          cancelText: "No",
          cancelButtonProps: { type: "primary" },
          width: width || 400,
        }),
    },
  };
};

export default useNotify;
