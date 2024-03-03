import { Button } from 'antd'
import React from 'react'
interface ButtonProps {
    onClick?: () => void
    children: React.ReactNode
    type?: 'primary' | 'danger'
    className?: string
    loading?: boolean
    htmlType?: 'submit' | 'button' | 'reset'
}

function ButtonCustom(props: ButtonProps): JSX.Element {
    return (
        <Button
            className={
                `${
                    props.type === 'primary'
                        ? 'bg-sky-500 text-white'
                        : props.type === 'danger'
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-black'
                } rounded-md px-4 ${
                    props.type === 'primary' ? 'hover:bg-sky-600' : ''
                }` +
                ' ' +
                props.className
            }
            htmlType={props.htmlType ?? 'button'}
            loading={props.loading}
            onClick={props.onClick}
        >
            {props.children}
        </Button>
    )
}

export default ButtonCustom
