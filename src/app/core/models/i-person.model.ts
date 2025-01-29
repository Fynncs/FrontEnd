import { ModelState } from "@fynnc.models";

export interface IPerson extends ModelState<IPerson> {
    userId?: string;
    nickname?: string;
    name?: string;
    birthday?: Date;
    gender?: string;
    nationality?: string;
    maritalStatus?: string;
    profession?: string;
    education?: string;
}
