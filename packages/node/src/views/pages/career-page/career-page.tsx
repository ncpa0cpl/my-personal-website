import type { ComponentApi } from "jsxte";
import { Translation } from "../../../localization/dictionaries/keys";
import { Card } from "../../components/card/card";
import { Timeline } from "../../components/timeline/timeline";
import { useTranslation } from "../../contexts/localization-context/use-translation";

export const CareerPage = (): JSX.Element => {
  return (
    <div>
      <Card class="career-timeline-card_box">
        <Header />
        <main>
          <Timeline />
        </main>
      </Card>
    </div>
  );
};

const Header = (_: {}, context: ComponentApi) => {
  const t = useTranslation(context);

  return (
    <header>
      <h1>{t(Translation.Career)}</h1>
    </header>
  );
};
