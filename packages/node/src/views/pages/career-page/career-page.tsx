import type { ContextMap } from "jsxte";
import { Translation } from "../../../localization/dictionaries/keys";
import { Card } from "../../components/card/card";
import type { TimelineSegment } from "../../components/timeline/timeline";
import { Timeline } from "../../components/timeline/timeline";
import { LocalizationContextProvider } from "../../contexts/localization-context/provider";
import { useContent } from "../../contexts/localization-context/use-content";
import { useTranslation } from "../../contexts/localization-context/use-translation";

type CareerTimelineContent = {
  segments: Array<TimelineSegment>;
};

export const CareerPage = (_: {}, context: ContextMap): JSX.Element => {
  const content = useContent(context);
  const t = useTranslation(context);

  const timelineSegments =
    content.yaml.get<CareerTimelineContent>("career-timeline").segments;

  return (
    <LocalizationContextProvider>
      <div>
        <Card class="career-timeline-card_box">
          <header>
            <h1>{t(Translation.Career)}</h1>
          </header>
          <main>
            <Timeline segments={timelineSegments} />
          </main>
        </Card>
      </div>
    </LocalizationContextProvider>
  );
};
