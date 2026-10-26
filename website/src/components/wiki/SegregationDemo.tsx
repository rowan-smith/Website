import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { CardDescription } from '@/components/ui/card';
import { ComparisonCard } from '@/components/wiki/ComparisonCard';
import { DemoOutput } from '@/components/wiki/DemoOutput';
import { demoFieldClasses } from '@/lib/demoFieldClasses';
import { solidExamples } from '@/lib/solidExamples';

export function SegregationDemo() {
  const [allInOne, setAllInOne] = useState(false);
  const [result, setResult] = useState('Choose a workflow to see its result.');

  return (
    <div className="mt-5 grid min-w-0 gap-5">
      <label className={demoFieldClasses.label}>
        Office device
        <select
          className={demoFieldClasses.control}
          value={allInOne ? 'all' : 'basic'}
          onChange={(event) => {
            setAllInOne(event.target.value === 'all');
            setResult('Device changed. Choose a workflow.');
          }}
        >
          <option value="basic">Basic printer (Printer)</option>
          <option value="all">All-in-one (Printer + Scanner)</option>
        </select>
      </label>
      <div className="grid min-w-0 grid-cols-2 gap-4 max-sm:grid-cols-1">
        <ComparisonCard title="Oversized OfficeMachine">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setResult(solidExamples.machine(allInOne, 'print', false))}
            >
              Print via OfficeMachine
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setResult(solidExamples.machine(allInOne, 'scan', false))}
            >
              Scan via OfficeMachine
            </Button>
          </div>
        </ComparisonCard>
        <ComparisonCard title="Focused client contracts">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setResult(solidExamples.machine(allInOne, 'print', true))}
            >
              Print via Printer
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!allInOne}
              onClick={() => setResult(solidExamples.machine(allInOne, 'scan', true))}
            >
              Scan via Scanner
            </Button>
          </div>
          {!allInOne && (
            <CardDescription className="leading-relaxed">
              Scanning is unavailable because this device has no Scanner capability.
            </CardDescription>
          )}
        </ComparisonCard>
      </div>
      <DemoOutput>{result}</DemoOutput>
    </div>
  );
}
