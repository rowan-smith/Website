import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { CardDescription } from '@/components/ui/card';
import { ComparisonCard } from '@/components/wiki/ComparisonCard';
import { demoFieldClasses } from '@/lib/demoFieldClasses';
import { solidExamples } from '@/lib/solidExamples';

export function ExtensionDemo() {
  const [kg, setKg] = useState(2);
  const [bicycleAdded, setBicycleAdded] = useState(false);
  const [kind, setKind] = useState('standard');
  const oldTotal = solidExamples.quote(kind, kg, false);
  const newTotal = solidExamples.quote(kind, kg, true);

  return (
    <div className="mt-5 grid min-w-0 gap-5">
      <label className={demoFieldClasses.label}>
        Parcel weight: {kg} kg
        <input
          type="range"
          className={demoFieldClasses.range}
          min="1"
          max="10"
          step="1"
          value={kg}
          onChange={(event) => setKg(Number(event.target.value))}
        />
      </label>
      <label className={demoFieldClasses.label}>
        Delivery strategy
        <select className={demoFieldClasses.control} value={kind} onChange={(event) => setKind(event.target.value)}>
          <option value="standard">Standard: $5 + $1/kg</option>
          <option value="express">Express: $10 + $2/kg</option>
          {bicycleAdded && <option value="bicycle">Bicycle: $3 + $0.50/kg</option>}
        </select>
      </label>
      <Button
        type="button"
        variant="outline"
        className="justify-self-start"
        disabled={bicycleAdded}
        onClick={() => {
          setBicycleAdded(true);
          setKind('bicycle');
        }}
      >
        {bicycleAdded ? 'Bicycle strategy registered' : 'Add bicycle courier'}
      </Button>
      <div className="grid min-w-0 grid-cols-2 gap-4 max-sm:grid-cols-1" aria-live="polite">
        <ComparisonCard title="Branch-based checkout">
          <p className="text-base font-medium">{oldTotal === null ? 'Unsupported option' : `$${oldTotal.toFixed(2)}`}</p>
          <CardDescription className="leading-relaxed">
            {oldTotal === null ? 'Needs another branch in the existing calculation.' : 'Includes $40 of items and delivery.'}
          </CardDescription>
        </ComparisonCard>
        <ComparisonCard title="Strategy-based checkout">
          <p className="text-base font-medium">${newTotal?.toFixed(2)}</p>
          <CardDescription className="leading-relaxed">Calls the supplied quote function. Checkout source unchanged.</CardDescription>
        </ComparisonCard>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="justify-self-start"
        onClick={() => {
          setKg(2);
          setKind('standard');
          setBicycleAdded(false);
        }}
      >
        Reset delivery demo
      </Button>
    </div>
  );
}
