import { Textarea } from "@/components/ui/textarea";
import { PanelLabel } from "./PanelLabel";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function JobInput({ value, onChange }: Props) {
  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  return (
    <div className="paper-sheet flex flex-col p-5 md:p-6">
      <PanelLabel index="02" title="The job" hint={`${words} words`} />
      <p className="mb-4 text-sm text-muted-foreground">
        Paste the full posting — responsibilities, requirements, and nice-to-haves all help.
      </p>
      <Textarea
        data-testid="job-description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={"Senior Product Designer — Acme\n\nWe're looking for someone who…\n\nRequirements:\n• 5+ years of …"}
        className="ruled min-h-[17rem] flex-1 resize-none bg-card text-[14px] leading-7"
      />
    </div>
  );
}
