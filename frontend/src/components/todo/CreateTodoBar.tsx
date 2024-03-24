import { ChangeEvent, FormEvent } from "react";
import { TodoState } from "../../todo/TodoState.enum";

const CreateTodoBar: React.FC<{
  inputTask: string;
  handleTaskChange: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedState: TodoState;
  handleStateChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent) => void;
}> = ({
  inputTask,
  handleTaskChange,
  selectedState,
  handleStateChange,
  handleSubmit,
}) => {
  return (
    <div className="flex space-x-2">
      <input
        className="rounded-lg px-4 py-2"
        type="text"
        value={inputTask}
        onChange={handleTaskChange}
      />
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
      <button type="submit" onClick={handleSubmit}>
        Add Todo
      </button>
    </div>
  );
};

export default CreateTodoBar;
