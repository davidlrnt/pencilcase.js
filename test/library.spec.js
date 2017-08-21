/* global describe, it, before */

import chai from 'chai';
import {Text, Line} from '../lib/pencilcase.js';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of my Line library', () => {
  before(() => {
    lib = new Line();
  });
  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(lib.name).to.be.equal('Line');
    });
  });
});

describe('Given an instance of my Text library', () => {
  before(() => {
    lib = new Text();
  });
  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(lib.name).to.be.equal('Text');
    });
  });
});
