import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import { ITransaction } from 'interfaces';
import * as React from 'react';
import { Chart } from 'react-google-charts';

interface IProps {
  data: ITransaction[];
}

export const PaymentsChart = ({ data }: IProps) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Chart
      width={isMobile ? 300 : 500}
      chartType='PieChart'
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        backgroundColor: 'transparent'
      }}
    />
  );
};
