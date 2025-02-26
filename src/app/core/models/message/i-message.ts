import { ModelState } from "@fynnc.models";

export interface IMessage extends ModelState<IMessage> {
    id?: string;
    sender?: string;
    receiver?: string;
    content?: string;
    timestamp?: string;
    status?: string;
    image?: string;
}
