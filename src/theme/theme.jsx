import {createMuiTheme,responsiveFontSizes} from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';



const Eczar={
  fontFamily: 'Eczar',
  fontDisplay: 'swap',
  fontWeight: [400,500,700],
  src: `
    local('Eczar'),
    local('Eczar'),
    url(${'Eczar'}) format('truetype')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131 U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const RobotoC={
  fontFamily: ['Roboto Condensed','sans-serif'],
  fontDisplay: 'swap',
  fontWeight: [400,700,],
  src: `
        local('RobotoC'),
        local('RobotoC'),
        url(${'RobotoC'}) format('truetype')
`,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const Audiowide={
  fontFamily: 'Audiowide',
  fontStyle: 'cursive',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Audiowide'),
    local('Audiowide'),
    url(${'AudioWide'}) format('truetype')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

export const colors={
  white: "#fff",
  black: '#000',
  darkBlue: "#2c3b57",
  blue: "#2F80ED",
  gray: "#e1e1e1",
  lightGray: "#ededed",
  lightBlack: "#6a6a6a",
  darkBlack: "#141414",
  green: '#1abc9c',
  red: '#ed4337',
  orange: '#FF6859',
  yellow: '#FFCF44',
  rallyblue: '#72DEFF',
  pink: '#DC6BE5',
  compoundGreen: '#00d395',
  tomato: '#e56b73',
  purple: '#B15DFF',
  creamPurple: '#594bad',
  creamBlue: '#69e2dc',
  coverPurple: '#5a32c6',
  dafiGreen: '#00ffc3',
  text: "fff",
  lightBlue: "#2F80ED",
  topaz: "#0b8f92",
  darkGray: "#030303",
  dafiPrimaryhex: "#3FBFBF",
  dafiDefaulthex: "#363640",
  dafiColorhex1: "#3FBFA8",
  dafiColorhex2: "#43D9A2",
  dafiColorhex3: "#41D983",
  dafiheader: 'linear-gradient(180deg, #00ffc3, #212626)',
  dafidentheader: 'linear-gradient(115deg, #363640, #2c3b57, #3FBFBF, #4b5b57, #363430)',
  dafident: 'linear-gradient(to bottom, #363640, #72DEFF, #4F5257, #3FBFBF, #4b5b57, #363430)',
  dafilight: 'linear-gradient(155deg, #3c3c46, #00ffc3, #72DEFF, #e0f7fa, #4b5b57, #363640)',
  dafidark: 'linear-gradient(0deg, darkBlack, #000061, darkGray, darkBlack)',
  dafispace: 'linear-gradient(0deg, #363640, #505054,#3FBFBF, #364040, #29292B, #ABABAB, #2B2B2B)',
  dafigray: "#000000",
  dafifuschia: "#ff0357",
  dafitriadicblue: "#003CFF",
  dafiheat: "#ff1744"

};


export const breakpoints=createBreakpoints({
  keys: ["xs","sm","md","lg","xl"],
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1800

  }
});

let dafi_theme=responsiveFontSizes(
  createMuiTheme({


    Typography: {
      root: {
        fontFamily: [
          '"Eczar"',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"RobotoC"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        h1: {
          fontSize: '4rem',
          fontWeight: '300',
          fontType: '"RobotoC"',
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          lineHeight: 1.167

        },
        h2: {
          fontSize: '2.75rem',
          fontWeight: '300',
          fontType: '"RobotoC"',
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          lineHeight: 1.2

        },
        h3: {
          fontSize: '1.5rem',
          fontType: '"RobotoC"',
          fontWeight: '400',
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          lineHeight: 1.167
        },
        h4: {
          fontSize: '1rem',
          fontType: '"Eczar"',
          fontWeight: '700',
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          lineHeight: 1.125


        },
        h5: {
          fontSize: '0.875rem',
          fontType: '"Eczar"',
          fontWeight: '700',
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          lineHeight: 1.125


        },
        body1: {
          fontSize: '0.875rem',
          fontWeight: '500',
          fontType: '"RobotoC"',
          overflow: 'hidden',
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale"
        },
        body2: {
          fontSize: '0.375rem',
          fontWeight: '700',
          fontType: '"Eczar"',
          backgroundColor: 'none',
          overflow: 'hidden',
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale"
        },
        text: {
          primary: colors.darkBlack,
          secondary: colors.dafiheat
        },
      }
    },
    transitions: {
      easing: {
        easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
        easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
        easeIn: "cubic-bezier(0.4, 0, 1, 1)",
        sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
      },
    },
    palette: {
      primary: {
        light: '#484848',
        main: '#363640',
        dark: '#000000',
        contrastText: colors.dafiheat
      },
      secondary: {
        light: '#00FFC3',
        main: '#3FBFBF',
        dark: '#455655',
        contrastText: '#00007B'
      },
    },
    type: 'dark',
    overrides: {
      MuiCssBaseline: {
        '@global': {

          '@font-face': ['RobotoC'],
          html: {
            WebkitFontSmoothing: 'auto'
          },
        },
      },

      MuiTypography: {
        root: {
          fontFamily: [
            '"Eczar"',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            '"RobotoC"',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),

          h1: {
            fontSize: '4rem',
            fontWeight: '300',
            fontType: '"RobotoC"',
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            lineHeight: 1.167

          },
          h2: {
            fontSize: '2.75rem',
            fontWeight: '300',
            fontType: '"RobotoC"',
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            lineHeight: 1.2

          },
          h3: {
            fontSize: '1.5rem',
            fontType: '"RobotoC"',
            fontWeight: '500',
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            lineHeight: 1.167
          },
          h4: {
            fontSize: '1rem',
            fontType: '"RobotoC"',
            fontWeight: '700',
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            lineHeight: 1.125

          },
          h5: {
            fontSize: '0.875rem',
            fontType: '"Eczar"',
            fontWeight: '700',
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            lineHeight: 1.125


          },
          body1: {
            fontSize: '.875rem',
            fontWeight: '500',
            fontType: '"RobotoC"',
            overflow: 'hidden',
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            fontcolor: colors.darkBlack
          },
          body2: {
            fontSize: '0.375rem',
            fontWeight: '700',
            fontType: '"Eczar"',
            overflow: 'hidden',
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale"
          },
          text: {
            primary: colors.darkBlack,
            secondary: colors.dafiheat
          },
        }
      },
      transitions: {
        easing: {
          easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
          easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
          easeIn: "cubic-bezier(0.4, 0, 1, 1)",
          sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
        }
      },
      MuiTouchRipple: {
        root: {
          width: '48px',
          height: '48px'
        },
      },







      MuiSelect: {
        select: {
          padding: '9px'
        },
        selectMenu: {
          minHeight: '30px',
          display: 'flex',
          alignItems: 'center',
          background: colors.dafiDefaulthex
        }
      },
      MuiButton: {
        root: {
          borderRadius: '50px',
          padding: '10px 24px'
        },
        outlined: {
          padding: '10px 24px',
          borderWidth: '2px !important'
        },
        text: {
          padding: '10px 24px'
        },
        label: {
          textTransform: 'none',
          fontSize: '0.875rem',
          fontFamily: '"Eczar"',
          color: colors.dafiheat

        }
      },
      MuiButtonBase: {
        root: {
          borderRadius: '16px',
          padding: '10px 24px',
          variant: 'contained'
        }
      },
      Button: {
        root: {
          borderRadius: '16px',
          padding: '10px 24px',
          variant: 'contained'
        },
        outlined: {
          padding: '10px 24px',
          borderWidth: '2px !important'
        },
        text: {
          padding: '10px 24px'
        },
        label: {
          textTransform: 'none',
          fontSize: '0.875rem',
          fontFamily: '"Eczar"',
          background: colors.dafidark
        }
      },
      ButtonGroup: {
        root: {
          borderRadius: '25px',
          padding: '10px 24px',

          outlined: {
            padding: '10px 24px',
            borderWidth: '2px !important'
          },
          text: {
            padding: '10px 24px'
          },
          label: {
            textTransform: 'none',
            fontSize: '0.875rem',
            fontFamily: '"Eczar"',
            color: colors.dafidark
          },
        },
      },
      MuiInput: {
        underline: {
          '&:before': { //underline color when textfield is inactive
            display: 'none !important',
            height: '0px',
            borderBottom: 'none !important'
          },
          '&:after': { //underline color when textfield is inactive
            display: 'none !important',
            height: '0px',
            borderBottom: 'none !important'
          },
          '&:hover:not($disabled):before': { //underline color when hovered
            display: 'none !important',
            height: '0px',
            borderBottom: 'none !important'
          },
        }
      },
      MuifixedHeightPaper: {
        height: 220
      },
      MuiInputBase: {
        input: {
          fontSize: '1rem',
          fontWeight: 'bold',
          fontType: 'Eczar',
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          lineHeight: 1.2,
          color: colors.darkBlack
        }
      },
      MuiOutlinedInput: {
        root: {
          // border: "none !important",
          //borderRadius: '50px'
        },
        notchedOutline: {
          // border: "none !important"
        },
        input: {
          "&::placeholder": {
            color: colors.dafiheat,
            fontFamily: '"Eczar"'
          },
          color: colors.darkBlack,
          padding: '14px',
          borderRadius: '25px',
          fontFamily: '"Eczar"'

        }

      },
      MuiSnackbar: {
        root: {
          maxWidth: 'calc(100vw-50px)'
        }

      },
      MuiMenuItem: {
        root: {
          background: colors.dafidark
        }
      },




      MuiSnackbarContent: {
        root: {
          background: colors.dafiDefaulthex,
          padding: '0px',
          minWidth: 'auto',
          '@media (min-width: 960px)': {
            minWidth: '500px'
          },
          message: {
            color: colors.dafiGreen,
            padding: '0px'
          },
          action: {
            marginRight: '0px'
          }
        },
      },
      MuiList: {
        padding: {
          color: colors.dafiDefaulthex
        }
      },
      MuiListItemText: {
        root: {
          color: colors.darkBlack
        }

      },
      MuiAccordion: {
        root: {
          margin: '8px 0px',
          '&:before': { //underline color when textfield is inactive
            backgroundColor: 'none',
            height: '0px'
          },
        }
      },
      MuiAccordionSummary: {
        root: {
          padding: '12px 24px',
          background: 'rgba(26,26,26,0)',
          '@media (min-width: 960px)': {
            padding: '30px 42px'
          },
          content: {
            margin: '0px !important'



          },
        },
      },
      MuiAccordionDetails: {
        root: {
          padding: '0 12px 15px 12px',
          border: '40px',
          '@media (min-width: 960px)': {
            padding: '0 18px 24px 18px'
          }
        }
      },
      MuiPaper: {
        root: {
          background: '#363640',
          backgroundImage: 'linear-gradient(180deg, rgba(54,54,64,1) 0%, rgba(44,59,87,1) 25%, rgba(75,91,87,1) 50%, rgba(33,38,38,1) 100%)',
          elevation1: {
            boxShadow: 'none'
          }



        }
      },

      MuiToggleButton: {
        root: {
          size: 'small',

          textTransform: 'none',
          minWidth: '100px',
          border: 'none',
          background: colors.dafidentheader,
          '& > span > h5': {
            color: colors.dafiheat,
          },
          '&:hover': {
            backgroundcolor: colors.darkblack,
            fontcolor: colors.dafitriadicblue
          },
          "&$selected": {
            backgroundColor: colors.dafitriadicblue,
            '& > span > h5': {
              color: colors.darblack
            },
            '&:hover': {
              backgroundColor: colors.dafiheat,
              '& > span > h5': {
                color: colors.white
              },
            },
          }
        }
      },


      MuiFormControlLabel: {
        label: {
          color: colors.dafiheat,
          fontSize: 12,
          fontWeight: '600',
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          lineHeight: 1.2,
          fontFamily: '"Eczar"'
        }
      },

      MuiSlider: {
        root: {
          color: colors.dafiheat
        }
      },


      MuiLinearProgress: {
        root: {
          width: '100%',
          color: 'secondary'
        }


      },
    },




  }));







export default dafi_theme;