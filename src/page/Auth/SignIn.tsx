import { Form, Input, Button, message } from 'antd'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hook/hook'
import { login } from '../../redux/user/thunk'
import { userLogin } from '../../types/user'
import { useLocation, useNavigate } from 'react-router-dom'

function SignIn() {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const { loading } = useAppSelector((state) => state.userReducer)

    const handleLogin = (data: userLogin) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        dispatch(login(data)).then((res) => {
            if (res.type === 'user/thunk/login/fulfilled') {
                message.success({
                    content: 'Đăng nhập thành công!',
                    key: 'login',
                })
                navigate({
                    pathname: location.state?.from || '/',
                    search: location.state?.search || '',
                })
            }
            if (res.type === 'user/thunk/login/rejected') {
                message.error(
                    res.payload.response.data.message || 'Đăng nhập thất bại'
                )
            }
        })
    }
    const onFinish = (values: userLogin) => {
        handleLogin(values)
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
                    Đăng nhập
                </h3>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Vui lòng nhập email!',
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
                                'Mật khẩu phải chứa ít nhất 6 kí tự!',
                        },
                    ]}
                >
                    <Input.Password placeholder='Mật khẩu' />
                </Form.Item>

                <Form.Item className="text-center">
                    <Button
                        loading={loading[login.typePrefix]}
                        type="primary"
                        htmlType="submit"
                        className="w-full bg-sky-500"
                    >
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
            <div className="border-b border-gray-500 w-full text-center pb-5">
                <a href="/signUp" className="text-blue-500">
                    Đăng kí tài khoản
                </a>
            </div>
            <div className="text-sm flex gap-2 py-4">
                <a href="#">Chính sách người dùng</a>
                <a href="#">Chính sách bảo mật</a>
            </div>
        </div>
    )
}

export default SignIn
