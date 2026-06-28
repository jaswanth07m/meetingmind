import { useState, useEffect, useCallback } from 'react';
import { health } from '../services/api';

export function useHealth() {
  const [status, setStatus] = useState('checking');
  const [error, setError] = useState(null);

  const checkHealth = useCallback(async () => {
    try {
      setStatus('checking');
      const data = await health();
      setStatus(data.status === 'healthy' ? 'healthy' : 'unhealthy');
      setError(null);
    } catch (err) {
      setStatus('unhealthy');
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, [checkHealth]);

  return { status, error, checkHealth };
}

export default useHealth;