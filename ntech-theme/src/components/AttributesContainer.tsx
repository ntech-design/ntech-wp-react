import React, { Fragment, Suspense, lazy } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_ALL_ATTRIBUTES } from '@/apollo/queries/attributes';

interface AttributeNode {
  title: string;
  key: number;
}

interface AttributesData {
  attributes?: {
    nodes: AttributeNode[];
  };
}

const Attribute = lazy(() => import('@/components/Attribute'));
const AttributesContainer = () => {
  const { loading, error, data } = useQuery<AttributesData>(GET_ALL_ATTRIBUTES);
  const attributesFound = Boolean(data?.attributes?.nodes?.length);

  return (
    <Fragment>
      <div id="frontPagePosts" className="container">
        <h1>Attributes</h1>

        {loading ? null : error ? (
          <p>Error: {error.message}</p>
        ) : !attributesFound ? (
          <p>Attributes could not be found</p>
        ) : (
          <div className="flex flex-wrap">
            {data?.attributes?.nodes?.map((attribute, index) => (
              <Suspense fallback={null}>
                <Attribute title={attribute.title} key={index} />
              </Suspense>
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default AttributesContainer;
