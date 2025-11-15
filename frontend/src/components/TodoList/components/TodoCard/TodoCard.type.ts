import type { Todo } from "../../../../types";

export interface TodoCardProps extends Todo {
  onDelete: (id: string) => Promise<void>;
  onUpdate: (
    id: string,
    edited: {
      title?: string;
      description?: string;
      backgroundColor?: string;
      isPinned?: boolean;
    }
  ) => Promise<void>;
}
