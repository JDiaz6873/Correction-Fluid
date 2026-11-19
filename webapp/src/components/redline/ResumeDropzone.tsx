import { useRef, useState, type DragEvent } from "react";
import { FileText, UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCEPT = ".pdf,.docx,.txt,.md";

interface Props {
  file: File | null;
  onFile: (file: File | null) => void;
}

function formatSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function ResumeDropzone({ file, onFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) onFile(dropped);
  };

  if (file) {
    return (
      <div className="flex h-72 flex-col items-center justify-center gap-4 rounded-md border border-border bg-secondary/50 p-6">
        <div className="relative">
          <div className="flex h-20 w-16 items-center justify-center rounded-sm border border-border bg-card shadow-sm">
            <FileText className="h-7 w-7 text-primary" />
          </div>
          <span className="absolute -bottom-2 -right-3 rounded-sm bg-ink px-1.5 py-0.5 font-mono text-[10px] uppercase text-ink-foreground">
            {file.name.split(".").pop()}
          </span>
        </div>
        <div className="text-center">
          <p className="max-w-[16rem] truncate font-medium" data-testid="resume-file-name">{file.name}</p>
          <p className="font-mono text-xs text-muted-foreground">{formatSize(file.size)} · ready to review</p>
        </div>
        <button
          onClick={() => onFile(null)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
        >
          <X className="h-3.5 w-3.5" /> Remove
        </button>
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      data-testid="resume-dropzone"
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={cn(
        "group flex h-72 cursor-pointer flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed p-6 text-center transition-all",
        dragging ? "border-primary bg-primary/5" : "border-input hover:border-foreground/40 hover:bg-secondary/40",
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary transition-transform group-hover:-translate-y-1">
        <UploadCloud className="h-6 w-6 text-foreground" />
      </div>
      <div>
        <p className="font-medium">Drop your resume here</p>
        <p className="mt-1 text-sm text-muted-foreground">or click to browse — PDF, DOCX, or TXT up to 8 MB</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        data-testid="resume-file-input"
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}
