export function StrengthsGaps({ strengths, gaps }: { strengths: string[]; gaps: string[] }) {
  return (
    <div className="paper-sheet grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
      <List title="Working for you" items={strengths} marker="+" markerClass="text-accent" />
      <List title="Holding you back" items={gaps} marker="−" markerClass="text-primary" />
    </div>
  );
}

function List({ title, items, marker, markerClass }: { title: string; items: string[]; marker: string; markerClass: string }) {
  return (
    <div className="p-6">
      <h3 className="mb-4 font-display text-xl font-medium">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed">
            <span className={`font-mono font-semibold ${markerClass}`}>{marker}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
