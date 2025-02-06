import { ModelState } from "../state.model";


export interface ICategory extends ModelState<ICategory> {
    name?: string,
    color?: string,
    icon?: string,
    userId?: string,
    status?: string,
    id?: string
}
