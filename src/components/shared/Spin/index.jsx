import { Spin } from "antd";

function Loading({ loading, size, children }) {
  return (
    <Spin spinning={loading} size={size}>
      {children}
    </Spin>
  );
}

export default Loading;