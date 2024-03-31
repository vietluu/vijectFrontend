import { Button, ColorPicker, Form, Input, Modal, message } from 'antd'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hook/hook'
import { labelReducer } from '../../../redux/label/selector'
import { createLabelRequest } from '../../../redux/label/thunk'
import { useParams } from 'react-router-dom'
import type { ColorPickerProps } from 'antd';


const LabelHead = () => {
    const [openModal, setOpenModal] = useState(false)
    const [form] = Form.useForm()
    const { projectId } = useParams<{ projectId: string }>();
    const dispatch = useAppDispatch()
    const { loading } = useAppSelector(labelReducer)
    const [value, setValue] = useState<ColorPickerProps['value']>('#1677ff');


    const handleCreateLabel = (values: { [key: string]: string }) => {

        values.projectId = projectId ?? '';
        values.color = value?.toString() ?? '';
        console.log(values)
        try {
            dispatch(createLabelRequest(values)).then(res => {
                if (res.type === 'label/thunk/createLabel/fulfilled') {
                    message.success('Tạo nhãn thành công')
                    setOpenModal(false)
                }
                else message.error('Tạo nhãn thất bại')
            })
       
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className='flex justify-end py-3'>
            <Modal title='Thêm nhãn'
                open={openModal}
                onCancel={() => setOpenModal(false)}
                centered
                okButtonProps={{ loading: loading[createLabelRequest.typePrefix]}}
                onOk={() => {
                    form.submit()
                }}
            >
                <Form form={form} layout='vertical' onFinish={e => handleCreateLabel(e)}>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên nhãn',
                            },
                        ]}
                        name='labelName'
                        label='Tên nhãn'

                    >
                        <Input placeholder='Tên nhãn' />
                    </Form.Item>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn màu',
                            },
                        ]}
                        name='color'
                        label='Màu'
                    >
                        <ColorPicker allowClear format='hex' defaultFormat='hex' size='large' value={value} onChange={e => setValue(e.toHexString())} />
                    </Form.Item>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mô tả',
                            },
                        ]}
                        name='description'
                        label='Mô tả'
                    >
                        <Input placeholder='Mô tả' />
                    </Form.Item>
                </Form>
            </Modal>
            <Button className='bg-sky-500 text-white' onClick={() => setOpenModal(true)}>Thêm nhãn</Button>
        </div>
    )
}

export default LabelHead