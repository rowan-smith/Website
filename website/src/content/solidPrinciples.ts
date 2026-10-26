export const solidPrinciples = [
  {
    id: 'single-responsibility', letter: 'S', name: 'Single Responsibility',
    summary: 'Keep together the things that change for the same reason.',
    everyday: 'In a café, the accountant owns pricing rules, the designer owns the receipt layout, and operations owns record storage. If all three edit the same checkout module, a new receipt design puts pricing code in the path of an unrelated change.',
    explanation: 'Separate price calculation, receipt formatting, and persistence around their different owners and reasons to change. A module can have several methods and still have one responsibility. The useful question is who asks for a change, rather than how many lines or methods a class contains.',
    tryIt: 'Choose who requested a change. Compare the shared module with the focused module that needs editing. Then change the receipt style: the displayed total should stay the same.',
    takeaway: 'A shared file does not guarantee a bug. It creates avoidable coupling: unrelated changes touch the same place and need broader review.',
    caution: 'Do not create a class for every statement. Keep cohesive work together; split concerns when their reasons to change actually differ.',
    before: `// Three different owners change this module.
class Checkout {
  total(prices: number[]) { /* pricing rules */ }
  receipt(total: number) { /* receipt layout */ }
  save(total: number) { /* database storage */ }
}`,
    after: `const calculateTotal = (prices: number[]) =>
  prices.reduce((sum, price) => sum + price, 0);

const formatReceipt = (total: number) =>
  'Total: $' + total.toFixed(2);

// Persistence belongs to a separate module.
// A layout edit leaves pricing untouched.`,
    pattern: 'Related technique: separation of concerns. No particular design pattern is required.',
    source: { label: 'Robert C. Martin: The Single Responsibility Principle', href: 'https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html' },
  },
  {
    id: 'open-closed', letter: 'O', name: 'Open/Closed',
    summary: 'Add a variation through a stable extension point.',
    everyday: 'An online shop starts with standard and express delivery. When a bicycle courier becomes available, checkout should accept a new delivery option without gaining another delivery-specific branch.',
    explanation: 'Define the small contract that checkout needs: a function that quotes a delivery price for a weight. Each delivery option implements that contract. Adding an option changes the registration or wiring, while the checkout calculation stays unchanged. This protects the code that combines the item total and delivery cost.',
    tryIt: 'Change the parcel weight and add the bicycle courier. The branch-based implementation cannot quote the new option; the extensible checkout can call the new strategy.',
    takeaway: 'The system still changes. The point is to keep a chosen, stable part closed to this kind of modification while allowing new implementations around it.',
    caution: 'Fix bugs in existing code. Avoid inventing extension points for every hypothetical future requirement; introduce them around variations you can identify.',
    before: `function delivery(kind: string, kg: number) {
  if (kind === 'standard') return 5 + kg;
  if (kind === 'express') return 10 + 2 * kg;
  throw new Error('Unsupported delivery option');
  // Every new option needs another branch here.
}`,
    after: `type Quote = (kg: number) => number;
const checkout = (items: number, kg: number, quote: Quote) =>
  items + quote(kg);

const bicycle: Quote = kg => 3 + 0.5 * kg;
checkout(40, 2, bicycle); // $44; checkout unchanged`,
    pattern: 'Related pattern: Strategy. A registry or composition root selects the strategy.',
    source: { label: 'Robert C. Martin: The Open Closed Principle', href: 'https://blog.cleancoder.com/uncle-bob/2014/05/12/TheOpenClosedPrinciple.html' },
  },
  {
    id: 'liskov-substitution', letter: 'L', name: 'Liskov Substitution',
    summary: 'A replacement must keep the promises its caller relies on.',
    everyday: 'A picture-frame tool lets a customer resize a rectangular frame. Setting its height promises to leave its width alone. A square frame that silently changes both dimensions breaks that promise, even though a square is mathematically a rectangle.',
    explanation: 'Subtyping is about behaviour, including preconditions, postconditions, and invariants. Matching method names is insufficient. A mutable Square with linked dimensions cannot safely replace a Rectangle whose dimensions are independently settable. Give both a smaller, read-only Shape contract with area(), and keep their different resizing operations separate.',
    tryIt: 'Set the requested width and height, then run the same resize contract against each implementation. Try equal dimensions too: one passing input does not prove substitutability.',
    takeaway: 'The failed contract is independent resizing, not area calculation. Under an area-only contract, both shapes can be valid substitutes.',
    caution: 'A legitimate error allowed by the base contract is not automatically a violation. Define the promised behaviour first, then test replacements against it.',
    before: `// Rectangle promises independent dimensions.
const frame = { width: 1, height: 1 };
const setSquareWidth = (n: number) => {
  frame.width = n; frame.height = n;
};
const setSquareHeight = setSquareWidth;
setSquareWidth(5); setSquareHeight(3);
// Expected 5 × 3 = 15; actually 3 × 3 = 9.`,
    after: `interface Shape { area(): number }
const rectangle = (w: number, h: number): Shape => ({
  area: () => w * h,
});
const square = (side: number): Shape => ({
  area: () => side * side,
});
// Neither promises independent resizing.`,
    pattern: 'Related technique: contract tests. Prefer composition when inheritance would promise incompatible behaviour.',
    source: { label: 'Barbara Liskov and Jeannette Wing: A Behavioral Notion of Subtyping (PDF)', href: 'https://www.cs.cmu.edu/~wing/publications/LiskovWing94.pdf' },
  },
  {
    id: 'interface-segregation', letter: 'I', name: 'Interface Segregation',
    summary: 'Give each caller the capabilities it actually needs.',
    everyday: 'A reception desk needs to print invoices. A basic printer can do that, but an all-in-one machine also scans. Requiring every printer to implement scan() forces the basic printer to offer an operation it cannot perform.',
    explanation: 'Separate Printer and Scanner contracts. The invoice workflow depends only on Printer. The document-import workflow depends on Scanner. An all-in-one device can satisfy both contracts without forcing every device or client to depend on both. Interfaces are shaped around client needs, rather than split into one method each by default.',
    tryIt: 'Switch between a basic printer and an all-in-one device. In the oversized interface, try scanning with the basic printer. In the focused version, the scanning workflow is offered only to a device with that capability.',
    takeaway: 'Printing works for both devices. The improvement is that printing clients have no scanning dependency and unsupported scanning is excluded at the capability boundary.',
    caution: 'Many tiny interfaces can add noise. Split around cohesive client roles, not an arbitrary target for interface size.',
    before: `interface OfficeMachine {
  print(): string;
  scan(): string;
}
const basic: OfficeMachine = {
  print: () => 'Invoice printed',
  scan: () => { throw new Error('No scanner'); },
};`,
    after: `interface Printer { print(): string }
interface Scanner { scan(): string }
const printInvoice = (device: Printer) => device.print();
const importDocument = (device: Scanner) => device.scan();

// Basic printer: Printer
// All-in-one: Printer & Scanner`,
    pattern: 'Related technique: capability interfaces. Adapter can bridge a vendor API to a client-specific contract.',
    source: { label: 'Robert C. Martin: The Interface Segregation Principle (PDF)', href: 'https://www.cs.utexas.edu/~downing/papers/ISP-1996.pdf' },
  },
  {
    id: 'dependency-inversion', letter: 'D', name: 'Dependency Inversion',
    summary: 'Keep business rules dependent on a contract, not a vendor.',
    everyday: 'An order desk has one rule: send a confirmation after an order is placed. The desk should not need to know which email company delivers it. It hands a message to a delivery contract, and an adapter handles the provider.',
    explanation: 'Define the notification contract alongside the order policy. Provider adapters implement that contract. The application entry point wires an adapter into the policy. Runtime calls still go from the policy to the adapter, but source dependencies point toward the policy-owned abstraction. A fake adapter can record messages for tests.',
    tryIt: 'Choose an email, SMS, or fake adapter, enter an order reference, and confirm the order. The same order policy calls each adapter. Nothing is sent over a network: all three adapters simulate delivery locally.',
    takeaway: 'Dependency injection is how this example supplies the adapter. Dependency inversion is the design rule about which code owns and depends on the abstraction. A dependency-injection container is optional.',
    caution: 'Passing a concrete vendor client into a constructor is injection, but it does not by itself invert the source dependency. Keep vendor details outside the policy.',
    before: `function confirmOrder(orderId: string) {
  const client = new VendorEmailClient();
  client.sendEmail('Confirmed: ' + orderId);
  // Order policy knows the vendor API.
}`,
    after: `// Contract owned by the order policy.
interface Notifier { send(message: string): string }
function confirmOrder(id: string, notifier: Notifier) {
  return notifier.send('Confirmed: ' + id);
}
// The entry point supplies Email, SMS, or Fake.
// Each adapter implements Notifier.`,
    pattern: 'Related patterns: Ports and Adapters, and constructor/function injection. Start with a plain function when that is enough.',
    source: { label: 'Robert C. Martin: A Little Architecture (dependency inversion)', href: 'https://blog.cleancoder.com/uncle-bob/2016/01/04/ALittleArchitecture.html' },
  },
] as const;
