import { TaskStatusSelect } from '@features/task-status-select';
import { TaskPrioritySelect } from '@features/task-priority-select';
import { UserIcon } from '@shared/ui/icons';

/**
 * TaskSidebar widget - Right sidebar for create task page
 * FSD widget: UI composition only, no business logic
 */
export function TaskSidebar() {
  // Mock employees data
  const employees = [
    { id: '1', name: 'Ali Valiyev', avatar: null },
    { id: '2', name: 'Dilnoza Karimova', avatar: null },
    { id: '3', name: 'Bekzod Toshmatov', avatar: null },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Task Status Card */}
      <h3 className="text-16-regular mb-4 border-b pb-2">Vazifa holati</h3>

      <div className="space-y-4">
        {/* Status Select */}
        <div>
          <label className="block text-14-light mb-1">Status</label>
          <TaskStatusSelect />
        </div>

        {/* Priority Select */}
        <div>
          <label className="block text-14-light mb-1">Prioritet</label>
          <TaskPrioritySelect />
        </div>

        {/* Assigned Employees */}
        <div>
          <label className="block text-14-light mb-2">Xodimlar</label>
          <div className="flex -space-x-2">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                title={employee.name}
              >
                {employee.avatar ? (
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <UserIcon size={16} className="text-gray-500" />
                )}
              </div>
            ))}
            {/* Add employee button */}
            <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center cursor-pointer hover:bg-gray-200">
              <span className="text-xs text-gray-600">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
