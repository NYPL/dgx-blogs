import React from 'react';
import PropTypes from 'prop-types';

/**
 * Intended to have a generic hero easy to adapt to new sections
 */
const GenericHero = (props) => {
  const renderCoverImageUrl = () => {
    if (props.coverImageUrl) {
      return (<img src={props.coverImageUrl} alt="''" />);
    }

    return null;
  };

  return (
    <header className={`genericHero ${props.backgroundColorClass}`}>
      <div className="genericHero-content">
        <h1 className="genericHero-content-title">
          {props.title}
          <span className="nypl-icon-wedge-down"></span>
        </h1>
        {renderCoverImageUrl()}
      </div>
    </header>
  );
};

GenericHero.defaultProps = {
  coverImageUrl: null,
  title: null,
  backgroundColorClass: 'genericHero-default',
};

GenericHero.propTypes = {
  coverImageUrl: PropTypes.string,
  title: PropTypes.string,
  backgroundColorClass: PropTypes.string,
};

export default GenericHero;
