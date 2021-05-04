import * as React from 'react';
import {XGrid} from '@material-ui/x-grid';
import {useDemoData} from '@material-ui/x-grid-data-generator';
import {LicenseInfo} from '@material-ui/x-grid';
import {colors} from '../../theme/theme.jsx';




export default function EntropyXGrid() {
  const {data}=useDemoData({
    dataSet: 'Commodity',
    rowLength: 100000,
  });

  return (
    <div style={{paddingLeft: '8.2rem',paddingRight: '4rem',height: 520,width: '100%',background: colors.dafident}}>
      <XGrid
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