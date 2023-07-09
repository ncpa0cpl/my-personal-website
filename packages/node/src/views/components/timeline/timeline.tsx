import type { ComponentApi } from "jsxte";
import { DateTime } from "luxon";
import { AppRoutes } from "../../../app-routes";
import { useContent } from "../../contexts/localization-context/use-content";
import { Link } from "../link/link";

export type TimelineSegment = {
  id: string | number;
  title: string;
  subtitle: string;
  description: string;
  from: string;
  to: string;
};

export const Timeline = (_: {}, context: ComponentApi) => {
  const content = useContent(context);

  const segments = content.yaml.get("career-timeline").segments;

  const formatDate = (date: string) =>
    (date === "%NOW%" ? DateTime.now() : DateTime.fromISO(date)).toFormat(
      "yyyy LLL",
    );

  return (
    <ul class="timeline_box">
      {segments.map((segment, index) => (
        <li class="timeline-segment_element">
          <div class="timeline-segment-decoration_element">
            <span role="presentation" class="timeline-segment-dot_element" />
            {index !== segments.length - 1 && (
              <span role="presentation" class="timeline-segment-line_element" />
            )}
          </div>
          <div class="timeline-segment-content_element">
            <div class="timeline-segment-title_element">
              <Link
                hx-target="#content-container"
                href={AppRoutes.career.company.$as(segment.id).$()}
              >
                <p>{segment.title}</p>
              </Link>
            </div>
            <div class="timeline-segment-subtitle_element">
              <h5>{segment.subtitle}</h5>
            </div>
            <div class="timeline-segment-description_element">
              <p>{segment.description}</p>
            </div>
            <div class="timeline-segment-date_element">
              <p>
                {formatDate(segment.from)} - {formatDate(segment.to)}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
