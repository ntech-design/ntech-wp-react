import React, { Fragment } from 'react';
import { safeHtml } from '@/utils/template';

interface AttributeProps {
  title: string;
  key: number;
}

const Attribute = (props: AttributeProps) => {
  return (
    <Fragment>
      <div className="attribute" >
        <div className="attribute__icon">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        </div>
        <div className="flex-grow pl-6">
          <h2 className="attribute__title" dangerouslySetInnerHTML={ safeHtml(props.title) } />
        </div>
      </div>
    </Fragment>
  );
};

export default Attribute;
