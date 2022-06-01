export default {

  // =========================================================================================
  // !!! Application Settings (Seed)
  // =========================================================================================

  /**
   * @type {string} application title
   */
  title: 'Sancho Admin Vue3 (Vite)',

  /**
   * @type {object} axios client settings
   */
  client: {
 
    /**
     * @type {boolean} indicates whether or not cross-site Access-Control requests should be made using credentials
     */
    withCredentials: false,
 
    /**
     * @type {number} specifies the number of milliseconds before the request times out
     */
    timeout: 10000
  },

  // =========================================================================================
  // !!! Layout Settings (Admin)
  // =========================================================================================

  layout: {

    showLogo: true,

    showTags: true,

    fixedHeader: true,
    
    defaultSideBarMode: 'collapse'

  },
 
  // =========================================================================================
  // !!! Security Settings (Admin)
  // =========================================================================================

  /**
   * @type {object} token and login settings
   */
  security: {

    /**
     * @type {string} 'header' | 'cookie'
     */
    tokenStrategy: 'cookie',

    /**
     * @type {object} token keys
     */
    tokenKey: {

      /**
       * @type {string} token key in http header
       */
      header: 'Access-Token',

      /**
       * @type {string} token key in cookie
       */
      cookie: 'ACCESS_TOKEN',

      /**
       * @type {string} token key in http parameter
       */
      param: 'token'
    },

    /**
     * @type {boolean} indicates whether or not encrypt request content
     */
    enableRequestEncryption: false,

    /**
     * @type {boolean} indicates whether or not decrypt request content
     */
    enableResponseDecryption: false,

    /**
     * @type {string} crypto key used to encrypt request or decrypt response
     */
    cryptoPassword: '******',

    /**
     * @type {object} login password settings
     */
    password: {

      /**
       * @type {RegExp} strong password pattern
       */
      strongRegexp: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>,.\/\|\\\[\]?]).{8,}$/,

      /**
       * @type {RegExp} medium strong password pattern
       */
      mediumRegexp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,

      /**
       * @type {RegExp} week password pattern
       */
      weekRegexp:   /^([A-Za-z]){8,}|([0-9]){8,}$/,

      /**
       * @type {number} min length of a valid password
       */
      minLength: 8,

      /**
       * @type {number} min score of a password that can be approved
       * @description 33 means week, 66 means medium
       */
      minPasswordScore: 33,

      /**
       * @type {function} encrypt password
       * @param {string} text password
       * @returns encrypted password
       */
      encrypt: function(text) {
        return text
      }
    },
  },

}
