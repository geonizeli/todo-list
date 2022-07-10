export const formatDate = (date: string) => {
  return (
    new Date(date).toLocaleDateString() +
    " " +
    new Date(date).toLocaleTimeString()
  );
};
