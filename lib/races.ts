// The road from half marathons to an Ironman 70.3. Update as races get done or booked.
export type RaceStatus = "done" | "next" | "planned" | "goal";

export interface Race {
    name: string;
    when: string;
    status: RaceStatus;
}

export const RACES: Race[] = [
    { name: "Half marathons", when: "Done", status: "done" },
    { name: "Manchester Marathon", when: "Apr 2027", status: "next" },
    { name: "Oslo Marathon", when: "2027", status: "planned" },
    { name: "Ironman 70.3", when: "2028", status: "goal" },
];
