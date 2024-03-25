import { ChangeEvent, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { Todo } from "../../todo/Todo.interface";
import { TodoDto } from "../../todo/TodoDto.interface";
import { TodoState } from "../../todo/TodoState.enum";

const TodoItem: React.FC<{
  todo: Todo;
  updateTodoItem: (id: number, updatedTodo: TodoDto) => void;
  deleteTodoItem: (id: number) => void;
}> = ({ todo, updateTodoItem, deleteTodoItem }) => {
  const [isChange, setChange] = useState(false);
  const [updateTask, setUpdatedTask] = useState(todo.task);
  const [selectedState, setSelectedState] = useState<TodoState>(todo.state);

  const stateText = {
    [TodoState.Await]: "await",
    [TodoState.InProgress]: "in progress",
    [TodoState.Done]: "done",
  };

  const handleUpdateTask = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedTask(e.target.value);
  };

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value as TodoState);
  };

  const handleChangeTodo = () => {
    updateTodoItem(todo.id, { task: updateTask, state: selectedState });
    setChange(!isChange);
  };

  const handleDeleteTodo = () => {
    deleteTodoItem(todo.id);
  };

  const getTextColor = () => {
    switch (todo.state) {
      case TodoState.Await:
        return "text-gray-500";
      case TodoState.InProgress:
        return "text-yellow-500";
      case TodoState.Done:
        return "text-green-500";
      default:
        return "text-gray-700";
    }
  };

  return (
    <li className="grid items-center gap-2 space-y-4 border-b border-gray-200 py-2 md:grid-cols-2 md:space-y-0 lg:flex lg:justify-between">
      {isChange ? (
        <>
          <input
            className="rounded-lg px-4 py-2"
            type="text"
            value={updateTask}
            onChange={handleUpdateTask}
          />
          <div className="flex items-center space-x-4">
            <select
              className="cursor-pointer rounded-lg px-4 py-2"
              name="state"
              id="state"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="await">await</option>
              <option value="in progress">in progress</option>
              <option value="done">done</option>
            </select>

            <div className="flex space-x-4 justify-self-end">
              <button className="text-sm" onClick={handleChangeTodo}>
                <CheckIcon />
              </button>
              <button className="text-sm" onClick={() => setChange(!isChange)}>
                <CloseIcon />
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <span
            className={
              todo.state === TodoState.Done ? "text-gray-700" : "text-gray-200"
            }
          >
            {todo.task}
          </span>
          <div className="flex items-center justify-between space-x-4">
            <span className={`me-4 text-sm font-medium ${getTextColor()}`}>
              {stateText[todo.state]}
            </span>

            <div className="flex space-x-4">
              <button className="text-sm" onClick={() => setChange(!isChange)}>
                <EditIcon />
              </button>
              <button className="text-sm" onClick={handleDeleteTodo}>
                <DeleteForeverIcon />
              </button>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
