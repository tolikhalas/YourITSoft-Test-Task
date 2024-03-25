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
    <div className="grid space-y-2 md:min-w-[400px] lg:flex lg:min-w-full lg:space-x-2 lg:space-y-0">
      <input
        className="rounded-lg px-4 py-2"
        type="text"
        value={inputTask}
        onChange={handleTaskChange}
      />
      <div className="grid gap-2 md:grid-cols-2 lg:flex">
        <select
          className="cursor-pointer rounded-lg px-4 py-2 "
          name="state"
          id="state"
          value={selectedState}
          onChange={handleStateChange}
        >
          <option value="await">await</option>
          <option value="in progress">in progress</option>
          <option value="done">done</option>
        </select>
        <button
          className="border-gray-300 px-8"
          type="submit"
          onClick={handleSubmit}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
};

export default CreateTodoBar;
