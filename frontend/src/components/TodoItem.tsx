import { Todo } from "../todo/Todo.interface";
import { TodoState } from "../todo/TodoState.enum";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const TodoItem: React.FC<{
  todo: Todo;
  deleteTodoItem: (id: number) => void;
}> = ({ todo, deleteTodoItem }) => {
  const stateText = {
    [TodoState.Await]: "awaiting",
    [TodoState.InProgress]: "in progress",
    [TodoState.Done]: "Done",
  };

  const handleDeleteTodo = () => {
    deleteTodoItem(todo.id);
  };

  return (
    <li className="flex items-center justify-between border-b border-gray-200 py-2">
      <span className="text-gray-700">{todo.task}</span>
      <div className="flex items-center space-x-2">
        <span className="me-4 text-sm font-medium">
          {stateText[todo.state]}
        </span>
        <button className="text-sm">
          <EditIcon />
        </button>
        <button type="submit" onClick={handleDeleteTodo}>
          <DeleteForeverIcon />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
