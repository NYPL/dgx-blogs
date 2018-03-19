/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import BlogListing from './../src/app/components/BlogListing/BlogListing.jsx';


describe('BlogListing', () => {
  let component;
  before(() => {
    component = shallow(<BlogListing title="title" body="body" slug="slug" series={null} />);
  });

  it('is wrapped in a div.blogListing', () => {
    expect(component.find('.blogListing')).to.have.length(1);
  });

  it('contains an h1.blogListing-title', () => {
    const title = component.find('h1');
    expect(title).to.have.length(1);
    expect(title.hasClass('blogListing-title')).to.equal(true);
    expect(title.text()).to.equal('title');
  });

  it('has a a link in the heading', () => {
    const link = component.find('.blogListing').find('a').at(1);
    expect(link).to.have.length(1);
  });
});
