import React from 'react';

class MainHero extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    return (
      <header className="mainHero">
        <div className="mainHero-wrapper">
          <div className="mainHero-wrapper-content">
            <h1 className="mainHero-wrapper-content-title">{this.props.title}</h1>
            <p className="mainHero-wrapper-content-subtitle">{this.props.subtitle}</p>
          </div>
        </div>
      </header>
    );
  }
}

MainHero.defaultProps = {
  title: 'NYPL Blogs',
  subtitle: `From great literature or children's books to job search help and New York 
  City history, our librarians, curators, and staff offer valuable insight. Join the conversation.`,
}

export default MainHero;
