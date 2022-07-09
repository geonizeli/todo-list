import { useAuth } from "../hooks/useAuth";

export type UnautorizedBlockProps = {
  protectedContent: React.ReactNode;
  unauthenticatedContent: React.ReactNode;
};

export const UnautorizedBlock = (props: UnautorizedBlockProps) => {
  const { authenticated } = useAuth();

  return (
    <>{authenticated ? props.protectedContent : props.unauthenticatedContent}</>
  );
};
