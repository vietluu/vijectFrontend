import { Form, Input, Modal, notification } from 'antd'
import { useAppDispatch, useAppSelector } from '../../hook/hook'
import React, { useLayoutEffect, useRef, useState } from 'react'
// import dayjs from 'dayjs';
// import locale from 'antd/es/date-picker/locale/vi_VN';
import { user } from '../../types/user'
import { getUserInfo, updateProfile } from '../../redux/user/thunk'
import { userSelector } from '../../redux/user/selector'

interface Props {
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    user: user
}
export const UpdateProfile: React.FC<Props> = ({ isOpen, setOpen, user }) => {
    const formRef = useRef(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const dispatch = useAppDispatch()
    const { loading } = useAppSelector(userSelector)
    useLayoutEffect(() => {
        if (isOpen === true) {
            setIsModalOpen(true)
        }
        ;(async () => {
            await formRef.current
            if (formRef.current) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                formRef.current.setFieldsValue({
                    fullName: user?.fullName,
                })
            }
        })()
    }, [isOpen, user])
    const handleCancel = () => {
        setIsModalOpen(false)
        setOpen(false)
    }
    const handleSubmit = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        formRef.current.submit()
    }
    // const disabledDate = (current: any) => {
    //   // Lấy ngày hiện tại
    //   const today = new Date();

    //   // Chỉ cho phép chọn ngày không vượt quá ngày hiện tại
    //   return current && current > today;
    // };
    const handleUpdate = (data: user) => {
        const dataUser = {
            fullName: data.fullName,
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        dispatch(updateProfile(dataUser)).then((res) => {
            if (res.type === 'user/thunk/updateprofile/fulfilled') {
                dispatch(getUserInfo())
                notification.success({ message: 'Cập nhật dữ liệu thành công' })
                return handleCancel()
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                notification.error({
                    message: 'Đã có lỗi xảy ra, vui lòng thử lại sau!',
                })
            }
        })
    }
    return (
        <Modal
            className="z-[100]"
            title="Chỉnh sửa thông tin"
            onOk={handleSubmit}
            centered
            okText="sửa"
            okType="primary"
            open={isModalOpen}
            okButtonProps={{
                className: 'bg-sky-500 ',
                danger: false,
            }}
            cancelButtonProps={{
                danger: true,
                loading: loading[updateProfile.typePrefix],
            }}
            onCancel={handleCancel}
        >
            <Form
                ref={formRef}
                layout="vertical"
                onFinish={(e: user) => handleUpdate(e)}
                onFinishFailed={() => setIsModalOpen(true)}
            >
                <Form.Item name="fullName" label="Tên" htmlFor="name">
                    <Input id="name" />
                </Form.Item>
            </Form>
        </Modal>
    )
}
