import { ILoadable, Leader } from "@types";

export interface LeadersState extends ILoadable {
    leaders: Leader[];
}
