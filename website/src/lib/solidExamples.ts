type Quote = (kg: number) => number;
type Notifier = { send: (message: string) => string };

const quotes: Record<string, Quote> = {
  standard: kg => 5 + kg,
  express: kg => 10 + 2 * kg,
  bicycle: kg => 3 + 0.5 * kg,
};

function checkout(items: number, kg: number, quote: Quote) {
  return items + quote(kg);
}

function confirmOrder(id: string, notifier: Notifier) {
  return notifier.send(`Confirmed: ${id}`);
}

export const solidExamples = {
  receipt(prices: number[], style: 'plain' | 'friendly') {
    const total = prices.reduce((sum, price) => sum + price, 0);
    const text = style === 'plain' ? `Total: $${total.toFixed(2)}` : `Thanks for visiting! Your total is $${total.toFixed(2)}.`;

    return { total, text };
  },
  quote(kind: string, kg: number, extensible: boolean) {
    if (!extensible && kind !== 'standard' && kind !== 'express') {
      return null;
    }

    const quote = quotes[kind];

    return quote ? checkout(40, kg, quote) : null;
  },
  resize(width: number, height: number, square: boolean) {
    // Execute the same sequence of setters against two implementations.
    const frame = { width: 1, height: 1 };

    const setWidth = (n: number) => {
      frame.width = n;

      if (square) { frame.height = n; }
    };

    const setHeight = (n: number) => {
      frame.height = n;

      if (square) { frame.width = n; }
    };

    setWidth(width);
    setHeight(height);

    return { ...frame, area: frame.width * frame.height, passed: frame.width === width && frame.height === height };
  },
  machine(allInOne: boolean, action: 'print' | 'scan', focused: boolean) {
    const printer = { print: () => 'Invoice printed' };
    const scanner = allInOne ? { scan: () => 'Document scanned' } : null;
    const fatInterface = {
      ...printer,
      scan: () => {
        if (!scanner) { throw new Error('No scanner'); }

        return scanner.scan();
      },
    };

    if (focused) {
      if (action === 'print') { return printer.print(); }

      return scanner ? scanner.scan() : 'Scanning unavailable: this device only implements Printer.';
    }

    try {
      return fatInterface[action]();
    } catch {
      return 'Error: No scanner. The oversized contract promised an unsupported operation.';
    }
  },
  notify(id: string, channel: 'email' | 'sms' | 'fake') {
    const messages: string[] = [];
    const adapters: Record<typeof channel, Notifier> = {
      email: { send: message => `Email adapter (simulated): ${message}` },
      sms: { send: message => `SMS adapter (simulated): ${message}` },
      fake: { send: message => { messages.push(message);

 return `Fake adapter recorded: ${message}`; } },
    };
    const result = confirmOrder(id, adapters[channel]);

    return { result, messages };
  },
};
