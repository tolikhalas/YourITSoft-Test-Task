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

  constructor(partial?: Partial<Todo>) {
    Object.assign(this, partial);
    if (!this.state) {
      this.state = TodoState.Await;
    }
  }
}
