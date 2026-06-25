import { Card, CardContent } from '@/components/ui/card';

type StatBlockProps = {
  value: string;
  label: string;
};

export function StatBlock({ value, label }: StatBlockProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-1.5 py-6 text-center">
        <span className="text-[44px] leading-none font-bold tracking-tight max-sm:text-4xl">{value}</span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </CardContent>
    </Card>
  );
}
