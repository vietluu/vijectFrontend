import React, {
  createRef,
  forwardRef,
  useState,
  useImperativeHandle,
} from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

type LoadingRef = {
  isLoading: (value: boolean) => void;
};

export const loadingRef = createRef<LoadingRef>();

const Loading = forwardRef<LoadingRef>((_, ref) => {
  const [loading, setLoading] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    isLoading: (value) => {
      setLoading(value);
    },
  }),[]);

  return loading ? (
    <div className="fixed top-0 z-[99] flex h-screen w-full items-center justify-center bg-[#ffffff80]">
      <Spin
        spinning
        size="large"
        indicator={<LoadingOutlined style={{ fontSize: 24 }} />}
      />
    </div>
  ) : null;
});

export default Loading;
