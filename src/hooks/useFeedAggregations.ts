import {useMemo} from 'react';
import {FeedItem} from '../types';

export const useFeedAggregations = (feed: FeedItem[]) =>
  useMemo(() => {
    const buckets = feed.reduce<Record<string, FeedItem[]>>((acc, item) => {
      acc[item.category] = acc[item.category] ? [...acc[item.category], item] : [item];
      return acc;
    }, {});

    const highlights = Object.entries(buckets)
      .map(([category, items]) => ({
        category,
        count: items.length,
        top: items[0]
      }))
      .sort((a, b) => (b.top?.score || 0) - (a.top?.score || 0));

    return {
      highlights,
      density: feed.length / 24,
      freshness: feed[0]?.createdAt
    };
  }, [feed]);

