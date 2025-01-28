import { ModelState } from "./state.model";

export interface IBill extends ModelState<IBill> {
  id?: number;
  description?: string;
  amount?: number;
  dueDate?: string;
  status?: string;
}
