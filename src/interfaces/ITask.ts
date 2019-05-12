type TaskStatus = "pending" | "in_progress" | "testing" | "done";

export interface ITask {
  title: string;
  comments?: string;
  created: Date;
  closedAt?: Date;
  status: TaskStatus;
}
