import { useMemo, useRef } from 'react';
import { InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { useRecoilState } from 'recoil';

import { tokenPairState } from '@/auth/states/tokenPairState';
import { isDebugModeState } from '@/client-config/states/isDebugModeState';
import { CommentThreadTarget } from '~/generated/graphql';

import { ApolloFactory } from '../services/apollo.factory';

export function useApolloFactory() {
  const apolloRef = useRef<ApolloFactory<NormalizedCacheObject> | null>(null);
  const [isDebugMode] = useRecoilState(isDebugModeState);

  const [tokenPair, setTokenPair] = useRecoilState(tokenPairState);

  const apolloClient = useMemo(() => {
    apolloRef.current = new ApolloFactory({
      uri: `${process.env.REACT_APP_API_URL}`,
      cache: new InMemoryCache({
        typePolicies: {
          CommentThread: {
            fields: {
              commentThreadTargets: {
                merge(
                  existing: CommentThreadTarget[] = [],
                  incoming: CommentThreadTarget[],
                ) {
                  return [...incoming];
                },
              },
            },
          },
        },
      }),
      defaultOptions: {
        query: {
          fetchPolicy: 'cache-first',
        },
      },
      onTokenPairChange(tokenPair) {
        setTokenPair(tokenPair);
      },
      onUnauthenticatedError() {
        setTokenPair(null);
      },
      extraLinks: [],
      isDebugMode,
      tokenPair,
    });

    return apolloRef.current.getClient();
  }, [setTokenPair, isDebugMode, tokenPair]);

  return apolloClient;
}
