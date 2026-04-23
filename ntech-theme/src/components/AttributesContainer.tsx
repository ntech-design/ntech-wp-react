import { useQuery } from '@apollo/client/react';
import React from 'react';
import { GET_ALL_ATTRIBUTES } from '@/apollo/queries/attributes';
import Attribute from '@/components/Attribute';

interface AttributeNode {
  title: string;
  key: number;
}

interface AttributesData {
  attributes?: {
    nodes: AttributeNode[];
  };
}

const AttributesContainer = () => {
  const { loading, error, data } = useQuery<AttributesData>(GET_ALL_ATTRIBUTES);
  const attributesFound = Boolean(data?.attributes?.nodes?.length);

  return (
    <React.Fragment>
      <div id="frontPagePosts" className="container">
        <h1>Attributes</h1>

        {loading ? null : error ? (
          <p>Error: {error.message}</p>
        ) : !attributesFound ? (
          <p>Attributes could not be found</p>
        ) : (
          <div className="flex flex-wrap">
            {data?.attributes?.nodes?.map((attribute, index) => (
              <Attribute title={attribute.title} key={index} />
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default AttributesContainer;
