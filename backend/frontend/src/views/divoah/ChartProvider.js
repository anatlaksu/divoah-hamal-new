import React from 'react';
import Chart from 'chart.js/auto';
import * as helpers from 'chart.js/helpers';

function ChartProvider({children}) {
  React.useEffect(() => {
    window.Chart = Chart;
    Chart.helpers = helpers;
    import('chart.js-plugin-labels-dv');
  }, []);
  return children;
}

export default ChartProvider;