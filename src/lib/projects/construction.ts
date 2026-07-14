/** Canonical construction stages (matches projects.construction_status + the
 *  project_construction_updates CHECK). Ordered launch → completed. */
export const CONSTRUCTION_STAGES = [
  { value: "pre_launch", label: "Pre-launch" },
  { value: "under_construction", label: "Under construction" },
  { value: "nearing_possession", label: "Nearing possession" },
  { value: "ready_to_move", label: "Ready to move" },
  { value: "completed", label: "Completed" },
] as const;

export type ConstructionStage = (typeof CONSTRUCTION_STAGES)[number]["value"];

export function constructionStageLabel(stage: string): string {
  return (
    CONSTRUCTION_STAGES.find((s) => s.value === stage)?.label ??
    stage.replace(/_/g, " ")
  );
}
