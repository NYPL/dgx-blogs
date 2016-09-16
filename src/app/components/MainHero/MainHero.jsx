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
  subtitle: `Welcome to the New York Public Library's weblogs, a space where a small but growing
    number of librarians, curators and other stuff are posting regular dispatches from their corner
    of the NYPL community.`,
}

export default MainHero;
