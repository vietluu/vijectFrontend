import { useState } from 'react'
import { useAppSelector } from '../../hook/hook'
import { userSelector } from '../../redux/user/selector'
import { CameraFilled } from '@ant-design/icons'
import { Avatar } from 'antd'
import { UpdateProfile } from './UpdateProfile'
import AvatarUpload from './AvatarUpload'

function Profile() {
    const { userInfo } = useAppSelector(userSelector)
    const [openModalInfo, setOpenModalInfo] = useState(false)
    const [openUpload, setOpenUpload] = useState(false)
    return (
        <>
            {userInfo ? (
                <UpdateProfile
                    isOpen={openModalInfo}
                    setOpen={setOpenModalInfo}
                    user={userInfo}
                />
            ) : null}
            <AvatarUpload isOpen={openUpload} setOpen={setOpenUpload} />
            <div className="w-full h-full flex-row p-1 flex justify-center items-center md:p-2  lg:p-4">
                <div className="w-2/5 rounded-lg h-full mb-4 bg-white md:w-2/4 lg:w-2/4 xl:w-2/5">
                    <h2 className="text-3xl py-2">Hồ sơ và chế độ hiển thị</h2>
                    <p>
                        Quản lý thông tin cá nhân của bạn, đồng thời kiểm soát
                        thông tin nào người khác xem được và ứng dụng nào có thể
                        truy cập.
                    </p>
                    <div className="shadow-md border border-gay-300 mt-7">
                        <div className="p-1">
                            <div className="h-full  w-full">
                                <img
                                    src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
                                    className="h-full w-full "
                                />
                            </div>
                            <div className="-mt-20  flex flex-col items-center">
                                <div className="relative">
                                    <div className="absolute bottom-0 right-1 z-10 w-8 h-8 text-center aspect-square cursor-pointer rounded-full bg-neutral-300 p-1 dark:bg-slate-500">
                                        <CameraFilled
                                            title="camera"
                                            className="text-zinc-200"
                                            onClick={() => setOpenUpload(true)}
                                        />
                                    </div>

                                    <Avatar
                                        src={
                                            userInfo?.image
                                                ? userInfo.image
                                                : '/img/anonymous.webp'
                                        }
                                        shape="circle"
                                        size={'default'}
                                        className="h-24 w-24 rounded-full border-4 border-white lg:h-32 lg:w-32 xl:h-40 xl:w-40"
                                    />
                                </div>
                                <div className="mt-2 flex items-center space-x-2">
                                    <p className="text-2xl text-black ">
                                        {userInfo?.fullName}
                                    </p>
                                    <span
                                        className="rounded-full bg-blue-500 p-1"
                                        title="Verified"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-2.5 w-2.5 text-gray-100"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="4"
                                                d="M5 13l4 4L19 7"
                                            ></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full flex-col ">
                            <div className="flex-1 rounded-lg bg-white p-8 ">
                                <h4 className="mb-4 text-center text-xl font-bold text-gray-900 ">
                                    Thông tin cá nhân
                                </h4>
                                <ul className="mt-2 text-gray-700 ">
                                    <li className="flex border-y py-2">
                                        <span className="w-24 font-bold">
                                            Họ và tên:
                                        </span>
                                        <span className="text-gray-700 ">
                                            {userInfo?.fullName}
                                        </span>
                                    </li>
                                </ul>
                                <div className="mt-2 flex items-center  justify-center space-x-4">
                                    <button
                                        className="mt-4 flex items-center space-x-2 rounded bg-blue-600 px-4 py-2 text-sm text-gray-100 transition duration-100 hover:bg-blue-700"
                                        onClick={() => setOpenModalInfo(true)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                                        </svg>
                                        <span>Cập nhật thông tin</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 border border-gay-300 rounded-lg bg-white p-8 mt-7 shadow-md ">
                        <h4 className="mb-4 text-center text-xl font-bold text-gray-900 ">
                            Thông tin liên hệ
                        </h4>
                        <ul className="mt-2 text-gray-700 ">
                            <li className="flex border-y py-2">
                                <span className="w-24 font-bold">Email:</span>
                                <span className="text-gray-700 ">
                                    {userInfo?.email}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
