import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./Message";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message;

  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message;

  public constructor(props?: Partial<User>) {
    if (props) this.update(props);
  }

  private update(props: Partial<User>): User {
    return Object.assign(this, props);
  }
}
