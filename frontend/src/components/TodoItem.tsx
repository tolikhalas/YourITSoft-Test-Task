import { Todo } from "../todo/Todo.interface";
import { TodoState } from "../todo/TodoState.enum";

const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const stateText = {
    [TodoState.Await]: "awaiting",
    [TodoState.InProgress]: "in progress",
    [TodoState.Done]: "Done",
  };

  return (
    <li className="flex justify-between items-center py-2 border-b border-gray-200">
      <span className="text-gray-700">{todo.task}</span>
      <span className="text-sm font-medium">{stateText[todo.state]}</span>
      <input type="checkbox" className="mr-2" />
    </li>
  );
};

export default TodoItem;
