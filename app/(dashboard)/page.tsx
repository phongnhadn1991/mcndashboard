import ChartTotalPosts from '@/components/chartdashboard/ChartTotalPosts';
import { ChartTotalUsers } from '@/components/chartdashboard/ChartTotalUsers';
import TopTotalDashboard from '@/components/toptotaldashboard/TopTotalDashboard';
import TopUsers from '@/components/topusers/TopUsers';

export default function Home() {
  return (
    <div className='l-dashboard'>
      <TopTotalDashboard />
      <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4'>
        <div className='p-charBoard lg:col-span-2'>
          <ChartTotalPosts />
        </div>
        <div className='p-topUsers'>
          <TopUsers />
        </div>
        <div className='p-chartTotalUsers'>
          <ChartTotalUsers />
        </div>
      </div>
    </div>
  );
}
