import React from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hook/hook";
import { login } from "../../redux/user/thunk";
import { userLogin } from "../../types/user";



function SignIn() {
  const dispatch = useDispatch();
  const { loading } = useAppSelector(state => state.userReducer);
  const handleLogin = (data: userLogin) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    dispatch(login(data)).then((res) => {
      console.log(res);
      if (res.type === "user/thunk/login/rejected") {
        message.error("Đăng nhập thất bại vui lòng kiểm tra lại thông tin!");
      }
    })
   
  }
  const onFinish = (values: userLogin) => {
    handleLogin(values);
  }

  return (
    <div className="flex justify-center items-center max-w-[500px] lg:min-w-[350px] mo h-auto p-4 bg-white rounded-md  shadow-xl shadow-slate-300 flex-col">
      <Form
        layout="vertical"
        name="signin"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="w-full"
      >
        <img src="/img/viject.svg" alt="logo" className="h-28 mx-auto" />
        <h3 className="text-2xl text-center mb-2 font-medium">Đăng nhập</h3>
        <Form.Item
          label="Email"
          name="email"

          rules={[
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{type: "string", min: 6, message: "Password must be at least 6 characters long!" },]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
        className="text-center">
          <Button loading={loading[login.typePrefix]}  type="primary" htmlType="submit" className="w-full bg-sky-500">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
      <div className="border-b border-gray-500 w-full text-center pb-5">
        <a href="/signUp" className="text-blue-500">Đăng kí tài khoản</a>
      </div>
      <div className="text-sm flex gap-2 py-4">
        <a href="#">Chính sách người dùng</a>
        <a href="#">Chính sách bảo mật</a>
      </div>
    </div>
  );
}

export default SignIn;
