import React, { useLayoutEffect, useState } from 'react'
import { Upload, message, Modal, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../hook/hook'
import { userSelector } from '../../redux/user/selector'
import { uploadImg } from '../../services/upload.service'
import { getUserInfo, updateProfile } from '../../redux/user/thunk'

interface Props {
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AvatarUpload: React.FC<Props> = ({ isOpen, setOpen }) => {
    const [fileList, setFileList] = useState([])
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const { loading } = useAppSelector(userSelector)

    const dispatch = useAppDispatch()
    useLayoutEffect(() => {
        if (isOpen === true) {
            setOpenModal(true)
        }
    }, [isOpen])

    const handleUpload = async () => {
        const formData = new FormData()
        try {
            if (fileList.length) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                const data = await fileList[0]?.originFileObj
                console.log(data)
                formData.append('images', data)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                const res = await uploadImg(formData)
                if (res.status === 201) {
                    dispatch(updateProfile({ image: res.data.image_url })).then(
                        (res) => {
                            if (
                                res.type ===
                                'user/thunk/updateProfile/fulfilled'
                            ) {
                                setOpenModal(false)
                                setOpen(false)
                                dispatch(getUserInfo())
                                message.success(
                                    'Cập nhật ảnh đại diện thành công'
                                )
                            } else
                                message.error('Cập nhật ảnh đại diện thất bại')
                        }
                    )
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = (error) => reject(error)
        })
    }
    const handleCancleModal = () => {
        setOpenModal(false)
        setOpen(false)
        setFileList([])
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setPreviewImage(file.url || (file.preview as string))
        setPreviewOpen(true)
        setPreviewTitle(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
        )
    }
    const ImageType = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic']
    // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const handleChange = (fileList) => {
        const isImg = ImageType.includes(fileList[0].type)
        if (!isImg) {
            return
        }
        setFileList(fileList)
    }
    const handleCancel = () => setPreviewOpen(false)
    return (
        <div>
            <Modal
                className="flex  justify-center"
                title="Cập nhật ảnh đại diện"
                centered
                open={openModal}
                footer={() => (
                    <div>
                        <Button
                            loading={loading[updateProfile.typePrefix]}
                            onClick={handleUpload}
                            className="!bg-blue-400 !text-white hover:!text-white"
                            disabled={fileList.length > 0 ? false : true}
                        >
                            Cập nhật
                        </Button>
                    </div>
                )}
                onCancel={handleCancleModal}
            >
                <Upload
                    accept="image/png, image/jpeg, image/jpg, image/heic"
                    listType="picture-circle"
                    className="avatar-uploader !flex justify-center"
                    fileList={fileList}
                    onPreview={handlePreview}
                    beforeUpload={(file) => {
                        console.log(file)
                        const isImg = ImageType.includes(file.type)
                        if (!isImg) {
                            message.error(
                                `${file.name} không phải là định dạng cho phép`
                            )
                        }
                        return false
                    }}
                    onRemove={(file) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        const index = fileList.indexOf(file)
                        const newFileList = fileList.slice()
                        newFileList.splice(index, 1)
                        setFileList(newFileList)
                    }}
                    onChange={(file) => handleChange(file.fileList)}
                >
                    {fileList.length >= 1 ? null : (
                        <div className="flex aspect-square h-44 items-center justify-center dark:text-white mobile:h-48">
                            <UploadOutlined className="text-black" />
                            <div className="text-black text-center">
                                Chọn ảnh
                            </div>
                        </div>
                    )}
                </Upload>
            </Modal>
            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img
                    alt="example"
                    style={{ width: '100%' }}
                    src={previewImage}
                />
            </Modal>
        </div>
    )
}

export default AvatarUpload
