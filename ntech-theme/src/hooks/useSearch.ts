import { useLazyQuery } from '@apollo/client/react';
import { SEARCH_CONTENT } from '@/apollo/queries/search';
import { SearchQueryResult, SearchItem, CategoryNode } from '@/types/search';
import { useState, useMemo } from 'react';

export function useSearch() {
  const [term, setTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const [runSearch, { data, loading }] =
    useLazyQuery<SearchQueryResult>(SEARCH_CONTENT, {
      fetchPolicy: 'no-cache',
    });

  const search = (value: string) => {
    const trimmed = value.trim();
    setTerm(trimmed);

    if (!trimmed) return;

    setHasSearched(true);

    runSearch({
      variables: { term: trimmed },
    });
  };

  const results: SearchItem[] = useMemo(() => {
    const posts =
      data?.posts?.nodes
        ?.filter(p => p.postLayout?.placement?.[0] === 'content')
        .map(p => ({
          ...p,
          type: 'post' as const,
          category: p.categories?.nodes?.map((c: CategoryNode) => c.name).join(', ') ?? 'Uncategorized',
          url: p.categories?.nodes?.[0]?.slug ? `/${p.categories.nodes[0].slug}#${p.slug}` : '',
        })) ?? [];

    const pages =
      data?.pages?.nodes
        ?.filter(p => p.wpTemplate !== 'layout-error')
        .map(p => ({
          ...p,
          type: 'page' as const,
          title: p.slug,
          category: p.slug,
          url: p.uri ?? '',
        })) ?? [];

    return [...posts, ...pages];
  }, [data]);

  return {
    term,
    setTerm,
    search,
    loading,
    hasSearched,
    results,
  };
}