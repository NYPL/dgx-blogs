import _ from 'underscore';

class BlogsModel {

  /**
   * build(data)
   * It is the initial function of Model class.
   * It gets the data from the Refinery, and returns an object in the end.
   * it returns null if the input is invalid.
   *
   * @param (Array) data
   */
  build(data) {
    /**
     * Make sure there's an input.
     */
    if (!data || !(_.isArray(data))) {
      return null;
    }

    /**
     * Make sure the data is not empty.
     */
    if (data.length > 0) {
      return _.map(data, b => {
        return this.modelBlog(b);
      });
    }

    return null;
  }

  modelAuthor(author) {
    const tmpAuthor = this.emptyAuthor();
    tmpAuthor.name = author.attributes['full-name'];
    tmpAuthor.role = author.attributes.title;

    return tmpAuthor;
  }

  emptyBlog() {
    return {
      id: null,
      title: null,
      author: {},
      body: {
        short: null,
        full: null,
      },
      series: [],
      subjects: [],
      uri: null,
    };
  }

  /**
   * Uses ES6 Destructuring to extract author's headshot image.
   * @returns {object}
   */
  getHeadshotImage(obj) {
    let result;
    if (!obj || _.isEmpty(obj)) {
      return null;
    }

    try {
      const {
        headshot: {
          attributes: {
            uri: {
              ['full-uri']: profileImgUrl = '',
            },
          },
        },
      } = obj;

      result = profileImgUrl;
    } catch (e) {
      result = undefined;
    }

    return result;
  }

  /**
   * Uses ES6 Destructuring to extract author's headshot image.
   * @returns {object}
   */
  getText(obj) {
    let result;
    if (!obj || _.isEmpty(obj)) {
      return null;
    }

    try {
      const {
        attributes: {
          ['profile-text']: {
            en: {
              text: profileText = ''
            },
          },
        },
      } = obj;

      result = profileText;
    } catch (e) {
      result = undefined;
    }

    return result;
  }

  /**
   * Uses ES6 Destructuring to extract author's properties.
   * @returns {object}
   */
  getAuthor(array) { 
    let result;
    if (!array || array.length === 0) {
      return undefined;
    }

    const blogAuthor = array[0];

    try {
      const {
        id: id,
        attributes: {
          ['profile-slug']: slug = '',
        },
        author: {
          attributes: {
            ['display-name']: displayName = '',
            location: location = '',
            ['first-name']: firstName = '',
            ['last-name']: lastName = '',
            ['full-name']: fullName = '',
            unit: unit = '',
            title: title = '',
          },
        },
      } = blogAuthor;

      result = {
        id,
        displayName,
        location,
        firstName,
        lastName,
        fullName,
        unit,
        title,
        profileImgUrl: this.getHeadshotImage(blogAuthor),
        slug,
        profileText: this.getText(blogAuthor),
      };
    } catch (e) {
      // console.log(e);
      // result = null;
      result = undefined;
    }

    return result;
  }

  getSeriesImg(series) {
    let result;
    if (!series || _.isEmpty(series)) {
      return null;
    }

    try {
      const {
        image: {
          attributes: {
            width: width = 0,
            height: height = 0,
            uri: {
              'full-uri': url = '',
              description: description = '',
            },
          },
        },
      } = series;

      result = {
        description,
        width,
        height,
        url,
      };
    } catch (e) {
      result = undefined;
    }

    return result;
  }

  getRssFullUri(series) {
    try {
      const {
        attributes: {
            'rss-uri': {
            'full-uri': fullUri = '',
          },
        },
      } = series;

      return fullUri;
    } catch (e) {
      //console.log(e)
      return undefined;
    }
  }  

  getSeries(array) {
    let result;
    if (!array || array.length === 0) {
      return null;
    }

    result = _.map(array, series => {
      let obj;
      try {
        const {
          id: id = '',
          attributes: {
            title: {
              en: {
                text: title = '',
              },
            },
            body: {
              en: {
                'full-text': body = '',
              },
            },
            audience: audience = '',
            subjects: subjects = '',
          },
        } = series;

        obj = {
          image: this.getSeriesImg(series),
          fullUri: this.getRssFullUri(series),
          title,
          body,
          id,
        };
      } catch (e) {
        console.log(e)
        obj = undefined;
      }

      return obj;
    });

    return result;
  }

  getSubjects(array) {
    let result;
    if (!array || array.length === 0) {
      return [];
    }

    result = _.map(array, subject => {
      try {
        return {
          id: subject.id,
          name: subject.attributes.name.en.text,
        };
      } catch (e) {
        return undefined;
      }
    });

    return result;
  }

  getSlug(uriObject) {
    const slug = uriObject['full-uri'].split('/blog/').pop();
    return slug;
  }

  convertDate(uriObject) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'];
    const dateStr = this.getSlug(uriObject).substring(0, 10);
    const date = new Date(dateStr);

    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  modelBlog(b) {
    let newBlog = this.emptyBlog();
    newBlog.id = b.id;
    newBlog.title = b.attributes.title.en.text;

    newBlog.body.short = this.htmlDecode(b.attributes.body.en['short-text']);
    newBlog.body.full = b.attributes.body.en['full-text'];

    newBlog.author = this.getAuthor(b['blog-profiles']);
    newBlog.series = this.getSeries(b['blog-series']);
    newBlog.subjects = this.getSubjects(b['blog-subjects']);
    newBlog.slug = this.getSlug(b.attributes.uri);
    newBlog.date = this.convertDate(b.attributes.uri);
    newBlog.mainPicture = b.attributes['featured-image'] ? b.attributes['featured-image'] : {};

    return newBlog;
  }

  htmlDecode(s) {
    const HTML_ESC_MAP = {
      nbsp: ' ',
      iexcl: '¡',
      cent: '¢',
      pound: '£',
      curren: '¤',
      yen: '¥',
      brvbar: '¦',
      sect: '§',
      uml: '¨',
      copy: '©',
      ordf: 'ª',
      laquo: '«',
      not: '¬',
      reg: '®',
      macr: '¯',
      deg: '°',
      plusmn: '±',
      sup2: '²',
      sup3: '³',
      acute: '´',
      micro: 'µ',
      para: '¶',
      middot: '·',
      cedil: '¸',
      sup1: '¹',
      ordm: 'º',
      raquo: '»',
      frac14: '¼',
      frac12: '½',
      frac34: '¾',
      iquest: '¿',
      Agrave: 'À',
      Aacute: 'Á',
      Acirc: 'Â',
      Atilde: 'Ã',
      Auml: 'Ä',
      Aring: 'Å',
      AElig: 'Æ',
      Ccedil: 'Ç',
      Egrave: 'È',
      Eacute: 'É',
      Ecirc: 'Ê',
      Euml: 'Ë',
      Igrave: 'Ì',
      Iacute: 'Í',
      Icirc: 'Î',
      Iuml: 'Ï',
      ETH: 'Ð',
      Ntilde: 'Ñ',
      Ograve: 'Ò',
      Oacute: 'Ó',
      Ocirc: 'Ô',
      Otilde: 'Õ',
      Ouml: 'Ö',
      times: '×',
      Oslash: 'Ø',
      Ugrave: 'Ù',
      Uacute: 'Ú',
      Ucirc: 'Û',
      Uuml: 'Ü',
      Yacute: 'Ý',
      THORN: 'Þ',
      szlig: 'ß',
      agrave: 'à',
      aacute: 'á',
      acirc: 'â',
      atilde: 'ã',
      auml: 'ä',
      aring: 'å',
      aelig: 'æ',
      ccedil: 'ç',
      egrave: 'è',
      eacute: 'é',
      ecirc: 'ê',
      euml: 'ë',
      igrave: 'ì',
      iacute: 'í',
      icirc: 'î',
      iuml: 'ï',
      eth: 'ð',
      ntilde: 'ñ',
      ograve: 'ò',
      oacute: 'ó',
      ocirc: 'ô',
      otilde: 'õ',
      ouml: 'ö',
      divide: '÷',
      oslash: 'ø',
      ugrave: 'ù',
      uacute: 'ú',
      ucirc: 'û',
      uuml: 'ü',
      yacute: 'ý',
      thorn: 'þ',
      yuml: 'ÿ',
      fnof: 'ƒ',
      Alpha: 'Α',
      Beta: 'Β',
      Gamma: 'Γ',
      Delta: 'Δ',
      Epsilon: 'Ε',
      Zeta: 'Ζ',
      Eta: 'Η',
      Theta: 'Θ',
      Iota: 'Ι',
      Kappa: 'Κ',
      Lambda: 'Λ',
      Mu: 'Μ',
      Nu: 'Ν',
      Xi: 'Ξ',
      Omicron: 'Ο',
      Pi: 'Π',
      Rho: 'Ρ',
      Sigma: 'Σ',
      Tau: 'Τ',
      Upsilon: 'Υ',
      Phi: 'Φ',
      Chi: 'Χ',
      Psi: 'Ψ',
      Omega: 'Ω',
      alpha: 'α',
      beta: 'β',
      gamma: 'γ',
      delta: 'δ',
      epsilon: 'ε',
      zeta: 'ζ',
      eta: 'η',
      theta: 'θ',
      iota: 'ι',
      kappa: 'κ',
      lambda: 'λ',
      mu: 'μ',
      nu: 'ν',
      xi: 'ξ',
      omicron: 'ο',
      pi: 'π',
      rho: 'ρ',
      sigmaf: 'ς',
      sigma: 'σ',
      tau: 'τ',
      upsilon: 'υ',
      phi: 'φ',
      chi: 'χ',
      psi: 'ψ',
      omega: 'ω',
      thetasym: 'ϑ',
      upsih: 'ϒ',
      piv: 'ϖ',
      bull: '•',
      hellip: '…',
      prime: '′',
      Prime: '″',
      oline: '‾',
      frasl: '⁄',
      weierp: '℘',
      image: 'ℑ',
      real: 'ℜ',
      trade: '™',
      alefsym: 'ℵ',
      larr: '←',
      uarr: '↑',
      rarr: '→',
      darr: '↓',
      harr: '↔',
      crarr: '↵',
      lArr: '⇐',
      uArr: '⇑',
      rArr: '⇒',
      dArr: '⇓',
      hArr: '⇔',
      forall: '∀',
      part: '∂',
      exist: '∃',
      empty: '∅',
      nabla: '∇',
      isin: '∈',
      notin: '∉',
      ni: '∋',
      prod: '∏',
      sum: '∑',
      minus: '−',
      lowast: '∗',
      radic: '√',
      prop: '∝',
      infin: '∞',
      ang: '∠',
      and: '∧',
      or: '∨',
      cap: '∩',
      cup: '∪',
      int: '∫',
      there4: '∴',
      sim: '∼',
      cong: '≅',
      asymp: '≈',
      ne: '≠',
      equiv: '≡',
      le: '≤',
      ge: '≥',
      sub: '⊂',
      sup: '⊃',
      nsub: '⊄',
      sube: '⊆',
      supe: '⊇',
      oplus: '⊕',
      otimes: '⊗',
      perp: '⊥',
      sdot: '⋅',
      lceil: '⌈',
      rceil: '⌉',
      lfloor: '⌊',
      rfloor: '⌋',
      lang: '〈',
      rang: '〉',
      loz: '◊',
      spades: '♠',
      clubs: '♣',
      hearts: '♥',
      diams: '♦',
      amp: '&',
      lt: '<',
      gt: '>',
      OElig: 'Œ',
      oelig: 'œ',
      Scaron: 'Š',
      scaron: 'š',
      Yuml: 'Ÿ',
      circ: 'ˆ',
      tilde: '˜',
      ndash: '–',
      mdash: '—',
      lsquo: '‘',
      rsquo: '’',
      sbquo: '‚',
      ldquo: '“',
      rdquo: '”',
      bdquo: '„',
      dagger: '†',
      Dagger: '‡',
      permil: '‰',
      lsaquo: '‹',
      rsaquo: '›',
      euro: '€',
    };

    const HTML_ESC_MAP_EXP = new RegExp("&("+Object.keys(HTML_ESC_MAP).join('|')+");", "g");

    return s ? s.replace(HTML_ESC_MAP_EXP, function (x) {
      return (HTML_ESC_MAP[x.substring(1, x.length -1)] || x);
    }) : s;
  }
}

export default new BlogsModel;
