import type { FC } from "react";
import ContentLoader from "react-content-loader";


export const PizzaBlockSkeleton: FC = () => {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={465}
      viewBox="0 0 280 465"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="121" cy="162" r="102" />
      <rect x="2" y="275" rx="10" ry="10" width="251" height="22" />
      <rect x="4" y="317" rx="10" ry="10" width="242" height="87" />
      <rect x="13" y="419" rx="10" ry="10" width="83" height="33" />
      <rect x="123" y="414" rx="25" ry="25" width="119" height="48" />
    </ContentLoader>
  );
};
