import React from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hook/hook'
import { Button, Form, Input, message } from 'antd'
import { userRegister } from '../../types/user'
import { register } from '../../redux/user/thunk'

function SignUp() {
    const dispatch = useDispatch()
    const { loading } = useAppSelector((state) => state.userReducer)
    const handleLogup = (data: userRegister) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        dispatch(register(data)).then((res) => {
            console.log(res)
            if (res.type === 'user/thunk/register/rejected') {
                message.error(
                    res.payload.response.data.message ||
                        'Đăng ký thất bại vui lòng kiểm tra lại thông tin!'
                )
            }
        })
    }
    const onFinish = (values: userRegister) => {
        handleLogup(values)
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
                <img
                    src="/img/viject.svg"
                    alt="logo"
                    className="h-28 mx-auto"
                />
                <h3 className="text-2xl text-center mb-2 font-medium">
                    Đăng ký tài khoản
                </h3>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Please enter a valid email address!',
                        },
                    ]}
                >
                    <Input placeholder='Email'/>
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        {
                            type: 'string',
                            min: 6,
                            message:
                                'Password must be at least 6 characters long!',
                        },
                    ]}
                >
                    <Input.Password placeholder='Mật khẩu'/>
                </Form.Item>
                <Form.Item name="fullName" label="Họ và tên">
                    <Input placeholder="Họ và tên" />
                </Form.Item>
                <Form.Item className="text-center">
                    <Button
                        loading={loading[register.typePrefix]}
                        type="primary"
                        htmlType="submit"
                        className="w-full bg-sky-500"
                    >
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
            <div className="border-b border-gray-500 w-full text-center pb-5">
                <span>Đã có tài khoản?</span>
                <a href="/signIn" className="text-blue-500 ml-2">
                    Đăng nhập tại đây
                </a>
            </div>
            <div className="text-sm flex gap-2 py-4">
                <a href="#">Chính sách người dùng</a>
                <a href="#">Chính sách bảo mật</a>
            </div>
        </div>
    )
}

export default SignUp
