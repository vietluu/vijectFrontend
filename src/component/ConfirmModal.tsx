import { Modal } from 'antd'

interface ConfirmModalProps { 
  onOk: () => void 
  title: string
  content: string
}
const ConfirmModal = ({onOk,content,title}:ConfirmModalProps) =>  Modal.confirm({
  content,
  title,
  onOk: () => onOk(),
  centered: true,
  okButtonProps: { className: 'bg-red-500 text-white' },
  cancelButtonProps: { className: 'bg-blue-500 text-white' },
  okText: 'Xác nhận',
  cancelText: 'Hủy',
  footer: (_, { OkBtn, CancelBtn }) => (
    <>
      <CancelBtn />
      <OkBtn />
    </>
  ),
});

export default ConfirmModal