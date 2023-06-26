import { useEffect, useState } from "react";
const OnlyClient = ({ children }) => {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) return null;
  return children;
};

export default OnlyClient;
