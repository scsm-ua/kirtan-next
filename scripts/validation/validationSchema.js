const TRANSLATION_VALIDATION_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: [
    'A_Z_PAGE',
    'AUTHORS_PAGE',
    'BOOK_LIST_PAGE',
    'FOOTER',
    'CONTENTS_PAGE',
    'NOT_FOUND_PAGE',
    'SEARCH_PAGE',
    'SONG_PAGE',
    // 'i18n',
    'META'
  ],
  properties: {
    A_Z_PAGE: {
      type: 'object',
      additionalProperties: false,
      required: ['HEAD', 'SCHEMA'],
      properties: {
        HEAD: {
          type: 'object',
          additionalProperties: false,
          required: ['DESCRIPTION', 'TITLE'],
          properties: {
            DESCRIPTION: {
              type: 'string'
            },
            TITLE: {
              type: 'string'
            }
          }
        },
        SCHEMA: {
          type: 'object',
          additionalProperties: false,
          required: ['NAME', 'DESCRIPTION'],
          properties: {
            NAME: {
              type: 'string'
            },
            DESCRIPTION: {
              type: 'string'
            }
          }
        }
      }
    },
    AUTHORS_PAGE: {
      type: 'object',
      additionalProperties: false,
      required: ['HEAD', 'SCHEMA', 'LINK_FULL_TITLE', 'NO_AUTHOR'],
      properties: {
        HEAD: {
          type: 'object',
          additionalProperties: false,
          required: ['DESCRIPTION', 'TITLE'],
          properties: {
            DESCRIPTION: {
              type: 'string'
            },
            TITLE: {
              type: 'string'
            }
          }
        },
        SCHEMA: {
          type: 'object',
          additionalProperties: false,
          required: ['NAME', 'DESCRIPTION'],
          properties: {
            NAME: {
              type: 'string'
            },
            DESCRIPTION: {
              type: 'string'
            }
          }
        },
        LINK_FULL_TITLE: {
          type: 'string'
        },
        NO_AUTHOR: {
          type: 'string'
        }
      }
    },
    BOOK_LIST_PAGE: {
      type: 'object',
      additionalProperties: false,
      required: ['HEAD', 'SCHEMA', 'SONG_COUNT'],
      properties: {
        HEAD: {
          type: 'object',
          additionalProperties: false,
          required: ['DESCRIPTION', 'TITLE'],
          properties: {
            DESCRIPTION: {
              type: 'string'
            },
            TITLE: {
              type: 'string'
            }
          }
        },
        SCHEMA: {
          type: 'object',
          additionalProperties: false,
          required: ['NAME', 'DESCRIPTION'],
          properties: {
            NAME: {
              type: 'string'
            },
            DESCRIPTION: {
              type: 'string'
            }
          }
        },
        SONG_COUNT: {
          type: 'string'
        }
      }
    },
    FOOTER: {
      type: 'object',
      additionalProperties: false,
      required: ['BOOKS', 'CONTENTS', 'INDEX', 'SEARCH'],
      properties: {
        BOOKS: {
          type: 'string'
        },
        CONTENTS: {
          type: 'string'
        },
        INDEX: {
          type: 'string'
        },
        SEARCH: {
          type: 'string'
        }
      }
    },
    CONTENTS_PAGE: {
      type: 'object',
      additionalProperties: false,
      required: ['HEAD', 'SCHEMA'],
      properties: {
        HEAD: {
          type: 'object',
          additionalProperties: false,
          required: ['DESCRIPTION', 'TITLE'],
          properties: {
            DESCRIPTION: {
              type: 'string'
            },
            TITLE: {
              type: 'string'
            }
          }
        },
        SCHEMA: {
          type: 'object',
          additionalProperties: false,
          required: ['NAME', 'DESCRIPTION'],
          properties: {
            NAME: {
              type: 'string'
            },
            DESCRIPTION: {
              type: 'string'
            }
          }
        }
      }
    },
    NOT_FOUND_PAGE: {
      type: 'object',
      additionalProperties: false,
      required: ['HEAD', 'SCHEMA', 'TEXT', 'TITLE'],
      properties: {
        HEAD: {
          type: 'object',
          additionalProperties: false,
          required: ['DESCRIPTION', 'TITLE'],
          properties: {
            DESCRIPTION: {
              type: 'string'
            },
            TITLE: {
              type: 'string'
            }
          }
        },
        SCHEMA: {
          type: 'object',
          additionalProperties: false,
          required: ['NAME', 'DESCRIPTION'],
          properties: {
            NAME: {
              type: 'string'
            },
            DESCRIPTION: {
              type: 'string'
            }
          }
        },
        TEXT: {
          type: 'string'
        },
        TITLE: {
          type: 'string'
        }
      }
    },
    SEARCH_PAGE: {
      type: 'object',
      additionalProperties: false,
      required: [
        'HEAD',
        'SCHEMA',
        'CLEAR',
        'FIND',
        'INPUT_PLACEHOLDER',
        'LOAD_MORE',
        'NO_RESULTS',
        'PAGE_LIST'
      ],
      properties: {
        HEAD: {
          type: 'object',
          additionalProperties: false,
          required: ['DESCRIPTION', 'TITLE'],
          properties: {
            DESCRIPTION: {
              type: 'string'
            },
            TITLE: {
              type: 'string'
            }
          }
        },
        SCHEMA: {
          type: 'object',
          additionalProperties: false,
          required: ['NAME', 'DESCRIPTION'],
          properties: {
            NAME: {
              type: 'string'
            },
            DESCRIPTION: {
              type: 'string'
            }
          }
        },
        CLEAR: {
          type: 'string'
        },
        FIND: {
          type: 'string'
        },
        INPUT_PLACEHOLDER: {
          type: 'string'
        },
        LOAD_MORE: {
          type: 'string'
        },
        NO_RESULTS: {
          type: 'string'
        },
        PAGE_LIST: {
          type: 'string'
        }
      }
    },
    SONG_PAGE: {
      type: 'object',
      additionalProperties: false,
      required: [
        'CLOSE',
        'COPY',
        'COPY_LINK',
        'NEXT_SONG',
        'OTHER_TRANSLATIONS',
        'PREVIOUS_SONG',
        'SHARE',
        'SHARE_SONG',
        'SHOW_TRANSLATION',
        'PAGE',
        'NEXT'
      ],
      properties: {
        CLOSE: {
          type: 'string'
        },
        COPY: {
          type: 'string'
        },
        COPY_LINK: {
          type: 'string'
        },
        NEXT_SONG: {
          type: 'string'
        },
        OTHER_TRANSLATIONS: {
          type: 'string'
        },
        PREVIOUS_SONG: {
          type: 'string'
        },
        SHARE: {
          type: 'string'
        },
        SHARE_SONG: {
          type: 'string'
        },
        SHOW_TRANSLATION: {
          type: 'string'
        },
        PAGE: {
          type: 'string'
        },
        NEXT: {
          type: 'string'
        }
      }
    },
    i18n: {
      type: 'object',
      additionalProperties: false,
      required: [
        'Bhakti Lalita Devi',
        'Srila Sridhar Maharaj',
        'Srila Govinda Maharaj',
        'Sripad Bhagavat Maharaj',
        'Srila Acharya Maharaj',
        'Srila Madhusudan Maharaj',
        'Srila Goswami Maharaj',
        'Srila Avadhut Maharaj',
        'Sudarshan Prabhu',
        'Karakas Dham',
        'Navadvip Dham'
      ],
      properties: {
        'Bhakti Lalita Devi': {
          type: 'string'
        },
        'Srila Sridhar Maharaj': {
          type: 'string'
        },
        'Srila Govinda Maharaj': {
          type: 'string'
        },
        'Sripad Bhagavat Maharaj': {
          type: 'string'
        },
        'Srila Acharya Maharaj': {
          type: 'string'
        },
        'Srila Madhusudan Maharaj': {
          type: 'string'
        },
        'Srila Goswami Maharaj': {
          type: 'string'
        },
        'Srila Avadhut Maharaj': {
          type: 'string'
        },
        'Sudarshan Prabhu': {
          type: 'string'
        },
        'Karakas Dham': {
          type: 'string'
        },
        'Navadvip Dham': {
          type: 'string'
        }
      }
    },
    META: {
      type: 'object',
      additionalProperties: false,
      required: ['TRANSLATION_NAME'],
      properties: {
        TRANSLATION_NAME: {
          type: 'string'
        }
      }
    }
  }
};

/**
 *
 */
const SONGBOOKS_VALIDATION_SCHEMA = {
	type: 'object',
	additionalProperties: true,
	required: ['slug', 'songsCount', 'subtitle', 'title'],
	properties: {
		slug: { type: 'string' },
		songsCount: { type: 'number' },
		subtitle: { type: 'string' },
		title: { type: 'string' },
	}
};

/**/
module.exports = {
	SONGBOOKS_VALIDATION_SCHEMA,
	TRANSLATION_VALIDATION_SCHEMA
};
