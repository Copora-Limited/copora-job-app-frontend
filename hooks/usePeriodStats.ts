import { useState, useEffect } from 'react';

interface PeriodStats {
  today: number;
  yesterday: number;
  last7Days: number;
  last30Days: number;
}

const usePeriodStats = () => {
  const [periodStats, setPeriodStats] = useState<PeriodStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeriodStats = async () => {
      try {
        const response = await fetch('http://localhost:8001/auctions/period-stats');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPeriodStats(data);
      } catch (err) {
        setError('Failed to fetch period stats');
      } finally {
        setLoading(false);
      }
    };

    fetchPeriodStats();
  }, []);

  return { periodStats, loading, error };
};

export default usePeriodStats;
