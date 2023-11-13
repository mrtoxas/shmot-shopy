import { useState } from "react";

export const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);

  const stopLoading = () => setIsLoading(false);

  const toggleLoading = () => setIsLoading((prevState) => !prevState);

  const setLoading = (state: boolean) => setIsLoading(state);

  return { startLoading, stopLoading, toggleLoading, setLoading, isLoading }
}