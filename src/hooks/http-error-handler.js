import { useState, useEffect } from 'react';

const useHttp = (httpClinet) => {
  const [error, setError] = useState(null);
  const [show, setShow] = useState(null);

  const reqInterceptor = httpClinet.interceptors.request.use((req) => {
    setError(null);
    return req;
  });

  const resInterceptor = httpClinet.interceptors.response.use(
    (res) => res,
    () => {
      const fallbackValue = [
        { title: 'Something went wrong.', completed: false },
      ];
      setError(fallbackValue[0].title);
      setShow(true);

      return Promise.reject(fallbackValue);
    },
  );

  // cleanup
  useEffect(() => {
    return () => {
      httpClinet.interceptors.request.eject(reqInterceptor);
      httpClinet.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor, httpClinet]);

  const dismissErrorHandler = () => {
    setError(null);
    setShow(false);
  };

  return [error, show, dismissErrorHandler];
};

export default useHttp;
