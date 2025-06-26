import { TopLevelCategory } from '../top-page/schemas/top-page.schema';

type routeMapType = Record<TopLevelCategory, string>;

export const CATEGORY_URL: routeMapType = {
    0: '/courses',
    1: '/services',
    2: '/books',
    3: '/products',
};
