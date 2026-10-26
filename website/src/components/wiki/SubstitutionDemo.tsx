import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { CardDescription } from '@/components/ui/card';
import { ComparisonCard } from '@/components/wiki/ComparisonCard';
import { DemoOutput } from '@/components/wiki/DemoOutput';
import { demoFieldClasses } from '@/lib/demoFieldClasses';
import { solidExamples } from '@/lib/solidExamples';

export function SubstitutionDemo() {
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(3);
  const [result, setResult] = useState<{ width: number; height: number } | null>(null);

  return (
    <div className="mt-5 grid min-w-0 gap-5">
      <div className="grid min-w-0 grid-cols-2 gap-4 max-sm:grid-cols-1">
        <label className={demoFieldClasses.label}>
          Requested width: {width}
          <input
            type="range"
            className={demoFieldClasses.range}
            min="1"
            max="10"
            value={width}
            onChange={(event) => {
              setWidth(Number(event.target.value));
              setResult(null);
            }}
          />
        </label>
        <label className={demoFieldClasses.label}>
          Requested height: {height}
          <input
            type="range"
            className={demoFieldClasses.range}
            min="1"
            max="10"
            value={height}
            onChange={(event) => {
              setHeight(Number(event.target.value));
              setResult(null);
            }}
          />
        </label>
      </div>
      <p className="text-sm text-muted-foreground">
        Contract: <code className="font-mono text-foreground">setWidth(w)</code>, then{' '}
        <code className="font-mono text-foreground">setHeight(h)</code>, must preserve both requested dimensions.
      </p>
      <Button type="button" className="justify-self-start" onClick={() => setResult({ width, height })}>
        Run resize contract
      </Button>
      <div className="grid min-w-0 grid-cols-2 gap-4 max-sm:grid-cols-1" aria-live="polite">
        {[false, true].map((square) => {
          const test = result && solidExamples.resize(result.width, result.height, square);

          return (
            <ComparisonCard key={String(square)} title={square ? 'Square as mutable Rectangle' : 'Mutable Rectangle'}>
              {test ? (
                <>
                  <div className="flex h-32 items-center justify-center" aria-hidden="true">
                    <div
                      className="border-2 border-primary bg-primary/15"
                      style={{ width: test.width * 12, height: test.height * 12 }}
                    />
                  </div>
                  <p className="text-base font-medium">
                    {test.passed ? 'PASS' : 'FAIL'} · {test.width} × {test.height} = {test.area}
                  </p>
                  <CardDescription className="leading-relaxed">
                    Requested area: {width * height}.{' '}
                    {square ? 'The height setter also changes width.' : 'Each setter preserves the other dimension.'}
                  </CardDescription>
                </>
              ) : (
                <CardDescription>Ready to run</CardDescription>
              )}
            </ComparisonCard>
          );
        })}
      </div>
      {result && (
        <DemoOutput>
          {width === height
            ? 'Equal dimensions happen to pass. Try different values: this contract must hold for every permitted input.'
            : 'The Square breaks the independent-resize promise. Use the area-only Shape contract shown below for both shapes.'}
        </DemoOutput>
      )}
    </div>
  );
}
