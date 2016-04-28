export default {
  appTitle: 'NYPL | Blogs',
  appName: 'NYPL App',
  favIconPath: 'http://ux-static.nypl.org.s3-website-us-east-1.amazonaws.com/images/favicon.ico',
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
      'related-mega-menu-panes.current-mega-menu-item.images',
      'related-mega-menu-panes.current-mega-menu-item.related-content.authors.nypl-location',
      'related-mega-menu-panes.current-mega-menu-item.related-content.location',
      'related-mega-menu-panes.default-mega-menu-item.images',
      'related-mega-menu-panes.default-mega-menu-item.related-content.authors.nypl-location',
      'related-mega-menu-panes.default-mega-menu-item.related-content.location'
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

