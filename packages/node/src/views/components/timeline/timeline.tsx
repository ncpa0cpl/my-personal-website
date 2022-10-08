import { DateTime } from "luxon";

export type TimelineSegment = {
  title: string;
  subtitle: string;
  description: string;
  from: string;
  to: string;
};

export type TimelineProps = {
  segments: TimelineSegment[];
};

export const Timeline = (props: TimelineProps) => {
  const formatDate = (date: string) =>
    (date === "%NOW%" ? DateTime.now() : DateTime.fromISO(date)).toFormat(
      "yyyy LLL"
    );

  return (
    <ul class="timeline_box">
      {props.segments.map((segment, index) => (
        <li class="timeline-segment_element">
          <div class="timeline-segment-decoration_element">
            <span role="presentation" class="timeline-segment-dot_element" />
            {index !== props.segments.length - 1 && (
              <span role="presentation" class="timeline-segment-line_element" />
            )}
          </div>
          <div class="timeline-segment-content_element">
            <div class="timeline-segment-title_element">
              <h3>{segment.title}</h3>
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
