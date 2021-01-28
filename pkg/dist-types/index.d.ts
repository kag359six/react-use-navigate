import { FC } from 'react';
declare type UseNavigateProps = {
    when?: boolean;
    to?: string;
    onPaths?: string[];
    notOnPaths?: string[];
};
declare type UseNavigateConfig = {
    push: (path: string) => void;
    back: () => void;
    replace: (path: string) => void;
};
export declare const NavigateProvider: FC<UseNavigateConfig>;
declare const useNavigate: () => {
    push: ({ to, when, onPaths, notOnPaths }: UseNavigateProps) => void;
    back: ({ to, when, onPaths, notOnPaths }: UseNavigateProps) => void;
    replace: ({ to, when, onPaths, notOnPaths }: UseNavigateProps) => void;
};
export default useNavigate;
