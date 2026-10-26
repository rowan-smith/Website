import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DemoOutput } from '@/components/wiki/DemoOutput';
import { demoFieldClasses } from '@/lib/demoFieldClasses';
import { solidExamples } from '@/lib/solidExamples';

export function InversionDemo() {
  const [channel, setChannel] = useState<'email' | 'sms' | 'fake'>('email');
  const [order, setOrder] = useState('ORDER-1042');
  const [result, setResult] = useState('Choose an adapter and confirm an order.');

  return (
    <form
      className="mt-5 grid min-w-0 gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        const delivery = solidExamples.notify(order.trim(), channel);

        setResult(`${delivery.result}${channel === 'fake' ? ` · ${delivery.messages.length} message recorded; no delivery provider needed.` : ''}`);
      }}
    >
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Badge variant="secondary" className="rounded-full">Order policy</Badge>
        <span aria-hidden="true">→</span>
        <Badge variant="outline" className="rounded-full">Notifier contract</Badge>
        <span aria-hidden="true">←</span>
        <Badge variant="secondary" className="rounded-full">Email / SMS / Fake adapter</Badge>
      </div>
      <label className={demoFieldClasses.label}>
        Adapter supplied by the application
        <select
          className={demoFieldClasses.control}
          value={channel}
          onChange={(event) => {
            setChannel(event.target.value as typeof channel);
            setResult('Adapter changed. Confirm an order to run the policy.');
          }}
        >
          <option value="email">Email adapter (simulated)</option>
          <option value="sms">SMS adapter (simulated)</option>
          <option value="fake">Fake adapter (test recorder)</option>
        </select>
      </label>
      <label className={demoFieldClasses.label}>
        Order reference
        <input
          type="text"
          className={demoFieldClasses.control}
          maxLength={80}
          required
          pattern=".*\S.*"
          value={order}
          onChange={(event) => setOrder(event.target.value)}
        />
      </label>
      <Button type="submit" className="justify-self-start" disabled={!order.trim()}>
        Confirm order
      </Button>
      <DemoOutput>{result}</DemoOutput>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Local demonstration only. No email or SMS is sent. The order policy uses the same Notifier contract for every adapter.
      </p>
    </form>
  );
}
