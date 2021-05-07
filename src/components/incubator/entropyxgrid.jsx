import * as React from 'react';
import {XGrid} from '@material-ui/x-grid';
import {useDemoData} from '@material-ui/x-grid-data-generator';
import {LicenseInfo} from '@material-ui/x-grid';
import {colors} from '../../theme/theme.jsx';
import theme from '../../theme';
import {makeStyles} from '@material-ui/core/styles'

const useStyles=makeStyles((theme) => ({

  root: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    minWidth: '0',
    maxWidth: '100%'
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
    padding: theme.spacing(3),
    persistentBehavior: 'fit'
  },
}

));
export default function EntropyXGrid() {

  const classes=useStyles();

  const [width,setWidth]=React.useState(window.innerWidth);
  const [height,setHeight]=React.useState(window.innerHeight);
  const updateWidthAndHeight=() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

  };
  React.useEffect(() => {
    window.addEventListener("resize",updateWidthAndHeight);
    return () => window.removeEventListener("resize",updateWidthAndHeight);
  });
  const {data}=useDemoData({
    dataSet: 'Commodity',
    rowLength: 100000,
  });

  return (
    <div className="root" style={{
      paddingLeft: '4rem',
      height: 520,width: '94%',background: colors.dafident,[theme.breakpoints.down('md')]: {
        height: 475,
        width: '80%'
      }
    }}>

      <XGrid className={classes.content}
        {...data}
        loading={data.rows.length===0}
        rowHeight={38}
        checkboxSelection


      />
    </div>
  );
}

LicenseInfo.setLicenseKey(
  '19494f35107113d0c813dfab75b058b4T1JERVI6MjQzODgsRVhQSVJZPTE2NTE1MDQzNDkwMDAsS0VZVkVSU0lPTj0x'
);