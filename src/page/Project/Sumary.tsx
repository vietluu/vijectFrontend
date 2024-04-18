import { useAppSelector } from "../../hook/hook"
import { Pie } from '@ant-design/plots';

const Sumary = () => {
  const { Task } = useAppSelector(state => state.taskReducer)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const taskbystatus = [] as any
  if (Task?.tasks && Task?.tasks.length > 0) {
    Task.tasks.forEach(task => {
      const statusName = task.statusId?.statusName ?? 'To do';
      const existingCount = taskbystatus.find((item: { [key: string]: string }) => item.type === statusName)?.value ?? 0;
      const updatedCount = existingCount + 1;
      const existingIndex = taskbystatus.findIndex((item: {[key: string]: string}) => item.type === statusName);
      
      if(existingIndex !== -1) {
        taskbystatus[existingIndex].value = updatedCount;
      } else {
        taskbystatus.push({
          type: statusName,
          value: updatedCount
        });
      }
    });
  }
  
  const config = {
    data: taskbystatus,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      text: (d: {[key: string]: string}) => `${d.type}\n ${d.value}`,
      position: 'spider',
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };
  
  return (
    <div className='p-3 size-full bg-white text-3xl font-bold'>Tổng quan
    <Pie {...config} />
    </div>
  )
}

export default Sumary