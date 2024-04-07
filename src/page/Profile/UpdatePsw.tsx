import { Form, Input, message } from 'antd'
import ButtonCustom from '../../component/ButtonCustom'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../navigation/routers'
import { changePassword } from '../../services/user.service'

function updatePsw() {
    const onFinish = async (values: { [key: string]: string }) => {
        // Add your logic to update the password here
        const data = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
        }
      try {
          // Call the API to update the password
          const res = await changePassword(data);
          console.log(res)
          if (res.status === 200) {
              message.success('Cập nhật mật khẩu thành công!')
              // If the API call is successful, redirect to the home page
              navigate(routes.Home.path)
          }
          else {
              message.error('Cập nhật mật khẩu thất bại!')
          }
      } catch (error) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          message.error(error.response.data.message)
      }
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()
    return (
        <Form
            onFinish={onFinish}
            className="w-full max-w-[500px] p-3 my-6 mx-auto shadow-md text-center"
            layout="vertical"
            title='Cập nhật mật khẩu'
        
        >
            <h1 className="text-2xl pb-3 font-bold">Cập nhật mật khẩu</h1>
            <Form.Item
                label="Mật khẩu cũ"
                name="oldPassword"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu cũ',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu mới',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Xác nhât mật khẩu mới"
                name="confirmNewPassword"
                dependencies={['newPassword']}
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng xác nhận mật khẩu mới',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (
                                !value ||
                                getFieldValue('newPassword') === value
                            ) {
                                return Promise.resolve()
                            }
                            return Promise.reject(
                                new Error(
                                    'Mật khẩu mới không trùng khớp!'
                                )
                            )
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <ButtonCustom type="primary" htmlType="submit">
                    Cập nhật
                </ButtonCustom>
                <ButtonCustom
                    type="danger"
                    onClick={() => navigate(routes.Home.path)}
                >
                    Hủy
                </ButtonCustom>
            </Form.Item>
        </Form>
    )
}
export default updatePsw
