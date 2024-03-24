import { Todo } from "../../todo/Todo.interface";
import { TodoDto } from "../../todo/TodoDto.interface";
import { TodoState } from "../../todo/TodoState.enum";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ChangeEvent, useState } from "react";

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
    [TodoState.Done]: "Done",
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

  return (
    <li className="flex items-center justify-between border-b border-gray-200 py-2">
      {isChange ? (
        <>
          <input
            className="rounded-lg px-4 py-2"
            type="text"
            value={updateTask}
            onChange={handleUpdateTask}
          />
          <div className="flex items-center space-x-2">
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

            <button className="text-sm" onClick={handleChangeTodo}>
              <CheckIcon />
            </button>
            <button className="text-sm" onClick={() => setChange(!isChange)}>
              <CloseIcon />
            </button>
          </div>
        </>
      ) : (
        <>
          <span className="text-gray-700">{todo.task}</span>
          <div className="flex items-center space-x-2">
            <span className="me-4 text-sm font-medium">
              {stateText[todo.state]}
            </span>

            <button className="text-sm" onClick={() => setChange(!isChange)}>
              <EditIcon />
            </button>
            <button className="text-sm" onClick={handleDeleteTodo}>
              <DeleteForeverIcon />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
