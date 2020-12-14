import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "sender_id", type: "integer", nullable: false })
  senderId: number;

  @Column({ name: "receiver_id", type: "integer", nullable: false })
  receiverId: number;

  @Column({ name: "content", type: "varchar", nullable: true, length: 5000 })
  content: string;

  @ManyToOne(() => User, (user) => user.sentMessages, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "sender_id", referencedColumnName: "id" }])
  sender: User;

  @ManyToOne(() => User, (user) => user.sentMessages, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "receiver_id", referencedColumnName: "id" }])
  receiver: User;

  public constructor(props?: Partial<Message>) {
    if (props) this.update(props);
  }

  private update(props: Partial<Message>): Message {
    return Object.assign(this, props);
  }
}
