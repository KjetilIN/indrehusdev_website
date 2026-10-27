// The road from half marathons to an Ironman 70.3. Update as races get done or booked.
export type RaceStatus = "done" | "next" | "planned" | "goal";

export interface Race {
    name: string;
    when: string;
    status: RaceStatus;
    // Race day (approximate until booked), used for the countdown.
    date?: string;
    distance?: string;
}

export const RACES: Race[] = [
    { name: "Half marathons", when: "Done", status: "done", distance: "21.1 km" },
    { name: "Manchester Marathon", when: "Apr 2027", status: "next", date: "2027-04-18", distance: "42.2 km" },
    { name: "Oslo Marathon", when: "Sep 2027", status: "planned", date: "2027-09-18", distance: "42.2 km" },
    { name: "Ironman 70.3", when: "2028", status: "goal", distance: "1.9 · 90 · 21.1 km" },
];

export function getNextRace() {
    return RACES.find((race) => race.status === "next");
}

export function weeksUntil(iso: string, now = Date.now()) {
    return Math.max(0, Math.ceil((new Date(iso).getTime() - now) / (7 * 86_400_000)));
}
