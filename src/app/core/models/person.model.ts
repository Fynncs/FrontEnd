import { IPerson, ModelState } from "@fynnc.models";

export class Person extends ModelState<IPerson> implements IPerson {
    private _userId?: string;
    private _nickname?: string;
    private _name?: string | undefined;
    private _birthday?: Date | undefined;
    private _gender?: string | undefined;
    private _nationality?: string | undefined;
    private _maritalStatus?: string | undefined;
    private _profession?: string | undefined;
    private _education?: string | undefined;

    constructor(person: IPerson = {} as IPerson) {
        super(person);
        this._userId = person.userId;
        this._nickname = person.nickname;
        this._name = person.name;
        this._birthday = person.birthday;
        this._gender = person.gender;
        this._nationality = person.nationality;
        this._maritalStatus = person.maritalStatus;
        this._profession = person.profession;
        this._education = person.education;
    }

    public get userId(): string | undefined {
        return this._userId;
    }
    public set userId(value: string | undefined) {
        this._userId = value;
    }

    public get nickname(): string | undefined {
        return this._nickname;
    }
    public set nickname(value: string | undefined) {
        this._nickname = value;
    }

    public get name(): string | undefined {
        return this._name;
    }
    public set name(value: string | undefined) {
        this._name = value;
    }

    public get birthday(): Date | undefined {
        return this._birthday;
    }
    public set birthday(value: Date | undefined) {
        this._birthday = value;
    }

    public get gender(): string | undefined {
        return this._gender;
    }
    public set gender(value: string | undefined) {
        this._gender = value;
    }

    public get nationality(): string | undefined {
        return this._nationality;
    }
    public set nationality(value: string | undefined) {
        this._nationality = value;
    }

    public get maritalStatus(): string | undefined {
        return this._maritalStatus;
    }
    public set maritalStatus(value: string | undefined) {
        this._maritalStatus = value;
    }

    public get profession(): string | undefined {
        return this._profession;
    }
    public set profession(value: string | undefined) {
        this._profession = value;
    }

    public get education(): string | undefined {
        return this._education;
    }
    public set education(value: string | undefined) {
        this._education = value;
    }

    toJSON(): Partial<IPerson> {
        return {
            userId: this.userId,
            nickname: this.nickname,
            name: this.name,
            birthday: this.birthday,
            gender: this.gender,
            nationality: this.nationality,
            maritalStatus: this.maritalStatus,
            profession: this.profession,
            education: this.education,
        }
    }
}
