import { Spin } from "antd";

function Loading({ loading, size, children }) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Spin spinning={loading} size={size}>
        {children}
      </Spin>
    </div>
  );
}

export default Loading;