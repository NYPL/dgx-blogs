export default {
  appTitle: 'NYPL | Blogs',
  appName: 'NYPL App',
  favIconPath: '//d2znry4lg8s0tq.cloudfront.net/images/favicon.ico',
  port: 3001,
  webpackDevServerPort: 3000,
  api: {
    root: {
      development: 'https://dev-refinery.nypl.org',
      qa: 'https://qa-refinery.nypl.org',
      production: 'https://refinery.nypl.org',
    },
  },
  headerApi: {
    endpoint: '/api/nypl/ndo/v0.1/site-data/header-items',
    includes: [
      'children',
      'related-container-slots.current-item.square-image',
     ],
    filters: {
      'relationships': {'parent': 'null'}
    }
  },
  blogsApi: {
    common: '/api/nypl/ndo/v0.1',
    endpoint: '/api/nypl/ndo/v0.1/content/nodes/blogs',
    mainEndpoint: '/content/nodes/blogs',
    bloggerEndpoint: '/blogs/blogger-profiles',
    seriesEndpoint: '/blogs/blog-series',
    subjectEndpoint: '/blogs/blog-subjects',
    includes: ['blog-profiles.author', 'blog-profiles.headshot', 'blog-series.image', 'blog-subjects'],
    pageSize: '&page[size]=10',
    pageNumber: '&page[number]=1',
  },
};

