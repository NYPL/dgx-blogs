import React from 'react';

class SkinnyBanner extends React.Component {
  constructor(props) {
    super(props);

    this.createMarkup = this.createMarkup.bind(this);
  }

  createMarkup(bodyText) {
    return { __html: bodyText };
  }

  render() {
    const skinnyBannerStyles =
      `
        a {
          color: #fff;
        }
        .skinnyBanner {
          background-color: #333333;
          color: white;
          font-family: Kievit-Book;
          font-weight: 400;
          min-height: 20px;
          margin: 0;
          padding: 20px 10px;
          text-decoration: none;
        }
        .contentWrapper {
          margin: 0 auto;
          margin-left: 15px;
          max-width: 1312px;
        }
        .skinnyBannerContent {
          font-size: 17px;
          font-weight: 400;
          letter-spacing: .04em;
          line-height: 24px;
          margin: 0;
        }
        @media (min-width: 768px) {
          .skinnyBanner {
            padding: 24px;
          }
          .contentWrapper {
            margin-left: 17%;
          }
        }
        @media (min-width: 1023px) {
          .skinnyBanner {
            padding: 20px 30px;
          }
        }
        @media (min-width: 1313px) {
          .skinnyBanner {
            padding: 20px 0;
          }
          .skinnyBannerContent {
            padding: 0 0 0 140px;
          }
          .contentWrapper {
            margin-left: 8%;
          }
        }
        @media (min-width: 1500px) {
          .contentWrapper {
            margin-left: 13%;
          }
        }
        @media (min-width: 1500px) {
          .contentWrapper {
            margin-left: 15%;
          }
        }
      `
    ;
    const surveyLink = (
      <a
        href="https://www.surveymonkey.com/r/BQGKY96"
        target="_blank"
        style={{ color: 'inherit' }}
      >
        survey
      </a>
    );
    const getContent = (path) => {
      if (path === '/' || path === '/blog/beta/') {
        return (<span>Go back to existing <a href="/blog">blog homepage</a></span>);
      } else if (path === '/blog/beta/authors' || path === '/authors') {
        return (<span>Go back to existing <a href="/voices/blogs/authors">authors page</a></span>);
      } else if (path.indexOf('subjects') !== -1) {
        return (<span>Go back to <a href="/blog/subject">subjects</a></span>);
      } else if (path.indexOf('series') !== -1) {
        let seriesIndex = path.indexOf('series') + 7;
        return (<span>Go back to <a href={`/voices/blogs/blog-channels/${path.substring(seriesIndex)}`}>
          series page</a></span>);
      } else if (path.indexOf('authors') !== -1 && (path.length > 18 || path.length > 9)) {
        let authorIndex = path.indexOf('authors') + 8;
        return (<span>Go back to <a href={`/blog/author/${path.substring(authorIndex)}`}>author page
          </a></span>);
      } else {
        let index = 1;
        if (path.indexOf('/blog/beta/') !== -1) {
          index = 11;
        }
        return (<span>View blog post in <a href={`/blog/${path.substring(index)}`}>
          existing template</a></span>);
      }

    };

    const content = getContent(this.props.path);

    return (
      <div className="skinnyBanner">
        <style dangerouslySetInnerHTML={this.createMarkup(skinnyBannerStyles)}>
        </style>
        <div className="contentWrapper">
          <p className="skinnyBannerContent">
            {content}
          </p>
        </div>
      </div>
    );
  }
}

export default SkinnyBanner;
