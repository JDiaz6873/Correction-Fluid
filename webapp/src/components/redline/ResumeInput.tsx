import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { PanelLabel } from "./PanelLabel";
import { ResumeDropzone } from "./ResumeDropzone";

export type ResumeMode = "upload" | "paste";

interface Props {
  mode: ResumeMode;
  onModeChange: (mode: ResumeMode) => void;
  file: File | null;
  onFile: (file: File | null) => void;
  text: string;
  onText: (text: string) => void;
}

export function ResumeInput({ mode, onModeChange, file, onFile, text, onText }: Props) {
  return (
    <div className="paper-sheet p-5 md:p-6">
      <PanelLabel index="01" title="Your resume" hint="PDF · DOCX · TXT" />
      <Tabs value={mode} onValueChange={(v) => onModeChange(v as ResumeMode)}>
        <TabsList className="mb-4 grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger value="upload">Upload file</TabsTrigger>
          <TabsTrigger value="paste">Paste text</TabsTrigger>
        </TabsList>
        <TabsContent value="upload" className="mt-0">
          <ResumeDropzone file={file} onFile={onFile} />
        </TabsContent>
        <TabsContent value="paste" className="mt-0">
          <Textarea
            data-testid="resume-text"
            value={text}
            onChange={(e) => onText(e.target.value)}
            placeholder="Paste the full text of your resume…"
            className="ruled h-72 resize-none bg-card font-mono text-[13px] leading-7"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
