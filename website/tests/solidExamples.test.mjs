import assert from 'node:assert/strict';
import test from 'node:test';
import { solidExamples as examples } from '../src/lib/solidExamples.ts';

test('receipt formatting changes without changing price', () => {
  const plain = examples.receipt([5, 8], 'plain');
  const friendly = examples.receipt([5, 8], 'friendly');
  assert.equal(plain.total, 13);
  assert.equal(friendly.total, plain.total);
  assert.notEqual(plain.text, friendly.text);
});
test('checkout accepts new strategies while the old branch implementation rejects them', () => {
  assert.equal(examples.quote('standard', 2, false), 47);
  assert.equal(examples.quote('express', 2, true), 54);
  assert.equal(examples.quote('bicycle', 2, false), null);
  assert.equal(examples.quote('bicycle', 2, true), 44);
  assert.equal(examples.quote('unknown', 2, true), null);
});
test('resize contracts across every permitted pair of dimensions', () => {
  for (let w = 1; w <= 10; w++) {
    for (let h = 1; h <= 10; h++) {
      assert.deepEqual(examples.resize(w, h, false), { width: w, height: h, area: w * h, passed: true });
      const square = examples.resize(w, h, true);
      assert.equal(square.passed, w === h);
      assert.equal(square.area, h * h);
    }
  }
});
test('basic printing works; oversized scanning fails; focused contract excludes scanning', () => {
  assert.equal(examples.machine(false, 'print', false), 'Invoice printed');
  assert.equal(examples.machine(false, 'print', true), 'Invoice printed');
  assert.match(examples.machine(false, 'scan', false), /^Error: No scanner/);
  assert.match(examples.machine(false, 'scan', true), /^Scanning unavailable/);
  assert.equal(examples.machine(true, 'scan', true), 'Document scanned');
  assert.equal(examples.machine(true, 'scan', false), 'Document scanned');
});
test('one order policy uses every adapter; the fake records exactly one message per call', () => {
  for (const channel of ['email', 'sms', 'fake']) {
    assert.match(examples.notify('ORDER-1042', channel).result, /Confirmed: ORDER-1042/);
  }
  assert.deepEqual(examples.notify('A', 'fake').messages, ['Confirmed: A']);
  assert.deepEqual(examples.notify('B', 'fake').messages, ['Confirmed: B']);
  assert.deepEqual(examples.notify('A', 'email').messages, []);
});
