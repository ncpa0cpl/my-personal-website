import type { ContextMap } from "jsxte";
import { Translation } from "../../../localization/dictionaries/keys";
import { Card } from "../../components/card/card";
import { LocalizationContextProvider } from "../../contexts/localization-context/provider";
import { useContent } from "../../contexts/localization-context/use-content";
import { useTranslation } from "../../contexts/localization-context/use-translation";

type ProjectContent = {
  title: string;
  description: string;
  repository: string;
  npm: string;
  order: number;
};

export const HobbyProjectsPage = (_: {}, context: ContextMap): JSX.Element => {
  const t = useTranslation(context);
  const content = useContent(context);

  const projects = content.yaml.getMatches<ProjectContent>(/^projects\..+/);
  projects.sort((a, b) => a.order - b.order);

  return (
    <LocalizationContextProvider>
      <div class="projects-page_box">
        <header>
          <h1>{t(Translation.HobbyProjects)}</h1>
        </header>
        <main>
          <ul>
            {projects.map((project) => (
              <li>
                <Card class="project-card_box">
                  <h3>{project.title}</h3>
                  <pre aria-label="Project description">
                    {project.description}
                  </pre>
                  <div class="project-car-links_element">
                    {project.repository && (
                      <a href={project.repository}>
                        {t(Translation.CheckOutOnGithub)}
                      </a>
                    )}
                    {project.npm && (
                      <a href={project.npm}>{t(Translation.CheckOutOnNpm)}</a>
                    )}
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </LocalizationContextProvider>
  );
};
