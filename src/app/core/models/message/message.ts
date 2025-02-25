import { ModelState } from "../state.model";
import { IMessage } from "./i-message";


export class Message extends ModelState<IMessage> implements IMessage {
  private _id?: string;
  private _sender?: string;
  private _receiver?: string;
  private _content?: string;
  private _timestamp?: string;
  private _status?: string;
  private _image?: string;

  constructor(message: IMessage = {} as IMessage) {
    super(message);
    this._id = message.id;
    this._sender = message.sender;
    this._receiver = message.receiver;
    this._content = message.content;
    this._timestamp = message.timestamp;
    this._status = message.status;
    this._image = message.image;
  }

  get id(): string | undefined {
    return this._id;
  }

  set id(value: string | undefined) {
    this._id = value;
  }

  get sender(): string | undefined {
    return this._sender;
  }

  set sender(value: string | undefined) {
    this._sender = value;
  }

  get receiver(): string | undefined {
    return this._receiver;
  }

  set receiver(value: string | undefined) {
    this._receiver = value;
  }

  get content(): string | undefined {
    return this._content;
  }

  set content(value: string | undefined) {
    this._content = value;
  }

  get timestamp(): string | undefined {
    return this._timestamp;
  }

  set timestamp(value: string | undefined) {
    this._timestamp = value;
  }

  get status(): string | undefined {
    return this._status;
  }

  set status(value: string | undefined) {
    this._status = value;
  }

  get image(): string | undefined {
    return this._image;
  }

  set image(value: string | undefined) {
    this._image = value;
  }

  toJSON(): Partial<IMessage> {
    return {
      id: this.id,
      sender: this.sender,
      receiver: this.receiver,
      content: this.content,
      timestamp: this.timestamp,
      status: this.status,
      image: this.image,
    };
  }
}
