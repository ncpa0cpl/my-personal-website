import type { ComponentApi } from "jsxte";
import type { ProjectContent } from "../../../content/yaml-loader";
import { Translation } from "../../../localization/dictionaries/keys";
import { Card } from "../../components/card/card";
import { useContent } from "../../contexts/localization-context/use-content";
import { useTranslation } from "../../contexts/localization-context/use-translation";

export const HobbyProjectsPage = (): JSX.Element => {
  return (
    <div class="projects-page_box">
      <Header />
      <main>
        <ProjectsList />
      </main>
    </div>
  );
};

const Header = (_: {}, context: ComponentApi) => {
  const t = useTranslation(context);

  return (
    <header>
      <h1>{t(Translation.HobbyProjects)}</h1>
    </header>
  );
};

const ProjectsList = (_: {}, context: ComponentApi) => {
  const t = useTranslation(context);
  const content = useContent(context);

  const projects = content.yaml.getMatches<ProjectContent>(/^projects\..+/);
  projects.sort((a, b) => a.order - b.order);

  return (
    <ul>
      {projects.map((project) => (
        <li>
          <Card class="project-card_box">
            <h3>{project.title}</h3>
            <pre aria-label="Project description">
              {project.description.replace(/([^\n])\n([^\n])/g, "$1 $2")}
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
  );
};
