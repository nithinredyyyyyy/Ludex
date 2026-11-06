export type PickemPicks = Record<string, Record<string, string>>;
export type PickemStorageState = {
  picks: PickemPicks;
  submittedEvents: string[];
};

const PICKS_KEY = "core-live-pickems-v1";
const SUBMITTED_KEY = "core-live-pickems-submitted-v1";

function readJson(key: string): unknown {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "null");
  } catch {
    return null;
  }
}

export function getPickemState(): PickemStorageState {
  const rawPicks = readJson(PICKS_KEY);
  const rawSubmitted = readJson(SUBMITTED_KEY);
  const picks =
    rawPicks && typeof rawPicks === "object" && !Array.isArray(rawPicks)
      ? (rawPicks as PickemPicks)
      : {};
  const submittedEvents = Array.isArray(rawSubmitted)
    ? rawSubmitted.filter((id): id is string => typeof id === "string")
    : [];
  return { picks, submittedEvents };
}

export function savePickemState(state: PickemStorageState): void {
  localStorage.setItem(PICKS_KEY, JSON.stringify(state.picks));
  localStorage.setItem(SUBMITTED_KEY, JSON.stringify(state.submittedEvents));
}

export function clearPickemEvent(
  state: PickemStorageState,
  eventId: string,
): PickemStorageState {
  const picks = { ...state.picks };
  delete picks[eventId];
  return {
    picks,
    submittedEvents: state.submittedEvents.filter((id) => id !== eventId),
  };
}
