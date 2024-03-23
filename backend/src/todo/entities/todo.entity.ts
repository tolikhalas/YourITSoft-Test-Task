import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TodoState } from './todoState.enum';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  task: string;

  @Column({
    type: 'enum',
    enum: TodoState,
    default: TodoState.Await,
  })
  state: TodoState;

  constructor(task?: string, state?: TodoState) {
    if (task) {
      this.task = task;
    }
    if (state) {
      this.state = state;
    } else {
      this.state = TodoState.Await;
    }
  }
}
