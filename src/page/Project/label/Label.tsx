/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import { Form, Input, Popconfirm, Table, Tag, Typography, message } from 'antd';
import LabelHead from './LabelHead';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hook/hook';
import { deleteLabelRequest, getLabelRequest, updateLabelRequest } from '../../../redux/label/thunk';
import { labelReducer } from '../../../redux/label/selector';

interface Item {
   _id: string;
    labelName: string;
    color: string;
    description: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType?: 'text';
    record?: Item;
    index?: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    children,
    ...restProps
}) => {
    const inputNode = <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const Label = () => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const  dispatch = useAppDispatch()
    const { projectId } = useParams<{ projectId: string }>();
    const {label,loading} = useAppSelector(labelReducer)
    const isEditing = (record: Item) => record._id === editingKey;
    const edit = (record: Partial<Item> & {_id: React.Key }) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record._id);
    };

   
    const cancel = () => {
        setEditingKey('');
    };
    const deleteLabel = async (_id: React.Key) => { 
        try {
            const data = {
                id: _id.toString(),
                projectId: projectId ?? ''
            }
            dispatch(deleteLabelRequest(data)).then(res => {
                if (deleteLabelRequest.fulfilled.match(res)) {
                    message.success('Xóa nhãn thành công')
                }
            })
        }
        catch (errInfo) {
            message.error('Xóa nhãn thất bại')
            console.log('Validate Failed:', errInfo);
        }
    }
    const save = async (_id: React.Key) => {
        try {
            const { labelName, description } = (await form.validateFields());
 
            const data = {
                id:_id.toString(),
                data:{
                    labelName: labelName ?? '',
                    description: description ?? '',
                    projectId:projectId ?? ''
                }
            }
            dispatch(updateLabelRequest(data)).then(res => {
                if (updateLabelRequest.fulfilled.match(res)) {
                    message.success('Cập nhật nhãn thành công')
                    setEditingKey('')
                }
            
            })
        } catch (errInfo) {
            message.error('Cập nhật nhãn thất bại')
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Nhãn',
            dataIndex: 'labelName',
            width: '25%',
            editable: true,
            render: (_: any,tag:Item) => {
                return (
                    <Tag color={tag.color}>{tag.labelName}</Tag>
                )
            },
            align: 'center'
        },
        {
            title: 'Thông tin',
            dataIndex: 'description',
            width: '40%',
            editable: true,
            align: 'center'

        },
        {
            title: 'Hành động',
            dataIndex: 'operation',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record._id)} style={{ marginRight: 8 }}>
                            Hủy
                        </Typography.Link>
                        <Popconfirm okButtonProps={{className:'bg-sky-500'}} title="Có chắc xóa?" onConfirm={cancel}>
                            <a>Hủy</a>
                        </Popconfirm>
                    </span>
                ) : (
                        <span>
                            <Typography.Link disabled={editingKey !== ''} style={{ marginRight: 8 }} onClick={() => edit(record)}>
                        Sửa
                            </Typography.Link>
                            <Typography.Link disabled={editingKey !== ''}>
                            <Popconfirm okButtonProps={{className:'bg-sky-500'}} title="Có chắc xóa?" onCancel={cancel} onConfirm={() => deleteLabel(record._id)}>
                            <a className='!text-red-500'>Xóa</a>
                        </Popconfirm>
                    </Typography.Link>
                    </span>
                );
            },
            align: 'center'

        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
                render: col.render,
                align: col.align
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <LabelHead/>
            {label && label?.length > 0 ? <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                loading={loading[getLabelRequest.typePrefix]}
                bordered
                dataSource={label}
                // @ts-ignore
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            /> : null}
        </Form>
    );
};

export default Label;