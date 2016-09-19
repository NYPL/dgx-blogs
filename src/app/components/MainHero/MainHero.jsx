import React from 'react';

const MainHero = (props) => (
  <header className="mainHero">
    <div className="mainHero-wrapper">
      <div className="mainHero-wrapper-content">
        <h1 className="mainHero-wrapper-content-title">{props.title}</h1>
        <p className="mainHero-wrapper-content-subtitle">{props.subtitle}</p>
      </div>
    </div>
  </header>
);

MainHero.defaultProps = {
  title: 'NYPL Blogs',
  subtitle: `From great literature or children's books to job search help and New York 
    City history, our librarians, curators, and staff offer valuable insight.
    Join the conversation.`,
};

MainHero.propTypes = {
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
};

export default MainHero;
