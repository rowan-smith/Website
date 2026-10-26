import { useState } from 'react';

import { CardDescription } from '@/components/ui/card';
import { ComparisonCard } from '@/components/wiki/ComparisonCard';
import { DemoOutput } from '@/components/wiki/DemoOutput';
import { demoFieldClasses } from '@/lib/demoFieldClasses';
import { solidExamples } from '@/lib/solidExamples';

export function ResponsibilityDemo() {
  const [owner, setOwner] = useState('designer');
  const [style, setStyle] = useState<'plain' | 'friendly'>('plain');
  const receipt = solidExamples.receipt([5, 8], style);
  const focused = { accountant: 'PriceCalculator', designer: 'ReceiptFormatter', operations: 'OrderRepository' }[owner];

  return (
    <div className="mt-5 grid min-w-0 gap-5">
      <label className={demoFieldClasses.label}>
        Who requests the change?
        <select className={demoFieldClasses.control} value={owner} onChange={(event) => setOwner(event.target.value)}>
          <option value="designer">Designer: new receipt layout</option>
          <option value="accountant">Accountant: new pricing rule</option>
          <option value="operations">Operations: new storage system</option>
        </select>
      </label>
      <div className="grid min-w-0 grid-cols-2 gap-4 max-sm:grid-cols-1" aria-live="polite">
        <ComparisonCard title="Mixed responsibilities">
          <p className="text-base font-medium">Edit Checkout</p>
          <CardDescription className="leading-relaxed">Pricing, layout, and storage share this module.</CardDescription>
        </ComparisonCard>
        <ComparisonCard title="Focused responsibilities">
          <p className="text-base font-medium">Edit {focused}</p>
          <CardDescription className="leading-relaxed">The other two modules need no source edits.</CardDescription>
        </ComparisonCard>
      </div>
      <label className={demoFieldClasses.label}>
        Receipt style
        <select
          className={demoFieldClasses.control}
          value={style}
          onChange={(event) => setStyle(event.target.value as typeof style)}
        >
          <option value="plain">Plain</option>
          <option value="friendly">Friendly</option>
        </select>
      </label>
      <DemoOutput>
        {receipt.text} Pricing remains ${receipt.total.toFixed(2)} for a $5 coffee and an $8 sandwich.
      </DemoOutput>
    </div>
  );
}
