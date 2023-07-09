import type { ComponentApi } from "jsxte";
import { Card } from "../../components/card/card";
import { useContent } from "../../contexts/localization-context/use-content";

export const HomePage = (_: {}, context: ComponentApi): JSX.Element => {
  const content = useContent(context);

  return (
    <div class="main-page_box">
      <header class="main-page-banner_box">{content.html.get("banner")}</header>
      <main class="card-container_box">
        <Card class="info_box">
          <span class="card-image-placeholder_element"></span>
          <h3>Card Title</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            condimentum, nisl ut aliquam aliquam, nunc nisl aliquet nisl, eget
            aliquet nisl nunc eget lorem.
          </p>
        </Card>
        <Card class="info_box">
          <span class="card-image-placeholder_element"></span>
          <h3>Card Title</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            condimentum, nisl ut aliquam aliquam, nunc nisl aliquet nisl, eget
            aliquet nisl nunc eget lorem.
          </p>
        </Card>
        <Card class="info_box">
          <span class="card-image-placeholder_element"></span>
          <h3>Card Title</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            condimentum, nisl ut aliquam aliquam, nunc nisl aliquet nisl, eget
            aliquet nisl nunc eget lorem.
          </p>
        </Card>
      </main>
    </div>
  );
};
