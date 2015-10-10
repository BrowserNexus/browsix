/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

'use strict';

import * as chai from 'chai';
import { Boot, Kernel } from '../lib/kernel/kernel';

const expect = chai.expect;

const IS_KARMA = typeof window !== 'undefined' && typeof (<any>window).__karma__ !== 'undefined';
const PREFIX = IS_KARMA ? '/base/' : '';

const NODE = PREFIX + 'dist/lib/browser-node/browser-node.js';
const ECHO = PREFIX + 'lib/bin/echo.js';

export const name = 'test-xhrfs';

describe('find /bin/node', function(): void {
	let kernel: Kernel = null;

	it('should boot', function(done: MochaDone): void {
		Boot('XmlHttpRequest', ['index.json', PREFIX+'fs/'], function(err: any, freshKernel: Kernel): void {
			expect(err).to.be.null;
			expect(freshKernel).not.to.be.null;
			kernel = freshKernel;
			done();
		});
	});

	it('should open /bin/node', function(done: MochaDone): void {
		kernel.fs.open('/bin/node', 'r', nodeOpened);
		function nodeOpened(err: any, fd: any): void {
			try {
				console.log('err: ' + err);
				console.log(err);
				expect(err).to.be.null;
				done();
			} catch (e) {
				done(e);
			}
		}
	});
});